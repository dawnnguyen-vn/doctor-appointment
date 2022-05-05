import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import swal from "sweetalert";
import Select from "react-select";
import "../../styles/admin/schedule.scss";
import { manageService } from "../../services/ManageService";
import { manageSchedule } from "../../services/ManageSchedule";
import { ErrorNoData } from "../no_data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ManageSchedule = () => {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState();
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  const [dateSelected, setDateSelected] = useState(new Date());
  const [schedule , setSchedule] = useState({
      doctorId: "",
      date:dateSelected.setHours(0,0,0,0),
      timeId:"",
      name:""
  })
  useEffect(() => {
    if(currentUser&&currentUser.role.id==2){
      manageService
        .getDoctors()
        .then((result) => {
          let data = result.data.map((e) => {
            return {
              value: e,
              label: `Bác sĩ   ${e.lastName}  ${e.firstName}`,
            };
          });
          setDoctorOptions(data);
          setDoctorSelected(result.data[0]);
        })
        .catch((err) => {});
    }
    else{
      manageService
      .getDoctorByEmail(currentUser.email)
      .then((result) => {
        setDoctorSelected(result.data);
      })
      .catch((err) => {});
    }
      manageSchedule
      .getAllTimes()
      .then((result) => {
        let data = result.data.map((e) => ({ ...e, ["isSelected"]: false }));
        setTimeList(data);
      })
      .catch((err) => alert(err));

      
  }, []);

  const handleSelectChange = (selectedOption) => {
    setDoctorSelected(selectedOption.value);
    setSchedule({...schedule,["doctorId"]:selectedOption.value.id})
  };

  const handleSelectTime = (id) => {
    let data = timeList.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          ["isSelected"]: !e.isSelected,
        };
      } else {
        return e;
      }
    });
    return setTimeList(data);

  };

  const handleSubmit = () => {
        let result = [];
        let selectTimes = timeList.filter(item=>item.isSelected==true);
        
        if(selectTimes&&selectTimes.length>0){  
            selectTimes.map((e)=>{
              if(currentUser.role.id==2)
                result.push({...schedule,["id"]:0,["name"]:e.name,["timeId"]:e.id})
              else
                result.push({...schedule,["doctorId"]:doctorSelected.id,["id"]:0,["name"]:e.name,["timeId"]:e.id})
            })
            manageSchedule.saveAllScheduel(result)
            .then((result)=>{
              swal({
                title: "Thêm tin thành công",
                icon: "success",
                button: "OK",
              });
            })
            .catch((err)=>console.log(err))
        }else{
            alert("Bạn chưa chọn thời gian !")
        }

  }
  console.log("doctor select",doctorSelected)
  return (
    <Paper className="schedule-manage">
      <h2 className="text-center mb-5 ">Quản lý lịch hẹn khám bệnh</h2>
      {doctorSelected ? (
        <>
          <div className="row select-form">
            <div className="col-6" style={currentUser.role.id==1?{display:"none"}:{display:"block"}}>
              <Select
                className="select"
                name=""
                id=""
                options={doctorOptions}
                onChange={handleSelectChange}
              />
            </div>
            <div className="col-6">
              <DatePicker
                className="select"
                minDate={new Date()}
                selected={dateSelected}
                onChange={(date) =>{ setDateSelected(date)
                    setSchedule({...schedule,["date"]:date.setHours(0,0,0,0)})
                }}
              />
              <div className="placeholder">Chọn ngày</div>
            </div>
          </div>
          <div className="content">
            <div className="time-box">
              {timeList && timeList.length > 0 ? (
                timeList.map((e) => {
                  return (
                    <button className={`${e.isSelected?"btn-active":""}`} onClick={() => handleSelectTime(e.id)} key={e.id}>
                      {e.name}
                    </button>
                  );
                })
              ) : (
                <div>{`API`} not connected</div>
              )}
            </div>
          </div>
          <button onClick={()=>handleSubmit()} className="schedule-btn-save">
            Lưu thông tin
          </button>
        </>
      ) : (
        <ErrorNoData />
      )}
    </Paper>
  );
};
