import axios from "axios";
import { domain } from "../constants/setting_api";


export class ManageService{
    getListOfSpecialty(){
        return axios({
            url:`${domain}/specialty/all`,
            method:"GET"
        })
    }
    getSpecialtyById(id){
        return axios({
            url:`${domain}/specialty/${id}`,
            method:"GET"
        })
    }
}
export const manageService = new ManageService();