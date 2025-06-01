package khai.course_service.controller;

import khai.course_service.dto.ApiResponse;
import khai.course_service.dto.PageResponse;
import khai.course_service.dto.request.CourseRequest;
import khai.course_service.dto.response.CourseResponse;
import khai.course_service.service.CourseService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CourseController {
        CourseService courseService;

        @PostMapping("/create")
        ApiResponse<CourseResponse> createCourse(@RequestBody CourseRequest request) {
                return ApiResponse.<CourseResponse>builder()
                                .result(courseService.createCourse(request))
                                .build();
        }

        @GetMapping("/all")
        ApiResponse<PageResponse<CourseResponse>> getAllCourses(
                        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                        @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
                return ApiResponse.<PageResponse<CourseResponse>>builder()
                                .result(courseService.getAllCourses(page, size))
                                .build();
        }

        @GetMapping("/{courseId}")
        ApiResponse<CourseResponse> getCourse(@PathVariable String courseId) {
                return ApiResponse.<CourseResponse>builder()
                                .result(courseService.getCourseById(courseId))
                                .build();
        }

        @PutMapping("/{courseId}")
        ApiResponse<CourseResponse> updateCourse(
                        @PathVariable String courseId,
                        @RequestBody CourseRequest request) {
                return ApiResponse.<CourseResponse>builder()
                                .result(courseService.updateCourse(courseId, request))
                                .build();
        }

        @DeleteMapping("/{courseId}")
        ApiResponse<Void> deleteCourse(@PathVariable String courseId) {
                courseService.deleteCourse(courseId);
                return ApiResponse.<Void>builder().build();
        }

        @PutMapping("/{courseId}/upload-thumbnail")
        public ResponseEntity<ApiResponse<CourseResponse>> uploadThumbnail(
                        @PathVariable String courseId,
                        @RequestParam("thumbnail") MultipartFile thumbnail) {

                CourseResponse response = courseService.updateCourseThumbnail(courseId, thumbnail);
                return ResponseEntity.ok(ApiResponse.<CourseResponse>builder()
                                .result(response)
                                .build());
        }

        @PutMapping("/{courseId}/upload-video")
        public ResponseEntity<ApiResponse<CourseResponse>> uploadVideo(
                        @PathVariable String courseId,
                        @RequestParam("video") MultipartFile video) {

                CourseResponse response = courseService.addVideoToCourse(courseId, video);
                return ResponseEntity.ok(ApiResponse.<CourseResponse>builder()
                                .result(response)
                                .build());
        }

}