import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const Page404 = () => {
  const {t} = useTranslation();

  return (
    <>
      <div>{t("404")}</div>
      <Link to='/'>{t("gohome")}</Link>
    </>
  )
}

export default Page404