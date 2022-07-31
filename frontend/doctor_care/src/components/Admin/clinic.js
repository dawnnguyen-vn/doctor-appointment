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
import "../../styles/admin/specialty.scss"
import { manageAdminService } from "../../services/ManageAdminService";
import AddClinic from "./addClinic";
import EditClinic from "./editClinic"
import AddInfoClinic from "./addInfoClinic";
import * as $ from 'jquery'

export const ManageClinic = () => {
  const [clinic, setClinic] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  console.log(localStorage.getItem("token"));
  useEffect(() => {
    manageService
        .getListOfClinic()
        .then((result) =>{
          console.log(result)
          setClinic(result.data)
        })
        .catch((err) => {
          console.log(err.response);
        });
    return () => {
    };
  }, []);

  const deleteClinic = (id) => {
    manageAdminService
    .deleteClinic(id)
    .then((result) =>{
      console.log(result);
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  useEffect(()=>{
    $("div[id^='addClinic']").each(function(){
  
      var currentModal = $(this);
      console.log(currentModal)
      //click next
      currentModal.find('.btn-next').on("click",function(){
        currentModal.closest("div[id^='addClinic']").first().removeClass("show");
        currentModal.closest("div[id^='addClinic']").first().hide();
        currentModal.closest("div[id^='addClinic']").nextAll("div[id^='addClinic']").first().addClass("show"); 
        currentModal.closest("div[id^='addClinic']").nextAll("div[id^='addClinic']").first().show(); 
      });
      
      //click prev
      currentModal.find('.btn-prev').on("click",function(){
        currentModal.modal('hide');
        currentModal.closest("div[id^='addClinic']").prevAll("div[id^='addClinic']").first().modal('show'); 
      });
    
    });
      
  },[])

  const renderListOfClinic = () => {
    return clinic && clinic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((clinic) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={clinic.id}>
          <TableCell>{clinic.id}</TableCell>
          <TableCell>
            <div className="news__description">{clinic.name}</div>
          </TableCell>
          <TableCell>
            <div className="news__description">{clinic.address}</div>
          </TableCell>
          <TableCell>
            <img
              src={clinic.image}
              style={{ width: "70px", height: "50px" }}
              alt={clinic.name}
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
                  data-target={`#d${clinic.id}`}
                ></i>
                <EditClinic clinic ={clinic}/>
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
                        deleteClinic(clinic.id);
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="specialty-admin" style={{width:"100%",marginTop:"4.5em"}}>
    <div className="header">
      <h2>Quản lý chuyên khoa</h2>
    </div>
    <button
      className="btnAdd mb-3"
      data-toggle="modal"
      data-target="#addClinic1"
    >
      <i className="fa fa-plus"></i>
      <h2>Thêm mới</h2>
    </button>
      <AddClinic />
      <AddInfoClinic />
    <TableContainer style={{maxHeight:"100%"}}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Desciption</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderListOfClinic()}</TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[4, 10, 25]}
      component="div"
      count={clinic.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </Paper>
  );
};
