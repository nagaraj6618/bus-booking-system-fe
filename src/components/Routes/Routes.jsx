import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomeComponent from '../HomeComponent/HomeComponent'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'
import NotFoundComponent from '../NotFoundComponent/NotFoundComponent'
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path ='/' element = {<HomeComponent/>} />  
      <Route path ='/auth/signin' element = {<Login/>} />
      <Route path = "/auth/signup" element = {<Register/>} />
      <Route path ="*" element={<NotFoundComponent/>}/>
    </Routes>
  )
}

export default RoutesComponent