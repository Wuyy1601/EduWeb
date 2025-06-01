// file `course_service/src/main/java/khai/course_service/mapper/CourseMapper.java`
package khai.course_service.mapper;

import khai.course_service.dto.request.CourseRequest;
import khai.course_service.dto.response.CourseResponse;
import khai.course_service.entity.Course;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponse toCourseResponse(Course course);

    Course toCourse(CourseRequest request);

    void updateFromRequest(@MappingTarget Course course, CourseRequest request);
}