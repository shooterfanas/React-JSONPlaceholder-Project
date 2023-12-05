import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='pt-5'>
      <div className="container-fluid bg-success-subtle static-bottom">
        <div className="container">
            <ul className="nav justify-content-center  py-3 mb-3">
              <NavLink to={"/"} className="nav-link px-2 text-body-secondary fw-semibold">Home</NavLink>
              <NavLink to={"/posts"} className="nav-link px-2 text-body-secondary fw-semibold">Posts</NavLink>
              <NavLink to={"/albums"} className="nav-link px-2 text-body-secondary fw-semibold">Album</NavLink>
              <NavLink to={"/todo"} className="nav-link px-2 text-body-secondary fw-semibold">Todo</NavLink>
              <NavLink to={"/about"} className="nav-link px-2 text-body-secondary fw-semibold">About</NavLink>
            </ul>
            <div className="row justify-content-between py-3">
              <p className="col-md-4 d-flex align-items-center text-center text-body-secondary fw-semibold">© 2023 Coding By, Yusuf Genç </p>
              <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><Link to={"https://www.linkedin.com/in/yusuf-genc28/"} target="_blank" className='text-body-secondary footer-social '><i className="bi bi-linkedin linkedin" style={{fontSize:"24px"}}></i></Link></li>
                <li className="ms-3"><Link to={"https://github.com/shooterfanas"} target="_blank" className='text-body-secondary footer-social '><i className="bi bi-github github" style={{fontSize:"24px"}}></i></Link></li>
              </ul>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer