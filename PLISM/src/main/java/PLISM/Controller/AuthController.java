package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.User;
import PLISM.Service.UserService;
import PLISM.Security.JwtUtil;

@RestController
@RequestMapping("")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already registered.");
        }

        // Hash the password and set default role
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRoles().isEmpty()) {
            user.getRoles().add("USER"); // Default role
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null || !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password!");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(existingUser.getUsername());
        return ResponseEntity.ok(new AuthResponse(true, token));
    }

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
