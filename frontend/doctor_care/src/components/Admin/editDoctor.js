import React, { useEffect } from "react";
import "../../styles/admin/add_specialty.scss";
import { useState } from "react";
import { manageService } from "../../services/ManageService";
import swal from "sweetalert";
import { Select } from "@material-ui/core";
import { userService } from "../../services/UserService";

export default function EditDoctor() {

  let [state, setState] = useState({
    values: {
      id: 0,
      firstName: "",
      lastName: "",
      phone: "",
      gender: "true",
      image:"",
      clinicId: '1',
      specialtyId: '1',
      positionId:'1',
      user:  {
        id: 0,
        email: "",
        password: "",
        role: null,
      }
    },
    errors: {},
  });

  const [positions, setPositions] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    manageService.getListOfSpecialty()
    .then((result)=>setSpecialties(result.data.data))
    .catch((err)=>{
      alert(err);
    });
    userService.getAllPosition()
    .then((result)=>setPositions(result.data))
    .catch((err)=>{
      alert(err);
    });
  }, []);


  const handleChangeUserInput = (event)=>{
    event.preventDefault();
    let { value, name } = event.target;
    
    let newValue = {
      ...state.values,
        ['user']:{...state.values.user,[name]:value},
    }
    setState({...state,['values']:newValue})
  }
  const handleChangeInput = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    let newValues = {
      ...state.values,
      [name]:value,
    };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "không được bỏ trống!" : "",
    };
    setState({ values: newValues, errors: newErrors });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let { values, errors } = state;

    console.log(">>>doctor",state);
 
    userService
        .createNewDoctor(values)
        .then((res) => {
          swal({
            title: "Thêm tin thành công",
            icon: "success",
            button: "OK",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err.response);
          swal({
            title: err.response.data,
            text: "Điền lại thông tin!",
            icon: "warning",
            button: "OK",
          });
        });
  };
  return (
    <div
      className="modal fade"
      id="addDoctorModal"
      tabIndex={-1}
      aria-labelledby="addDoctorMoal"
      aria-hidden="true"
    >
      <div
        style={{ maxWidth: "1000px" }}
        className="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNewsModalTitle">
              Thêm bác sĩ
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="user-form">
              <div className="row">
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Tên</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Họ</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Số điện thoại</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="textb">
                    <input
                      type="text"
                      name="email"
                      // value={state.values.user.email}
                      onChange={handleChangeUserInput}
                      required
                    />
                    <div className="placeholder">Email</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="textb">
                    <input
                      type="text"
                      // value={state.values.user.password}
                      name="password"
                      onChange={handleChangeUserInput}
                      required
                    />
                    <div className="placeholder">Mật khẩu</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="textb">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeInput}
                      name="gender"
                    >
                      <option value={"true"}>Nam</option>
                      <option value={"false"}>Nữ</option>
                    </select>
                  <div className="placeholder">Giới tính</div>
                  <span className="text-danger">
                    {/* {this.state.errors.hinhAnh} */}
                  </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <select
                      name="positionId"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeInput}
                    >
                      {positions.map((item,index)=>(
                        <option key={index} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                    <div className="placeholder">Chức danh</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="textb">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeInput}
                      name="specialtyId"
                    >
                      {specialties.map((item)=>(<option value={item.id}>{item.name}</option>))}
                    </select>
                  <div className="placeholder">Chuyên khoa</div>
                  <span className="text-danger">
                    {/* {this.state.errors.hinhAnh} */}
                  </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="image"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Ảnh đại diện</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
              </div>
              <button className="btn ">
                <h3>Thêm</h3>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
