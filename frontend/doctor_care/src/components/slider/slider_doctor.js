import React from 'react'
import Slider from 'react-slick'
import "../../styles/slider_doctor.scss"
import { DoctorCard } from '../card/doctor_card'
import { settingSliderNotAuto } from '../../constants/setting_slider'

export const SliderDoctor = () => {
  return (
    <div style={{backgroundColor:"white"}} className="slider-doctor">
        <div className="container">
            <h1>Bác sĩ nỗi bật</h1>
            <Slider {...settingSliderNotAuto}>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            <DoctorCard></DoctorCard>
            {/* {specialties.map((e)=>(
              <CardImage key={e.id} description={e.description} title={e.name} imageURL={e.imageURL}/>
            ))} */}
          </Slider>
        </div>
    </div>
  )
}
