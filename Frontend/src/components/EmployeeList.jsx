import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const username = localStorage.getItem('username') || 'Admin';

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/employees', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setEmployees(employees.filter(employee => employee._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TopBar/>
      <div className="employee-list">
      <main>
        <h1>Employee List</h1>
        <div className="employee-actions">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/create-employee" className="create-employee-btn">Create Employee</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  {employee.image && (
                    <img src={`http://localhost:5000/${employee.image}`} alt={employee.name} className="employee-image" />
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(', ')}</td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  <Link to={`/employees/${employee._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    </div>
  );
}

export default EmployeeList;