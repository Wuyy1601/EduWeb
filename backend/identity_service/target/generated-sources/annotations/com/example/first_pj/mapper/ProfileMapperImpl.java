package com.example.first_pj.mapper;

import com.example.first_pj.dto.request.ProfileCreationRequest;
import com.example.first_pj.dto.request.UserCreationRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T14:20:43+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        ProfileCreationRequest.ProfileCreationRequestBuilder profileCreationRequest = ProfileCreationRequest.builder();

        profileCreationRequest.lastName( request.getLastName() );
        profileCreationRequest.firstName( request.getFirstName() );
        profileCreationRequest.birthday( request.getBirthday() );
        profileCreationRequest.city( request.getCity() );

        return profileCreationRequest.build();
    }
}
