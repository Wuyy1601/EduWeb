package com.example.first_pj.mapper;

import com.example.first_pj.dto.request.ProfileCreationRequest;
import com.example.first_pj.dto.request.UserCreationRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request);
}
