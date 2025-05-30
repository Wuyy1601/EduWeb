package khai.file_service.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "fileMgmt")
public class FileMgmt {
    @MongoId
    String id;
    String contentType;
    Long size;
    String md5CheckSum;
    String path;
    String ownedID;

}
