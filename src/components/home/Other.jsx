import React ,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from "react-bootstrap";
import Bo from './Bubbletest'
import AOS from "aos";
import "aos/dist/aos.css";

const Other = ({cont,setShow}) => {
  const [vidd, setVidd] = React.useState(false);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

    const ed = [
      {
        name: "Web development",
        image: "/images/my1.jpg",
        talk: "The process of designing, coding, testing, and maintaining applications and systems. ",
      },
      {
        name: "Project management",
        image: "/images/prm.jpg",
        talk: "It involves meticulous planning, execution, and control to ensure projects are achieved timely.",
      },
      {
        name: "Data Structures",
        image: "/images/my3.jpg",
        talk: "Fundamental concepts in computer science that involve organizing and storing data efficiently.",
      },
      {
        name: "Cybersecurity",
        image: "/images/my4.jpg",
        talk: "Cybersecurity is the practice of safeguarding systems, networks, and data from digital attacks.",
      },
    ];
  return (
    <div>
      {/* <div id="important" className="important">
    
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 data-aos="zoom-in">
                  Some <strong className="yellow">important facts</strong>
                </h2>
                <span data-aos="zoom-out">
                  “We stand on the brink of a technology revolution that will
                  fundamentally alter the way we Live, Work, and Relate to one
                  another. In its scale, scope, and complexity, the
                  transformation will be unlike anything human kind has ever
                  experienced before.”
                </span>
                <sub>-Klaus Schwab Founder, World Economic Forum.</sub>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="important_bg" data-aos="fade-right">
        <div className="container">
          <div className="row">
            <h1
              className="text-light"
              style={{ lineHeight: "40px" }}
              data-aos="slide-left"
            >
              "The Internet is becoming the town square for the global village
              of tomorrow."
            </h1>
            <small className="text-end text-light" data-aos="slide-right">
              — Bill Gates, Co-founder of Microsoft
            </small>
          </div>
        </div>
      </div>
      <div className="img w-100 cpjp " data-aos="fade-up">
        <div>
          <img
            className="nut"
            class="w-100 cjpp"
            src="/images/codcyb.png"
            alt=""
          />
        </div>
      </div>

      {/* <div className="bg-dark">
        <div
          class=" w-100 col-6 landingbg ropjhe d-flex align-items-center pb-4"
          style={{
            backgroundImage: "url(/staff/codar1.jpeg)",

            // backgroundImage: "url(/girls/bim2.jpg)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundBlendMode: "multiply",
            // opacity: 0.9,
          }}
        >
         
        </div>
      </div> */}

      <div id="learn" className="learn d-none d-md-block" data-aos="slide-up">
        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className="">
                  Learn{" "}
                  <strong data-aos="flip-up" className="yellow">
                    the Practical way
                  </strong>
                </h2>
                <span data-aos="fade-down-right">
                  At <span className="yellow">{cont.fname}</span>, we believe
                  that the best way to learn is by doing. Our practical approach
                  to education is designed to engage, inspire, and prepare you
                  for real-world challenges. Here's why you should join us .
                  Tech skills encompass a wide range of abilities related to the
                  use of technology. These skills include programming, system
                  administration, data analysis, cybersecurity, and more.
                  Mastery of tech skills is crucial in today's digital age,
                  enabling individuals to develop software, manage networks,
                  analyze data, and protect information systems effectively.
                </span>
              </div>
            </div>
          </div>
          <div className="row " data-aos="fade-up">
            <div className="col-md-12 col-12">
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
                    <video
                      onEnded={() => {
                        setVidd(false);
                      }}
                      onClick={() => {
                        setVidd(false);
                      }}
                      className="vidd w-100  p-0"
                      autoPlay
                      src={`${cont.api}video/elect.mp4`}
                    ></video>
                    {/* <p>{`${cont.api}video/elect.mp4`}</p> */}
                  </div>

                  {/* <iframe
                    autoPlay
                    src="https://www.canva.com/design/DAGKeqzsbAI/xozdNJZtDiwq5SuBLIqpqQ/view"
                 
                    title="more"
                    className="vidd "
                    onEnded={() => {
                      setVidd(false);
                    }}
                  ></iframe> */}
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
        </div>
      </div>
      <div className="important_bg" data-aos="fade-right">
        <div className="container">
          <div className="row">
            <h1
              className="text-light speech"
              style={{ lineHeight: "40px" }}
              data-aos="slide-left"
            >
              “We stand on the brink of a technology revolution that will
              fundamentally alter the way we Live, Work, and Relate to one
              another. In its scale, scope, and complexity, the transformation
              will be unlike anything human kind has ever experienced before.”
            </h1>
            <small className="text-end text-light" data-aos="slide-right">
              -Klaus Schwab Founder, World Economic Forum.
            </small>
          </div>
        </div>
      </div>
      <div className="img w-100 cpp " data-aos="fade-up">
        <Link to="/sform">
          <img class="w-100 cpp" src="/images/codv.png" alt="" />
        </Link>
      </div>
      <div id="courses" className="Courses" data-aos="zoom-in-right">
        <div className="container-fluid padding_left3">
          <div className="row">
            <div className="col-xl-6  col-lg-6 col-md-6 col-sm-12">
              <div className="box_bg px-3">
                <div className="box_bg_img">
                  <div className="row">
                    {ed.map(({ image, name, talk }) => (
                      <div
                        className="col-xl-6 col-lg-6 col-md-6 col-sm-12"
                        data-aos="zoom-in-right"
                      >
                        <div className="box_my">
                          <figure>
                            <img src={image} alt="" />
                          </figure>
                          <div className="overlay">
                            <h3
                              className="py-2 bg-dark"
                              style={{ textShadow: "0 3px 9px black" }}
                            >
                              {name}
                            </h3>
                            <p
                              className="bg-dark py-2"
                              data-aos="fade-in-right"
                            >
                              {talk}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 border_right">
              <div className="box_text text-center" data-aos="fade-up-right">
                <div className="titlepage text-center">
                  <h2>
                    Our{" "}
                    <strong className="yellow" data-aos="flip-in-right">
                      {" "}
                      Courses
                    </strong>
                  </h2>
                </div>
                <p className="text-start mcos" style={{ lineHeight: "30px" }}>
                  At{" "}
                  <span className="d-inline  text-capitalize yellow">
                    {cont.fname}
                  </span>
                  , we are dedicated to providing a comprehensive and diverse
                  range of courses designed to meet the academic and
                  professional aspirations of our students. Our curriculum is
                  thoughtfully developed to foster critical thinking,
                  creativity, and practical skills that prepare students for
                  success in their chosen fields.
                </p>
                <p style={{ lineHeight: "30px" }} data-aos="flip-right">
                  Join us today and take the first step towards a successful
                  tech career. Explore our courses, meet our instructors, and
                  find the program that best suits your career goals.
                </p>
                {/* <div className="text-start"></div> */}
                <Button
                  data-aos="zoom-in-right"
                  as={Link}
                  to="/courses"
                  className=" mt-2 bg-dark hover-bg-danger"
                >
                  View Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="img w-100 cpjp " data-aos="fade-up">
        <div>
          <img class="w-100 cjpp" src="/images/codbest.png" alt="" />
        </div>
      </div> */}
      <div className="important_bg" data-aos="fade-right">
        <div className="container">
          <div className="row">
            <h3
              className="text-light text-center"
              style={{ lineHeight: "40px" }}
              data-aos="slide-left"
            >
              "We’re still in the first minutes of the first day of the Internet
              revolution."
            </h3>
            <small className="text-end text-light" data-aos="slide-right">
              — Scott Cook, Co-Founder of Intuit
            </small>
          </div>
        </div>
      </div>

      <div className="make">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 data-aos="zoom-in">
                  Make Your<strong className="white_colo">Self Standout</strong>
                </h2>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-xl-7 col-lg-6 col-md-5 col-sm-12 "
                data-aos="zoom-in-right"
              >
                <img
                  className="w-100 rounded ffface"
                  src="/girls/murat.jpg"
                  // style={{ objectFit: "contain" }}
                  alt=""
                />
              </div>
              <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 h-100 pt-5 align-items-center">
                <div className="make_text  align-items-center ">
                  <p
                    data-aos="fade-down"
                    className="fs-5 text-start "
                    style={{ lineHeight: "40px" }}
                  >
                    In today’s competitive job market, it's crucial to
                    distinguish and develop oneself. At {cont.fname}, we provide
                    the tools, skills, and opportunities needed to help you
                    shine. Here’s how you can make the most of your time with us
                    and stand out .Take advantage of advanced courses and
                    certifications offered at {cont.fname} to deepen your
                    expertise.
                  </p>
                  <div className="text-end px-3 mt-2" data-aos="slide-right">
                    <Button
                      as={Link}
                      to="/sform"
                      className="  bg-dark hover-bg-danger"
                    >
                      Start now
                    </Button>
                    {/* <Link to="/sform">Start now</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Other