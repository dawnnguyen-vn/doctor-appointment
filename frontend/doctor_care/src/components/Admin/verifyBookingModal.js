import React, { useState } from 'react'
import { getBase64 } from '../../helper/convertToBase64';
import { bookingService } from '../../services/BookingService';
import "../../styles/admin/booking.scss";
import swal from "sweetalert";


export const VerifyBookingModal = (props) => {
  const {patient,bookingId} = props;
  const [dataSend,setDataSend] = useState({
      fileName:"",
      imageContent:"",
      email: patient.email,
      bookingId:bookingId
  })
  
  const handleFileInputChange = async (e) => {
   let file = e.target.files[0];
    console.log(file);
    await getBase64(file)
      .then(result => {
        setDataSend({...dataSend,["imageContent"]: result.split(",")[1],["fileName"]:file.name})
      })
      .catch(err => {
        console.log(err);
      });
  };  
  console.log(dataSend);


  const handleSubmit = async () =>{
   await bookingService.doctorVerifyBooking(dataSend)
    .then((result)=>{
      swal({
        title: "Thêm tin thành công",
        icon: "success",
        button: "OK",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err)=>console.log(err));

  }

  return (
    <div
      className="modal fade"
      id="verifyBooking"
      tabIndex={-1}
      aria-labelledby="verifyBooking"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Gửi hóa đơn và xác nhận lịch khám
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
                <div className="col-12">
                  <div className="textb">
                    <input
                      type="email"
                      name="email"
                      onChange={(e)=>{}}
                      value={dataSend.email}
                      required
                      disabled
                    />
                    <div className="placeholder">Email</div>
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                  <div className="textb">
                    <input
                      type="file"
                      name="file"
                      onChange={(e)=>handleFileInputChange(e)}
                      required
                    />
                    <span className="text-danger">
                      {/* {this.state.errors.hinhAnh} */}
                    </span>
                  </div>
                </div>
              </div>
              <button style={{backgroundColor:""}} className="btn">
                  <h3>Xác nhận</h3>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
