import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import './Footer.css'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const {t}= useTranslation();
  return (
    <footer className='pt-5'>
      <div className="container-fluid bg-success-subtle static-bottom">
        <div className="container">
            <ul className="nav justify-content-center  py-3 mb-3">
              <NavLink to={"/"} className="nav-link px-2 text-body-secondary fw-semibold">{t("home")}</NavLink>
              <NavLink to={"/posts"} className="nav-link px-2 text-body-secondary fw-semibold">{t("posts")}</NavLink>
              <NavLink to={"/albums"} className="nav-link px-2 text-body-secondary fw-semibold">{t("album")}</NavLink>
              <NavLink to={"/todo"} className="nav-link px-2 text-body-secondary fw-semibold">{t("todo")}</NavLink>
              <NavLink to={"/about"} className="nav-link px-2 text-body-secondary fw-semibold">{t("about")}</NavLink>
            </ul>
            <div className="row justify-content-between py-3">
              <p className="col-md-6 col-12 col-sm-6 d-flex align-items-center justify-content-center justify-content-sm-start text-center text-body-secondary fw-semibold">© 2023 Coding By, Yusuf Genç </p>
              <ul className="nav col-md-6 col-12 col-sm-6 justify-content-center justify-content-sm-end list-unstyled d-flex">
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