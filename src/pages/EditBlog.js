// import { useState, useContext} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import API from '../api/axios';
// import { AuthContext } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const EditBlog = () => {
//   const { state: blogData } = useLocation();
//   const [blog, setBlog] = useState(blogData || {});
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setBlog({ ...blog, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put(`/blogs/${blog._id}`, blog, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       navigate('/');
//       toast.success('Blog Updated!');
//     } catch (err) {
//       console.error('Update failed:', err.response?.data?.message);
//     }
//   };

//   if (!user) return <p>Login to edit your blog.</p>;

//   return (
//     <div>
//       <h2>Edit Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="title" value={blog.title} onChange={handleChange} required />
//         <input name="category" value={blog.category} onChange={handleChange} required />
//         <input name="image" value={blog.image} onChange={handleChange} />
//         <textarea name="content" value={blog.content} rows="6" onChange={handleChange} required></textarea>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;

import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditBlog = () => {
  const { state: blogData } = useLocation();
  const [blog, setBlog] = useState(blogData || {});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blogs/${blog._id}`, blog, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate('/');
      toast.success('Blog updated!');
    } catch (err) {
      console.error('Update failed:', err.response?.data?.message);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (!user) return <p className="text-center mt-10 text-red-500">Please login to edit your blog.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Edit Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="category"
            value={blog.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <input
            name="image"
            value={blog.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            rows="6"
            placeholder="Blog Content"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
