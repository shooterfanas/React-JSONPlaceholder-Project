import React, { useEffect, useState } from 'react'
import {url} from '../../utils'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'
import { useTranslation } from 'react-i18next'

const Header = ({user,isLoggedIn,countdown,showCountdown,logoutHandle}) => {
  const {t,i18n} = useTranslation();
  const [detectLng, setDetectLng] = useState("")
  const [lng,setLng] = useState()

  useEffect(() => {
    const changeLng = () => {
      const lgnToString = i18n.language === "tr" ? "Turkish" : i18n.language === "en" ? "English" : "";
      setDetectLng(lgnToString);
    }

    changeLng();
  }, [lng])
  
  const changeLang =  async (lang) =>{
    setLng(!lng)
    await i18n.changeLanguage(lang);
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <NavLink className={'navbar-brand'} to={url('home')}>JSON Example</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
                <li className="nav-item ">
                  <NavLink className={'nav-link'} to={url('home')}>{t("home")}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.posts')}>{t("posts")}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.album')}>{t("album")}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.todo')}>{t("todo")}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.about')}>{t("about")}</NavLink>
                </li>
              </ul>
              <ul className='navbar-nav mb-2 mb-lg-0'>
                <li className="nav-item dropdown fw-semibold" >
                  <a className="nav-link dropdown-toggle" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-translate"></i> {detectLng}
                  </a>
                  <ul className="dropdown-menu ">
                    <li><Link className="dropdown-item fw-semibold" to={"#"} onClick={() => changeLang("en")}>English</Link></li>
                    <li><Link className="dropdown-item fw-semibold" to={"#"} onClick={() => changeLang("tr")}>Turkish</Link></li>
                  </ul>
                </li>
              {isLoggedIn ?
                <li className="nav-item dropdown fw-semibold" >
                  <a className="nav-link dropdown-toggle" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i> {user && user[0].name}
                  </a>
                  <ul className="dropdown-menu ">
                    <li><NavLink className={'dropdown-item fw-semibold'} to={url('home.profile')}>{t("profile")}</NavLink></li>
                    <li><a className="dropdown-item fw-semibold" href="/" onClick={logoutHandle}>{t("logout")}</a></li>
                  </ul>
                </li>
              :
              <li className="nav-item fw-semibold">
                  <NavLink className='nav-link' to='/auth/login'>
                    <i className="bi bi-person-circle"></i> {t("login")}
                  </NavLink>
                </li>
              }
              </ul>

            </div>
          </div>
        </nav>
        {showCountdown && 
        <div className="container py-3">
          <div className="row">
            <div className="alert alert-danger" role="alert">
              {t("countdown", {countdown})}
            </div>
          </div>
        </div>
        }
      </header>
    </>
  )
}

export default Header