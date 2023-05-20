import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    department: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/employees')
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/employees/create', newEmployee)
      .then((response) => {
        setEmployees([...employees, response.data.data]);
        setNewEmployee({
          first_name: '',
          last_name: '',
          department: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (employeeId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee? This will also delete all tasks associated with the employee.'
    );
    if (confirmDelete) {
      axios
        .get(`http://localhost:8080/employees/${employeeId}`)
        .then((response) => {
          response.data.data.tasks.forEach((task) => {
            axios.delete(`http://localhost:8080/tasks/${task.id}`);
          });
          axios.delete(`http://localhost:8080/employees/${employeeId}`)
            .then(() => {
              setEmployees(employees.filter((employee) => employee.id !== employeeId));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.department}</td>
              <td>
                <Link to={`/employees/${employee.id}`}>Details</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type='text'
            name='first_name'
            value={newEmployee.first_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type='text'
            name='last_name'
            value={newEmployee.last_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type='text'
            name='department'
            value={newEmployee.department}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default EmployeeList;