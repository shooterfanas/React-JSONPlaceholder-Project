import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ProfileAbout = () => {
  const {t}= useTranslation();
  const {user} = useAuth();

  const [fullName, setFullName] = useState(user[0].name);
  const [email, setEmail] = useState(user[0].email);
  const [phone, setPhone] = useState(user[0].phone);
  const [address, setAddress] = useState(user[0].address.suite +', '+ user[0].address.street +', '+ user[0].address.city);

  const [updatedUser, setUpdatedUser] = useState();

  const addresSplit = address.split(', ');
  console.log(updatedUser)

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    axios.put(`https://jsonplaceholder.typicode.com/users/${user[0].id}`, { "id":1, "name": fullName, "email": email, "phone": phone, "address": 
    {"street": addresSplit[1],"suite": addresSplit[0],"city": addresSplit[2],}})
    .then((res) => {
      setUpdatedUser(res.data);
    })
    .catch((error) => {
      console.log("Error updating album:", error);
    });
  }
  
  return (
    <>
      <div className="container">
          <div className="row ">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="assets/img/avatar.png" alt="profile" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{updatedUser ? updatedUser.name : user[0].name}</h4>
                      <p className="text-secondary mb-1">{user[0].company.bs}</p>
                      <p className="text-muted font-size-sm">
                        {updatedUser ? updatedUser.address.suite : user[0].address.suite}, {updatedUser ? updatedUser.address.street : user[0].address.street}, {updatedUser ? updatedUser.address.city : user[0].address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-globe pe-1"></i>{t("socialWebsite")}</h6>
                    <span className="text-secondary"><a href={`https://${user[0].website}`} target='_blank' rel="noreferrer" className='link-offset-2 link-underline link-underline-opacity-0'>{user[0].website}</a></span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-linkedin pe-1"></i>{t("socialLinkedin")}</h6>
                    <span className="text-secondary"><a href="https://www.linkedin.com/in/yusuf-genc28/" target='_blank' rel="noreferrer" className='link-offset-2 link-underline link-underline-opacity-0'>yusuf-genc28</a></span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-github pe-1"></i>{t("socialGithub")}</h6>
                    <span className="text-secondary"><a href="https://github.com/shooterfanas" target='_blank' rel="noreferrer" className='link-offset-2 link-underline link-underline-opacity-0'>shooterfanas</a></span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-twitter-x pe-1"></i>{t("socialTwitter")}</h6>
                    <span className="text-secondary">@{user[0].username}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-instagram pe-1"></i>{t("socialInstagram")}</h6>
                    <span className="text-secondary">@{user[0].username}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputFullName">{t("updateFormNameTitle")}</label>
                      <input 
                        type="text" 
                        className="form-control my-2" 
                        id="exampleInputFullName" 
                        placeholder={t("updateFormNamePlace")}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail">{t("updateFormEmailTitle")}</label>
                      <input 
                        type="email" 
                        className="form-control my-2" 
                        id="exampleInputEmail" 
                        placeholder={t("updateFormEmailPlace")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPhone">{t("updateFormPhoneTitle")}</label>
                      <input 
                        type="text" 
                        className="form-control my-2" 
                        id="exampleInputPhone" 
                        placeholder={t("updateFormPhonePlace")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputAddress">{t("updateFormAddressTitle")}</label>
                      <input 
                        type="text" 
                        className="form-control my-2" 
                        id="exampleInputAddress"
                        placeholder={t("updateFormAddressPlace")}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleUpdateProfile}>{t("updateFormBtn")}</button>
                  </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
    </div>
    </>
  )
}

export default ProfileAbout