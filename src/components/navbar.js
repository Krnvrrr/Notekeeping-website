import React, { useEffect } from 'react'
import { Link,useLocation,useNavigate} from "react-router-dom";
export default function Navbar() {
  let navigate = useNavigate()
  let login=(e)=>{
    e.preventDefault();
    navigate("/login")
  }
  console.log(localStorage.getItem('name'))
  let signup=(e)=>{
    e.preventDefault();
    navigate("/signup")
  }
  let logout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token')
    navigate("/login")
  }
  let location=useLocation();
  useEffect(()=>{
    // console.log(location.pathname)
  },[location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">WindNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":''}`} to="/about">about</Link>
        </li>
      </ul>
      
        {!localStorage.getItem("token")?<div className="d-flex mp-2" role="search"><button className="btn btn-outline-success mx-1" type="submit"onClick={login}>login</button>
        <button type="button" className="btn btn-outline-primary" onClick={signup}>signup</button></div>:<div className="d-flex mp-2" role="search"><div className='mt-1 mr-1'><i className="fa-solid fa-user mx-1"></i>{localStorage.getItem('name')}</div><button type="button" className="btn btn-outline-danger mx-2" onClick={logout}>logout</button></div>}
      
    </div>
  </div>
</nav>
    </div>
  )
}
