import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const {t} = useTranslation();

  const homeCardData= [
    {
      bg: "l-bg-cherry",
      title: t("homecardpost"),
      icon:"bi bi-postcard",
      link:"/posts",
      linkTitle: t("homecardredirectbtn")
    },
    {
      bg: "l-bg-blue-dark",
      title: t("homecardalbum"),
      icon:"bi bi-file-image",
      link:"/albums",
      linkTitle: t("homecardredirectbtn")
    },
    {
      bg: "l-bg-green-dark",
      title: t("homecardtodo"),
      icon:"bi bi-check2-circle",
      link:"/todo",
      linkTitle: t("homecardredirectbtn")
    },
    {
      bg: "l-bg-orange-dark",
      title: t("homecardaboutdev"),
      icon:"bi bi-code-slash",
      link:"/about",
      linkTitle: t("homecardredirectbtn")
    },
  ]
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center">
          <p className='fs-3 fw-semibold py-5'>{t("homeslogan")}</p>
        </div>
      </div>
    <div className="row ">
      {
        homeCardData.map((item,index) => (
          <div className="col-xl-6 col-lg-6" key={index}>
            <div className={`card ${item.bg}`}>
                <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large"><i className={`${item.icon}`}></i></div>
                    <div className="mb-4">
                        <h5 className="card-title mb-0">{item.title}</h5>
                    </div>
                    <Link to={item.link} className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-semibold'>{item.linkTitle}</Link>
                </div>
            </div>
        </div>
        ))
      }
        
    
    </div>
</div>
  )
}

export default Home