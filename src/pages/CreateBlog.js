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
      toast.success('Blog created!')
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating blog');
    }
  };

  if (!user) return <p>Please login to create a blog.</p>;

  return (
    <div>
      <h2>Create Blog</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Blog Title"
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category (e.g. Travel, Finance)"
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL (optional)"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          rows="6"
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
