import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import { settingSlider } from '../constants/setting_slider';
import { CardImage } from './card_image';
import '../styles/specialty.scss'

export const Specialty = () => {
    const [specialties, setSpecialties] = useState(null);

    useEffect(() => {
      getContentFromURL(
        "/data.json"
      );
      return () => {};
    }, []);
  
    const getContentFromURL = (url) => {
      fetch(url)
        .then((res) =>res.json())
        .then(data =>setSpecialties(data.specialties))
        .catch(
          err => alert(err)
        );
    };
  
    console.log(specialties)
  
    return specialties && (
      <div className="specialties">
        <div className="container">
        <h1>Chuyên khoa phổ biến</h1>
          <Slider {...settingSlider}>
            {specialties.map((e)=>(
              <CardImage key={e.id} description={e.description} title={e.name} imageURL={e.imageURL}/>
            ))}
          </Slider>
        </div>
      </div>
    )
}
