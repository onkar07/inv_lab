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