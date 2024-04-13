
import {Routes,Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from './pages/Privacy';
import Pagenotfound from "./pages/Pagenotfound";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';



function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path="" element={<Dashboard/>}/>
        </Route>
      
      <Route path='/regester' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
     
    </>
  );
}

export default App;
