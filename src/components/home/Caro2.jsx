import { useState } from "react";
// import Carousel from 'react-bootstrap/Carousel';
import { Carousel } from "react-bootstrap";
// import {ExampleCarouselImage} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Blob from "../common/Blob";
// import Blob from "./Blob";

function ControlledCarousel({ handleShow, setShow }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div class="testimonial-carjousel owl-carousekl-item position-relative z-5">
      <img class="img-fluidj carod" src="/girls/bim2.jpg" alt="" />
      <div class="position-absolute  top-0 pt-md-5 start-0 w-100 rope align-items-baseline">
        <div class="container mt-5">
          <div class="row justify-content-start align-items-baseline">
            <div class="col-sm-10  col-lg-12 col-xl-12 col-md-12 lh-md-5 lh-lg-5">
              <h5 class="fw-500 weteach fconk text-light text-uppercase mb-3 animated slideInDown">
                We build and teach
              </h5>
              <h1 class="display-3 text-white animated slideInDown mb-md-5">
                The Best{" "}
                <span className="d-inline display-3 text-light animated slideInDown imi">
                  Tec
                </span>
                h Learning Platform
              </h1>
              <h3
                data-wow-delay="0.7s"
                class="fhs-4 ta blur rodo text-light px-3 py-2 rounded ppl  l22  pb-2"
              >
                Are you passionate about technology? Do you want to enhance your
                skills and become a leader in the tech industry? Codar Institute
                is the perfect place for you!
              </h3>

              <div className=" justify-content-end d-flex col-12">
                <div className="col-4 col-md-12 col-lg-3 text-center mt-md-5  ">
                  <Link
                    to="/sform"
                    className="bg-danger rounded mr-3 text-light fs-4 py-2 px-2 px-lg-2 px-md-5 d-lg-block"
                  >
                    Join Now
                    {/* Join Now<i className="fa fa-arrow-right ms-3"></i> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlledCarousel;
