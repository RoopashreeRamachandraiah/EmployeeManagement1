package com.gilad.employee_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gilad.employee_management.model.UserAuthentication;

@Repository
public interface UserSecurityRepository extends JpaRepository<UserAuthentication, String>{
	

}
