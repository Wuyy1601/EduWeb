package khai.course_service.repository.httpclient;

import khai.course_service.configuration.AuthenticationRequestInterceptor;
import khai.course_service.dto.ApiResponse;
import khai.course_service.dto.response.FileMgmtResponse;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "file-service", url = "${app.services.file}",configuration = {AuthenticationRequestInterceptor.class})
public interface FileClient {

    @PostMapping(value = "/media/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<FileMgmtResponse> uploadThumbnail(@RequestPart("file") MultipartFile file);

    @PostMapping(value = "/media/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<FileMgmtResponse> uploadVideo(@RequestPart("file") MultipartFile file);
}