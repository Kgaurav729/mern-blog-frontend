import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='bg-white shadow px-6 py-3 flex jusitfy-between items-center'>
      <div className='text-lg font-bold text-blue-600'>MERN Blog</div>
      <div className='space-x-4'>
      <Link className='text-blue-500 hover:underline' to="/">Home</Link>
      {user ? (
        <>
          <Link className='text-blue-500 hover:underline' to="/create">Create Blog</Link>
          <span className='ml-2 text-gray-600'>Hi, {user.user.name}</span>
          <button onClick={logout} className='ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300' >Logout</button>
        </>
      ) : (
        <>
          <Link className='text-blue-500 hover:underline' to="/register">Register</Link>
          <Link className='text-blue-500 hover:underline' to="/login">Login</Link>
        </>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
