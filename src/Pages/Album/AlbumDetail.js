import React from 'react'
import { useParams } from 'react-router-dom';
import { AlbumToPhotos } from '../../components/Datas';

const AlbumDetail = () => {

  const params = useParams();

  return (
    <AlbumToPhotos id={params.id}/>
  )
}

export default AlbumDetail