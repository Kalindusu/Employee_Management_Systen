import React, { useState } from "react";
import "./postUser.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
  const [formData, setFormData] = useState({

    id:"",
    name: "",
    email: "",
    phone: "",
    department: "",
    
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
const response=await fetch("http://localhost:8080/saveEmployee",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(formData)
});

const data=await response.json();
console.log("Employee created",data);
alert("Employee created sussesfully")
navigate("/")
    }catch(error){
        alert("Error in adding employee")
        console.log("Error message")

    }
  };
  return (
    <div className="center-form">
      <h1>Post Employee</h1>
      <form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Control
            type="text"
            placeholder="Enter Contact No"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDepartment">
        <Form.Label>Department</Form.Label>
          <Form.Select
            type="text"
            placeholder="Enter Department"
            name="department"
            value={formData.department}
           onChange={handleInputChange} >
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Accountant">Accountant</option>
    </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Post Employee
        </Button>
      </form>
    </div>
  );
};

export default PostUser;
