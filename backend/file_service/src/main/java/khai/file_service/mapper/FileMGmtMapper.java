package khai.file_service.mapper;

import khai.file_service.dto.FileInfo;
import khai.file_service.entity.FileMgmt;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FileMGmtMapper {
    @Mapping(target = "id",source = "name")
    FileMgmt toFileMgmt(FileInfo fileInfo);
}
