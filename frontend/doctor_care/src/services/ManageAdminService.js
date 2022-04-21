import axios from "axios";
import { domain } from "../constants/setting_api";

export class ManageAdminService{
      addSpecialty = (specialty) => {
        return axios({
          url: `${domain}/specialty/create`,
          method: "POST",
          data: specialty,
        });
      };
      updateSpecialty = (id, specialty) => {
        return axios({
          url: `${domain}/specialty/${id}`,
          method: "PUT",
          data: specialty,
        });
      };
      deleteSpecialty = (id) => {
        return axios({
          url: `${domain}/specialty/${id}`,
          method: "DELETE",
        });
      };

}

export const manageAdminService = new ManageAdminService();