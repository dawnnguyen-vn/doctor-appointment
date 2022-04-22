import React from 'react'
import Slider from 'react-slick'
import { settingSlider } from '../../constants/setting_slider'
import { BlogCard } from '../card/blog_card'
import { listNews } from "../../fake_data/data";

export const SliderBlog = () => {
  return (
    <div className="home-news">
        <div className="container">
          <Slider {...settingSlider}>
            {listNews.map((e)=>(
              <BlogCard key={e.id} aNew={e}/>
            ))}
            {listNews.map((e)=>(
              <BlogCard key={e.id+'s'} aNew={e}/>
            ))}
          </Slider>
        </div>
      </div>
  )
}
