import React, { useState } from 'react'
import { AlbumData, AllAlbumData } from '../../components/Datas'

const Album = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
    <div className="container">
      <div className="row d-flex justify-content-end">
        <div className="col-auto ">
          <div className="form-check form-switch pt-3 pb-4">
            <input className="form-check-input" style={{transform: 'scale(1.8)'}} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
            <label className="form-check-label ms-3" htmlFor="flexSwitchCheckDefault">{isChecked ? 'All Album' : 'My Album'}</label>
          </div>
        </div>
      </div>
    </div>
    {
      <>
      {!isChecked
      ?
      <AlbumData/>
      :
      <AllAlbumData/>
      }
      </>
    }
    </>
  )
}

export default Album