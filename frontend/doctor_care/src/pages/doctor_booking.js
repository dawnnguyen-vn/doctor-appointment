import React, { useState } from "react";
import "../styles/booking.scss";
import { useLocation,useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { bookingService } from "../services/BookingService";
import swal from "sweetalert";
import useLocationForm from "../hooks/useLocationForm";
import Select from "react-select";

export const BookingPage = () => {
  const { state } = useLocation();
  const { doctor, schedule } = state;
  const navigate = useNavigate();
  const {
    stateLocation,
    onCitySelect,
    onDistrictSelect,
    onWardSelect,
  } = useLocationForm(false);


  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard
  } = stateLocation;


  const [patient, setPatient] = useState({
    email: "",
    phone: "",
    name: "",
    reason: "",
    yearOfBirth: 0,
    address: "",
    gender: true,
  });

  const formatDate = (scheduleDate) => {
    let date = moment(scheduleDate).locale("vi").format("dddd - DD/MM");
    date = date.charAt(0).toUpperCase() + date.slice(1);
    return date;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(patient.address===''){
      swal({
        title: "Bạn chưa nhập địa chỉ",
        content:"Bạn chưa nhập địa chỉ",  
        icon: "error",
        button: "OK",
      }).then((result)=>{
      });
      return ;
    }

    let dataSubmit = {
      bookingStatus: "NEW",
      doctorId: doctor.id,
      clinicId: doctor.clinic.id,
      date: schedule.date,
      scheduleId : schedule.id,
      timeId: schedule.timeId,
      patient: patient,
    };

    
    alert("Đang tiến hành đặt lịch...");
    await bookingService
      .createBooking(dataSubmit)
      .then((result) => {
        swal({
          title: "Đặt lịch thành công !! Vui lòng kiểm tra email để xác nhận lịch hẹn !!",
          content:"Vui lòng kiểm tra email để xác nhận lịch hẹn !!",  
          icon: "success",
          button: "OK",
        }).then((result)=>{
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInput = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    let newValues = {
      ...patient,
      [name]: value,
    };

    setPatient(newValues);
  };

  console.log(patient);


  return (
    <div className="booking">
      <div className="booking-header">
        <div className="container">
          <img src={doctor.image} alt="" />
          <div className="header-title">
            <h3>Đặt lịch khám</h3>
            <h2>
              {doctor.position} , Bác sĩ chuyên khoa{" "}
              {doctor.specialty.name.toLowerCase()} {doctor.lastName}{" "}
              {doctor.firstName}
            </h2>
            <p>
              {schedule.name} - {formatDate(schedule.date)}
            </p>
          </div>
        </div>
      </div>
      <div className="booking-form">
        <div className="container">
          <form onSubmit={(e) => handleSubmit(e)} action="">
            <div>
              <label className="price" data-price="300000">
                <input
                  type="radio"
                  onChange={() => {}}
                  checked="checked"
                  name="price"
                  value="54"
                />
                <span>Giá khám</span>
                <div>300.000đ</div>
              </label>
            </div>
            <div className="input">
              <span className="dauvao-bt bt-g bt-g-nguoi"></span>
              <input
                className="input-name"
                name="name"
                onChange={(e) => handleChangeInput(e)}
                type="text"
                placeholder="Họ tên bệnh nhân (bắt buộc)"
                autoComplete="name"
                required
              />
            </div>
            <div className="input-name-title">
              Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ: Trần
              Văn Phú
            </div>
            <div className="">
              <label>
                <input
                  className="dauv"
                  type="radio"
                  name="gender"
                  onClick={(e) =>
                    setPatient({ ...patient, ["gender"]: e.target.value })
                  }
                  value={true}
                  dl-luu="gender"
                />{" "}
                Nam
              </label>
              <label>
                <input
                  className="dauv"
                  type="radio"
                  name="gender"
                  onClick={(e) =>
                    setPatient({ ...patient, ["gender"]: e.target.value })
                  }
                  value={false}
                  dl-luu="gender"
                />{" "}
                Nữ
              </label>
              <div className="dauvao-thongbao"></div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  className="input-name"
                  name="phone"
                  onChange={(e) => handleChangeInput(e)}
                  type="text"
                  placeholder="Số điện thoại liên hệ (bắt buộc)"
                  autoComplete="phone"
                  required
                />
              </div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  className="input-name"
                  onChange={(e) => handleChangeInput(e)}
                  name="yearOfBirth"
                  type="number"
                  placeholder="Năm sinh"
                  autoComplete="yearOfBirth"
                  required
                />
              </div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <input
                  className="input-name"
                  onChange={(e) => handleChangeInput(e)}
                  name="email"
                  type="email"
                  placeholder="Địa chỉ email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <Select
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  isDisabled={cityOptions.length === 0}
                  options={cityOptions}
                  onChange={(option) => {
                    onCitySelect(option);
                    setPatient({ ...patient, ["address"]: `${option.label}`})
                  }}
                  required
                  placeholder="Tỉnh/Thành"
                  defaultValue={selectedCity}
                />
              </div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <Select
                  name="districtId"
                  key={`districtId_${selectedDistrict?.value}`}
                  isDisabled={districtOptions.length === 0}
                  options={districtOptions}
                  onChange={(option) => {
                    onDistrictSelect(option)
                    setPatient({ ...patient, ["address"]: `${option.label},${patient.address}`})
                    }
                  }
                  required
                  placeholder="Quận/Huyện"
                  defaultValue={selectedDistrict}
                />
              </div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <Select
                  name="wardId"
                  key={`wardId_${selectedWard?.value}`}
                  isDisabled={wardOptions.length === 0}
                  options={wardOptions}
                  placeholder="Phường/Xã"
                  onChange={(option) => {
                    onWardSelect(option)
                    setPatient({ ...patient, ["address"]: `${option.label},${patient.address}`})
                    }
                  }
                  required
                  defaultValue={selectedWard}
                />
              </div>
              <div className="input">
                <span className="dauvao-bt bt-g bt-g-nguoi"></span>
                <textarea
                  name="reason"
                  onChange={(e) => handleChangeInput(e)}
                  className=""
                  placeholder="Lý do khám"
                  required
                ></textarea>
              </div>
            </div>
            <div className="input">
              <label>
                <input
                  className=""
                  style={{ display: "inline", width: "10px" }}
                  onChange={(e) => handleChangeInput(e)}
                  type="radio"
                  name="pay_type"
                  value="1"
                  checked="checked"
                />{" "}
                Thanh toán sau tại cơ sở y tế
              </label>
            </div>
            <div className="payment">
              <div className="container">
                <div className="gia-kham">
                  <h3>Giá khám </h3>
                  <h3>300.000đ</h3>
                </div>
                <div className="phi-dat-lich">
                  <h3>Phí đặt lịch </h3>
                  <h3>Miễn phí</h3>
                </div>
                <hr />
                <div className="total">
                  <h3>Tổng cộng</h3>
                  <h3 style={{ color: "red" }}>300.000đ</h3>
                </div>
              </div>
            </div>
            <div className="button-submit">
              <button className="btn">Đặt lịch</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
