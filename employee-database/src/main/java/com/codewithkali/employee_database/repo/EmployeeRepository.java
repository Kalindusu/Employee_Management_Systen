package com.codewithkali.employee_database.repo;

import com.codewithkali.employee_database.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {


    static Optional<Employee> findByEmail(String email) {
        return null;
    }
}
