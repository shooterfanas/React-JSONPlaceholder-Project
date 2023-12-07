import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import ProfileTabs from './ProfileTabs';

const Profile = () => {

  const {user} = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

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
              <button className='btn btn-primary' onClick={handleModalShow}>Edit Profile</button>
            </div>
          </div>
        </div>
        <ProfileTabs/>
      </div>
    </div>


    {showModal && (
        <div
          className="modal fade show"
          id="editProfileModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editProfileModalLabel"
          aria-hidden="true"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleModalClose}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProfileModalLabel">
                  Edit Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>Coming Soon...</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    

    </>
  )
}





export default Profile