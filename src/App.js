import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Category from './Components/Categorys/Category';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PopDelete from './Components/Equipment/PopDelete';
import Addequipment from './Components/Equipment/Addequipment';
import ViewAll from './Components/Equipment/ViewAll';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/" ></Link>
        <Link to="/category" ></Link>
        <link to="/view"></link>

        <Routes>

          <Route path='/' element={<Login />} />
          <Route path='/category' element={<Category />} />
          <Route path='/view' element={<ViewAll />} />
        
        </Routes>

      </Router>


    </div>
  );
}

export default App;
