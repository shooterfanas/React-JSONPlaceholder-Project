import React from 'react'
import Moment from 'react-moment'

const Comments = ({comments,isShowComments}) => {
  return (
    <>
    {
      comments && 
      isShowComments ?
      comments.map((item) => (
        <div className="card w-75 my-3" key={item.id}>
            <div className="card-body px-0">
              <div className="row">
                <div className="d-flex align-items-center">
                  <div className="col-lg-1 col-md-2 col-sm-3 col-4">
                    <div className="flex-shrink-0">
                      <img src="/assets/img/avatar.png" className='rounded shadow-sm' style={{width: '60px', height:'60px'}} alt="..."/>
                    </div>
                  </div>
                  <div className="col-lg-11 col-md-10 col-sm-9 col-8 ps-lg-3 ps-xl-0">
                    <div className="flex-grow-1 ms-3">
                      <div className="row">
                        <div className="col-lg-9 col-md-8 col-sm-12 fw-semibold ps-0 my-auto">{item.email}</div>
                        <div className="col-lg-3 col-md-4 col-sm-12 fw-medium ps-0 pt-2 pt-md-0 text-md-end my-auto">{<Moment fromNow>{item.date}</Moment>}</div>
                        <hr className="my-3"/>
                        <p className='ps-0'>{item.body}</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ))

      :
      ''
    }
    </>
  )
}

export default Comments