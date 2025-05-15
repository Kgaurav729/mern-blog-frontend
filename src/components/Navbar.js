// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className='bg-white shadow px-6 py-3 flex jusitfy-between items-center'>
//       <div className='text-lg font-bold text-blue-600'>MERN Blog</div>
//       <div className='space-x-4'>
//       <Link className='text-blue-500 hover:underline' to="/">Home</Link>
//       {user ? (
//         <>
//           <Link className='text-blue-500 hover:underline' to="/create">Create Blog</Link>
//           <span className='ml-2 text-gray-600'>Hi, {user.user.name}</span>
//           <button onClick={logout} className='ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300' >Logout</button>
//         </>
//       ) : (
//         <>
//           <Link className='text-blue-500 hover:underline' to="/register">Register</Link>
//           <Link className='text-blue-500 hover:underline' to="/login">Login</Link>
//         </>
//       )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
        MERN<span className="text-gray-800">Blog</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Create Blog
            </Link>
            <span className="text-sm text-gray-600">Hi, <span className="font-semibold">{user.user.name}</span></span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Register
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
