import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';


const Login = () => {

  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [error,setError] = useState('');
  const [remember, setRemember] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  const {setUser,setIsLoggedIn,isLoggedIn} = useAuth();

  useEffect(() => {
    if(isLoggedIn){
      navigate(location?.state?.return_url || '/');
    }
  }, [])
  
 

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}&username=${pass}`);
      if(res.data.length !== 0){
        setUser(res.data)
        if(remember){
          setIsLoggedIn(Cookies.set('userToken', 'userLoggedIn', { expires: 7 }));
        }else{
          setIsLoggedIn(Cookies.set('userToken', 'userLoggedIn', { expires: 10 / 86400 }));
        }
        navigate(location?.state?.return_url || '/');
      }
      setEmail('');
      setPass('');
      setError('Email or password is incorrect');
    } catch (error) {
      return error
    }
  }
  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-4 mx-auto">
          <h2 className='mb-3'>Login Form</h2>
          {error &&
            <div className="alert alert-danger" role="alert">
            {error}
          </div>
          }
          <form className='needs-validation' onSubmit={handleSubmit} >
            <div className="form-group mb-2 was-validated">
              <label htmlFor="email" className='form-label'>Email Address</label>
              <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <div className="invalid-feedback">
                 Please Enter E-Mail format
              </div>
            </div>
            <div className="form-group mb-2 was-validated">
              <label htmlFor="password" className='form-label'>Password Address</label>
              <input type="password" className='form-control' value={pass} onChange={(e) => setPass(e.target.value)} required/>
              <div className="invalid-feedback">
                 Please Enter your Password
              </div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>
              <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
            </div>
            <button type='submit' className='btn btn-success w-100'>Sign In</button>
          </form>
          <small>E-Mail: Sincere@april.biz  Pass:Bret</small>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Login