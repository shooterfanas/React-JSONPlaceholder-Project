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
                  <div className="col-1">
                    <div className="flex-shrink-0">
                      <img src="/assets/img/avatar.png" className='rounded shadow-sm' style={{width: '60px', height:'60px'}} alt="..."/>
                    </div>
                  </div>
                  <div className="col-11">
                    <div className="flex-grow-1 ms-3">
                      <div className="row">
                        <div className="col-9 fw-semibold ps-0 my-auto">{item.email}</div>
                        <div className="col-3 fw-semibold text-end my-auto">{<Moment fromNow>{item.date}</Moment>}</div>
                        <hr className="my-3"/>
                        {item.body}
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