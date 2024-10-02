package com.codewithkali.employee_database.controller;

import com.codewithkali.employee_database.Request.LoginRequest;
import com.codewithkali.employee_database.dto.EmployeeDTO;
import com.codewithkali.employee_database.entity.Employee;
import com.codewithkali.employee_database.repo.EmployeeRepository;
import com.codewithkali.employee_database.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@Controller

@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getEmployee")
    List<Employee> getAllUsers(){
    return employeeRepository.findAll();
}

    @PostMapping("/saveEmployee")
    public EmployeeDTO saveUser(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.saveUser(employeeDTO);
    }
   //delete User
    @DeleteMapping("/getEmployee/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        try{
            employeeService.deleteUser(id);
            return  new ResponseEntity<>("Employee with ID " + id + "deleted successfully", HttpStatus.OK);
    }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }}
@GetMapping("/getEmployee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        Employee employee =employeeService.getEmployeeById(id);
        if(employee==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }

@PutMapping("/getEmployee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,@RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(id,employee);

        if(updatedEmployee==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updatedEmployee);
    }
//    @PostMapping("/login")
//    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO){
//        LoginMessage loginMessage=employeeService.loginEmployee(loginDTO);
//        return ResponseEntity.ok(loginMessage);
//    }

    @PostMapping("/login")
    public Boolean loginUser(@RequestBody LoginRequest loginRequest){
        return  employeeService.loginUser(loginRequest);
    }


}
