import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { LoginAction } from "../redux/actions/userActions";
import {userService} from "../services/UserService"
import "../styles/login.scss";

export const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let [state, setState] = useState({
    values: {
      username: "",
      password: "",
    },
    errors: {
      username: "",
      username: "",
    },
  });

  // useEffect(() => {
  //   if (localStorage.getItem("userLogin")) {
  //     navigate("/admin/specialties");
  //     console.log(localStorage.getItem("userLogin"));
  //   }
  //   return () => {
  //   };
  // }, []);

  const [errors, setErrors] = useState("");

  const isInvalid =
    state.values.password === "" || state.values.username === "";

  const handleLogin = async (event) => {
    event.preventDefault();
    userService
      .login(state.values)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        userService.getUserLogin().then((res)=>{
          localStorage.setItem("userLogin", JSON.stringify(res.data.data));
          dispatch(LoginAction(res.data.data));
        })
        navigate("/admin/specialties");
      })
      .catch((err) => {
        userService.existsUser(state.values.username)
        .then((res)=>{
          console.log(res);
          res.data?
          setErrors("Sai mật khẩu !")
          :
          setErrors("Tài khoản không tồn tại !")
        })
        .catch((err)=>{
        })
      });
  };
  const handleChangeInput = (event) => {
    var { value, name } = event.target;
    let newValues = { ...state.values, [name]: value };
    let newErrors = {
      ...state.errors,
      [name]: value === "" ? "Không được bỏ trống!" : "",
    };
    setState({ values: newValues, errors: newErrors });
  };


 
  return (
    <div className="login">
      <div className="container">
        <div style={{ backgroundImage: "none" }} className="login-left-content">
          <img
            style={{ width: "100%", height: "auto" }}
            src="/images/banner1.jpg"
            alt=""
          />
        </div>
        <div className="login-right-content">
          <div className="border-content">
            <h1 style={{ color: "black" }} className="title">
              Doctor Care
            </h1>
            <p style={{ fontSize: "14px", color: "red", textAlign: "center" }}>
              {errors}
            </p>
            <form onSubmit={handleLogin} method="POST">
              <div className="login-form">
                <div className="form-row bg-gray">
                  <label className="input">
                    <span
                      className={`lable-text ${
                        state.values.username !== "" && "focus"
                      }`}
                    >
                      Số điện thoại, tên người dùng hoặc email
                    </span>
                    <input
                      aria-label="Số điện thoại, tên người dùng hoặc email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      className="form-input"
                      onChange={(e) => handleChangeInput(e)}
                      value={state.values.username}
                      maxLength="75"
                      name="username"
                      type="text"
                    />
                  </label>
                </div>
                <div className="form-row bg-gray">
                  <label className="input">
                    <span
                      className={`lable-text ${
                        state.values.password !== "" && "focus"
                      }`}
                    >
                      Mật khẩu
                    </span>
                    <input
                      className="form-input"
                      aria-label="Mật khẩu"
                      aria-required="true"
                      autoCapitalize="off"
                      onChange={(e) => handleChangeInput(e)}
                      autoCorrect="off"
                      maxLength="75"
                      value={state.values.password}
                      name="password"
                      type="password"
                    />
                    <a
                      className="btn-show-pw"
                      style={
                        state.values.password !== ""
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      onClick={(e) => {
                        const passwordInput =
                          document.getElementsByName("password");
                        if (passwordInput[0].type == "text") {
                          passwordInput[0].setAttribute("type", "password");
                          e.target.innerText = "Hiển thị";
                        } else {
                          passwordInput[0].setAttribute("type", "text");
                          e.target.innerText = "Ẩn";
                        }
                      }}
                    >
                      Hiển thị
                    </a>
                  </label>
                </div>
                <div className="form-row">
                  <button
                    className={`btn-login ${isInvalid && "btn-notInvalid"}`}
                    type="submit"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="form-row">
                  <div className="hr-text">
                    <div className="hr"></div>
                    <div className="text">HOẶC</div>
                    <div className="hr"></div>
                  </div>
                </div>
              </div>
              <div className="form-row text-center">
                <img srcSet="/images/icons/icons-fb.png 3x" alt="" />
                <div className="text">
                  <a className="text-login-fb" href="#">
                    Đăng nhập bằng facebook
                  </a>
                </div>
              </div>
              <div className="form-row text-center">
                <div className="text">
                  <a className="text-forget-pw" href="#">
                    Quên mật khẩu ?
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="border-content">
            <div className="sub-right-content">
              <h2>Bạn chưa có tài khoản sao ? </h2>
              <Link className="link" to={"/singup"}>
                Đăng ký
              </Link>
            </div>
          </div>
          <div className="bottom-right-content">
            Tải ứng dụng
            <div className="btns-dowload">
              <div className="btn-download">
                <a href="#">
                  <img
                    srcSet="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_vietnamese-vi.png/3025bd262cee.png 2x"
                    alt=""
                  />
                </a>
              </div>
              <div className="btn-download">
                <a href="#">
                  <img
                    srcSet="https://www.instagram.com/static/images/appstore-install-badges/badge_android_vietnamese-vi.png/c36c88b5a8dc.png 3.8x"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
