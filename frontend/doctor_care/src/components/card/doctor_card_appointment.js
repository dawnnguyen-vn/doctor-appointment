import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../../styles/card_doctor_appointment.scss";
import moment from "moment";

import { manageService } from "../../services/ManageService";
import "moment/locale/vi";
import * as ROUTES from "../../constants/routes";

export const DoctorCardAppointment = (props) => {
  const { doctor } = props;
  console.log(doctor);
  const [allDays, setAllDays] = useState([]);
  const [arrTime, setArrTime] = useState([]);
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState({});

  useEffect(() => {
    manageService.getDoctor(doctor.id).then((result) => {
      setDoctorInfo(result.data);
      manageService
        .getDoctorScheduleByDate({
          doctorId: result.data.id,
          date: moment(new Date()).startOf("day").valueOf(),
        })
        .then((result) => setArrTime(result.data))
        .catch((err) => console.log(err));
    });
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
      doctorId: doctorInfo.id,
      date: value,
    };
    manageService
      .getDoctorScheduleByDate(request)
      .then((result) => setArrTime(result.data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (schedule) => {
    console.log(schedule);
    console.log(doctor);
    navigate(ROUTES.BOOKING, { state: { schedule: schedule, doctor: doctorInfo } });
  };

  return (
    <div className="card_doctor_appointment">
      <div className="row">
        <div className="left_content col-6">
          <div className="row">
            <div className="image col-3">
              <img src={`${doctor.image}`} alt="" />
              <Link to={`/doctor/${doctor.id}`}>Xem thêm</Link>
            </div>
            <div className="title col-9">
              <h2> {doctorInfo.position},Bác sĩ {doctor.lastName} {doctor.firstName}</h2>
              Chuyên gia về Thần kinh Sọ não và Cột sống Nguyên Phó chủ tịch Hội
              Phẫu thuật Thần kinh Việt Nam Bác sĩ khám cho người bệnh từ 13
              tuổi trở lên
            </div>
          </div>
        </div>
        <div className="right_content col-6">
          <select onChange={(e) => handleSelectChange(e)} name="" id="">
            {allDays &&
              allDays.length > 0 &&
              allDays.map((e, index) => (
                <option key={index} value={e.value}>
                  {e.lable}
                </option>
              ))}
          </select>
          <div
            style={{ paddingBottom: "15px", borderBottom: "1px solid #999" }}
          >
            <h4 style={{ fontSize: "15px", textTransform: "uppercase" }}>
              Lịch khám
            </h4>
            <div className="time-options">
              {arrTime &&
                arrTime.length > 0 &&
                arrTime.map((e, index) => (
                  <button onClick={() => handleSubmit(e)} key={e.id}>
                    {e.name}
                  </button>
                ))}
            </div>
          </div>
          <div className="info_doctor">
            <div className="address">
              <h4>Địa chỉ khám</h4>
              <Link
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginLeft: "5px",
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
              <h4 style={{ display: "inline" }}>Loại bảo hiểm áp dụng : </h4>
              <Link to={`/bao-hiem`}>Xem chi tiết</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
