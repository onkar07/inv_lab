import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Category from './Components/Categorys/Category';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PopDelete from './Components/Equipment/PopDelete';
import Addequipment from './Components/Equipment/Addequipment';
import ViewAll from './Components/Equipment/ViewAll';

// updatetd code 
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
      return <Navigate to="/" />; // Redirect to login if no token
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/" ></Link>
        <Link to="/reg" ></Link>
        <Link to="/category" ></Link>
        <link to="/view"></link>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/reg' element={<Register />} />
          {/* <Route path='/category' element={<Category />} /> */}
          <Route path='/category' element={<ProtectedRoute> <Category /> </ProtectedRoute>} />

          <Route path='/view/:id' element={<ViewAll />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
