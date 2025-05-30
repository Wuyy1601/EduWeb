package khai.file_service.repository;

import khai.file_service.dto.FileInfo;
import khai.file_service.entity.FileMgmt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Repository;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Repository
public class FileRepository {
    @Value("${app.file.storage-dir}")
    String storageDir;
    @Value(("${app.file.download-prefix}"))
    String downloadPrefix;

    public FileInfo store(MultipartFile multipartFile) throws IOException {


        Path folder = Paths.get(storageDir);
        String urlPrefix = downloadPrefix;

        String fileExtension = StringUtils
                .getFilenameExtension(multipartFile.getOriginalFilename());
        String fileName = Objects.isNull(fileExtension)
                ? UUID.randomUUID().toString()
                : UUID.randomUUID().toString() + "." + fileExtension;
        Path filePath = folder.resolve(fileName).normalize().toAbsolutePath();

        Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return FileInfo.builder()
                .name(fileName)
                .size(multipartFile.getSize())
                .contentType(multipartFile.getContentType())
                .md5CheckSum(DigestUtils.md5DigestAsHex(multipartFile.getInputStream()))
                .path(filePath.toString())
                .url(urlPrefix + fileName   )
                .build();

    }
    public Resource read (FileMgmt fileMgmt) throws IOException {
        var data = Files.readAllBytes(Path.of(fileMgmt.getPath()));
        return new ByteArrayResource(data);
    }
}
