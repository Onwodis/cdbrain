import React, { useEffect, useState } from 'react';
import { RevealContent, Image, Reveal } from 'semantic-ui-react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Carousel from './Caro';
import Footer from './Footer';
import WOW from 'wowjs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from './Login';
import Testimonial from './Testimonial';
import ContextMenu from "../common/Contextm.jsx";


import '../all.css';
import 'animate.css/animate.min.css';

const About = ({ cont,setUser, user }) => {
  const [contextMenu, setContextMenu] = useState({
    xPos: "0px",
    yPos: "0px",
    show: false,
  });

  const handleRightClick = (e) => {
    // alert(e.pageX);
    e.preventDefault();

    setContextMenu({
      xPos: `${e.pageX}px`,
      yPos: `${e.pageY}px`,
      show: true,
    });
  };

  const handleClick = () => {
    setContextMenu({
      ...contextMenu,
      show: false,
    });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  return (
    <div className="px-1 app-container">
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        about={true}
        cont={cont}
        user={user}
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />
      <ContextMenu
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        show={contextMenu.show}
        user={user}
        handleAction={handleClick}
      />

      <div onContextMenu={handleRightClick} onClick={handleClick}>
        {!user ? (
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Body>
              <div style={{ marginTop: "" }} className="form-sectionh fera">
                {/* <h2 className=" text-center jbtw">
                      Login/Sign-in{' '}
                      <span>
                        {' '}
                        <i
                          onClick={handleClose}
                          closeButton className="fa fa-times"
                        ></i>
                      </span>
                    </h2> */}
                <Login
                  cont={cont}
                  setUser={setUser}
                  handleClose={handleClose}
                />
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          ""
        )}
        <div class="container-xxl py-5  wow animate__animated animate__bounceIn">
          <div class="container">
            <div class="row g-5">
              <div
                class="col-lg-6 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{ minHeight: "400px" }}
              >
                <div class="position-relative h-100">
                  <img
                    class="obc img-fluid position-absolute w-100 h-100"
                    src="/img/about.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                <h6 class="section-title bg-white text-start text-primary pe-3">
                  About Us
                </h6>
                <h1 class="mb-4">Welcome to {cont.name}</h1>
                <p class="mb-4">
                  Are you ready to embark on an exciting journey into the world
                  of Information and Communication Technology (ICT)? Look no
                  further! Our Online ICT School is your gateway to a future
                  filled with endless opportunities and boundless possibilities.
                </p>
                <div class="row gy-2 gx-4 mb-4">
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>
                      Skilled Instructors
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>
                      Online Classes
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>Learn
                      at your pace
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>
                      Flexibility
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>
                      Student career network
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="mb-0">
                      <i class="fa fa-arrow-right text-primary me-2"></i>
                      Course Certificate
                    </p>
                  </div>
                </div>
                <Link
                  to="/"
                  class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  <i className="fa fa-arrow-left"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer cont={cont} />
      </div>
    </div>
  );
};

export default About;
