package khai.file_service.service;

import khai.file_service.dto.response.FileData;
import khai.file_service.dto.response.FileMgmtResponse;
import khai.file_service.entity.FileMgmt;
import khai.file_service.exception.AppException;
import khai.file_service.exception.ErrorCode;
import khai.file_service.mapper.FileMGmtMapper;
import khai.file_service.repository.FileMgmtRepository;
import khai.file_service.repository.FileRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.io.Resource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileService {
    FileMgmtRepository fileMgmtRepository;
    FileRepository fileRepository;
    FileMGmtMapper mapper;


    public FileMgmtResponse upload(MultipartFile file) throws IOException {
        //Store file
        var fileInfo = fileRepository.store(file);
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        //Create file
        var fileMgmt = mapper.toFileMgmt(fileInfo);
        fileMgmt.setOwnedID(userId);
        fileMgmt = fileMgmtRepository.save(fileMgmt);

        return FileMgmtResponse.builder()
                .originalFileName(file.getOriginalFilename())
                .url(fileInfo.getUrl())
                .build();
    }
    public FileData download (String fileName) throws IOException {
        var fileMgmt = fileMgmtRepository.findById(fileName)
                .orElseThrow(()->new AppException(ErrorCode.FILE_NOT_FOUND));
        var resource = fileRepository.read(fileMgmt);

        return new FileData(fileMgmt.getContentType(),resource);

    }
}
