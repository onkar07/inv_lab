import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Category from './Components/Categorys/Category';
import { BrowserRouter as Router ,Route,Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Login />
      <Category/>
    </div>
  );
}

export default App;
