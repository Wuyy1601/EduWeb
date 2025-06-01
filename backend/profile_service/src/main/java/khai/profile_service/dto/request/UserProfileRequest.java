package khai.profile_service.dto.request;

import java.time.LocalDate;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProfileRequest {
    String userId;
    String username;
    String firstName;
    String lastName;
    LocalDate birthday;
    String city;
}
