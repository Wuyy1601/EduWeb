package khai.file_service.service;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
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
    public Object upload(MultipartFile multipartFile) throws IOException {

        Path folder = Paths.get("C:\\upload");
        String fileExtension = StringUtils
                .getFilenameExtension(multipartFile.getOriginalFilename());
        String fileName = Objects.isNull(fileExtension)
                ? UUID.randomUUID().toString()
                : UUID.randomUUID().toString() + "." + fileExtension;
        Path filePath =folder.resolve(fileName).normalize().toAbsolutePath();

        Files.copy(multipartFile.getInputStream() ,filePath, StandardCopyOption.REPLACE_EXISTING);
        return  null;

    }
}
