import React from 'react'
import Demo from './pages/Demo'
import Home from './pages/Home'
import Contact from './pages/Contact'
import {Routes,Route} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Register from './components/Register'
import Services from './pages/Services'
import About from './pages/About'

const App = () => {
  const path=useParams()
  console.log(path)
  return (
    <div >
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create-account' element={<Register/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      






      //test route
      <Route path='/demo' element={<Demo/>}/>
    </Routes>

    </div>
  )
}

export default App