# PLISM/:  
`pom.xml` (all Dependency)

# PLISM/Src/main/resources:  
`application.properties`  
```
spring.application.name=PLISM

# MySQL Database Connection
spring.datasource.url=jdbc:mysql://15.206.7.141:3306/inv_lab
spring.datasource.username=remote_park_onk
spring.datasource.password=Parkingbay@123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate configurations
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
# logging.level.org.springframework.security=DEBUG
# logging.level.org.hibernate.SQL=DEBUG
# logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

# PLISM/Src/main/java/PLISM:  
1. PlismApplication.java (main application)
2. DatabaseHealthCheck.java

Package1: config
Package2: Controller
Package3: Entity
Package4: Repository
Package5: Security
Package6: Service

# Package1: config  
## `CorsConfig.java`
```java
package PLISM.config;
	
	import org.springframework.context.annotation.Bean;
	import org.springframework.context.annotation.Configuration;
	import org.springframework.web.servlet.config.annotation.CorsRegistry;
	import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
	
	@Configuration
	public class CorsConfig implements WebMvcConfigurer {
	
	    @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**") // Allow all endpoints
	                        .allowedOrigins("http://localhost:3000") // Allow specific origin
	                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific methods
	                        .allowedHeaders("*") // Allow any headers
	                        .allowCredentials(true); // Allow credentials (if needed)
	            }
	        };
	    }
	}
```  
## `DatabaseConfig.java`  
```java
package PLISM.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:application.properties")
public class DatabaseConfig {

    private final Environment env;

