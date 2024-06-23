import React from 'react'
import {Link} from "react-router-dom"
const AdminComponent = () => {
  return (
    <div>AdminComponent

      <div>
        <Link to='/bus/register' className='text-blue-500 underline'>Bus Register</Link>
      </div>
    </div>
  )
}

export default AdminComponent