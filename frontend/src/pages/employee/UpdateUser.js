import React, { useEffect, useState } from 'react';
import "./postUser.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from 'react-router-dom';


const UpdateUser = () => {
    const { id } = useParams(); // React hook
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
       
    });

    useEffect(() => {
      console.log(`Fetching employee data for ID: ${id}`);
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`http://localhost:8080/getEmployee/${id}`);
          const data = await response.json();
          setFormData(data); 
        } catch (error) {
          console.log("Error fetching employee data:", error);
        }
      };
      fetchEmployee();
    }, [id]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try{
        const response=await fetch(`http://localhost:8080/getEmployee/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        });
        const data=await response.json();
        console.log("Employee updated",data);
        alert("Employee updated sussesfully")
        navigate('/')
        }catch(error){
            alert("Error in updating employee")
            console.log("Error message")
    
        }
      };

    

    return (
        <div className="center-form">
            <h1>Edit Employee</h1>
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
                    <Form.Control
                        type="text"
                        placeholder="Enter Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Save Update
                </Button>
            </form>
        </div>
    );
};

export default UpdateUser;
