import "./navbar.css"
import{Link} from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext "; 
import { useContext , useState} from "react";

 
const Navbar = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        
       <Link to="/home" style={{color:"inherit",textDecoration:"none"}}>       
        <span className="logo">gdmbooking</span> &emsp; &emsp;
        
       
        </Link>
       {user  ? user.username :(  <div className="navItems">
          <button className="navButton" onClick={() => navigate("/register")}>Register</button>
          <button className="navButton"  onClick={() => navigate("/login")}>Login</button>
          <button className="navButton" onClick={()=>navigate("/")}>LogOut</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar