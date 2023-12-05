import React from 'react'
import { PostDetail } from '../../components/Datas'
import { useParams } from 'react-router-dom';

const Detail = () => {

  const params = useParams();
  return (
    <>
    <PostDetail id={params.id}/>
    </>
  )
}

export default Detail