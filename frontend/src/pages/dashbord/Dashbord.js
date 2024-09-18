import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashbord = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/getEmployee");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;
    
    try {
      const response = await fetch(`http://localhost:8080/getEmployee/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setEmployees(employees.filter(employee => employee.id !== id));
        console.log("Employee deleted successfully");
      } else {
        alert("Failed to delete employee");
        console.log("Failed to delete employee");
      }
    } catch (error) {
      console.log("Error during deletion:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-center mb-4">Employees</h1>
        </Col>
        <Col xs={12}>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>No of Leaves</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>{employee.leaves}</td>
                  <td>
                    <Link to={`/viewuser/${employee.id}`} className="btn btn-outline-primary btn-sm mx-2">View</Link>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => handleUpdate(employee.id)} 
                      className="mx-2"
                    >
                      Update
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(employee.id)} 
                      className="mx-2"
                    >
                      Delete
                    </Button>
                    <Link to={`/leaveuser/${employee.id}`} className="btn btn-outline-primary btn-sm mx-2">Leaves</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashbord;
