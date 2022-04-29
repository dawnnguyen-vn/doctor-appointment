import axios from "axios";
import { domain } from "../constants/setting_api";

export class ManageService {
  getListOfSpecialty() {
    return axios({
      url: `${domain}/specialty/all`,
      method: "GET",
    });
  }
  getSpecialtyById(id) {
    return axios({
      url: `${domain}/specialty/${id}`,
      method: "GET",
    });
  }

  getDoctors = () => {
    return axios({
      url: `${domain}/doctor/all`,
      method: "GET",
    });
  };
  getDoctor = (doctorId) => {
    return axios.get(`${domain}/doctor/${doctorId}`);
  };
  updateDoctorMarkdown = (doctorId, markdown) => {
    return axios({
      url: `${domain}/doctor/markdown/${doctorId}`,
      method: "PUT",
      data: markdown,
    });
  };
  addDoctorMarkdown = (markdown) => {
    return axios({
      url: `${domain}/doctor/markdown`,
      method: "POST",
      data: markdown,
    });
  };
  getDoctorMarkdown = (doctorId) => {
    return axios({
      url: `${domain}/doctor/markdown/${doctorId}`,
      method: "GET",
    });
  };
  getDoctorScheduleByDate(doctorAndDate) {
    return axios({
        url: `${domain}/doctor/schedule`,
        method: "POST",
        data: doctorAndDate,
      });
  }
}
export const manageService = new ManageService();
