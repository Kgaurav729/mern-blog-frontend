// import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//       <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">
//         MERN<span className="text-gray-800">Blog</span>
//       </Link>

//       <div className="flex items-center space-x-4">
//         <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
//           Home
//         </Link>

//         {user ? (
//           <>
//             <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium transition">
//               Create Blog
//             </Link>
//             <span className="text-sm text-gray-600">Hi, <span className="font-semibold">{user.user.name}</span></span>
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium transition">
//               Register
//             </Link>
//             <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
//               Login
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-300 tracking-wide">
        MERN<span className="text-gray-800 dark:text-white">Blog</span>
      </Link>

      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/create"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              Create Blog
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Hi, <span className="font-semibold">{user.user.name}</span>
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
            >
              Login
            </Link>
          </>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition"
        >
          {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-800" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
