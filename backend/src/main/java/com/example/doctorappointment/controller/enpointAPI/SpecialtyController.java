package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.Message;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.SpecialtyEntity;
import com.example.doctorappointment.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/specialty")
@Validated
public class SpecialtyController {
    private final SpecialtyService service;


    @GetMapping("/all")
    ResponseEntity<Message> getSpecialties() {
        List<SpecialtyReadDTO> data = service.getAll();
        if (data.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "get data successfull", data));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message(new Date(), "failed", "data is not created !!", ""));
    }
    @Procedure(MediaType.APPLICATION_JSON_VALUE)
    @PostMapping(value="/create", consumes={"application/json"})
    public ResponseEntity<Message> createSpecialty(@RequestBody SpecialtyEntity specialty) {
        return service.existsByName(specialty.getName()) == false ?
                ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "create specialty successfull", service.createSpecialty(specialty)))
                :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message(new Date(), "failed", "name is exitis !!", ""));
    }

    // build get employee by id REST API
    @GetMapping("/{id}")
    public ResponseEntity<Message> getEmployeeById(@PathVariable int id) {
        SpecialtyEntity data = service.getById(id);
        return data != null ?
                ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "create specialty successfull", data))
                :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Message(new Date(), "failed", "not fond specialty with id !!", ""));
    }

    // build update employee REST API
    @PutMapping("/{id}")
    public ResponseEntity<Message> updateEmployee(@PathVariable int id, @RequestBody SpecialtyEntity specialty) {
        return
                ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "update specialty successfull", service.updateSpecialty(id, specialty)));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteEmployee(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "update specialty successfull", service.deleteSpecialty(id)));
    }

}
