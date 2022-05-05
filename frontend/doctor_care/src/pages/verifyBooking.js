import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {bookingService} from "../services/BookingService"
import swal from "sweetalert";

export const VerifyBooking = () => {
  let { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      bookingService.verifyBooking(token)
      .then((result)=>{
        swal({
            title: "Thêm tin thành công",
            icon: "success",
            button: "OK",
          });
          navigate('/')
      }).catch((err)=>console.log(err));
      console.log(token);
  }, []);

  return (
    <div style={{ marginTop: "4.5em" }}>
      <h1>Xác nhận thành công</h1>
    </div>
  );
};
