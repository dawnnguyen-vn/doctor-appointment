package com.example.doctorappointment.controller.enpointAPI;

import com.example.doctorappointment.entity.ImageEntity;
import com.example.doctorappointment.repository.ImageRepo;
import com.example.doctorappointment.utility.ImageUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "${APIVersion}/image")
public class ImageController {

    @Autowired
    ImageRepo imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {
        if(imageRepository.findByName(file.getOriginalFilename())==null) {
            imageRepository.save(new ImageEntity(0l, file.getOriginalFilename(), file.getContentType(), ImageUtility.compressImage(file.getBytes())));
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ImageUploadResponse("Image uploaded successfully: " +
                            file.getOriginalFilename()));
        }else{
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY)
                    .body(new ImageUploadResponse("image upload failed: " +
                            file.getOriginalFilename()));
        }
    }

    @GetMapping(path = {"/get/info/{name}"})
    public ImageEntity getImageDetails(@PathVariable("name") String name) throws IOException {

        final ImageEntity dbImage = imageRepository.findByName(name);

        return new ImageEntity(dbImage.getId(),dbImage.getName(),dbImage.getType(),ImageUtility.decompressImage(dbImage.getImage()));
    }

    @GetMapping(path = {"/get/{name}"})
    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {

        final ImageEntity dbImage = imageRepository.findTop1ByName(name);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.getType()))
                .body(ImageUtility.decompressImage(dbImage.getImage()));
    }


//
//    @PostMapping("/upload")
//    public ResponseEntity<?> handleFileUpload( @RequestParam("file") MultipartFile file ) {
//
//        String fileName = file.getOriginalFilename();
//        try {
//            file.transferTo( new File("C:\\Users\\Dung\\Documents\\GitHub\\doctor-appointment\\backend\\file_upload\\" + fileName));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//        return ResponseEntity.ok("File uploaded successfully.");
//    }

}
