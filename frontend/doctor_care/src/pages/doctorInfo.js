import React, { useEffect, useState } from "react";
import "../styles/doctor-info.scss";
import { manageService } from "../services/ManageService";
import { useNavigate, Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

export const DoctorPage = () => {
  const [doctor, setDoctor] = useState({});
  const [allDays, setAllDays] = useState([]);
  const [arrTime, setArrTime] = useState([]);

  let { id } = useParams();

  useEffect( () => {
     manageService
      .getDoctor(id)
      .then((result) => {
        setDoctor(result.data);
        manageService
          .getDoctorScheduleByDate({
            doctorId: result.data.id,
            date: moment(new Date()).startOf("day").valueOf(),
          })
          .then((result) => setArrTime(result.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err));
    createArrDate();
  }, []);
  const createArrDate = () => {
    let arrDate = [];
    moment.locale("vi");
    for (let i = 0; i < 7; i++) {
      let object = {};
      let lable = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      object.lable = lable.charAt(0).toUpperCase() + lable.slice(1);
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      arrDate.push(object);
    }
    setAllDays(arrDate);
  };

  const handleSelectChange = (e) => {
    const { value, lable } = e.target;
    let request = {
      doctorId: doctor.id,
      date: value,
    };
    manageService
      .getDoctorScheduleByDate(request)
      .then((result) => setArrTime(result.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (schedule) =>{
    console.log(schedule);
  }

  return (
    <div className="doctor">
      {doctor.id && (
        <div className="">
          <div style={{ backgroundColor: "white" }}>
            <div className="doctor-info-header">
              <div className="container">
                <Link to={"/"}>Trang chủ</Link>
                {" / "}
                <Link to={"/specialty"}>Khám chuyên khoa</Link>
                {" / "}
                <Link to={`/specialty/${doctor.specialty.id}`}>
                  Khoa {doctor.specialty.name}
                </Link>
              </div>
            </div>
            <div className="doctor-info">
              <div className="container">
                <img
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                  src={`${doctor.image}`}
                  alt=""
                />
                <div className="content">
                  <h2>
                    {doctor.positon} , Bác sĩ chuyên khoa{" "}
                    {doctor.specialty.name.toLowerCase()} {doctor.lastName}{" "}
                    {doctor.firstName}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: doctor.markdown.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
            <div className="container">
              <select onChange={(e) => handleSelectChange(e)} name="" id="">
                {allDays &&
                  allDays.length > 0 &&
                  allDays.map((e, index) => (
                    <option key={index} value={e.value}>
                      {e.lable}
                    </option>
                  ))}
              </select>
            </div>
            <div className="schedule">
              <div className="container">
                <h4 style={{ fontSize: "17px", textTransform: "uppercase" }}>
                  Lịch khám
                </h4>
                <div className="row">
                  <div className="col-6">
                    <div className="time-options">
                      {arrTime&&arrTime.length>0&&arrTime.map((e,index)=>(
                        <button onClick={()=>handleSubmit(e)} key={e.id}>{e.name}</button>
                      ))}
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="address">
                      <h4>Địa chỉ khám</h4>
                      <Link
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                        to={`/clinic/${doctor.clinic.id}`}
                      >
                        {doctor.clinic.name}
                      </Link>
                    </div>
                    <div className="price">
                      <h4 style={{ display: "inline" }}>Giá khám : </h4>
                      <span>250.000đ</span>
                    </div>
                    <div className="price">
                      <h4 style={{ display: "inline" }}>
                        Loại bảo hiểm áp dụng :{" "}
                      </h4>
                      <Link to={`/bao-hiem`}>Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="desctiption-info">
            <div
              dangerouslySetInnerHTML={{ __html: doctor.markdown.contentHTML }}
              className="container"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
