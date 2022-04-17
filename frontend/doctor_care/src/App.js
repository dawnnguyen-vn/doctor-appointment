import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { LoadingPage } from "./pages/loading";
import "./styles/global.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogsPage } from "./pages/blogs";

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

  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.BLOG} element={<BlogsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
