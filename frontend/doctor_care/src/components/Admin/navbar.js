import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon_Menu } from "../../constants/icons";
import "../../styles/navbar.scss";
import { LogoutAction } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { manageService } from "../../services/ManageService";

export const NavBarAdmin = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userLogin"));
  const [doctorInfo,setDoctorInfo] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (showMenu) {
      document.getElementById("menu").addEventListener("click", function () {
        setShowMenu(false);
      });

      document
        .getElementById("menu-content")
        .addEventListener("click", function (e) {
          e.stopPropagation();
        });
    }
    return () => {};
  });
  useEffect(() => {
    user.role.id === 1 && manageService.getDoctorByEmail(user.email).then((result)=>{
      setDoctorInfo(result.data);
    })
  }, []);
  const logout = () => {
    dispatch(LogoutAction());
  };
  return (
    <div className="navbar">
      <div
        style={showMenu ? { display: "block" } : { display: "none" }}
        id="menu"
        className="menu"
      >
        <div id="menu-content" className="menu-content">
          {user.role.id===2?(
            <ul>
            <li>
              <Link to={"/admin/specialties"}>Chuyên khoa </Link>
            </li>
            <li>
              <Link to={"/admin/users"}>Bác sĩ</Link>
            </li>
            <li>
              <Link to={"/admin/specialty-info"}>Thông tin chi tiết chuyên khoa</Link>
            </li>
            <li>
              <Link to={"/admin/info"}>Thông tin chi tiết bác sĩ</Link>
            </li>
            <li>
              <Link to={"/admin/schedule"}>Quản lý lịch hẹn</Link>
            </li>
            <li>
              <Link to={"/admin/patient"}>Hồ sơ bệnh án</Link>
            </li>
          </ul>
          ):(
            <ul>
            <li>
              <Link to={"/admin/booking"}>Quản lý lịch khám </Link>
            </li>
            <li>
              <Link to={"/admin/info"}>Thông tin chi tiết</Link>
            </li>
            <li>
              <Link to={"/admin/schedule"}>Quản lý lịch hẹn</Link>
            </li>
          </ul>
          )}
        </div>
      </div>
      <div className="navbar-content">
        <div className="navbar-logo">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn btn-menu"
          >
            <Icon_Menu />
          </button>
          <Link to={"/"}>
            <img
              className="logo"
              srcSet="https://theme.hstatic.net/1000115149/1000551146/14/logo.png?v=293 5x"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-menu">
          <ul className="">
            <li className="menu-item">
              <Link to={"/admin/users"}>
                <span>Bác sĩ</span>
                <p>Quản lý danh sách bác sĩ</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/admin/specialties"}>
                <span>Chuyên khoa</span>
                <p>Quản lý danh sách chuyên khoa</p>
              </Link>
            </li>
            <li className="menu-item">
              <Link to={"/admin/clinic"}>
                <span>Phòng khám</span>
                <p>Quản lý danh sách phòng khám</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-sub">
          {user.role.id===1&&
            <div className="user-info">
                <img style={{width:"50px",height:"50px", objectFit:"contain"}} className="avatar" srcSet={`${doctorInfo.image} 5x`} alt="" />
                Dr.{doctorInfo.firstName}
            </div>
          }
          <button onClick={logout} className="btn-logout">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};
