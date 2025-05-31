package khai.file_service.mapper;

import javax.annotation.processing.Generated;
import khai.file_service.dto.FileInfo;
import khai.file_service.entity.FileMgmt;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class FileMGmtMapperImpl implements FileMGmtMapper {

    @Override
    public FileMgmt toFileMgmt(FileInfo fileInfo) {
        if ( fileInfo == null ) {
            return null;
        }

        FileMgmt.FileMgmtBuilder fileMgmt = FileMgmt.builder();

        fileMgmt.id( fileInfo.getName() );
        fileMgmt.contentType( fileInfo.getContentType() );
        fileMgmt.md5CheckSum( fileInfo.getMd5CheckSum() );
        fileMgmt.path( fileInfo.getPath() );
        fileMgmt.size( fileInfo.getSize() );

        return fileMgmt.build();
    }
}
