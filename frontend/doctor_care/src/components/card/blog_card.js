import React from 'react'
import '../../styles/card.scss'

export const BlogCard = ({aNew}) => {

  return (
        <div style={{border:"none"}} className="card">
            <div style={{backgroundImage:`url(${aNew.imageURL})`}} className="card-image card-bg-image">
                <label>{aNew.typeOfNew}</label>
                {/* <img src="https://cdn.bookingcare.vn/fo/2021/07/27/140801-test-covid.jpg" alt="" /> */}
            </div>
            <h3 className='card-title'>{aNew.title}</h3>
            <div className="card-content mt-3">
                <ul style={{listStyleType:"inherit"}}>
                    {aNew.content.map((e,index)=>(
                        <li key={index}>
                            {e}
                        </li>
                    ))}
                </ul>
            </div>
            <button>
                Xem chi tiết
            </button>
        </div>
  )
}
