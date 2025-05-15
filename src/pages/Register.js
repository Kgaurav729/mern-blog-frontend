// import React, { useState } from 'react';
// import API from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const Register = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/auth/signup', form);
//       navigate('/login');
//       toast.success('Succes Login!');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} required />
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      navigate('/login');
      toast.success('Registered successfully! Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
