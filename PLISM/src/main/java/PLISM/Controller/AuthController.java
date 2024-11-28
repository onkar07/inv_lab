package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.User;
import PLISM.Service.UserService;
import PLISM.Security.JwtUtil;

@RestController
//@RequestMapping("/api/auth")
@RequestMapping("")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Registration endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user
        userService.saveUser(user);

        return "User registered successfully!";
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        // Log the incoming user data
        System.out.println(user.toString());

        // Find user by username
        User existingUser = userService.findByUsername(user.getUsername());

        // Check if the user exists and the password matches
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Generate and return JWT token if credentials are valid
            String token = jwtUtil.generateToken(existingUser.getUsername());

            // Return success response with the token
            return ResponseEntity.ok(new AuthResponse(true, token));
        } else {
            // Return failure response with error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(false, "Invalid username or password!"));
        }
    }

    // Custom response class to structure the response
    public static class AuthResponse {
        private boolean isSuccess;
        private String response;

        public AuthResponse(boolean isSuccess, String response) {
            this.isSuccess = isSuccess;
            this.response = response;
        }

        public boolean isSuccess() {
            return isSuccess;
        }

        public String getResponse() {
            return response;
        }

        public void setSuccess(boolean isSuccess) {
            this.isSuccess = isSuccess;
        }

        public void setResponse(String response) {
            this.response = response;
        }
    }
}