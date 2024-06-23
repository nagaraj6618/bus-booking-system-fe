import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomeComponent from '../HomeComponent/HomeComponent'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'
import NotFoundComponent from '../NotFoundComponent/NotFoundComponent'
import SingleBusComponent from '../SingleBusComponent/SingleBusComponent'
import AdminComponent from '../Admin/AdminComponent'
import BookedDisplayComponent from '../BookedDisplayComponent/BookedDisplayComponent'
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path ='/' element = {<HomeComponent/>} />  
      <Route path ='/auth/signin' element = {<Login/>} />
      <Route path = "/auth/signup" element = {<Register/>} />
      <Route path = "/admin" element={<AdminComponent/>}/>
      <Route path='/bus/:id' element={<SingleBusComponent/>}/>
      <Route path='/book' element={<BookedDisplayComponent/>}/>
      <Route path ="*" element={<NotFoundComponent/>}/>
    </Routes>
  )
}

export default RoutesComponent