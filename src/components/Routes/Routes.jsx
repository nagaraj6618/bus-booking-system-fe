import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomeComponent from '../HomeComponent/HomeComponent'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path ='/home' element = {<HomeComponent/>} />  
      <Route path ='/auth/signin' element = {<Login/>} />
      <Route path = "/auth/signup" element = {<Register/>} />
    </Routes>
  )
}

export default RoutesComponent