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
import { manageAdminService } from "../../services/ManageAdminService";
import "../../styles/admin/specialty.scss"
import AddDoctor from "./addDoctors";

export const Users = () => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  useEffect(() => {
    manageService
        .getDoctors()
        .then((result) =>{
          console.log(result);
          setDoctors(result.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    return () => {
    };
  }, []);

  const getContentFromURL = (url) => {
    fetch(url)
      .then((res) =>res.json())
      .then(data =>setDoctors(data.doctors))
      .catch(
        err => alert(err)
      );
  };
  const renderTable = () => {
    return doctors && doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((doctor) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={doctor.id}>
          <TableCell>{doctor.id}</TableCell>
          <TableCell>
            <div className="news__description">{doctor.firstName}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.lastName}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.phone}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.user.email}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.gender?"man":"woman"}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.clinicId}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{doctor.specialtyId	}</div>
          </TableCell>
          <TableCell>
            <img
              src={"https://cdn.bookingcare.vn/fr/w200/2021/01/21/142313-bs-tran-huu-binh.jpg"}
              style={{ width: "70px", height: "50px" }}
              alt={doctor.image}
            />
          </TableCell>
          <TableCell>
            <div style={{ display: "flex",fontSize:"2em"}}>
              <div className="edit-action mr-2 ">
                <i
                  style={{
                    cursor: "pointer",
                    color: "#60c5ef",
                  }}
                  className="fa fa-edit"
                  data-toggle="modal"
                  data-target={`#d${doctor.id}`}
                ></i>
                {/* <Editdoctors doctors ={doctor}/> */}
              </div>
              <div className="delete-action">
                <i
                  style={{ cursor: "pointer", color: "#fb4226",fontSize:"1em" }}
                  className="fa fa-trash"
                  onClick={() => {
                    swal({
                      title: "Bạn chắc chứ?",
                      text: `Xoá tin này`,
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    }).then((willDelete) => {
                      if (willDelete) {
                        // deleteDoctors(doctor.id);
                      }
                    });
                  }}
                ></i>
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    });
  }
   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper
      className="specialty-admin"
      style={{ width: "100%", marginTop: "4.5em" }}
    >
      <div className="header">
        <h2>Doctors Manage</h2>
      </div>
      <button
        className="btnAdd mb-3"
        data-toggle="modal"
        data-target="#addDoctorModal"
      >
        <i className="fa fa-plus"></i>
        <h2>Add new</h2>
      </button>
      <AddDoctor/>
      <TableContainer style={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Frist Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>clinicId</TableCell>
              <TableCell>specialtyId</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTable()}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 10, 25]}
        component="div"
        count={doctors&&doctors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
