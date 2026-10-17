
import { createRoot } from 'react-dom/client'
import './styles.css'
import Login from './Landing/Login'
import Register from './Landing/Register'
import Landing from './Landing/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App/App'
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Register' element={<Register></Register>}></Route>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path='/Blog' element={<App></App>}></Route>
       

      </Routes>

    </BrowserRouter>



)
