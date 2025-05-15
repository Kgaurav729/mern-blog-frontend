import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import EditBlog from './pages/EditBlog';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <Navbar/>
      <>
        <Toaster position='top-center'/>
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<EditBlog />} />
          </Routes>
        
      </>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
