package com.example.first_pj.mapper;

import com.example.first_pj.dto.request.ProfileCreationRequest;
import com.example.first_pj.dto.request.UserCreationRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-31T15:39:18+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        ProfileCreationRequest.ProfileCreationRequestBuilder profileCreationRequest = ProfileCreationRequest.builder();

        profileCreationRequest.birthday( request.getBirthday() );
        profileCreationRequest.city( request.getCity() );
        profileCreationRequest.firstName( request.getFirstName() );
        profileCreationRequest.lastName( request.getLastName() );

        return profileCreationRequest.build();
    }
}
