import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [category,setCategory]=useState('');
  const [author,setAuthor]=useState('');
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  
  const fetchBlogs = async () => {
     try {
        const query=[];
        if(category) query.push(`category=${category}`);
        if(author) query.push(`author=${author}`);
        const queryStr = query.length ? `?${query.join('&')}` : '';

        const res = await API.get(`/blogs${queryStr}`, {
         headers: {
           Authorization: `Bearer ${user?.token}`
         }
       });
    //    console.log(blogs)
       setBlogs(res.data);
    } catch (err) {
    console.error('Failed to fetch blogs');
    }
  };

  useEffect(()=>{
    // console.log(user.user);
    if(user) fetchBlogs();
  },[user]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(blogs.filter((b) => b._id !== id));
      toast.success('Blog deleted!');

    } catch (err) {
      console.error('Delete failed:', err.response?.data?.message);
      toast.error(err.response?.data?.message || 'Something went wrong');

    }
  };

  const handleEdit = (blog) => {
    navigate(`/edit/${blog._id}`, { state: blog });
  };


  if (!user) return <p>Please login to view blogs</p>;

  

  return (
    <div className='max-w-3xl mx-auto mt-8 px-4'>
      <h2 className='text-3xl font-bold mb-6'>All Blogs</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-1 rounded w-1/2"
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border px-2 py-1 rounded w-1/2"
        />
        <button
          type="submit"
          className="px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </form>


      {blogs.map((blog) => (
        <div key={blog._id} 
        className='border rounded-lg p-4 mb-4 shadow hover:shadow-md transition'
        >
            {/* <h2>{user.id}</h2> */}
            {/* <h2>{blog.userId}</h2> */}
          <h3 className='text-xl font-semibold'>{blog.title}</h3>
          <p className='text-gray-500 text-sm mb-2'><strong>By:</strong><span className='font-medium'>{blog.author}</span> | <strong>Category:</strong> {blog.category}</p>
          <p className='text-gray-700'>{blog.content.slice(0, 100)}...</p>
          {user.user.id===blog.userId && (
            <div className='mt-2 space-x-2'>
              <button onClick={()=>handleEdit(blog)}
                className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                Edit
              </button>
              <button onClick={()=>handleDelete(blog._id)}
                className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          )} 
        </div>
      ))}
    </div>
  );
};

export default Home;
