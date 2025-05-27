package khai.profile_service.controller;

import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.service.UserProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lombok.AccessLevel.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class UserProfileController {
    UserProfileService userProfileService;

    @GetMapping("/users")
    List<UserProfileResponse> getAllProfiles() {
        return userProfileService.getAllProfiles();
    }

    @GetMapping("/users/{profileId}")
    UserProfileResponse getProfile(@PathVariable String profileId) {
        return userProfileService.getProfile(profileId);
    }
}
