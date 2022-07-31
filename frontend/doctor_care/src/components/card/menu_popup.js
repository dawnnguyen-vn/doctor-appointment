import { Link } from "@material-ui/core";
import React from "react";
import "../../styles/menu_popup.scss";

export default function MenuPopUp(props){

  const {arr,isShowMenu,setShowMenu,setSpecialtySelected} = props;
  const onCloseMenu = () =>{
    setShowMenu(false);
  }

  const onSelectedSpecialty = (e) =>{
    setSpecialtySelected(e);
    // console.log(e)
    setShowMenu(false);
  }

  return arr&&arr.length>0&&(
    <div style={isShowMenu?{display:"block"}:{display:"none"}} className="menu_popup">
      <div className="menu_popup-navbar">
        <Link to={""} onClick={onCloseMenu}>
          <img src="https://img.icons8.com/sf-black/64/000000/long-arrow-left.png" />
        </Link>
      </div>
      <div className="content">
        <ul className="list-items">
          {arr.map((e)=>(
            <li onClick={()=>onSelectedSpecialty(e)} key={e.id} className="item"><span>{e.name}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

