import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Admin from './components/Pages/Admin';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
        <PrivateRoute rolRequerido="admin">
         <Admin />
        </PrivateRoute>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;