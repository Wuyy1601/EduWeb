package khai.profile_service.mapper;

import javax.annotation.processing.Generated;
import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.entity.UserProfile;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-30T00:43:48+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(UserProfileRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.city( request.getCity() );
        userProfile.dob( request.getDob() );
        userProfile.firstName( request.getFirstName() );
        userProfile.id( request.getId() );
        userProfile.lastName( request.getLastName() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileResponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.city( entity.getCity() );
        userProfileResponse.dob( entity.getDob() );
        userProfileResponse.firstName( entity.getFirstName() );
        userProfileResponse.lastName( entity.getLastName() );
        userProfileResponse.userId( entity.getUserId() );

        return userProfileResponse.build();
    }
}
