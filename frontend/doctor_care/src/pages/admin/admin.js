import React from "react";

import "../../styles/admin.scss";
import { Outlet } from "react-router-dom";
import { NavBarAdmin } from "../../components/Admin/navbar";

export const Admin = () => {
  return (
    <>
      <NavBarAdmin />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
