import React, { useEffect, useState } from 'react';
// import { RevealContent, Image, ImageGroup, Reveal } from 'semantic-ui-react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Caro';
import Footer from './Footer';
import WOW from 'wowjs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from './Login';
import Testimonial from './Testimonial';
// import axiosi from './axiosinstance';
import '../all.css';
// import 'animate.css/animate.min.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import Lding from '../common/Lding';
import Na from '../common/Na'
import Talk from '../common/Talk'

const Courses = ({ cont, user, setUser }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState();
  let [checkCalled, setCheck] = useState(false);
  let [nc, setNc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true)
        await axios
          .get(
            user
              ? `${cont.api}getcourses/${user.userid}`
              : `${cont.api}getcoursesn`
          )
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses(() => res.data.courses);

                // setFirst(false);

                // navigate('/admin');
              }
            } else {
              navigate('/');
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error('Error:', error);
      }
      setNc(false);

    };

    // Check if jwtt and first are truthy
    if (!checkCalled) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [courses, user, cont, checkCalled]);
  const Focus = async (cid) => {
    const cos = courses.find((el) => el.cid === cid);
    if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      navigate('/curriculum', { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: 'info',
        position: 'top-end',

        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);
  return (
    <div className="px-1 app-container">
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        yescos={true}
        courses={courses}
        cont={cont}
        setUser={setUser}
        user={user}
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />

      <div style={{ minHeight: "100vh" }}>
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
              <Login cont={cont} setUser={setUser} handleClose={handleClose} />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        

        <div class="container-xxl py-5 mb-5">
          <div class="container">
            <div
              class="text-center  wow animate__animated animate__slideLeft"
              data-wow-delay="0.1s"
            >
              {/* <h6 class="section-title bg-white text-center text-primary px-3">
                Courses
              </h6> */}
              <h1 class="mb-5 tida fs-1">Browse Courses</h1>
            </div>
            <div class="row g-4 justify-content-center">
              {nc ? (
                <div className="text-center">
                  {/* <Spinner
                  className="text-center "
                  animation="border"
                  variant="primary"
                /> */}
                  <Lding />
                </div>
              ) : courses && courses.length > 0 ? (
                courses.map(({ image, name, cid, dprice }) => (
                  <div class="col-lg-4 col-md-6  wow animate__animated animate__bounceIn">
                    <div class="course-item bg-light pb-1">
                      <div class="position-relative overflow-hidden">
                        <img class="img-fluid" src={image} alt="" />
                        <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                          <div
                            onClick={() => {
                              Focus(cid);
                            }}
                            class="z-7 flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                            style={{ borderRadius: "30px 0 0 30px" }}
                          >
                            Read More
                          </div>
                          <div
                            onClick={handleShow}
                            class="flex-shrink-0 btn btn-sm btn-primary px-3"
                            style={{ borderRadius: " 0 30px 30px 0" }}
                          >
                            Register
                          </div>
                        </div>
                      </div>
                      {/* <h5 class="mb-4">{name}</h5> */}
                      <div class="text-center p-4 pb-0">
                        <h3 class="mb-0 text-success fw-bolder">{dprice}</h3>
                        <div class="mb-3">
                          <small class="fa fa-star text-primary"></small>
                          <small class="fa fa-star text-primary"></small>
                          <small class="fa fa-star text-primary"></small>
                          <small class="fa fa-star text-primary"></small>
                          <small class="fa fa-star text-primary"></small>
                          <small>(123)</small>
                        </div>
                        <h2 class="mb-4 tida">{name}</h2>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center ">
                  <Talk
                    bg={true}
                    a={`Oops ! Sorry !! `}
                    b={`Courses are unavailable at the moment`}
                    c={``}
                    d={`coming soon !`}
                  />
                  <h3 className="fw-5 tida text-light ">
                    Oops ! No courses yet !!{" "}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer cont={cont} />
    </div>
  );
};

export default Courses;
