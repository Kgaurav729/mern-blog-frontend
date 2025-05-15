import React, { useState, useContext, useEffect } from 'react';
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
      toast.success('Blog Updated!');
    } catch (err) {
      console.error('Update failed:', err.response?.data?.message);
    }
  };

  if (!user) return <p>Login to edit your blog.</p>;

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={blog.title} onChange={handleChange} required />
        <input name="category" value={blog.category} onChange={handleChange} required />
        <input name="image" value={blog.image} onChange={handleChange} />
        <textarea name="content" value={blog.content} rows="6" onChange={handleChange} required></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
