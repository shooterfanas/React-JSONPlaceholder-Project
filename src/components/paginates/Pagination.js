import React from 'react'
import { Link } from 'react-router-dom';

const Pagination = ({postPerPage, totalPosts, paginate}) => {
  const pageNumbers= [];

  for(let i = 1 ; i <= Math.ceil(totalPosts / postPerPage); i++ ){
    pageNumbers.push(i);
  }


  return (
    <nav className='d-flex justify-content-center'>
      <ul className="pagination pagination-sm">
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Link onClick={() => paginate(number)} className='page-link'>{number}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination