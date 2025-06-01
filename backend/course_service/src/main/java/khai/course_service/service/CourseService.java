package khai.course_service.service;

import khai.course_service.dto.PageResponse;
import khai.course_service.dto.request.CourseRequest;
import khai.course_service.dto.response.CourseResponse;

import khai.course_service.entity.Course;
import khai.course_service.exception.AppException;
import khai.course_service.exception.ErrorCode;
import khai.course_service.mapper.CourseMapper;
import khai.course_service.repository.CourseRepository;
import khai.course_service.repository.httpclient.FileClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;

import java.util.ArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseService {
    DateTimeFormatter dateTimeFormatter;
    CourseRepository courseRepository;
    CourseMapper courseMapper;
    FileClient fileClient;

    @PreAuthorize("hasRole('ADMIN')")
    public CourseResponse updateCourseThumbnail(String courseId ,MultipartFile file) {
        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        var response = fileClient.uploadThumbnail(file);

        course.setThumbnailUrl(response.getResult().getUrl());
        course.setModifiedDate(Instant.now());

        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CourseResponse addVideoToCourse(String courseId, MultipartFile file) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        if (fileClient != null) {
            var response = fileClient.uploadVideo(file);

            // Initialize videoFiles list if null
            if (course.getVideoFiles() == null) {
                course.setVideoFiles(new ArrayList<>());
            }

            // Add video URL to list if not exists
            String videoUrl = response.getResult().getUrl();
            if (!course.getVideoFiles().contains(videoUrl)) {
                course.getVideoFiles().add(videoUrl);
            }
        } else {
            log.warn("FileClient is not available");
        }

        course.setModifiedDate(Instant.now());
        return courseMapper.toCourseResponse(courseRepository.save(course));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CourseResponse removeVideoFromCourse(String courseId, String videoUrl) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        var course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        if (course.getVideoFiles() != null) {
            course.getVideoFiles().remove(videoUrl);
            course.setModifiedDate(Instant.now());
            course = courseRepository.save(course);
        }

        return courseMapper.toCourseResponse(course);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CourseResponse createCourse(CourseRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Course course = Course.builder()
                .courseName(request.getCourseName())
                .description(request.getDescription())
                .author(authentication.getName())
                .videoFiles(new ArrayList<>())
                .duration(request.getDuration())
                .category(request.getCategory())
                .level(request.getLevel())
                .rating(0.0) // Default rating
                .reviewCount(0) // Default review count
                .createdDate(Instant.now())
                .modifiedDate(Instant.now())
                .isPublished(true) // Default to not published
                .build();

        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    public CourseResponse getCourseById(String courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        var courseResponse = courseMapper.toCourseResponse(course);
        courseResponse.setCreated(dateTimeFormatter.format(course.getCreatedDate()));

        return courseResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public CourseResponse updateCourse(String courseId, CourseRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        courseMapper.updateFromRequest(course, request);
        course.setModifiedDate(Instant.now());

        course = courseRepository.save(course);
        return courseMapper.toCourseResponse(course);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCourse(String courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND));

        courseRepository.delete(course);
    }

    public PageResponse<CourseResponse> getAllCourses(int page, int size) {
        Sort sort = Sort.by("createdDate").descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        var pageData = courseRepository.findAll(pageable);

        var courseList = pageData.getContent().stream().map(course -> {
            var courseResponse = courseMapper.toCourseResponse(course);
            courseResponse.setCreated(dateTimeFormatter.format(course.getCreatedDate()));
            return courseResponse;
        }).toList();

        return PageResponse.<CourseResponse>builder()
                .currentPages(page)
                .pageSize(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .data(courseList)
                .build();
    }
}
