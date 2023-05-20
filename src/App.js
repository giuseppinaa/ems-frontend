import { BrowserRouter, Route, Link } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import TaskList from './TaskList';
import TaskDetails from './TaskDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>

        <Route exact path={["/employees", "/"]} component={EmployeeList} />
        <Route exact path="/employees/:id" component={EmployeeDetails} />
        <Route exact path="/tasks" component={TaskList} />
        <Route exact path="/tasks/:id" component={TaskDetails} />
      </div>
    </BrowserRouter>
  );
}

export default App;