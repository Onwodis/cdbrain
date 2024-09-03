import Talk from "../common/Talk";
import React, { useEffect, useState } from "react";
import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Marque from "./marque";

import Mid from "./Mid";
import Other from "./Other";
// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import "semantic-ui-css/semantic.min.css";
import Na from "../common/Na";
import Lding from "../common/Lding";

const Online = ({ cont, user, setCos, setUser, sorry, error }) => {
  // const [contextMenu, setContextMenu] = useState({
  //   xPos: "0px",
  //   yPos: "0px",
  //   show: false,
  // });

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
  
  const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();
  const tuser = { ...user };

  let [nc, setNc] = useState(false);

  
  const [firstOpen, setFirstOpen] = useState(false);
  // alert(courses.length);

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
  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true);

        await axios
          .get(
            user
              ? `${cont.api}getcoursesg/${user.userid}`
              : `${cont.api}getcoursesn`
          )
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses.length > 0) {
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
      setNc(false);
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
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);

  return (
    <div
      className=" app-container"
      // onContextMenu={handleRightClick}
      // onClick={handleClick}
    >
      {/* <ContextMenu
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        show={contextMenu.show}
        user={user}
        handleAction={handleClick}
      /> */}
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        online={true}
        cont={cont}
        setUser={setUser}
        user={user}
        ifuser={user ? true : false}
        courses={courses}
        openn={openn}
        db={true}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />
      <div>
        <div className="d-flex jbtw px-2 col-md-7 mx-auto mt-5">
          <div className="w-100 mt-5">
            <Talk
              className="mt-5"
              bg={true}
              a={`Oops ! Welcome ,  to the Online school section `}
              b={`We are currently working on this section`}
              c={`Hope to see you soon`}
              d={`coming soon !`}
            />
            {/* <Marque /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Online;
