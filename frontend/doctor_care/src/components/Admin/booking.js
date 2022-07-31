import React, { useEffect, useState } from "react";
import { manageService } from "../../services/ManageService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import swal from "sweetalert";
import { Paper } from "@material-ui/core";
import "../../styles/admin/booking.scss";
import { bookingService } from "../../services/BookingService";
import moment from "moment";
import { VerifyBookingModal } from "./verifyBookingModal";

export const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [doctorSelected, setDoctorSelected] = useState(null);
  const [clinicSelected, setClinicSelected] = useState(null);

  const [allDays, setAllDays] = useState([]);
  const currenUser = JSON.parse(localStorage.getItem("userLogin"));
  const tabs = [
    {
      type: "NEW",
      name: "Chờ duyệt",
    },
    {
      type: "CONFIRM",
      name: "Đã duyệt",
    },
    {
      type: "CHECKED",
      name: "Đã khám",
    },
    {
      type: "FAILED",
      name: "Từ chối",
    },
  ];
  const [type, setType] = useState("NEW");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  useEffect(() => {
    const setDoctor = async () => {
      await manageService.getDoctorByEmail(currenUser.email).then((result) => {
        setDoctorSelected(result.data);
        let request = {
          doctorId: result.data.id,
          date: new Date().setHours(0, 0, 0, 0),
        };
        bookingService
          .getForDoctor(request, type)
          .then((result) => {
            console.log(result.data);
            setBookings(result.data);
          })
          .catch((err) => alert("booking for doctor is null"));
      });
    };
    const setClinic = async () => {
      await manageService.getClinicByAdminId(currenUser.id).then((result) => {
        setClinicSelected(result.data);
        let request = {
          clinicId: result.data.id,
          date: new Date().setHours(0, 0, 0, 0),
        };
        bookingService
          .getForClinic(request, type)
          .then((result) => {
            console.log(result.data);
            setBookings(result.data);
          })
          .catch((err) => alert("booking for clinic is null"));
      });
    };
    if (currenUser.role.name == "DOCTOR") setDoctor();
    else setClinic();

    createArrDate();
  }, [type]);

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
    if (currenUser.role.name == "DOCTOR"){
    let request = {
      doctorId: doctorSelected.id,
      date: value,
    };
    bookingService
      .getForDoctor(request,type)
      .then((result) => {
        console.log(result.data);
        setBookings(result.data);
      })
      .catch((err) => console.log(err));
    }else{
      let request = {
        clinicId: clinicSelected.id,
        date: value,
      };
      bookingService
        .getForClinic(request,type)
        .then((result) => {
          console.log(result.data);
          setBookings(result.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleConfirm = () => {};

  const renderListOfBooking = () => {
    return (
      bookings &&
      bookings
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((booking) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={booking.id}>
              <TableCell>
                <div className="news__description">{booking.time.name}</div>
              </TableCell>
              <TableCell>
                <div className="news__description">
                  {booking.patient.reason}
                </div>
              </TableCell>
              <TableCell>{booking.patient.name}</TableCell>
              <TableCell>{booking.patient.phone}</TableCell>
              <TableCell>{booking.patient.email}</TableCell>
              {/* <TableCell>
                {booking.patient.address}
              </TableCell> */}
              <TableCell>{booking.patient.yearOfBirth}</TableCell>
              <TableCell>
                <button
                  onClick={(e) => handleConfirm()}
                  data-toggle="modal"
                  data-target="#verifyBooking"
                  className="btn"
                >
                  Xác nhận
                </button>
                <VerifyBookingModal
                  bookingId={booking.id}
                  patient={booking.patient}
                ></VerifyBookingModal>
              </TableCell>
            </TableRow>
          );
        })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      className="booking-admin"
      style={{ width: "100%", marginTop: "4.5em", padding: "20px" }}
    >
      <div className="header">
        <h2>Quản lý lịch khám bệnh</h2>
      </div>

      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tabs.map((tab) => (
          <li key={tab.type} className="nav-item">
            <button
              className={`nav-link ${tab.type == type ? "active" : ""}`}
              onClick={() => {
                setType(tab.type);
              }}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
      <select
        style={{ marginTop: "30px" }}
        onChange={(e) => handleSelectChange(e)}
        name=""
        id=""
      >
        {allDays &&
          allDays.length > 0 &&
          allDays.map((e, index) => (
            <option key={index} value={e.value}>
              {e.lable}
            </option>
          ))}
      </select>
      <TableContainer style={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Khung giờ</TableCell>
              <TableCell>Lý do khám</TableCell>
              <TableCell>Tên bệnh nhân</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              {/* <TableCell>Địa chỉ</TableCell> */}
              <TableCell>Năm sinh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderListOfBooking()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
