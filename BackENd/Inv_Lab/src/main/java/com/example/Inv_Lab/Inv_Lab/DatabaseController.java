package com.example.Inv_Lab.Inv_Lab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseController {

    @Autowired
    private DatabaseService databaseService;

    @GetMapping("/connect-db")
    public String connectToDatabase() {
        databaseService.connectToDatabase();
        return "Database connection attempt completed. Check logs for details.";
    }
}
