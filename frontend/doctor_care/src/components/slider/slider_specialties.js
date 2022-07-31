import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import { settingSliderNotAuto } from '../../constants/setting_slider';
import { SpecialtyCard } from '../card/specialty_card';
import '../../styles/specialty.scss'
import { manageService } from "../../services/ManageService";

export const SliderSpecialty = () => {
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
      manageService.getListOfSpecialty()
      .then((result)=>{
        setSpecialties(result.data.data)
      })
      .catch((err)=>console.log(err))
      return () => {};
    },[]);
  
   let arr = specialties.concat(specialties).concat(specialties);

    return specialties && specialties.length>0 ?(
      <div className="specialties">
        <div className="container">
        <h1>Chuyên khoa phổ biến</h1>
          <Slider {...settingSliderNotAuto}>
            {arr.map((e)=>(
              <SpecialtyCard key={e.id} id={e.id} description={e.description} title={e.name} imageURL={e.image}/>
            ))}
          </Slider>
        </div>
      </div>
    ):(<></>)
}
