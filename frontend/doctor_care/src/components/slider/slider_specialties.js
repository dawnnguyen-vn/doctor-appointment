import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import { settingSliderNotAuto } from '../../constants/setting_slider';
import { SpecialtyCard } from '../card/specialty_card';
import '../../styles/specialty.scss'

export const SliderSpecialty = () => {
    const [specialties, setSpecialties] = useState(null);

    useEffect(() => {
      getContentFromURL(
        "/data.json"
      );
      return () => {};
    },[]);
  
    const getContentFromURL = (url) => {
      fetch(url)
        .then((res) =>res.json())
        .then(data =>setSpecialties(data.specialties))
        .catch(
          err => alert(err)
        );
    };
    
    return specialties && (
      <div className="specialties">
        <div className="container">
        <h1>Chuyên khoa phổ biến</h1>
          <Slider {...settingSliderNotAuto}>
            {specialties.map((e)=>(
              <SpecialtyCard key={e.id} description={e.description} title={e.name} imageURL={e.imageURL}/>
            ))}
          </Slider>
        </div>
      </div>
    )
}
