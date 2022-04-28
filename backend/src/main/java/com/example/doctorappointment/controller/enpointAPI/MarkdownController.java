package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.entity.MarkdownEntity;
import com.example.doctorappointment.repository.MarkdownRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/markdown")
public class MarkdownController {
    private final MarkdownRepo markdownRepo;

    @GetMapping("/")
    public ResponseEntity<List<MarkdownEntity>> GetAll() {
        System.out.println(markdownRepo.findAll().toString());
        return ResponseEntity.ok().body(markdownRepo.findAll());
    }

    @GetMapping("/specialty/{id}")
    public ResponseEntity<MarkdownEntity> getMarkdownWithSpecialtyId(@PathVariable int specialtyId) {
        return ResponseEntity.ok().body(markdownRepo.findBySpecialtyId(specialtyId));
    }

    @GetMapping("/clinic/{id}")
    public ResponseEntity<MarkdownEntity> getMarkdownWithClinicId(@PathVariable int clinicId) {
        return ResponseEntity.ok().body(markdownRepo.findByClinicId(clinicId));
    }
}

