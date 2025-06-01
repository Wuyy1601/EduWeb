package khai.course_service.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(value = "course")
public class Course {
    @MongoId
    String id;
    String courseName;
    String description;
    String author;
    List<String> videoFiles;
    String thumbnailUrl;
    int duration; // in minutes
    String category;
    String level; // beginner, intermediate, advanced
    double rating;
    int reviewCount;
    Instant createdDate;
    Instant modifiedDate;
    boolean isPublished;
}
