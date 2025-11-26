package com.hackathon.bookingtool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import com.hackathon.bookingtool.model.Raum;
import com.hackathon.bookingtool.repository.RaumRepository;

@SpringBootApplication
public class BookingtoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookingtoolApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(RaumRepository raumRepository) {
        return args -> {
            if (raumRepository.count() == 0) {
                raumRepository.save(new Raum(null, "Konfi A", 8, "Beamer, Whiteboard"));
                raumRepository.save(new Raum(null, "Konfi B", 12, "TV, Konferenztelefon"));
                raumRepository.save(new Raum(null, "Huddle Room", 4, "Monitor"));
            }
        };
    }
}
