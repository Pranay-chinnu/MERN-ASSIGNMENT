import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TopBar from './TopBar';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: 'Mobile',
    designation: '',
    gender: '',
    course: 'course',
    image: null
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/employees/${id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
          });
          setEmployee(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setEmployee(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setEmployee(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setEmployee(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/employees/${id}`, employee, {
          headers: { 
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      } else {
        await axios.post('http://localhost:3000/api/employees', employee, {
          headers: { 
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
      }
      navigate('/employees');
    } catch (err) {
      console.error(err);
      alert('Error saving employee');
    }
  };

  return (
   <div>
    <TopBar/>
    <div className="employee-form">
      <main>
        <h1>{id ? 'Edit Employee' : 'Create Employee'}</h1>
        <form onSubmit={handleSubmit}>
          <b>Name</b>
          <input 
            type="text" 
            name="name" 
            value={employee.name} 
            onChange={handleChange} 
            placeholder="Name: placeholder" 
            required 
          />
         <b>EMail</b> 
         <input 
            type="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            placeholder="Email: placeholder@example.com" 
            required 
            title="Please enter a valid email address"
          />
          <b>Mobile Number</b>  
           <input style={{margin: 15}}
            type="tel" 
            name="mobile" 
            value={employee.mobile} 
            onChange={handleChange} 
            placeholder="Mobile: 0000000000" 
            required 
            pattern="\d{10}"
            title="Please enter exactly 10 digits"
          />
          {error && <div className="error-message">{error}</div>}

          <div className="row">
            <b>Designation</b>
            <select name="designation" value={employee.designation} onChange={handleChange} required>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>

            <div className="gender">
              <label>
                <b>Gender</b> <p></p><input 
                  type="radio" 
                  name="gender" 
                  value="Male" 
                  checked={employee.gender === 'Male'} 
                  onChange={handleChange} 
                  required 
                /> Male
              </label>
              <label style={{margin: 10}}>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Female" 
                  checked={employee.gender === 'Female'} 
                  onChange={handleChange} 
                  required 
                /> Female
              </label>
            </div>
          </div>

          <b>Course</b>
          <select name="course" value={employee.course} onChange={handleChange} required>
            <option value="">Select Course</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>

          <b>Image Upload</b>
          <input 
            type="file" 
            name="image" 
            onChange={handleImageChange} 
            accept=".jpg,.jpeg,.png" 
          />

          <button type="submit">{id ? 'Update Employee' : 'Create Employee'}</button>
        </form>
      </main>
    </div>
   </div>
  );
}

export default EmployeeForm;
