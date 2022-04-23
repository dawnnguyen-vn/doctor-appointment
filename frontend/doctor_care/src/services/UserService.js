import axios from "axios";
import { domain } from "../constants/setting_api";

export class UserService{
      login = (user) => {
        return axios({
          url: `${domain}/login`,
          method: "POST",
          data: user,
        });
      };

      getUserLogin = () =>{
        return axios(
          {
            url: `${domain}/user/userLogin`,
            method:"GET",
            headers:{
              Authorization: "Bearer " + localStorage.getItem("token"),
            }
          }
        )
      }
      getDoctors = ()=>{
        return axios({
          url:`${domain}/doctor/get`,
          method:"GET"
        })
      }
      existsUser = (username) =>{
        return axios({
          url: `${domain}/user/exist/${username}`,
          method: "GET",
        })
      }
}

export const userService = new UserService();