import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: '',
    priority: '',
    completed: false,
    employee_id: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        setTasks(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data.data]);
        setNewTask({
          description: '',
          priority: '',
          completed: false,
          employee_id: ''
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/tasks/${id}`)
        .then(response => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Completed</th>
            <th>Employee ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.completed ? 'Yes' : 'No'}</td>
              <td>{task.employee_id}</td>
              <td>
                <Link to={`/tasks/${task.id}`}>Details</Link>
                {' | '}
                <button onClick={() => handleDelete(task.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" value={newTask.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Priority:
          <input type="number" name="priority" value={newTask.priority} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Completed:
          <input type="checkbox" name="completed" checked={newTask.completed} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Employee ID:
          <input type="text" name="employee_id" value={newTask.employee_id} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TaskList;