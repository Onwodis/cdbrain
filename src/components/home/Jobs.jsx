import React, { useEffect, useState } from "react";
import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Caro";
import Footer from "./Footer";
import Test2 from "./Test2";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "./Login";
import Contact from "./Contact";

import "../all.css";
// import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
// import {
//   ModalHeader,
//   ModalDescription,
//   ModalContent,
//   ModalActions,
//   Button,
//   Icon,
//   Modal,
// } from "semantic-ui-react";

const Jobs = ({
  cont,

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
        jobs={true}
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
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="titlepage">
                <h2 className="tade">
                  Career Opportunities at
                  <strong className="yellow "> {cont.fname}</strong>
                </h2>
                <div>
                  <p className="fs-4 lineh">
                    Welcome to {cont.fname} 's career section! We are a dynamic
                    and forward-thinking company dedicated to providing
                    top-notch online training and delivering cutting-edge web
                    development projects. As we continue to grow and expand, we
                    are always on the lookout for passionate and talented
                    individuals to join our team. Whether you are an experienced
                    tech instructor or a skilled techie, {cont.fname}
                    offers a collaborative and innovative environment where you
                    can thrive and make a real impact.
                  </p>
                </div>
              </div>
              <div className="col-12 mb-5">
                <div className="learn_box h-100 align-items-center">
                  <figure className="h-100 p-1">
                    <img
                      className="h-100"
                      src="/img/cat-3.jpg"
                      alt="img"
                      style={{ objectFit: "contain", borderRadius: "24px" }}
                    />
                  </figure>
                </div>
              </div>
              <div className="titlepage text-center">
                <h2 className="tade">
                  Why Join
                  <strong className="yellow"> {cont.fname} ?</strong>
                </h2>
              </div>
              <div className="row ">
                <div className="titlepage col-md-12">
                  <div>
                    <ol>
                      <li className="mb-3">
                        <h1>Innovative Projects</h1>
                        <p>
                          Work on exciting and challenging web development
                          projects that push the boundaries of technology.
                        </p>
                      </li>
                      <li className="mb-3">
                        <h1>Continuous Learning</h1>
                        <p>
                          Be part of an organization that values learning and
                          professional development. We provide opportunities for
                          ongoing training and skill enhancement.
                        </p>
                      </li>
                      <li className="mb-3">
                        <h1>Collaborative Environment</h1>
                        <p>
                          Join a team of like-minded professionals who are
                          passionate about technology and innovation.
                        </p>
                      </li>
                      <li className="mb-3">
                        <h1>Impactful Work</h1>
                        <p>
                          Contribute to meaningful projects and training
                          programs that make a difference in the tech community.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="titlepage text-center">
                <h2>
                  Career
                  <strong className="yellow"> Opportunities</strong>
                </h2>
              </div>
              <div className="row ">
                <div className="titlepage col-md-12">
                  <div>
                    <ol>
                      <li className="mb-3">
                        <h1>1. Tech Instructor</h1>
                        <p className="fs-4 lineh">
                          As a Tech Instructor at {cont.fname} , you will play a
                          pivotal role in shaping the next generation of tech
                          professionals. We are looking for individuals who are
                          not only experts in their field but also have a
                          passion for teaching and mentoring.
                        </p>
                        <h3>Responsibilities :</h3>
                        <ul className="fs-4" style={{ lineHeight: "40px" }}>
                          <li>
                            <i className="fa fa-list"></i> Develop and deliver
                            engaging online training courses in various tech
                            disciplines.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Create comprehensive
                            course materials, including videos, tutorials, and
                            assessments..
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Provide mentorship
                            and support to students, helping them achieve their
                            learning goals.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Stay updated with the
                            latest industry trends and incorporate them into the
                            curriculum.
                          </li>
                        </ul>
                        <h3>Qualifications :</h3>
                        <ul className="fs-4" style={{ lineHeight: "40px" }}>
                          <li>
                            <i className="fa fa-list"></i> Develop and deliver
                            Proven experience in tech instruction or a related
                            field.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Create comprehensive
                            Expertise in one or more tech domains (e.g., web
                            development, cloud computing, data science
                            ,photo/video/audio editing,content creation,project
                            management).
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Excellent
                            communication and presentation skills.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> A passion for
                            teaching and a commitment to student success.
                          </li>
                        </ul>
                      </li>
                      <li className="mb-3">
                        <h1>2. Skilled Techies</h1>
                        <p className="fs-4 lineh">
                          We are seeking skilled tech professionals to join our
                          web development team. If you are a creative problem
                          solver with a strong technical background, we want to
                          hear from you.
                        </p>
                        <h3>Responsibilities :</h3>
                        <ul className="fs-4" style={{ lineHeight: "40px" }}>
                          <li>
                            <i className="fa fa-list"></i> Collaborate with
                            clients to understand their web development needs
                            and deliver high-quality solutions.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Design, develop, and
                            maintain websites and web applications.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Work with a variety
                            of technologies and tools to build responsive and
                            scalable web solutions.
                          </li>
                        </ul>
                        <h3>Qualifications :</h3>
                        <ul className="fs-4" style={{ lineHeight: "40px" }}>
                          <li>
                            <i className="fa fa-list"></i> Proven experience in
                            web development or a related field.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Proficiency in
                            programming languages such as JavaScript, HTML, CSS,
                            and relevant frameworks.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Strong understanding
                            of web development principles and best practices.
                          </li>
                          <li>
                            <i className="fa fa-list"></i> Ability to work
                            independently and as part of a team.
                          </li>
                        </ul>
                        <h3 className="mt-3">How to apply :</h3>
                        <p className="fs-4 mb-3 lineh">
                          If you are excited about the opportunity to work at{" "}
                          {cont.fname} and believe you have what it takes to be
                          part of our team, we would love to hear from you.
                          Please send your resume and a cover letter outlining
                          your qualifications and experience to {cont.cmail}.
                        </p>
                        <p className="fs-4 mb-3 lineh">
                          Join us at {cont.fname} and be part of a team that is
                          shaping the future of technology through exceptional
                          training and innovative web development solutions. We
                          look forward to welcoming you to our family !
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <Footer cont={cont} prj={true} />
    </div>
  );
};

export default Jobs;
