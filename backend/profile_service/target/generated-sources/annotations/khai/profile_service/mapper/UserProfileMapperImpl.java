package khai.profile_service.mapper;

import javax.annotation.processing.Generated;
import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.entity.UserProfile;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-31T02:44:40+0700",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(UserProfileRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.id( request.getId() );
        userProfile.firstName( request.getFirstName() );
        userProfile.lastName( request.getLastName() );
        userProfile.dob( request.getDob() );
        userProfile.city( request.getCity() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileResponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.userId( entity.getUserId() );
        userProfileResponse.firstName( entity.getFirstName() );
        userProfileResponse.lastName( entity.getLastName() );
        userProfileResponse.dob( entity.getDob() );
        userProfileResponse.city( entity.getCity() );

        return userProfileResponse.build();
    }
}
