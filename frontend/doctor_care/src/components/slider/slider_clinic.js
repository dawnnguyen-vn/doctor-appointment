import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import { settingSliderNotAuto } from '../../constants/setting_slider';
import { ClinicCard } from '../card/clinic_card';
import '../../styles/specialty.scss'
import { manageService } from "../../services/ManageService";

export const SliderClinic = () => {
    const [listOfClinic, setListOfClinic] = useState([]);

    useEffect(() => {
      manageService.getListOfClinic()
      .then((result)=>{
        setListOfClinic(result.data)
      })
      .catch((err)=>console.log(err))
      return () => {};
    },[]);
  
   let arr = listOfClinic.concat(listOfClinic).concat(listOfClinic);

    return listOfClinic && listOfClinic.length>0 ?(
      <div className="specialties">
        <div className="container">
        <h1>Phòng khám nổi bật</h1>
          <Slider {...settingSliderNotAuto}>
            {arr.map((e)=>(
              <ClinicCard key={e.id} id={e.id} address={e.address} title={e.name} imageURL={e.image}/>
            ))}
          </Slider>
        </div>
      </div>
    ):(<></>)
}
