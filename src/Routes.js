import React from 'react'
import Home from './Pages/Home/Home'
import Posts from './Pages/Posts/Posts'
import Album from './Pages/Album/Album'
import Todo from './Pages/Todo'
import About from './Pages/About'
import Profile from './Pages/Profile/Profile'
import HomeLayout from './Pages/Home/HomeLayout'
import PrivateRoute from './components/PrivateRoute'
import Page404 from './Pages/404'
import AuthLayout from './Pages/auth/AuthLayout'
import Login from './Pages/auth/Login'
import Detail from './Pages/Posts/Detail'
import AlbumDetail from './Pages/Album/AlbumDetail'

const routes = [
  {
    name: 'home',
    path:'/',
    element: <HomeLayout/>,
    children: [
      {
        name: 'index',
        index: true,
        element: <Home/>
      },
      {
        name: 'posts',
        path: '/posts',
        auth: true,
        element: <Posts/>
      },
      {
        name: 'postsdetail',
        path: '/posts/:id',
        auth: true,
        element: <Detail/>
      },
      {
        name: 'album',
        path: '/albums',
        auth: true,
        element: <Album/>
      },
      {
        name: 'albumdetail',
        path: '/albums/:id/photos',
        auth: true,
        element: <AlbumDetail/>
      },
      {
        name: 'todo',
        path: '/todo',
        auth: true,
        element: <Todo/>
      },
      {
        name: 'about',
        path: '/about',
        auth: true,
        element: <About/>
      },
      {
        name: 'profile',
        auth: true,
        path: '/profile',
        element: <Profile/>
      },
      {
        name: 'notFound',
        path: '*',
        element: <Page404/>,
      }
    ]
  },
  {
    name:'auth',
    path: '/auth',
    element: <HomeLayout/>,
    children: [
      {
        name:'login',
        path:'login',
        element: <Login/>
      }
    ]
  },
  
  
]

const authMap= routes => routes.map(route => {
  if(route?.auth){
    route.element= <PrivateRoute>{route.element}</PrivateRoute>
  }

  if(route?.children){
    route.children= authMap(route.children)
  }

  return route
})

export default authMap(routes);