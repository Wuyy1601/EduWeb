package com.example.first_pj.mapper;

import com.example.first_pj.dto.request.RoleRequest;
import com.example.first_pj.dto.response.RoleResponse;
import com.example.first_pj.entity.Role;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
