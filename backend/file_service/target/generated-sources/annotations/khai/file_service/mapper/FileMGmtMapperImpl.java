package khai.file_service.mapper;

import javax.annotation.processing.Generated;
import khai.file_service.dto.FileInfo;
import khai.file_service.entity.FileMgmt;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
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
        fileMgmt.size( fileInfo.getSize() );
        fileMgmt.md5CheckSum( fileInfo.getMd5CheckSum() );
        fileMgmt.path( fileInfo.getPath() );

        return fileMgmt.build();
    }
}
