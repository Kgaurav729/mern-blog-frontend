// import React, { useState, useContext } from 'react';
// import API from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const CreateBlog = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState({
//     title: '',
//     category: '',
//     content: '',
//     image: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setBlog({ ...blog, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/blogs', blog, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       navigate('/');
//       toast.success('Blog created!')
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error creating blog');
//     }
//   };

//   if (!user) return <p>Please login to create a blog.</p>;

//   return (
//     <div>
//       <h2>Create Blog</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Blog Title"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="category"
//           placeholder="Category (e.g. Travel, Finance)"
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="image"
//           placeholder="Image URL (optional)"
//           onChange={handleChange}
//         />
//         <textarea
//           name="content"
//           placeholder="Blog Content"
//           rows="6"
//           onChange={handleChange}
//           required
//         ></textarea>
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;


import React, { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/blogs', blog, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/');
      toast.success('Blog created!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating blog');
    }
  };

  if (!user) return <p className="text-center mt-10 text-lg text-gray-600">Please login to create a blog.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create a New Blog</h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Blog Title"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="category"
            placeholder="Category (e.g. Travel, Finance)"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="image"
            placeholder="Image URL (optional)"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            rows="6"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
