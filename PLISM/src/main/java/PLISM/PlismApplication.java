package PLISM;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import PLISM.Security.JwtProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class PlismApplication {
	public static void main(String[] args) {
		SpringApplication.run(PlismApplication.class, args);
	}
}
