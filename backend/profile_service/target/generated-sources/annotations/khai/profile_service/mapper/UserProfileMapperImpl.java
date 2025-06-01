package khai.profile_service.mapper;

import javax.annotation.processing.Generated;
import khai.profile_service.dto.request.UpdateProfileRequest;
import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.entity.UserProfile;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(UserProfileRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.birthday( request.getBirthday() );
        userProfile.city( request.getCity() );
        userProfile.firstName( request.getFirstName() );
        userProfile.lastName( request.getLastName() );
        userProfile.userId( request.getUserId() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileResponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.avatar( entity.getAvatar() );
        userProfileResponse.birthday( entity.getBirthday() );
        userProfileResponse.city( entity.getCity() );
        userProfileResponse.firstName( entity.getFirstName() );
        userProfileResponse.id( entity.getId() );
        userProfileResponse.lastName( entity.getLastName() );

        return userProfileResponse.build();
    }

    @Override
    public void update(UserProfile entity, UpdateProfileRequest request) {
        if ( request == null ) {
            return;
        }

        entity.setBirthday( request.getBirthday() );
        entity.setCity( request.getCity() );
        entity.setFirstName( request.getFirstName() );
        entity.setLastName( request.getLastName() );
    }
}
