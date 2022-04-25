import React, { useEffect, useState } from "react";
import "../styles/doctor-info.scss";
import { manageService } from "../services/ManageService";
import { useNavigate, Link,useParams  } from "react-router-dom";

export const DoctorPage = () => {
  const [doctor, setDoctor] = useState({});
  const [markdown, setMarkdown] = useState({});
  let { id } = useParams(); 


  console.log(markdown);
  useEffect(() => {
    manageService
      .getDoctor(id)
      .then((result) => {
        console.log(">>>result", result);
        setDoctor(result.data);
      })
      .catch((err) => alert(err));
    manageService
      .getDoctorMarkdown(id)
      .then( (result) => {
        setMarkdown(result.data);
    })
    .catch((err) => alert(err));
  }, []);

  if(document.getElementById("desctiption-info"))
  document.getElementById("desctiption-info").innerHTML=markdown.contentHTML;

  return (
    <div className="doctor">
      {doctor.id && (
        <div className="container">
          <div className="doctor-info-header">
            <Link to={"/"}>Trang chủ</Link>
            {" / "}
            <Link to={"/specialty"}>Khám chuyên khoa</Link>
            {" / "}
            <Link to={`/specialty/${doctor.specialty.id}`}>
              Khoa {doctor.specialty.name}
            </Link>
          </div>
          <div className="doctor-info">
            <img style={{maxWidth:"200px",maxHeight:'200px'}} src={`${doctor.image}`} alt="" />
            <div className="content">
              <h2>
                {doctor.positon} , Bác sĩ chuyên khoa{" "}
                {doctor.specialty.name.toLowerCase()} {doctor.lastName}{" "}
                {doctor.firstName}
              </h2>
              <p>{markdown.description}</p>
            </div>
          </div>
          <div className="schedule">
              <div className="row">
                  <div className="col-6">
                      lịch khám
                  </div>
                  <div className="col-6 address">
                      <h4>Địa chỉ khám</h4>
                      <Link style={{display:"block"}} to={`/clinic/${doctor.clinic.id}`}>{doctor.clinic.name}</Link> 
                      <h4 style={{display:"inline"}}>Giá khám : </h4>
                      <span>250.000đ</span>
                      <br />
                      <h4 style={{display:"inline"}} >Loại bảo hiểm áp dụng : </h4>
                      <Link to={`/bao-hiem`}>Xem chi tiết</Link> 
                  </div>
              </div>
          </div>
          <div dangerouslySetInnerHTML={{__html:markdown.contentHTML}} className="desctiption-info">
          </div>
        </div>
      )}
    </div>
  );
};
