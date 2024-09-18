import React, { useEffect, useState } from 'react';
import "./postUser.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from 'react-router-dom';


const LeaveUser = () => {
    const { id } = useParams(); // React hook
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        leaveType:"",
        leaves:"",
    });

    useEffect(() => {
      console.log(`Fetching employee data for ID: ${id}`);
      const fetchEmployee = async () => {
        try {
          const response = await fetch(`http://localhost:8080/getEmployee/${id}`);
          const data = await response.json();
          setFormData(data); // Populate form with fetched data
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
            <h1>Employee Leave Board</h1>
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
  <Form.Group className="mb-3" controlId="formBasicLeaveType">
  <Form.Label>Select Leave Type</Form.Label>
  <Form.Select
    name="leaveType"
    value={formData.leaveType}
    onChange={handleInputChange}
  >
    <option value="">Leave Types</option> 
    <option value="Sick">Sick Leave</option>
    <option value="Casual">Casual Leave</option>
    <option value="Study">Study Leave (Educational Leave)</option>
    
  </Form.Select>
</Form.Group> 
                <Form.Group className="mb-3" controlId="formBasicLeaves">
                    <Form.Control
                        type="text"
                        placeholder="No of leaves"
                        name="leaves"
                        // value={formData.leaves} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Edit Employee
                </Button>
            </form>
        </div>
    );
};

export default LeaveUser;
