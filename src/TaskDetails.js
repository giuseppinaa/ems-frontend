import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TaskDetails = () => {
	const [task, setTask] = useState({});
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [completed, setCompleted] = useState(false);
	const [employeeId, setEmployeeId] = useState('');
	const [employee, setEmployee] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8080/tasks/${id}`)
			.then((response) => {
				setTask(response.data.data);
				setDescription(response.data.data.description);
				setPriority(response.data.data.priority);
				setCompleted(response.data.data.completed);
				setEmployeeId(response.data.data.employee_id);
			})
			.catch((error) => {
				console.log(error);
			});

		if (employeeId) {
			axios
				.get(`http://localhost:8080/employees/${employeeId}`)
				.then((response) => {
					setEmployee(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [id, employeeId]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.put(`http://localhost:8080/tasks/${id}`, {
				description: description,
				priority: priority,
				completed: completed,
				employee_id: employeeId,
			})
			.then((response) => {
				setTask(response.data.data);
				setIsEditing(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h1>Task Details</h1>
			<p>ID: {task.id}</p>
			{isEditing ? (
				<form onSubmit={handleSubmit}>
					<label>
						Description:
						<input
							type='text'
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</label>
					<br />
					<label>
						Priority:
						<input
							type='text'
							value={priority}
							onChange={(event) => setPriority(event.target.value)}
						/>
					</label>
					<br />
					<label>
						Completed:
						<input
							type='checkbox'
							checked={completed}
							onChange={(event) => setCompleted(event.target.checked)}
						/>
					</label>
					<br />
					<label>
						Employee ID: {employeeId}
					</label>
					<br />
					<button type='submit'>Save</button>
				</form>
			) : (
				<div>
					<p>Description: {task.description}</p>
					<p>Priority: {task.priority}</p>
					<p>Completed: {task.completed ? 'Yes' : 'No'}</p>
					{employee.id ? (
						<div>
							<h2>Employee:</h2>
							<p>
								<Link to={`/employees/${employee.id}`}>
									{employee.first_name} {employee.last_name}
								</Link>
							</p>
						</div>
					) : (
						<p>No employee assigned to this task.</p>
					)}
					<button onClick={handleEdit}>Edit</button>
				</div>
			)}
		</div>
	);
};

export default TaskDetails;
