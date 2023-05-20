import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/employees/${id}`)
      .then(response => {
        setEmployee(response.data.data);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setDepartment(response.data.data.department);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/employees/${id}`, {
      first_name: firstName,
      last_name: lastName,
      department: department
    })
      .then(response => {
        setEmployee(response.data.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <p>ID: {employee.id}</p>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </label>
          <br />
          <label>
            Department:
            <input type="text" value={department} onChange={(event) => setDepartment(event.target.value)} />
          </label>
          <br />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>First Name: {employee.first_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>Department: {employee.department}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      <h2>Tasks:</h2>
      {employee.tasks && employee.tasks.length > 0 ? (
        <ul>
          {employee.tasks.map(task => (
            <li key={task.id}>
              <Link to={`/tasks/${task.id}`}>{task.description}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks assigned to this employee.</p>
      )}
      <p>
        <Link to="/employees">Back to Employee List</Link>
      </p>
    </div>
  );
};

export default EmployeeDetails;