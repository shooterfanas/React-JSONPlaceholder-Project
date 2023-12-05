import React from 'react'
import {url} from '../../utils'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = ({user,isLoggedIn,countdown,showCountdown,logoutHandle}) => {
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
                  <NavLink className={'nav-link'} to={url('home')}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.posts')}>Posts</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.album')}>Album</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.todo')}>Todo</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={'nav-link'} to={url('home.about')}>About</NavLink>
                </li>
              </ul>
              <ul className='navbar-nav mb-2 mb-lg-0'>
              {isLoggedIn ?
                <li className="nav-item dropdown fw-semibold" >
                  <a className="nav-link dropdown-toggle" href="!#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i> {user && user[0].name}
                  </a>
                  <ul className="dropdown-menu ">
                    <li><NavLink className={'dropdown-item fw-semibold'} to={url('home.profile')}>Profile</NavLink></li>
                    <li><a className="dropdown-item fw-semibold" href="/" onClick={logoutHandle}>Logout</a></li>
                  </ul>
                </li>
              :
              <li className="nav-item fw-semibold">
                  <NavLink className='nav-link' to='/auth/login'>
                    <i className="bi bi-person-circle"></i> Login
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
              Oturum süreniz doldu {countdown} saniye sonra oturumunuz sonlandırılacaktır.
            </div>
          </div>
        </div>
        }
      </header>
    </>
  )
}

export default Header