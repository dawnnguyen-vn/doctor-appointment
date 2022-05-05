import axios from "axios";
import { domain } from "../constants/setting_api";

export class BookingService {
  createBooking = (booking) => {
    return axios({
      url: `${domain}/booking/create`,
      method: "POST",
      data: booking,
    });
  };
  verifyBooking(token) {
    return axios({
      url: `${domain}/booking/verify/${token}`,
      method: "PUT",
    });
  };
  getForDoctor(doctorDTO) {
    return axios({
      url: `${domain}/booking/doctor`,
      method: "POST",
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: doctorDTO,
    });
  }
  doctorVerifyBooking(data) {
    return axios({
      url: `${domain}/booking/doctor/verify`,
      method:"POST",
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data:data
    })
  };
}

export const bookingService = new BookingService();
