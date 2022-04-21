import {LOGIN,LOGOUT} from "../types/userType"

export const LoginAction = (user) => {
  return { type: LOGIN, user };
};

export const LogoutAction = () => {
  return { type: LOGOUT };
};

