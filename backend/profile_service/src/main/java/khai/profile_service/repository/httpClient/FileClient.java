package khai.profile_service.repository.httpClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import khai.profile_service.configuration.AuthenticationRequestInterceptor;
import khai.profile_service.dto.ApiResponse;
import khai.profile_service.dto.response.FileMgmtResponse;

@FeignClient(
        name = "file-service",
        url = "http://localhost:8083",
        configuration = {AuthenticationRequestInterceptor.class})
public interface FileClient {
    @PostMapping(value = "/file/media/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<FileMgmtResponse> uploadMedia(@RequestPart("file") MultipartFile file);
}
