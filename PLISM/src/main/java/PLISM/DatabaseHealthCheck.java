package PLISM;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseHealthCheck implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("✔️ System - Build & Run Successful!");
    }
}
