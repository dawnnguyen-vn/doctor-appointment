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

  getBooking = (phone) => {
    return axios({
      url: `${domain}/booking/patient/${phone}`,
      method: "GET",
    });
  };

  verifyBooking(token) {
    return axios({
      url: `${domain}/booking/verify/${token}`,
      method: "PUT",
    });
  };
  getForDoctor(doctorDTO,status) {
    return axios({
      url: `${domain}/booking/doctor/${status}`,
      method: "POST",
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: doctorDTO,
    });
  }
  getForClinic(clinicDTO,status) {
    return axios({
      url: `${domain}/booking/clinic/${status}`,
      method: "POST",
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: clinicDTO,
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
