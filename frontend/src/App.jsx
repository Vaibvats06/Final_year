import React from 'react'
import Demo from './pages/Demo'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import Register from './components/Register'
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






      //test route
      <Route path='/demo' element={<Demo/>}/>
    </Routes>

    </div>
  )
}

export default App