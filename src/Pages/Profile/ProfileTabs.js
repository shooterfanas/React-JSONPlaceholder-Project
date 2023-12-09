import React from 'react'
import { AlbumData, Posts, TodoData } from '../../components/Datas'
import ProfileAbout from '../../components/Profile_About/ProfileAbout'

const ProfileTabs = () => {
  return (
    <>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="posts-tab" data-bs-toggle="tab" data-bs-target="#posts-tab-pane" type="button" role="tab" aria-controls="posts-tab-pane" aria-selected="true">My Posts</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="albums-tab" data-bs-toggle="tab" data-bs-target="#albums-tab-pane" type="button" role="tab" aria-controls="albums-tab-pane" aria-selected="false">My Albums</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="todos-tab" data-bs-toggle="tab" data-bs-target="#todos-tab-pane" type="button" role="tab" aria-controls="todos-tab-pane" aria-selected="false">My Todos</button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane" type="button" role="tab" aria-controls="about-tab-pane" aria-selected="false">About Me</button>
      </li>
    </ul>
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active py-3" id="posts-tab-pane" role="tabpanel" aria-labelledby="posts-tab" tabIndex="0"><Posts/></div>
      <div className="tab-pane fade py-3" id="albums-tab-pane" role="tabpanel" aria-labelledby="albums-tab" tabIndex="0"><AlbumData/></div>
      <div className="tab-pane fade py-3" id="todos-tab-pane" role="tabpanel" aria-labelledby="todos-tab" tabIndex="0"><TodoData/></div>
      <div className="tab-pane fade py-3" id="about-tab-pane" role="tabpanel" aria-labelledby="about-tab" tabIndex="0"><ProfileAbout/></div>
    </div>
    </>
  )
}

export default ProfileTabs