import React, { useState } from 'react'
import MyPosts from '../../components/posts/MyPosts'
import AllPosts from '../../components/posts/AllPosts';
import { useTranslation } from 'react-i18next';

const Posts = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {t} = useTranslation();
  return (
    <>
    <div className="container py-3">
      <div className="row d-flex justify-content-end">
        <div className="col-auto ">
          <div className="form-check form-switch pt-3">
            <input className="form-check-input" style={{transform: 'scale(1.8)'}} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
            <label className="form-check-label ms-3" htmlFor="flexSwitchCheckDefault">{isChecked ? t("switchallposts") : t("switchmyposts")}</label>
          </div>
        </div>
      </div>
    </div>
    {
      <>
      {!isChecked
      ?
      <MyPosts/>
      :
      <AllPosts/>
      }
      </>
    }
    
    </>
  )
}

export default Posts