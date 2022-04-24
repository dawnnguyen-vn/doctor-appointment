import {LOGIN,LOGOUT} from "../types/userType"

let user = "";
if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin")).taiKhoan;
}
const initialState = {
  user: user,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      state.user = action.user;
      window.location.reload();
      return { ...state };
    }
    case LOGOUT: {
      localStorage.removeItem("userLogin");
      localStorage.removeItem("token");
      state.user = "";
      window.location.reload();
      return { ...state };
    }
    default:
  }
  return { ...state };
};
