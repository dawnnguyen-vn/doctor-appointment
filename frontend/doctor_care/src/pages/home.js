import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { Icon_Search } from "../constants/icons";
import "../styles/home.scss";
import { searchKeys } from "../fake_data/searchkey";
import { Card } from "../components/card";
import Slider from "react-slick";
import { settingSlider } from "../constants/setting_slider";
import { listNews } from "../fake_data/data";
import { Specialty } from "../components/specialties";
import "../styles/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderDoctor } from "../components/sliderDoctor";

export const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.title = "DoctorCare";
    const time = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === searchKeys.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    ); // Change image every 2 seconds
    return () => {
      clearTimeout(time);
    };
  }, [index]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-banner">
        <div className="home-search">
          <div className="title">
            <h1>
              NỀN TẢNG Y TẾ <hr style={{ opacity: "0", marginTop: "0" }} />
              <b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b>
            </h1>
          </div>
          <div className="home-search-box">
            <div className="icon-search">
              <Icon_Search />
            </div>
            <input type="text" placeholder={searchKeys[index]} />
          </div>
        </div>
        <div className="list-service">
          <ul className="service">
            <li className="item">
              <div className="icon-service service1" />
              Khám chuyên khoa
            </li>
            <li className="item">
              <div className="icon-service service2" />
              Khám từ xa
            </li>
            <li className="item">
              <div className="icon-service service3" />
              Khám tổng quát
            </li>
            <li className="item">
              <div className="icon-service service4" />
              xét nghiệm y học
            </li>
            <li className="item">
              <div className="icon-service service5" />
              Sức khỏe tinh thần
            </li>
            <li className="item">
              <div className="icon-service service6" />
              Khám nha khoa
            </li>
            <li className="item">
              <div className="icon-service service7" />
              Gói phẩu thuật
            </li>
            <li className="item">
              <div className="icon-service service8" />
              Sản phẩm y tế
            </li>
          </ul>
        </div>
      </div>
      <div className="home-news">
        <div className="container">
          <Slider {...settingSlider}>
            {listNews.map((e)=>(
              <Card key={e.id} aNew={e}/>
            ))}
            {listNews.map((e)=>(
              <Card key={e.id+'s'} aNew={e}/>
            ))}
          </Slider>
        </div>
      </div>
      <Specialty/>
      <SliderDoctor/>
      <div style={{height:"300px"}}></div>
    </div>
  );
};
