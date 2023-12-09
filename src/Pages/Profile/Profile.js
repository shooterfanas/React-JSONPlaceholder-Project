import React from 'react'
import { useAuth } from '../../context/AuthContext';
import ProfileTabs from './ProfileTabs';

const Profile = () => {

  const {user} = useAuth();

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 mt-3 rounded-top" style={{
          backgroundImage: "url('/assets/img/bg1.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
          }}>
          <div className="col-12 col-md-9 col-lg-6 col-xl-5 my-3 d-flex">
            <div className="col-3 ">
              <img src="/assets/img/avatar.png" className="img-thumbnail" alt="..."/>
            </div>
            <div className="col-9 ms-4 text-light">
              <div className="col-12"><h5>{user[0].name}</h5></div>
              <div className="col-12 my-4"><h5>{user[0].email}</h5></div>
            </div>
          </div>
        </div>
        <ProfileTabs/>
      </div>
    </div>
    </>
  )
}





export default Profile