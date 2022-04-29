import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { LoadingPage } from "./pages/loading";
import "./styles/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogsPage } from "./pages/blogs";
import { Admin } from "./pages/admin/admin";
import { SpecialtyTable } from "./components/Admin/specialty";
import { UsersTable } from "./components/Admin/users";
import { PatientTemplate } from "./pages/patientTemplate";
import { AddInformation } from "./components/Admin/addInformation";
import { ManageSchedule } from "./components/Admin/manageSchedule";
import { BookingPage } from "./pages/doctor_booking";

function App() {
  const LoginPage = lazy(() =>
    import("./pages/login").then((module) => ({
      default: module.LoginPage,
    }))
  );
  const HomePage = lazy(() =>
    import("./pages/home").then((module) => ({
      default: module.HomePage,
    }))
  );
  const DoctorPage = lazy(() =>
    import("./pages/doctorInfo").then((module) => ({
      default: module.DoctorPage,
    }))
  );
  const auth = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              !auth ? (
                <LoginPage />
              ) : (
                <Navigate to={"/admin/specilaties"} replace />
              )
            }
          />
          <Route path="" element={<PatientTemplate />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.BOOKING} element={<BookingPage />} />
            <Route path={ROUTES.BLOG} element={<BlogsPage />} />
            <Route path={ROUTES.DOCTOR_INFO} element={<DoctorPage />} />
          </Route>
          <Route
            path="/admin"
            element={auth ? <Admin /> : <Navigate to={ROUTES.LOGIN} replace />}
          >
            <Route path="users" element={<UsersTable />} />
            <Route path="specialties" element={<SpecialtyTable />} />
            <Route path="info" element={<AddInformation />} />
            <Route path="schedule" element={<ManageSchedule />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
