import React from 'react'
import { useTranslation } from 'react-i18next'

const About = () => {
  const {t} = useTranslation();

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          {t("comingsoon")}
        </div>
      </div>
    </div>
    </>
  )
}

export default About