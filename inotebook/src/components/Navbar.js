import React, { useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    useEffect(() => {
      }, [location]);
      
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/dashboard" ? "active": ""}`} aria-current="page" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/about" ? "active": ""}`} to="/about">About</Link>
                    </li>
                    {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/">Action</Link></li>
                        <li><Link className="dropdown-item" to="/">Another action</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
                    </li> */}
                </ul>
                {!localStorage.getItem("token") ?
                <form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-1" to="/login"  role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </div>
            </div>
    </nav>
  )
}

export default Navbar
