import axios from "axios";
import { useState } from "react";
import { domain } from "../constants/setting_api";

function useUploadImage() {

    const [stateImage,setStateImage] = useState({
        fileupload:null,
        imageReview:null
    })
    const{fileUpload} = stateImage;



    const onUploadImage = async () => {
        let formData = new FormData();
        formData.append("file", fileUpload.files[0]);
    
        let response = await axios.request( {
          url:`${domain}/image/upload`,
            method: "POST",
            data: formData,
            onUploadProgress: (progressEvent)=>{
              const {loaded,total} = progressEvent;
              let percent = Math.floor((loaded*100)/total);
              console.log(`${loaded}kb of ${total}kb | ${percent}%`);
            }
          });
    
          if (response.status === 200) {
          alert("File successfully uploaded.");
        }
      };
    const onImageSelect = async (e)=>{
        setStateImage({
            fileUpload:e.target,
            imageReview:URL.createObjectURL(e.target.files[0])
        })
       
      }

    return { stateImage, onImageSelect,onUploadImage};
  }
  
  export default useUploadImage;
  