package com.um.gorju.vehiclemanagement.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {
    @Bean
    public org.modelmapper.ModelMapper modelMapperFactory() {
        return new org.modelmapper.ModelMapper();
    }
}
