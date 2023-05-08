import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import { Home } from './components/home';
import NoteState from './context/notestate';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

function App() { 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar /> 
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={ <About />} />
              <Route exact path="/login" element={ <Login />} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;