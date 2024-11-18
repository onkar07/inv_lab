import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Category from './Components/Categorys/Category';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PopupCat from './Components/Categorys/PopupCat';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/" ></Link>
        <Link to="/category" ></Link>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/category' element={<Category />} />
        </Routes>

      </Router>




    </div>
  );
}

export default App;
