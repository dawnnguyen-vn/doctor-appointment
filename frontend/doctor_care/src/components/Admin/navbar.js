import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon_Menu } from "../../constants/icons";
import "../../styles/navbar.scss";
import { LogoutAction } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

export const NavBarAdmin = () => {
  const dispatch = useDispatch();

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
          <ul>
            <li>
              <Link to={"/admin/specilaties"}>Chuyên khoa </Link>
            </li>
            <li>
              <Link to={"/admin/users"}>Bác sĩ</Link>
            </li>
          </ul>
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
          <button onClick={logout} className="btn-logout">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};
