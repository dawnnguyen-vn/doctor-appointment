import React from "react";
import { Link } from "react-router-dom";
import "../../styles/doctor_card.scss"

export const DoctorCard = () => {
  return (
    <div style={{width:"280px",height:"245px"}} className="">
    <Link to={"/login"}>
        <div className="doctor-card" >
        <img srcSet="/images/huucanh0511.jpg 5x" alt="" />
        <h3 className="mt-3 ml-3 mr-3 mb-2">Phó Giáo sư,Tiến sĩ,Bác sĩ cao cấp Nguyễn Hữu Cảnh</h3>
        <p>Cơ xương khớp</p>
        </div>
    </Link>
    </div>
  );
};
