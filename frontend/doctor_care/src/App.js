import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { LoadingPage } from "./pages/loading";
import "./styles/global.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogsPage } from "./pages/blogs";
import { Admin } from "./pages/admin/admin";
import { Specialty } from "./components/Admin/specialty";
import { Users } from "./components/Admin/users";

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
  const auth = localStorage.getItem("userLogin");
  return (
      <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={!auth?<LoginPage />:<Navigate to={"/admin/specialties"} replace />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.BLOG} element={<BlogsPage />} />
          <Route path="/admin" element={auth?<Admin/>:<Navigate to={ROUTES.LOGIN} replace />} >
            <Route path="users" element={<Users />} />
            <Route path="specialties" element={<Specialty />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
