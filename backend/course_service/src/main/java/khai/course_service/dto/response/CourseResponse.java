package khai.course_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseResponse {
    String id;
    String courseName;
    String description;
    String author;
    List<String> videoFiles; // List of video filenames
    String thumbnailUrl;
    int duration;
    String category;
    String level;
    double rating;
    int reviewCount;
    Instant createdDate;
    Instant modifiedDate;
    String created; // formatted date
    boolean isPublished;
}