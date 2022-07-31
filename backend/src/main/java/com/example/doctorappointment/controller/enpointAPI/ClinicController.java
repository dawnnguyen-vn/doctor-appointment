package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.DTO.Message;
import com.example.doctorappointment.DTO.clinic.ClinicDTO;
import com.example.doctorappointment.DTO.clinic.ClinicReadDTO;
import com.example.doctorappointment.DTO.doctor.DoctorReadDTO;
import com.example.doctorappointment.DTO.specialty.SpecialtyReadDTO;
import com.example.doctorappointment.entity.ClinicEntity;
import com.example.doctorappointment.service.ClinicService;
import com.example.doctorappointment.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/clinic")
public class ClinicController {

    private final ClinicService clinicService;
    private final SpecialtyService specialtyService;

    @GetMapping("/all")
    public ResponseEntity<List<ClinicReadDTO>> getAll() {
        return ResponseEntity.ok().body(clinicService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicReadDTO> getById(@PathVariable int id){
        if(clinicService.getById(id)!=null){
            return ResponseEntity.ok().body(clinicService.getById(id));
        }
        return null;
    }
    @GetMapping("/getByAdminId/{id}")
    public ResponseEntity<ClinicReadDTO> getByAdminId(@PathVariable int id){
        if(clinicService.getById(id)!=null){
            return ResponseEntity.ok().body(clinicService.getByAdminId(id));
        }
        return null;
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteById(@PathVariable int id){
        if(clinicService.getById(id)!=null){
            clinicService.deleteClinic(id);
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "delete specialty successfull", id ));
        }
        return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(new Message(new Date(), "failed", "not fond specialty with id "+id, id ));
    }

    @PostMapping("/create")
    public ResponseEntity<Message> createClinic(@RequestBody ClinicDTO clinicDTO){
        if(!clinicService.exitsByName(clinicDTO.getName())){
            return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "create clinic successfull", clinicService.createClinic(clinicDTO) ));
        }
        return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(new Message(new Date(), "failed", "exists clinic with name" + clinicDTO.getName(), clinicDTO.getName() ));
    }

    @GetMapping("/getSpecialties/{id}")
    public ResponseEntity<Message> getSpecialties(@PathVariable int id){
        if(clinicService.getById(id)!=null){
            List<SpecialtyReadDTO> specialties = specialtyService.getAllByClinicId(id);
            if(specialties!=null&&specialties.size()>0){
                return ResponseEntity.status(HttpStatus.OK).body(new Message(new Date(), "OK", "get specialties is successfull",specialties));
            }else{
                return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(new Message(new Date(), "failed", "specialties is null" ,null));
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Message(new Date(), "failed", "not fond specialty with id "+id, id));

    }

}
