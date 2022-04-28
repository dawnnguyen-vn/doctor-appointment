import React ,{useState,useEffect}from 'react'
import Slider from 'react-slick'
import "../../styles/slider_doctor.scss"
import { DoctorCard } from '../card/doctor_card'
import { settingSliderNotAuto } from '../../constants/setting_slider'
import {userService} from "../../services/UserService"

export const SliderDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    userService.getAllDoctor().then(
      (result)=>{
        setDoctors(result.data)
      }
    ).catch(
      (err)=>{
        console.log(err);
      }
    )


    return () => {
    };
  }, []);
  let arr = doctors.concat(doctors).concat(doctors);
  console.log(arr);
  return (
    <div style={{backgroundColor:"white"}} className="slider-doctor">

        <div className="container">
            <h1>Bác sĩ nỗi bật</h1>
            <Slider {...settingSliderNotAuto}>
            {
            arr.map((e)=>(
              <DoctorCard key={e.id} doctor={e}/>
            ))}
          </Slider>
        </div>
    </div>
  )
}
