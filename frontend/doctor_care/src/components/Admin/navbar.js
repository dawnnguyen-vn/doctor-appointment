import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon_Menu } from "../../constants/icons";
import "../../styles/navbar.scss";


export const NavBarAdmin = () => {

    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
      if(showMenu){
        document.getElementById('menu').addEventListener('click', function(){
          setShowMenu(false)
        });
        
        document.getElementById('menu-content').addEventListener('click', function(e){
          e.stopPropagation()
        });
      }
      return () => {
      };
    });
  return (
    <div className="navbar">
      <div style={showMenu?{display:"block"}:{display:"none"}} id="menu" className="menu">
        <div id="menu-content" className="menu-content">
          <ul>
            <li><Link to={"/#"}>Trang chủ </Link></li>
            <li><Link to={"/#"}>Cẩm nang</Link></li>
            <li><Link to={"/#"}>Liên hệ hợp tác</Link></li>
            <li><Link to={"/#"}>Quy chế hoạt động</Link></li>
            <li><Link to={"/#"}>Câu hỏi thường gặp</Link></li>
            <li><Link to={"/#"}>Trang chủ </Link></li>
            <li><Link to={"/#"}>Cẩm nang</Link></li>
            <li><Link to={"/#"}>Liên hệ hợp tác</Link></li>
            <li><Link to={"/#"}>Quy chế hoạt động</Link></li>
            <li><Link to={"/#"}>Câu hỏi thường gặp</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-content">
        <div className="navbar-logo">
          <button onClick={()=>setShowMenu(!showMenu)} className="btn btn-menu">
            <Icon_Menu />
          </button>
          <a href="">
            <img
              className="logo"
              srcSet="https://theme.hstatic.net/1000115149/1000551146/14/logo.png?v=293 5x"
              alt=""
            />
          </a>
        </div>
        <div className="navbar-menu">
          <ul className="">
            <li className="menu-item">
              <Link to={"/#"}>
                <span>Chuyên khoa</span>
                <p>tìm bác sĩ theo chuyên khoa</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/#"}>
                <span>Cơ sở y tế</span>
                <p>Chọn bệnh viện phòng khám</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/#"}>
                <span>Bác sĩ</span>
                <p>Chọn bác sĩ giỏi</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/#"}>
                <span>Gói khám</span>
                <p>Khám sức khỏe tổng quát</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-sub">
          <Link to={"#"}>Hỗ trợ</Link>
        </div>
      </div>
    </div>
  )
}