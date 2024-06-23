import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { MdOutlineMenuOpen } from 'react-icons/md'
import { RiCloseLine } from 'react-icons/ri'
import './HeaderComponent.css'
import userImage from '../../assets/images/logo512.png'
const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(false);
  const [userName,setUserName] = useState("");
  const [role,setRole] = useState("");
  const mobileNavbarHandler = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const sessionOutTime = sessionStorage.getItem('timeOut');
    console.log(sessionOutTime);

    if (sessionOutTime <= Date.now()) {
      sessionStorage.clear();
      localStorage.clear();
      // window.location.reload();
      setUserData(false);
      navigate('/auth/signin');

    }
    else {
      setUserData(true);
      setUserName(localStorage.getItem('userName'));
      setRole(localStorage.getItem("role"));
    }

  }, [0]);
  const logOutHandler = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  }
  return (
   <div className='navbar-container'>
    
   <div className='mobile-menu-icon'>
     <MdOutlineMenuOpen onClick={mobileNavbarHandler} />
   </div>
   <div className={`navlink-container ${isOpen ? 'navlink-mobile-container' : ''}`}>

     {isOpen && <RiCloseLine onClick={mobileNavbarHandler} className='close-navbar' />}
     {
       
         <div className='navlink'>

           <Link to="/" className='link nav-link' >Home</Link>
         </div>
       
     }

     {!userData && <div className='nav-account-container flex'>
       <div className='inline'>
         <Link to='/auth/signin' className='link nav-link ' >Login</Link>
       </div>
       <div className='inline'>
         <Link to='/auth/signup' className='link nav-link ' >SignUp</Link>
       </div>
     </div>}
     {userData 
     && 
     <div className='nav-account-container'>
      
       <div>
        
        {/* <img src={userImage} className='user-logo'></img> */}
        <span>{userName}</span>
       </div>
       <div>
          <Link className='hover:cursor-pointer' to='/book'>Tickets</Link>
       </div>
       {role ==="admin" &&
        <div>
        <Link className='hover:cursor-pointer ' to={'/admin'}>{role.toUpperCase()}</Link>
      </div>}
       <div>
        {/* <img src={userImage} className='user-logo'></img> */}
        <span className='hover:cursor-pointer' onClick={logOutHandler}>LogOut</span>
       </div>
       
       
     </div>}

   </div>


 </div>
  )
}

export default HeaderComponent