import React, { useEffect, useState } from "react";
// import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate, useLocation ,useParams} from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";

import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import Tab1 from "../home/Tab1";
import Talk from "../common/Talk";
import Tw from "../texts/Tw";
import Atext from "../texts/Atext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Ctt from "../common/Ctt";
import Cttb from "../common/Cttb";
import Modal from "react-modal"; // Make sure to install react-modal first
import "../common/modal.css";

// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import _ from "lodash";

import Swal from "sweetalert2";


import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons

import {
  //   Table,
  //   TableBody,
  //   Table.Cell,
  TableContainer,
  TableHead,
  //   TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";


Modal.setAppElement("#root");

const Ncourse = ({ cont, user, setUser }) => {
  const [first, setFirst] = useState({});

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }

    if (
      obj1 === null ||
      typeof obj1 !== "object" ||
      obj2 === null ||
      typeof obj2 !== "object"
    ) {
      return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const location = useLocation();
  // const { state } = location;
  // const ccourse = state && state[0];
  const {cid} = useParams()

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});

  const [pix, setPix] = useState();
  const [showe, setShowe] = useState(false);
  const [showm, setShowm] = useState(false);
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const [done, setDone] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(edit.pwrdb);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  const handleClose = () => setShow(false);
  const handleClosem = () => setShowm(false);
  const handleClosee = () => setShowe(false);
  const handleShow = () => setShow(true);
  const handleShowm = () => setShowm(true);
  const handleShowe = () => setShowe(true);
  const [teacher, setTeacher] = useState({});
  const [teachers, setTeachers] = useState([]);
  
  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);
  let [showa, setShowa] = useState(false);

  const [creator, setCreator] = useState({});
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const ResponsiveTableContainer = styled(TableContainer)({
    "@media (max-width: 600px)": {
      "& thead": {
        display: "none",
      },
      "& tr": {
        display: "block",
        marginBottom: "1rem",
      },
      "& td": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:before": {
          content: "attr(data-label)",
          fontWeight: "bold",
          marginRight: "1rem",
        },
      },
    },
  });

  

  const Focus = async (cid) => {
    const course = courses.filter((el) => el.cid === cid);
    navigate("/acourse", { state: course });
  };

  // const Updatecourse = async (tid, name) => {
  //   const ll = courses.find((el) => el.cid === tid);

  //   async function Goon() {
  //     try {
  //       await axios
  //         .get(`${cont.api}admin/deploy/${tid}`, {
  //           headers: { userid: user.userid },
  //         })
  //         .then((res) => {
  //           if (res.data.success) {
  //             // setFirst(false);

  //             if (res.data.courses) {
  //               //   alert(res.data.data.latestloginplayertime);
  //               setCourses(res.data.courses);

  //               Swal.fire({
  //                 title: `${!ll.deployed ? "deployment" : `undeployment `} was successful`,
  //                 text: "Toggling deployment frequently is strongly prohibited ! !",
  //                 icon: "success",
  //               });
  //             }
  //           } else {
  //             Swal.fire({
  //               title: "Action failed!",
  //               text: "something went wrong doing this .",
  //               icon: "error",
  //             });
  //           }
  //         });
  //     } catch (err) {
  //       Swal.fire({
  //         title: "I'm afraid you can't perform this operation now !",
  //         text: "Pls check your internet network ! !",
  //         icon: "caution",
  //       });
  //     }
  //   }
  //   Swal.fire({
  //     title: `Are you sure you want to ${!ll.deployed ? `deploy ${name}` : `undeploy ${name}`} ?`,
  //     text: `with cudaccess this is reversible ! `,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, go ahead !",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Goon();
  //     }
  //   });
  // };
  const Lock = async () => {
    

    async function Goon() {
      try {
        setDone(false)
        await axios
          .get(`${cont.api}admin/lockcourse/${cid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
            
              if (res.data.course) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse(res.data.course);

                Swal.fire({
                  title: `course ${res.data.course.locked ? `locked` :`un-locked`} successfully !`,
                  text: "toggling lock on courses frequently is strongly prohibited ! !",
                  icon: "success",
                });
              }
             
              else {
                setCourses(res.data.courses);
                Swal.fire({
                  title:
                    "this course seems to have been deleted even before you thought of it !",
                  text: "Deleting courses frequently is strongly prohibited ! !",
                  icon: "error",
                });
              }
            } else {
              Swal.fire({
                title: "Action failed!",
                text: "something went wrong doing this .",
                icon: "error",
              });
            }
          });
      } catch (err) {
        Swal.fire({
          title: "I'm afraid you can't perform this operation now !",
          text: "Pls check your internet network ! !",
          icon: "caution",
        });
      }
        setDone(true);

    }
    Swal.fire({
      title: `Are you sure you want to ${course.locked ? `un-lock?`:`lock`} this course`,
      text: `note :${course.locked ? `this means that this course will now be available for enrollment on the homepage , there is a difference between deployed course and locked course (pls check system docs) .` : `this means this course will no longer be available for enrollment but the current batches or students offering this course will still be able to access the course and enjoy operations within their jurisdiction ! `}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
  };
  
  useEffect(() => {
    const Check = async () => {
      try {
        // setLlb(false)
        await axios
          .get(`${cont.api}admin/getcourse/${cid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                
                setCreator((prev) => res.data.creator);
                setTeacher((prev) => res.data.teacher);
                setTeachers((prev) => [...res.data.teachers]);
                setCourse((prev) => res.data.course);
                setFirst((prev) => res.data.course);
                setPix((prev) => res.data.pix);
                setLlb(false)
                

              } else {
                navigate("/");
              }
            } else {
              Swal.fire({
                title: "You do not have the license to visit this route !",
                text: "Contact management ! !",
                icon: "success",
              });
              navigate("/");
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
      setLlb(false);
    };

    // Check if jwtt and first are truthy
    if (!checkCalled) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [teachers,user, cont, checkCalled]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Example: Press "Ctrl + S"
      // if (event.ctrlKey && event.key === "b") {
      //   event.preventDefault();
      //   console.log("Ctrl + S pressed");
      //   // alert(course.cid);
      //   navigate(`/adminbatches/${course.cid}`);
      //   // Add your logic here
      // }
      if (event.altKey && event.key === "b") {
        event.preventDefault();
        console.log("Ctrl + S pressed");
        // alert(course.cid);
        navigate(`/adminbatches/${course.cid}`);
        // Add your logic here
      } else if (event.altKey && event.key === "t") {
        event.preventDefault();
        console.log("Ctrl + S pressed");
        // alert(course.cid);
        navigate(`/admintopics/${course.cid}`);
        // Add your logic here
      }

      // Example: Press "Alt + A"
      if (event.altKey && event.key === "a") {
        event.preventDefault();
        console.log("Alt + A pressed");
        // Add your logic here
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [course,user]);
 
  const Editcourse = async (e) => {
    e.preventDefault();
    const ifnochange = deepEqual(course,first);

    if(!ifnochange){
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in course) {
        formDataToSend.append(key, course[key]);
      }
      formDataToSend.append("userid", user.userid);
      if (course.tid && course.tid.length > 4) {
        setLl(false);

        try {
          await axios
            .post(`${cont.api}admin/editcourse`, formDataToSend, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (res.data.exist) {
                  Swal.fire({
                    title: `Error:course name has been taken by another course .`,
                    text: `This is one of the methodologies implored to prevent reverse engineering`,
                    icon: "error",
                  });
                  setLl(true);
                } else {
                  if (res.data.course) {
                    // setCreator((prev) => res.data.creator);
                    setTeacher((prev) => res.data.teacher);
                    // setTeachers((prev) => [...res.data.teachers]);
                    setCourse((prev) => res.data.course);
                    setFirst((prev) => res.data.course);

                    // setPix((prev) => res.data.pix);
                    setLlb(false);

                    handleClose();

                    // alert(res.data.user);

                    Swal.fire({
                      title: `Course updated successfully`,

                      icon: "success",
                    });
                  } else {
                    // Dalert(res.data.message);
                    Swal.fire({
                      title: `there was an error performing this action`,
                      text: `Error`,
                      icon: "error",
                    });
                  }
                }
              } else {
                // Dalert('pls check your network connection');
                Swal.fire({
                  title: `error : error`,
                  text: `error`,
                  icon: "error",
                });
                setLl(false);
              }
            });
        } catch (error) {
          // Handle error if needed
          console.error("Error:", error);
          Swal.fire({
            title: `Network/server Error:pls check your internet connection.`,
            text: `This is one of the methodologies implored to prevent back engineering`,
            icon: "error",
          });
          setLl(false);
          // Dalert('pls check your network connection');
        }
      } else {
        Swal.fire({
          title: `Error:it seems you are forgeting something ! .`,
          text: `Pls select teacher`,
          icon: "error",
        });
      }

      setLl(true);
    }
    else{
      handleClose()
      // setShowa(true);
      Swal.fire({
        title: `lol:you didnt make any changes .`,
        text: `(data integrity is taken seriously by codarbrain) `,
        icon: "caution",
      });
    }
  };
  const variant = [
    "Primary",
    "Danger",
    "Success",
    "Secondary",
    "Danger",
    "Warning",
    "Info",
    "Light",
    "Dark",
  ];

  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        courses={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div className="text-end col-12 px-2">
                <Link onClick={handleClose} className="text-end">
                  <i className="text-danger fa fa-times fa-2x"></i>
                </Link>
              </div>
              <div class="login-root ">
                <div class="box-rootd flex-flex flex-direction--column stt ">
                  <div class="box-rootd  flex-flex flex-direction--column fg-11 zz-9 ">
                    <div class="box-rootd  flex-flex flex-justifyContent--center  ">
                      <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center px-4 px-lg-5 "
                      >
                        <div className="m-0 codar px-2  jbtw">
                          <img
                            className="logob mt-1"
                            src="/images/codar-logo.png"
                            alt=""
                          />
                          {/* <h1 className="nname imib"> {cont.name}</h1> */}
                        </div>
                      </Link>
                    </div>
                    <div class="formbg-outer ">
                      <div class="formbg ">
                        <div class="formbg-inner ">
                          <h2 class="">Edit {course.name} </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : teachers && teachers.length > 0 ? (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Editcourse}
                              >
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter course name"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Course name"
                                      value={course.name}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          name: cap(e.target.value),
                                        }))
                                      }
                                      name="fname"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter Course fee"
                                  >
                                    <input
                                      type="number"
                                      placeholder="Course fee"
                                      value={course.price}
                                      required
                                      min={10000}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          price: e.target.value,
                                        }))
                                      }
                                      name="fee"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter course duration in months"
                                  >
                                    <input
                                      type="number"
                                      placeholder="Duration"
                                      value={course.duration}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          duration: e.target.value,
                                        }))
                                      }
                                      name="dur"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field mb-1 text-light fw-2">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="edit course teacher"
                                  >
                                    <select
                                      required
                                      className="mb-2 py-2 form-control text-center"
                                      name="teacher"
                                      id=""
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          tid: e.target.value,
                                        }))
                                      }
                                    >
                                      <option
                                        selected
                                        disabled
                                        value={course.teacherid}
                                      >
                                        ~ {course.teacher} ~
                                      </option>
                                      {teachers.map(({ userid, name }) => (
                                        <option
                                          className="text-dark  py-2 "
                                          value={userid}
                                        >
                                          {name}
                                        </option>
                                      ))}
                                    </select>
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter course description (less than 120 characters pls)"
                                  >
                                    <textarea
                                      name=""
                                      placeholder="Course description"
                                      value={course.desc}
                                      required
                                      minLength={15}
                                      maxLength={120}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          desc: e.target.value,
                                        }))
                                      }
                                      id=""
                                      row="4"
                                      col="15"
                                      className="border border-success form-control w-100"
                                      style={{ resize: "none" }}
                                    ></textarea>
                                  </Ctt>
                                </div>

                                <div class="fieldmn mb-1">
                                  <img
                                    className="rounded text-center mx-3 mb-3"
                                    style={{
                                      objectFit: "contain",
                                      width: "7vw",
                                    }}
                                    src={course.image}
                                    alt=""
                                  />
                                  {course.image ? (
                                    <div>
                                      <label for="avatar">Selected Image</label>
                                    </div>
                                  ) : (
                                    <label for="avatar">
                                      Select course Image
                                    </label>
                                  )}

                                  <div className="row px-2 w-100 mb-2 rolla py-2">
                                    {pix && pix.length > 0
                                      ? pix.map((el, index) => (
                                          <div
                                            // onClick={(e) =>
                                            //   setImage((prev) => el.image)
                                            // }
                                            onClick={(e) =>
                                              setCourse((prev) => ({
                                                ...prev,
                                                image: el.image,
                                              }))
                                            }
                                            className="col-md-4 col-4  rounded text-center tayo cpp"
                                            key={index}
                                          >
                                            <img
                                              style={{
                                                objectFit: "contain",
                                                width: "100%",
                                                height: "100%",
                                              }}
                                              src={el.image}
                                              alt=""
                                            />
                                          </div>
                                        ))
                                      : ""}
                                  </div>
                                  <div class="field paddingk-bottom--24">
                                    {ll ? (
                                      <div className="field">
                                        <button
                                          type="submit"
                                          className="button"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="text-center">
                                        <Lding />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </form>
                            </div>
                          ) : (
                            <div className="">
                              <div className="d-flex jbtw h-100">
                                {/* <h4>You have to add teachers first </h4> */}
                                <div className="w-100 text-success">
                                  <p>
                                    You currently do not have any registered
                                    teacher(s)
                                  </p>
                                  <p>
                                    You can not add a course without a teacher
                                  </p>
                                  <p>
                                    Pls click the button below to add a teaching
                                    staff
                                  </p>
                                </div>
                                <img
                                  className="noop"
                                  src="/gifs/nt.gif"
                                  alt=""
                                />
                              </div>
                              <div className="col-12 justify-content-center d-flex col-12">
                                <div className="col-6 text-center mb-5 pb-2">
                                  <Link
                                    to="/teachers"
                                    className="bg-danger rounded px-3 mr-3 text-light fs-4 py-2 px-lg-2 "
                                  >
                                    Add Teacher
                                    <i className="fa fa-arrow-right ms-3"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div class="container-xxl py-5">
          <div class="container">
            <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
              <h1 class="mb-1">{course.name}</h1>
            </div>

            {!llb ? (
              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <Card className="cardim">
                    {course && course.image ? (
                      <Card.Img variant="top" src={course.image} />
                    ) : (
                      ""
                    )}
                    <Card.Body>
                      <Card.Text>{cap(course.desc)}</Card.Text>
                      <Card.Title className="text-dark ">
                        <div className="jbtw align-items-center">
                          <h3 className=" text-end">{course.dprice} </h3>

                          <h5 className=" ">{course.durationm}</h5>
                        </div>
                      </Card.Title>
                      {user.cudaccess ? (
                        <div className="text-center">
                          <Button onClick={handleShow} variant="danger">
                            Edit course
                          </Button>
                          {/* <Button variant="danger">Delete course</Button> */}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-end">
                        <Ctt
                          id="tooltip-cart"
                          tooltip={`${course.locked ? `unlock course ?` : `lock course ?`}`}
                        >
                          {done ? (
                            <Link onClick={Lock}>
                              <i
                                className={`fa ${course.locked ? `fa-lock` : `fa-unlock`} fa-2x text-dark`}
                              ></i>
                            </Link>
                          ) : (
                            <div className="text-end">
                              <Lding />
                            </div>
                          )}
                        </Ctt>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className="col-md-8 col-12">
                  <div className="row ">
                    <Card
                      bg={variant[0].toLowerCase()}
                      key={variant[0]}
                      text={
                        variant[0].toLowerCase() === "light" ? "dark" : "white"
                      }
                      // style={{ width: "18rem" }}
                      className="mb-2 col-md-4 col-10 mx-auto"
                    >
                      <Card.Header>
                        <span className="text-end d-inline">
                          <Ctt
                            id="tooltip-cart"
                            tooltip={`this doesnt neccessarily mean ${teacher.name} is the only one that takes the course , this is more like a course department head.`}
                          >
                            <i className="fa fa-info text-warning text-end"></i>
                          </Ctt>
                        </span>
                        &nbsp; Teacher
                      </Card.Header>
                      <Card.Img variant="top" src={teacher.image} />
                      <Card.Body>
                        <Card.Title>
                          <h6>
                            {teacher.education}. {course.teacher} ( {"  "}
                            {teacher.level} staff )
                          </h6>
                        </Card.Title>
                        <Card.Text>{teacher.desc}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Card
                      bg={variant[1].toLowerCase()}
                      key={variant[1]}
                      text={
                        variant[1].toLowerCase() === "light" ? "dark" : "white"
                      }
                      // style={{ width: "18rem" }}
                      className="mb-2 col-md-4 col-10 mx-auto"
                    >
                      <Card.Header>Course Analytics</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/coursenewstudents/${course.cid}`}>
                            <h6 className="text-light">
                              {course.mandystudents} New students ({month}){" "}
                            </h6>
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          <Link to={`/courseallstudents/${course.cid}`}>
                            <h6 className="text-light">
                              {course.students} Students (all){" "}
                            </h6>
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          <h6>
                            {course.mandyleads} new leads ({month}){" "}
                          </h6>
                        </Card.Title>
                        <Card.Title>
                          {" "}
                          <h6 className="text-lowercase">
                            {course.leads} Leads (all)
                          </h6>{" "}
                        </Card.Title>
                        <Card.Title>
                          <Link to={`/adminbatches/${course.cid}`}>
                            <h6 className="text-light text-lowercase">
                              {course.batches} Batche(s)
                            </h6>{" "}
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          <Link to={`/admintopics/${course.cid}`}>
                            <h6 className="text-light text-lowercase">
                              {course.topics} Topic(s)
                            </h6>{" "}
                          </Link>
                        </Card.Title>

                        <Card.Text>Revenue :{course.drev}</Card.Text>
                      </Card.Body>
                    </Card>
                    <Card
                      bg={variant[2].toLowerCase()}
                      key={variant[2]}
                      text={
                        variant[2].toLowerCase() === "light" ? "dark" : "white"
                      }
                      // style={{ width: "28rem" }}
                      className="mb-2 col-md-4 col-10 mx-auto"
                    >
                      <Card.Header>Course Metadata</Card.Header>
                      <Card.Body className="text-lowercase">
                        <Card.Title>
                          {" "}
                          <h6 className="text-lowercase">
                            Added by : {cap(course.addedby)}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            Time added: {course.createddate}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            last edit by : {course.lasteditby}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            time of last edit : {course.lastedittime}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            last edit action: {course.lastedit}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            course description: {course.desc}
                          </h6>{" "}
                        </Card.Title>
                        {/* <Card.Text>c</Card.Text> */}
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-5">
                <Lding />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ncourse;
