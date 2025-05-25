package com.example.first_pj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class FirstPjApplication {
	public static void main(String[] args) {
		SpringApplication.run(FirstPjApplication.class, args);
	}
}
