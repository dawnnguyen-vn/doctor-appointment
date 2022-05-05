import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorCardAppointment } from "../components/card/doctor_card_appointment";
import "../styles/specialty_info.scss";
import { manageService } from "../services/ManageService";

export const DetailSpecialTy = () => {
  let { id } = useParams();
  const [specialty,setSpecialty] = useState(null);
  const [markdown , setMarkdown] = useState({});
  const [isHiddenContent,setIsHiddenContent] = useState(true);

  useEffect(() => {
     const getSpecial = async () =>{
         await manageService.getSpecialtyById(id)
         .then( async (result)=>{
             await manageService.getSpecialtyMarkdown(result.data.data.id)
             .then((result)=>setMarkdown(result.data))
             .catch(err=>console.log(err))
             setSpecialty(result.data.data)
         })
         .catch((err)=>console.log(err));
     }
     getSpecial();
  }, []);


  return specialty && (
    <div className="specialty_info">
      <div style={{backgroundImage:`linear-gradient(rgba(255, 255, 255, 90%) 50%, rgba(255, 255, 255, 90%) 90%), url(${specialty.image})`}} className={`specialty_header ${isHiddenContent ? "":"show-content"}`}>
        <div className="container">
          <h2>{specialty.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: markdown.contentHTML }} className="content_markdown"/>
        </div>
          <div className="btn-read ">
            <div className="container">
            <a onClick={()=>setIsHiddenContent(!isHiddenContent)} >{isHiddenContent?"Xem thêm":"Ẩn bớt"}</a>
            </div>
          </div>
      </div>
      <div className="specialty_doctor_list">
        <div className="container">
            {specialty.doctors.map((e)=>
            (
                <DoctorCardAppointment key={e.id} doctor={e} />
            ))}
        </div>
      </div>
    </div>
  );
};
