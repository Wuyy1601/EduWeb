package khai.file_service.controller;

import khai.file_service.dto.ApiResponse;
import khai.file_service.dto.response.FileMgmtResponse;
import khai.file_service.repository.FileRepository;
import khai.file_service.service.FileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
public class FileController {
    FileService fileService;
    FileRepository fileRepository;

    @PostMapping("/media/upload")
    ApiResponse<FileMgmtResponse> uploadMedia(@RequestParam("file")MultipartFile multipartFile) throws IOException {
        return ApiResponse.<FileMgmtResponse>builder()
                .result(fileService.upload(multipartFile))
                .build();

    }
        @GetMapping("/media/download/{fileName}")
    ResponseEntity<Resource> downloadMedia(@PathVariable String fileName) throws IOException {
        var fileData = fileService.download(fileName);
        return ResponseEntity.<Resource>ok()
                .header(HttpHeaders.CONTENT_TYPE,fileData.contentType())
                .body(fileData.resource());

    }
}
