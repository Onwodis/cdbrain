
import "./sign.css";
import Sin from "./Sin";
import SignUpForm from "./Signup";
import Bob from "./Bubbletest";


import React, { useEffect, useState } from "react";
import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import Headerb from "./Headerb";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Caro";
import Footer from "./Footer";
import Test2 from "./Test2";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "./Login";
import Contact from "./Contact";
import ContextMenu from "../common/Contextm.jsx";
import Stats from "./Stats";

import Mid from "./Mid";
import Other from "./Other";
// import axiosi from "./axiosinstance";
import "../all.css";
// import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import Rin from "./Rin";
import Spinner from "react-bootstrap/Spinner";
// import "semantic-ui-css/semantic.min.css";
import codar from "../../codarbg.png";

// import {
//   ModalHeader,
//   ModalDescription,
//   ModalContent,
//   ModalActions,
//   Button,
//   Icon,
//   Modal,
// } from "semantic-ui-react";

const Entry= ({ cont,setCont, user, setCos, setUser, sorry, error,sign }) => {
  const [contextMenu, setContextMenu] = useState({
    xPos: "0px",
    yPos: "0px",
    show: false,
  });

  // const handleRightClick = (e) => {
  //   // alert(e.pageX);
  //   e.preventDefault();

  //   setContextMenu({
  //     xPos: `${e.pageX}px`,
  //     yPos: `${e.pageY}px`,
  //     show: true,
  //   });
  // };

  // const handleClick = () => {
  //   setContextMenu({
  //     ...contextMenu,
  //     show: false,
  //   });
  // };
  
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();
  const tuser = { ...user };

  useEffect(() => {
    const Check = async () => {
      try {
        // if(user){
        //   alert(user.name)
        // }
        await axios
          .get(
            user
              ? `${cont.api}getcoursesg/${user.userid}`
              : `${cont.api}getcoursesn`
          )
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses((prev) => [...res.data.courses]);

                // setFirst(false);

                // navigate('/');
              }
            } else {
              navigate("/");
            }
            if (sorry) {
              Swal.fire({
                title: `Oops , not allowed !`,
                text: `Sorry you are not allowed to access this route`,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
            } else if (error) {
              Swal.fire({
                title: `Oops , That was an error!`,
                text: `The page you tried to access does not exist ! `,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
    };

    // Check if jwtt and first are truthy
    if (!checkCalled && user) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    } else if (!checkCalled) {
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
      if (user) {
        Check();

        // Set the flag to true to indicate that Check() has been called
        setCheck(!checkCalled);
      }
    }
  }, [courses, user, checkCalled]);
  const Focus = async (cid) => {
    const cos = courses.find((el) => el.cid === cid);
    if (cos.paid) {
      const course = courses.filter((el) => el.cid === cid);
      navigate("/watch", { state: course });
    } else if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      navigate("/curriculum", { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: "info",
        position: "top-end",

        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const [firstOpen, setFirstOpen] = useState(false);

  const Buy = async (cid) => {
    let cos = courses.find((el) => el.cid === cid);
    if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      const coursees = courses.filter((el) => el.cid !== cid);
      cos.onit = true;
      coursees.push(cos);
      const sortedData = coursees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setCourses((prev) => [...sortedData]);

      const formDataToSend = new FormData();

      formDataToSend.append("cid", cos.cid);
      formDataToSend.append("userid", user.userid);
      formDataToSend.append("api", cont.api);
      formDataToSend.append("fe", cont.fe);

      try {
        await axios.post(`${cont.api}buy`, formDataToSend).then((res) => {
          if (res.data.success) {
            if (res.data.bought) {
              Swal.fire({
                title: `You already paid for this course`,
                text: ``,
                // icon: 'info',
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
              navigate("/user/" + user.userid);
            } else {
              setUrl(res.data.url);
              setCourse((prev) => ({ ...res.data.course }));
              window.location.href = res.data.url;
            }
          } else {
            const updatedData = sortedData.map((el) => ({
              ...el,
              onit: false,
            }));

            // Update the 'courses' state with the new array
            setCourses((prev) => [...updatedData]);
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }

      // navigate('/curriculum', { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: "info",
        position: "top-end",

        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);

  const [typee, setType] = useState(true);
  const handleOnClick = (text) => {
    setType(text);
  };
  const containerClass =
    "containerr " + (typee  ? "right-panel-active " : "");

  return (
    <div
      className="px-1 app-container  pb-5"
      // onContextMenu={handleRightClick}
      // onClick={handleClick}
    >
      <ContextMenu
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        show={contextMenu.show}
        user={user}
        // handleAction={handleClick}
      />
      {/* <Headerb
        entry={true}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        cont={cont}
        setUser={setUser}
        user={user}
        courses={user ? true : false}
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      /> */}

      <div className="divv pb-5  col-12 ">
        <div className="kbody">
          <div className="Appj ">
            {/* <h2 className="sh1l pb-3">Sign in/up Form</h2> */}
            <div className={`${containerClass}k col-12 `} id="">
              {sign ? (
                <Sin
                  cont={cont}
                  setCont={setCont}
                  user={user}
                  sign={true}
                  setUser={setUser}
                  courses = {courses}
                />
                // <SignUpForm
                //   cont={cont}
                //   setCont={setCont}
                //   user={user}
                //   setUser={setUser}
                // />
              ) : (
                <div className="jbtw align-items-center">
                  <div className="col-2 d-none d-md-block text-center">
                    <img className="well" src="/gifs/well.gif" alt="" />
                  </div>
                  
                  <div
                    className="sbodyh mx-auto col-md-6 col-12"
                    style={{ minHeight: "70vh" }}
                  >
                    <Bob />

                    <Rin
                      setCont={setCont}
                      cont={cont}
                      user={user}
                      setUser={setUser}
                    />
                  </div>
                  <div className="col-2 d-none d-md-block">
                    <img className="well" src="/gifs/well.gif" alt="" />
                  </div>
                </div>
              )}
              {/* <div className="overlay-container z-2">
                <div className="overlayy z-2">
                  <div className="overlay-panel z-2 overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick(false)}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button
                      className="ghost "
                      id="signUp"
                      onClick={() => handleOnClick(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <Footer cont={cont} /> */}
    </div>
  );
};

export default Entry;


