import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon_Menu } from "../constants/icons";
import "../styles/navbar.scss";

export const Navbar = () => {
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
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <div className="navbar">
      <div
        style={showMenu ? { display: "block" } : { display: "none" }}
        id="menu"
        className="menu"
      >
        <div  id="menu-content" className="menu-content">
          <ul>
            <li>
              <Link to="/" >Trang chủ </Link>
            </li>
            {currentUser ? (
              currentUser.role.id == 2 ? (
                <li>
                  <Link to={"/admin/users"}>Trang Admin</Link>
                </li>
              ) : (
                <li>
                  <Link to={"/admin/booking"}>Trang bác sĩ</Link>
                </li>
              )
            ) : (
              <li>
                <Link to={"/login"}>Đăng nhập</Link>
              </li>
            )}
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
          <Link to="/">
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
              <Link to={"/#"}>
                <span>Chuyên khoa</span>
                <p>Tìm bác sĩ theo chuyên khoa</p>
              </Link>
            </li>
            
            <li className="menu-item">
              <Link to={"/#"}>
                <span>Bác sĩ</span>
                <p>Chọn bác sĩ giỏi</p>
              </Link>
            </li>
           
          </ul>
        </div>
        <div className="navbar-sub">
          <Link to={"/support"}>Hỗ trợ</Link>
        </div>
      </div>
    </div>
  );
};
