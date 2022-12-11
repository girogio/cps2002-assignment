package com.um.gorju.vehiclemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class VehicleManagementApp {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(VehicleManagementApp.class, args);
    }
}