    public DatabaseConfig(Environment env) {
        this.env = env;
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        // Retrieve database properties
        String driverClassName = env.getProperty("spring.datasource.driver-class-name");
        String url = env.getProperty("spring.datasource.url");
        String username = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password");

        // Check for missing properties
        if (driverClassName == null || url == null || username == null || password == null) {
            throw new IllegalArgumentException(
                    "One or more database properties are missing in application.properties");
        }

        // Set database properties
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }
}
```  
## `WebSecurityConfig.java`  
```java
package PLISM.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import PLISM.Security.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Password Encoder Bean for BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication Manager Bean to be used by Spring Security
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
                                                                                              // username/password
 // filter  
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
	  throws Exception {
    	 http
    	 .cors().and()
    	 .csrf().disable() // Disable CSRF for simplicity; consider enabling it in production.
         .authorizeHttpRequests(authz -> authz
//                 .requestMatchers("/api/auth/*").permitAll()
                 .requestMatchers("/*").permitAll() // Allow unauthenticated access to /api/auth/* endpoints
                 
                 .anyRequest().authenticated())
         .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add the JWT filter


        return http.build();
    }
}
```  

# Package2: Controller  
## `AuthController.java`  
```java
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
```  
## `CategoryController.java`  
```java
package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.Category;
import PLISM.Service.CategoryService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Get all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new category
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    // Update an existing category
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        Optional<Category> existingCategory = categoryService.getCategoryById(id);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription()); // Handle description update
            categoryService.saveCategory(category);
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a category
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        Optional<Category> existingCategory = categoryService.getCategoryById(id);
        if (existingCategory.isPresent()) {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Category deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
```  
## `ItemController.java`  
```java
package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.Item;
import PLISM.Entity.Category; // Import Category entity
import PLISM.Service.ItemService;
import PLISM.Service.CategoryService; // Import CategoryService

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private CategoryService categoryService; // Inject CategoryService

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        item.setDate(new Date()); // Set the current date when creating the item

        // Fetch the category based on the category ID provided in the request
        Category category = categoryService.getCategoryById(item.getCategory().getId()).orElse(null);

        if (category != null) {
            item.setCategory(category); // Set the category to the item
            return ResponseEntity.ok(itemService.saveItem(item));
        }
        return ResponseEntity.badRequest().body(null); // Return bad request if category not found
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Optional<Item> item = itemService.getItemById(id);
        if (item.isPresent()) {
            Item existingItem = item.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setStatus(updatedItem.isStatus());
            existingItem.setDate(updatedItem.getDate()); // Update date if needed

            // Fetch the category based on the ID from the request
            Category category = categoryService.getCategoryById(updatedItem.getCategory().getId()).orElse(null);
            if (category != null) {
                existingItem.setCategory(category); // Set the category
            } else {
                return ResponseEntity.badRequest().body(null); // Return bad request if category not found
            }

            return ResponseEntity.ok(itemService.saveItem(existingItem));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
```  

# Package3: Entity
## `Category.java`  
```java
package PLISM.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
// @Table(name = "cateories") // Fixed table name typo from "cateories"
@Table(name = "categories") // Fixed table name typo from "cateories"
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = true) // Added description column
    private String description;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```  
## `Item.java`  
```java
package PLISM.Entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer quantity;

    private boolean status; // new field to represent item status

    private Date date; // new field to represent the date the item was added

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Getters and setters for all fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
```  
## `User.java`  
```java
package PLISM.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is mandatory")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(unique = true)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>(); // Store roles as a Set to handle multiple roles per user

    public User() {
        roles.add("USER"); // Default role is "USER"
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
```  


# Package4: Repository
## `CategoryRepository.java`  
```java
package PLISM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
```  
## `ItemRepository.java`  
```java
package PLISM.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
```  
## `UserRepository.java`  
```java
package PLISM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
```  

# Package5: Security

## `JwtAuthenticationFilter.java` 
```java
package PLISM.Security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // Skip token validation for /api/auth/** endpoints
        String path = request.getServletPath();
        if (path.startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return; // Skip the JWT validation for these endpoints
        }

        try {
            String token = extractToken(request);

            if (token != null && !token.isEmpty()) {
                String username = jwtUtil.extractUsername(token);

                if (username != null && jwtUtil.validateToken(token, username)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            username, null, null);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ex) {
            // Log error (optional, for better debugging)
            System.out.println("Error during JWT authentication: " + ex.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or missing token");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer")) {
            return header.substring(7); // Extract token after "Bearer "
        }
        return null;
    }
}
```  
## `JwtAuthorizationFilter.java` 
```java
package PLISM.Security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter
public class JwtAuthorizationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthorizationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String token = extractToken(request);
        if (token != null && jwtUtil.validateToken(token, "username")) {
            return getAuthentication(token);
        }
        return null;
    }

    private Authentication getAuthentication(String token) {
        String username = jwtUtil.extractUsername(token);
        return new UsernamePasswordAuthenticationToken(username, null, null);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
```  
## `JwtProperties.java` 
```java
package PLISM.Security;

import java.util.Base64;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.security.Keys;

@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private long expiration = 86400000;

    public String SecretKeyGenerator() {
        String secretKey = Base64.getEncoder()
                .encodeToString(Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256).getEncoded());
        System.out.println("Generated Key: " + secretKey);
        return secretKey;
    }

    private String secret = SecretKeyGenerator();

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpiration() {
        return expiration;
    }

    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }
}

```  
## `JwtUtil.java` 
```java
package PLISM.Security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    public Key SecretKeyGenerator() {
        Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println("Generated Key: " + secretKey); // You can log the key if needed
        return secretKey;
    }

    private Key SECRET_KEY = SecretKeyGenerator(); // Call the method to get the key

    private static final long EXPIRATION_TIME = 86400000; 

    private final JwtProperties jwtProperties;

    public JwtUtil(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY) // Use the secure generated key
                .compact();
    }

    public String extractUsername(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getSubject();
    }


    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    public Date extractExpirationDate(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getExpiration();
    }

    public boolean validateToken(String token, String username) {
        String tokenUsername = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return username.equals(tokenUsername) && !isTokenExpired(token);
    }

    private Claims parseClaimsJws(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Use the SECRET_KEY directly
                .build();
        return jwtParser.parseClaimsJws(token).getBody();
    }


    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Adjust the endpoint as needed
                .allowedOrigins("http://localhost:3000") // Allow frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow necessary methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)
    }
}
```  

# Package6: Service
## `CategoryService.java` 
```java
package PLISM.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import PLISM.Entity.Category;
import PLISM.Repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get category by ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Save a new or existing category
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Delete category by ID
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
```  
## `ItemService.java` 
```java
package PLISM.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import PLISM.Entity.Item;
import PLISM.Repository.ItemRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}
```  
## `UserService.java`  
```java
package PLISM.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import PLISM.Entity.User;
import PLISM.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
```  


