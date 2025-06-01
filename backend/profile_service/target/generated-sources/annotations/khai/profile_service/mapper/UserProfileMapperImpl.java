package khai.profile_service.mapper;

import javax.annotation.processing.Generated;
import khai.profile_service.dto.request.UpdateProfileRequest;
import khai.profile_service.dto.request.UserProfileRequest;
import khai.profile_service.dto.response.UserProfileResponse;
import khai.profile_service.entity.UserProfile;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toUserProfile(UserProfileRequest request) {
        if ( request == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.userId( request.getUserId() );
        userProfile.firstName( request.getFirstName() );
        userProfile.lastName( request.getLastName() );
        userProfile.birthday( request.getBirthday() );
        userProfile.city( request.getCity() );

        return userProfile.build();
    }

    @Override
    public UserProfileResponse toUserProfileResponse(UserProfile entity) {
        if ( entity == null ) {
            return null;
        }

        UserProfileResponse.UserProfileResponseBuilder userProfileResponse = UserProfileResponse.builder();

        userProfileResponse.id( entity.getId() );
        userProfileResponse.avatar( entity.getAvatar() );
        userProfileResponse.firstName( entity.getFirstName() );
        userProfileResponse.lastName( entity.getLastName() );
        userProfileResponse.birthday( entity.getBirthday() );
        userProfileResponse.city( entity.getCity() );

        return userProfileResponse.build();
    }

    @Override
    public void update(UserProfile entity, UpdateProfileRequest request) {
        if ( request == null ) {
            return;
        }

        entity.setFirstName( request.getFirstName() );
        entity.setLastName( request.getLastName() );
        entity.setBirthday( request.getBirthday() );
        entity.setCity( request.getCity() );
    }
}
