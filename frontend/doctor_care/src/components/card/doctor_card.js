import React from "react";
import { Link } from "react-router-dom";
import "../../styles/doctor_card.scss"

export const DoctorCard = ({doctor}) => {

  return (
    <div style={{width:"280px",height:"245px"}} className="">
    <Link to={"/login"}>
        <div className="doctor-card" >
        <img srcSet={`${doctor.image} 5x`} alt="" />
        <h3 className="mt-3 ml-3 mr-3 mb-2">{doctor.positon} , {doctor.lastName} {doctor.firstName}</h3>
        <p>{doctor.clinic.name}</p>
        <p>{doctor.specialty.name}</p>
        </div>
    </Link>
    </div>
  );
};
