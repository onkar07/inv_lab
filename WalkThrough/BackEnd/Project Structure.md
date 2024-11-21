```css
PLISM/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── PLISM/
│   │   │       ├── controller/
│   │   │       │   ├── CategoryController.java
│   │   │       │   ├── ItemController.java
│   │   │       │   └── UserController.java
│   │   │       ├── entity/
│   │   │       │   ├── Category.java
│   │   │       │   ├── Item.java
│   │   │       │   └── User.java
│   │   │       ├── repository/
│   │   │       │   ├── CategoryRepository.java
│   │   │       │   ├── ItemRepository.java
│   │   │       │   └── UserRepository.java
│   │   │       ├── service/
│   │   │       │   ├── UserService.java
│   │   │       │   ├── CategoryService.java
│   │   │       │   └── ItemService.java
│   │   │       ├── security/
│   │   │       │   ├── WebSecurityConfig.java
│   │   │       │   ├── JwtUtil.java
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   └── JwtAuthorizationFilter.java
│   │   │       ├── PlismApplication.java (Main entry point)
│   │   │       ├── DatabaseHealthCheck.java (prints success message)
│   │   │       └── config/
│   │   │           └── AppConfig.java (For any additional configuration)
│   │   ├── resources/
│   │   │   ├── application.properties (or application.yml for database, JWT config)
│   │   │   ├── static/ (For static files like images, stylesheets, JavaScript)
│   │   │   └── templates/ (If using Thymeleaf for rendering views)
│   │   │       └── login.html (For login form if needed)
│   │   └── webapp/
│   │       └── WEB-INF/ (Optional for certain view-based configurations)
│   ├── test/
│   │   ├── java/
│   │   │   └── PLISM/
│   │   │       ├── controller/
│   │   │       │   └── CategoryControllerTest.java
│   │   │       ├── service/
│   │   │       │   ├── CategoryServiceTest.java
│   │   │       │   └── UserServiceTest.java
│   │   │       ├── repository/
│   │   │       │   └── CategoryRepositoryTest.java
│   │   │       └── security/
│   │   │           └── JwtUtilTest.java
│   └── pom.xml
│
└── README.md
```  