import React from 'react'
import Slider from 'react-slick'
import { Card } from '../components/card';
import "../styles/login.scss"

export const LoginPage = () => {

  const setting = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  };
  return (
    <div> <Slider {...setting}>
    {/* <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/> */}
  </Slider></div>
  )
}
// {listNews && (
//   <div className="home-news">
//     <div className="slider">
//       <Slider {...settingSlider}>
//         {listNews.map((e)=>(
//           <Card key={e.id} aNew={e}/>
//         ))}
//       </Slider>
//     </div>
//   </div>
// )}