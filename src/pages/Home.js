import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pencil, Trash2, X } from 'lucide-react';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const query = [];
      if (category) query.push(`category=${category}`);
      if (author) query.push(`author=${author}`);
      const queryStr = query.length ? `?${query.join('&')}` : '';

      const res = await API.get(`/blogs${queryStr}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setBlogs(res.data);
    } catch (err) {
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    if (user) fetchBlogs();
  }, [user]);

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
      setSelectedBlog(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (blog) => {
    navigate(`/edit/${blog._id}`, { state: blog });
  };

  if (!user) return <p className="text-center text-xl mt-10 dark:text-white">Please login to view blogs.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10 relative">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300">📝 Explore Blogs</h2>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          placeholder="Filter by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          placeholder="Filter by Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
        >
          Search
        </button>
      </form>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No blogs found.</p>
      ) : (
        <div className={`grid md:grid-cols-2 gap-6 ${selectedBlog ? 'blur-sm pointer-events-none' : ''}`}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition relative cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">{new Date(blog.createdAt).toDateString()}</span>
                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">{blog.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                By <span className="font-medium">{blog.author}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed mb-4">
                {blog.content.length > 150 ? blog.content.slice(0, 150) + '...' : blog.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ✅ MODAL SECTION */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl p-6 rounded-2xl shadow-xl relative mx-4 max-h-[90vh] overflow-y-auto text-gray-800 dark:text-gray-200">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {new Date(selectedBlog.createdAt).toDateString()}
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                {selectedBlog.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">{selectedBlog.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
              By <span className="font-medium">{selectedBlog.author}</span>
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap">{selectedBlog.content}</p>

            {user?.user?.id === selectedBlog.userId && (
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => {
                    handleEdit(selectedBlog);
                    setSelectedBlog(null);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedBlog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

