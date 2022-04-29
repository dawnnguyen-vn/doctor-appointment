

import axios from "axios";
import { domain } from "../constants/setting_api";

export class ManageSchedule{
   
    getAllTimes = () =>{
        return axios(
          {
            url: `${domain}/schedule/times`,
            method:"GET",
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token"),
            }
          }
        )
      }
    saveAllScheduel = (scheduels) =>{
        return axios(
          {
            url: `${domain}/schedule/`,
            method:"POST",
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            data:scheduels
          }
        )
      }
      
}

export const manageSchedule = new ManageSchedule();