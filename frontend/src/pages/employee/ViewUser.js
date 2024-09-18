import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const UpdateUser = () => {
    const { id } = useParams();
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        leaves:"",
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
    
   
    

    

    return (
        <div className="center-form">
            <h1>View Employee</h1>
            <form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="name"
                        value={formData.name}
                        readOnly
                       
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        readOnly
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Control
                        type="text"
                        placeholder="Enter Contact No"
                        name="phone"
                        value={formData.phone}
                        readOnly
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDepartment">
                    <Form.Control
                        type="text"
                        placeholder="Enter Department"
                        name="department"
                        value={formData.department}
                        readOnly
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLeaves">
                    <Form.Control
                        type="text"
                        placeholder="No of leaves"
                        name="leaves"
                        value={"No of leaves : "+formData.leaves}
                        readOnly
                        
                    />
                </Form.Group>
                <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
            </form>
        </div>
    );
};

export default UpdateUser;
