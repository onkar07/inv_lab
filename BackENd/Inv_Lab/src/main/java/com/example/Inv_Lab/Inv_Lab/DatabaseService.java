package com.example.Inv_Lab.Inv_Lab;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class DatabaseService {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    public void connectToDatabase() {
        try (Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)) {
            if (connection != null) {
                System.out.println("Successfully connected to the MySQL server");
                System.out.println("Connected to MySQL Server version: " + connection.getMetaData().getDatabaseProductVersion());
            }
        } catch (SQLException e) {
            System.out.println("Error connecting to MySQL: " + e.getMessage());
        }
    }
}
