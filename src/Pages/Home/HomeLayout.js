import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import Cookies from 'js-cookie'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'


const HomeLayout = () => {

  const location = useLocation();
  const {user,setUser,setIsLoggedIn,isLoggedIn} = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  const logoutHandle = () => {
    setUser(false);
    setIsLoggedIn(Cookies.remove('userToken'));
    setCountdown(5);
  }

  const checkAndLogout = () => {
    const cookie = Cookies.get('userToken');
    if (!cookie) {
        setShowCountdown(true);
    }
  };

  useEffect(() => {
    if(showCountdown){
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            logoutHandle();
            setShowCountdown(false);
            clearInterval(interval);
            return 0;
          }
          
          return prevCountdown - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    
    
  }, [showCountdown])


  useEffect(() => {
    if(isLoggedIn){
      const intervalId = setInterval(checkAndLogout, 10000); // 10 saniye süre ile kontrol

      return () => clearInterval(intervalId);
    } else {
      logoutHandle();
    }
  }, [location])
  return (
    <>
    <Header user={user} isLoggedIn={isLoggedIn} countdown={countdown} showCountdown={showCountdown} logoutHandle={() => logoutHandle()}/>
    <main className='flex-grow-1'>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default HomeLayout