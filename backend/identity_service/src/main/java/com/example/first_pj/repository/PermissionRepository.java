package com.example.first_pj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.first_pj.entity.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
}