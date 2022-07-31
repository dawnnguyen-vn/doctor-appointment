import axios from "axios";
import { domain } from "../constants/setting_api";

export class ManageAdminService{
      addSpecialty = (specialty) => {
        return axios({
          url: `${domain}/specialty/create`,
          method: "POST",
          data: specialty,
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
      };
      updateSpecialty = (id, specialty) => {
        return axios({
          url: `${domain}/specialty/${id}`,
          method: "PUT",
          data: specialty,
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
      };
      deleteSpecialty = (id) => {
        return axios({
          url: `${domain}/specialty/${id}`,
          method: "DELETE",
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
      };

      
}

export const manageAdminService = new ManageAdminService();