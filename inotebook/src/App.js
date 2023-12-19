
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <>
        <Router>
          
            <NoteState>
              <Navbar />
              <Alert />
              <div className='container'>
              <Routes>
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    < Main />
                  </PrivateRoute>
                }/>
                <Route path="/about" element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
          </div>
            </NoteState>
        </Router>
      
    </>
  );
}

export default App;
