import React from 'react';
import './testimonial.css';


import { Swiper, SwiperSlide } from 'swiper/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Styles must use direct files imports
import 'swiper/css'; 
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
// import { Image } from 'semantic-ui-react';
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const Testimonial = () => {
  const data = [
    {
      name: 'Royce Boots',
      image: '/img/testimonial-1.jpg',
      career: 'Cyber security Engineer',
      story: 'MikpTech gave me a "dream come true" experience.',
    },
    {
      name: 'James Efron',
      image: '/img/testimonial-2.jpg',
      career: 'Cloud Engineer',
      story: 'I got multiple promotions after two months enrolment and study  ',
    },
    {
      name: 'Tony loner',
      image: '/img/testimonial-3.jpg',
      career: 'Software Engineer',
      story: 'MikpTech made my journey into software engineering smooth',
    },
    {
      name: 'Joy Smith',
      image: '/img/testimonial-4.jpg',
      career: 'Data Analyst',
      story: 'Data analysis now makes much sense to me.',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    
  };
  return (
    <section id="testimonials text-center mb-4 mt-2 ">
      <h5 className="text-center my-3">Review from clients</h5>
      <h2 className="text-center my-3 mb-2">Testimonials</h2>

      <div className="row py-3">
        <div className="containe px-3  w-100 testimonials__container">
          <Slider {...settings}>
            {data.map(({ name, story, image }, index) => (
              <div key={index} className="testimonial">
                <div className="client_avatar">
                  <img src={image} alt="Avatar" />
                </div>
                <h5 className="client--name">{name}</h5>
                <small className="client__review fs-md-5">{story}</small>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
