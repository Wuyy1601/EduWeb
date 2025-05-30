package khai.file_service.controller;

import khai.file_service.dto.ApiResponse;
import khai.file_service.service.FileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
public class FileController {
    FileService fileService;

    @PostMapping("/media/upload")
    ApiResponse<Object> uploadMedia(@RequestParam("file")MultipartFile multipartFile) throws IOException {
        return ApiResponse.builder()
                .result(fileService.upload(multipartFile))
                .build();

    }
}
