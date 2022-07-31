package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.Message;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.search.SearchInputDTO;
import com.example.doctorappointment.DTO.search.SearchOutputDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.service.DoctorService;
import com.example.doctorappointment.service.SearchService;
import com.example.doctorappointment.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/search")
public class SearchController {

    @Autowired
    private SearchService service;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private SpecialtyService specialtyService;

    @GetMapping("/getDoctors")
    public ResponseEntity<List<DoctorReadDTO>> getDoctors(){

        return ResponseEntity.ok().body(doctorService.findTop5());
    }
    @GetMapping("/getSpecialties")
    public ResponseEntity<List<SpecialtyReadDTO>> getSpecialties(){

        return ResponseEntity.ok().body(specialtyService.findTop5());
    }

    @GetMapping("/getAll")
    public ResponseEntity<SearchOutputDTO> getAll(){
        return ResponseEntity.ok().body(service.search());
    }

    @PostMapping("/search")
    public ResponseEntity<Message> search(@RequestBody SearchInputDTO systom){
        systom.removeNonKeywords();
        System.out.println(systom.getInput());
        SearchOutputDTO result = service.search("%"+systom.getInput()+"%");
        if(result!=null)
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(),"ok","update successful",result));
        else
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(),"ok","empty",null));
    }


}
