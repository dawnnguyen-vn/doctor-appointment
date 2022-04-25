import React from "react";

import "../styles/admin.scss";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const PatientTemplate = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
