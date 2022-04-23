import React from "react";
import "../../styles/admin/add_specialty.scss";
import { useState } from "react";
import { manageAdminService } from "../../services/ManageAdminService";
import swal from "sweetalert";
import { Select } from "@material-ui/core";

// "id": 0,
//     "firstName": "danh",
//     "lastName": "Nguyen cong",
//     "phone": "0376263052",
//     "gender":"true",
//     "clinicId": 1,
//     "specialtyId":1,
//     "user": {
//         "id": 0,
//         "email": "danh35@gmail.com",
//         "password": "1234",

//         "role": null
//}
export default function AddDoctor() {
  let [state, setState] = useState({
    values: {
      id: 0,
      firstName: "",
      lastName: "",
      phone: "",
      gender: "true",
      clinicId: 1,
      specialtyId: 1,
      user: {
        id: 0,
        email: "danh35@gmail.com",
        password: "1234",
        role: null,
      },
    },
    errors: {},
  });
  const handleChangeInput = (event) => {
    event.preventDefault();
    let { value, name } = event.target;
    let newValues = {
      ...state.values,
      [name]: value,
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

    for (let key in values) {
      if (values[key] === "") {
        // kiểm tra lỗi
        valid = false;
      }
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      alert("thông tin không hợp lệ");
      return;
    } else {
      manageAdminService
        .addSpecialty(values)
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
    }
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
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Tên chuyên khoa</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Tên chuyên khoa</div>
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
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Số điện thoại</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Email</div>
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
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                      <option value={true}>Khác</option>
                    </select>
                  </div>
                  <div className="placeholder">Giới tính</div>
                  <span className="text-danger">
                    {/* {this.state.errors.hinhAnh} */}
                  </span>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value={1}>Phòng khám đa khoa Thủ Đức</option>
                      <option value={2}>Phòng khám Medic Bình Dương</option>
                    </select>
                    <div className="placeholder">clinicId</div>
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
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value={true}>Cơ xương khớp</option>
                      <option value={false}>Tim mạch</option>
                      <option value={true}>Nam khoa</option>
                    </select>
                  </div>
                  <div className="placeholder">Chuyên khoa</div>
                  <span className="text-danger">
                    {/* {this.state.errors.hinhAnh} */}
                  </span>
                </div>
                <div className="col-6">
                  <div className="textb">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChangeInput}
                      required
                    />
                    <div className="placeholder">Image</div>
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
