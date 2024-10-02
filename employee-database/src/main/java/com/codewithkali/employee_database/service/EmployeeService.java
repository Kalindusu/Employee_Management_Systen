package com.codewithkali.employee_database.service;

import com.codewithkali.employee_database.dto.EmployeeDTO;
import com.codewithkali.employee_database.entity.Employee;
import com.codewithkali.employee_database.repo.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ModelMapper modelMapper;

  //save user
    public EmployeeDTO saveUser(EmployeeDTO employeeDTO){
        employeeRepository.save(modelMapper.map(employeeDTO,Employee.class));
        return employeeDTO;
    }

    public void deleteUser(Long id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee with ID" + id + "not found");
        }
        employeeRepository.deleteById(id);
    }

    //view user
    public Employee getEmployeeById(Long id){
        return  employeeRepository.findById(id).orElse(null);
    }


    public Employee updateEmployee(Long id,Employee employee){
        Optional<Employee> optionalEmployee=employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            Employee existingEmployee=optionalEmployee.get();

            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setLeaves(employee.getLeaves());
            existingEmployee.setLeaveType(employee.getLeaveType());

            return  employeeRepository.save(existingEmployee);
        }
        return null;
    }






}
