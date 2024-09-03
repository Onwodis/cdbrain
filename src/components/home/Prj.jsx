import React, { useEffect, useState } from 'react';
import { RevealContent, Image, ImageGroup, Reveal } from 'semantic-ui-react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Caro';
import Footer from './Footer';
import Test2 from './Test2';
import WOW from 'wowjs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from './Login';
import Contact from './Contact';
// import Bringon from './Bringon';
// import axiosi from './axiosinstance';
import '../all.css';
import 'animate.css/animate.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Modal,
} from 'semantic-ui-react';

const Prj = ({
  cont,
  prj,
  
  about,
  home,
  user,
  
  setUser,
  courses,
}) => {
  const [vidd, setVidd] = React.useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);

  return (
    <div>
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        prj={true}
        cont={cont}
        user={user}
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />
      <div id="learn" className="learn">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <Login cont={cont} setUser={setUser} handleClose={handleClose} />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="container " >
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage ">
                <h2 className='tade'>
                  Do you{" "}
                  <strong className="yellow">
                    {" "}
                    need a website or software ?
                  </strong>
                </h2>
                <div>
                  <p className="fs-4 lineh">
                    Are you ready to elevate your business to new heights? At
                    Mikptech Innovations, we specialize in creating stunning,
                    user-friendly websites that not only capture your brand's
                    essence but also engage and convert visitors into loyal
                    customers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-none d-md-block">
            <div className="col-md-12">
              {vidd ? (
                <div className="w-100">
                  <div
                    className="text-center"
                    style={{
                      position: "relative",
                      marginTop: "1.6em",
                      marginBottom: "0.9em",
                    }}
                  >
                    <iframe
                      loading="lazy"
                      className="vidd"
                      src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGKeqzsbAI&#x2F;xozdNJZtDiwq5SuBLIqpqQ&#x2F;view?embed"
                      allowfullscreen="allowfullscreen"
                      allow="fullscreen"
                      title="welcome"
                    ></iframe>

                    {/* <a href="https://www.canva.com/design/DAGKeqzsbAI/xozdNJZtDiwq5SuBLIqpqQ/view">yess</a> */}
                  </div>

                  <div>
                    <i className="fa fa-double-arrow-left text-primary"></i>
                  </div>
                </div>
              ) : (
                <div className="cpp learn_box" onClick={() => setVidd(!vidd)}>
                  <figure>
                    <img src="/images/img.jpg" alt="img" />
                  </figure>
                </div>
              )}
            </div>
          </div>

          <div className="text-center w-100 mb-3">
            <button
              className="btn btn-primary my-2 p-3  w-50 mx-auto"
              onClick={handleOpenn}
            >
              Start Project
            </button>
          </div>
        </div>
      </div>
      <Footer cont={cont} prj={true} />
    </div>
  );
};

export default Prj;
