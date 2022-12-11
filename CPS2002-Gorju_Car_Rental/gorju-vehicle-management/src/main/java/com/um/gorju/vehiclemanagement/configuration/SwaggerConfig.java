package com.um.gorju.vehiclemanagement.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
        @Value(value = "1.0")
        private String apiVersion;

        @Bean
        public Docket api() {
            return new Docket(DocumentationType.SWAGGER_2)
                    .select()
                    .apis(RequestHandlerSelectors.basePackage("com.um.gorju.vehiclemanagement.web.controllers"))
                    .paths(PathSelectors.any())
                    .build()
                    .apiInfo(apiInfo());
        }

        ApiInfo apiInfo() {
            return new ApiInfoBuilder()
                    .title("Gorju Vehicle Manager")
                    .license("")
                    .licenseUrl("http://unlicense.org")
                    .termsOfServiceUrl("")
                    .version(apiVersion)
                    .build();
        }
    }