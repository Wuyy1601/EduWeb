package khai.profile_service.controller;

import khai.profile_service.dto.ApiResponse;
import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class InternalUserProfileController {

UserProfileService userProfileService;
    @PostMapping("/internal/users")
    ApiResponse<UserProfileResponse> createProfile(@RequestBody UserProfileRequest request) {
        return ApiResponse.<UserProfileResponse>builder()
                .result(userProfileService.createProfile(request))
                .build();
    }
}
