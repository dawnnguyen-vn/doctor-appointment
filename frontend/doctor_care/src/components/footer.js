import React from 'react'
import "../styles/footer.scss"

export const Footer = () => {
  return (
    <div className='footer'>
       <div className="container">
            <div className="title">
            © 2022 DoctorCare.
            </div>
            <div className="logo">
                <img className="btn-mxh" width="32" height="32" src="https://bookingcare.vn/themes/app1912/assets/img/social/facebook-square.svg" alt="Facebook/"/>
                <img className="btn-mxh" width="32" height="32" src="https://bookingcare.vn/themes/app1912/assets/img/social/youtube-square.svg" alt="Youtube/"></img>
            </div>
        </div> 
    </div>
  )
}
