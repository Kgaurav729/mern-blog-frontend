// import React, { useState, useContext } from 'react';
// import API from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/login', form);
//       login(res.data); // Save user & token to context
//       navigate('/');
//       toast.success('Succes Login!');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data); // Save user & token to context
      navigate('/');
      toast.success('Login successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
