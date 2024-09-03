import React, { useEffect, useState } from "react";
// import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
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
import Badge from "react-bootstrap/Badge";
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

const Topics = ({ cont, user, setUser }) => {
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
  const { cid } = useParams();

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
  const [showa, setShowa] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
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
  const handleClosea = () => setShowa(false);
  const handleShow = () => setShow(true);
  const handleShowm = () => setShowm(true);
  const handleShowe = () => setShowe(true);
  const handleShowa = () => setShowa(true);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState({cid});

  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);
 
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

  
 
  useEffect(() => {
    const Check = async () => {
       
      try {
        // setLlb(false)
        await axios
          .get(`${cont.api}admin/gettopics/${cid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                
                setCourse((prev) => res.data.course);
                setTopics((prev) => res.data.topics);
                setFirst((prev) => res.data.course);
            
                setLlb(false);
                Swal.fire({
                  title: `Pls treat as important  .`,
                  text: `Topics,batches,and courses are very crucial elements in codarbrain setup , pls note you can not add a batch or student for a course with less than 5 topics , if there is a single batch already attached to a course , any topic added after that will only have effect on new batches and students, pls read system documentation to know why this is so, only add batch or student after you have completely added all the topics for the course ,also you can not delete a course ,topic or batch with student(s) in it .pls read system documentation before operating this system .`,
                  icon: "info",
                  position:'top-end'
                });
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
  }, [topics, user, cont, checkCalled]);

  
  const Del = async (tid) => {

    if ((course.batches || course.students) > 0) {
      Swal.fire({
        title: `lol:You can not delete topic for a busy course .`,
        text: `Pls read system documentation, this topic is already in use by a batch/student`,
        icon: "info",
      });
      
    } else {
      
      const Goons = async()=>{
        setLlb(true);

      try {
        await axios
          .get(`${cont.api}admin/deletetopic/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.course) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse(() => res.data.course);
                setTopics(() => res.data.topics);

                setTopic(() => ({ cid }));
     
                setLlb(false);

                Swal.fire({
                  title: `Topic deleted successfully`,

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
            } else {
              setLlb(false);
              Swal.fire({
                title: `error : this topic is corrupted and can not be deleted now`,
                text: `error`,
                icon: "error",
              });
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
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }
      

      setLlb(false);
      }

      Swal.fire({
        title: `Are you sure you want to delete this topic ?`,
        text: `note :this is irreversible ! `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, i am sure !",
      }).then((result) => {
        if (result.isConfirmed) {
          Goons();
        }
      });
      
    }

    
  };
  const Edit = (tid) => {
    const tp = topics.find((el) => el.topid === tid);
    setTopic(tp);
    setFirst(tp);
    setShow(true);
  };
  const Edittopic = async (e) => {
    e.preventDefault();
    const ifnochange = deepEqual(topic, first);
    if (!ifnochange) {
      setLlb(true);

      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in topic) {
        formDataToSend.append(key, topic[key]);
      }
      formDataToSend.append("userid", user.userid);
      // formDataToSend.append("cid", cid);
      if (topic.title.length > 4 && topic.subtopic.length > 4) {
        try {
          await axios
            .post(`${cont.api}admin/edittopic`, formDataToSend, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (res.data.exist) {
                  setLl(false);
                  Swal.fire({
                    title: `Error:topic title has been taken by another topic .`,
                    text: `This is one of the methodologies implored to prevent reverse engineering`,
                    icon: "error",
                  });
                } else {
                  if (res.data.course) {
                    //   alert(res.data.data.latestloginplayertime);
                    setCourse(() => res.data.course);
                    setTopics(() => res.data.topics);

                    setTopic(() => ({ cid }));
                    //   setLl(true);
                    setLlb(false);
                    // const oi = res.data.pix;
                    // setImage((prev) => oi[0].image);
                    // setCourse({});

                    handleClose();

                    // alert(res.data.user);

                    Swal.fire({
                      title: `Topic updated successfully`,

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
                setLlb(false);
                Swal.fire({
                  title: `error : error`,
                  text: `error`,
                  icon: "error",
                });
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
          //   setLlb(true);
          // Dalert('pls check your network connection');
        }
      } else {
        Swal.fire({
          title: `Error:it seems you are forgeting something ! .`,
          text: `Topic and subtopics should at least be lengthier (5 chars minimum)`,
          icon: "error",
        });
      }

      setLlb(false);
    } else {
      handleClose();
      // setShowa(true);
      Swal.fire({
        title: `lol:you didnt make any changes .`,
        text: `you will have to type something different from original topic before you can make any update on topic (data integrity is taken seriously by codarbrain) .`,
        icon: "info",
      });
    }

    
  };
  const Addtopic = async (e) => {
    e.preventDefault();
    setLlb(true);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in topic) {
      formDataToSend.append(key, topic[key]);
    }
    formDataToSend.append("userid", user.userid);
    // formDataToSend.append("cid", cid);
    if (topic.title.length > 4 && topic.subtopic.length > 4) {
      try {
        await axios
          .post(`${cont.api}admin/addtopic`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                   setLl(false);
                Swal.fire({
                  title: `Error:topic title has been taken by another topic .`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
             
              } else {
                if (res.data.course) {
                  //   alert(res.data.data.latestloginplayertime);
                  setCourse(() => res.data.course);
                  setTopics(() => res.data.topics);

                  setTopic(() => ({cid}));
                //   setLl(true);
                  setLlb(false);
                  // const oi = res.data.pix;
                  // setImage((prev) => oi[0].image);
                  // setCourse({});

                  handleClosea();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New topic added successfully`,

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
              setLlb(false);
              Swal.fire({
                title: `error : error`,
                text: `error`,
                icon: "error",
              });
                 
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
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }
    


    } else {
      Swal.fire({
        title: `Error:it seems you are forgeting something ! .`,
        text: `Topic and subtopics should at least be lengthier (5 chars minimum)`,
        icon: "error",
      });
    }

    setLlb(false);

  };
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
      
      } else if (event.altKey && event.key === "z") {
        event.preventDefault();
        console.log("Ctrl + S pressed");
        // alert(course.cid);
        navigate(`/acourse/${course.cid}`);
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
  }, [course, user]);

  
  

  
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
                            className="logob "
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
                          <h2 class="">Edit topic </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : course && course.cid.length > 0 ? (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Edittopic}
                              >
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="update topic title"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Title"
                                      value={topic.title}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setTopic((prev) => ({
                                          ...prev,
                                          title: cap(e.target.value),
                                        }))
                                      }
                                      name="title"
                                    />
                                  </Ctt>
                                </div>

                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="update subtopics (less than 120 characters pls)"
                                  >
                                    <textarea
                                      name=""
                                      placeholder="Sub-topics"
                                      value={topic.subtopic}
                                      required
                                      rows={7}
                                      columns={7}
                                      minLength={15}
                                      maxLength={120}
                                      onChange={(e) =>
                                        setTopic((prev) => ({
                                          ...prev,
                                          subtopic: cap(e.target.value),
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
                                  <div class="field paddingk-bottom--24">
                                    {!llb ? (
                                      <div className="field">
                                        <button
                                          type="submit"
                                          className="button"
                                        >
                                          Update
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
        <Offcanvas show={showa} onHide={handleClosea}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div className="text-end col-12 px-2">
                <Link onClick={handleClosea} className="text-end">
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
                            className="logob "
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
                          <h2 class="">Add topic </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : course && course.cid.length > 0 ? (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Addtopic}
                              >
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter topic title"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Title"
                                      value={topic.title}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setTopic((prev) => ({
                                          ...prev,
                                          title: cap(e.target.value),
                                        }))
                                      }
                                      name="title"
                                    />
                                  </Ctt>
                                </div>

                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter subtopics (less than 120 characters pls)"
                                  >
                                    <textarea
                                      name=""
                                      placeholder="Sub-topics"
                                      value={topic.subtopic}
                                      required
                                      minLength={15}
                                      rows={7}
                                      columns={7}
                                      maxLength={120}
                                      onChange={(e) =>
                                        setTopic((prev) => ({
                                          ...prev,
                                          subtopic:(e.target.value),
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
                                  <div class="field paddingk-bottom--24">
                                    {!llb ? (
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
              <h1 class="mb-1">{course.name} Topics</h1>
              <div className="text-end z-5 mb-2">
                <h3 className="text-end ">
                  <Ctt
                    id="tooltip-cart"
                    tooltip={`clicking this will take you back to ${course.name} profile page.`}
                  >
                    <Link
                      as
                      button
                      to={`/acourse/${course.cid}`}
                      className="  button z-5"
                    >
                      <i className="fa fa-angle-double-left fa-2x mb-1"></i>
                    </Link>
                  </Ctt>
                </h3>
              </div>
            </div>

            {llb ? (
              <div className="text-center mt-5">
                <Lding />
              </div>
            ) : (
              <div className="row">
                <div className="col-md-4 col-12 mb-4">
                  <Card className="cardim">
                    <Card.Img variant="top" src={course.image} />
                    <Card.Body>
                      <Card.Text>{cap(course.desc)}</Card.Text>
                      <Card.Title className="text-dark ">
                        <div className="jbtw">
                          <h3 className=" text-end">{course.dprice}</h3>
                          <h5 className=" ">{course.durationm}</h5>
                        </div>
                      </Card.Title>
                      {user.cudaccess ? (
                        <div className="text-center">
                          <Ctt
                            id="tooltip-cart"
                            tooltip={`Note :new topic(s) will not reflect on existing batches or students as this will create an imbalance in the system logic and algorithm`}
                          >
                            <Button onClick={handleShowa} variant="primary">
                              Add topic
                            </Button>
                          </Ctt>
                          {/* <Button variant="danger">Delete course</Button> */}
                        </div>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                            <ListGroup.Item>Created by {course.addedby}</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body> */}
                  </Card>
                </div>
                <div className="row col-md-8 col-12 overflowb">
                  {topics && topics.length > 0 ? (
                    <div>
                      <h2
                        className="text-center rounded position-sticky top-0 bg-dark text-light py-2"
                        style={{ zIndex: 5 }}
                      >
                        {topics.length} {topics.length > 1 ? "Topics" : "Topic"}
                      </h2>
                      <ListGroup as="ol" numbered className="z-2">
                        {topics.map(
                          ({
                            title,
                            subtopic,
                            createddate,
                            createdby,
                            timesedited,
                            topid,
                            lasteditby,
                            sn,
                            lastedittime,
                          }) => (
                            <ListGroup.Item
                              as="li"
                              className="d-flex justify-content-between align-items-center"
                            >
                              {" "}
                              <i className="fa fa-list"></i>
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">{title}</div>
                                {subtopic}
                              </div>
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`Topic added by ${createdby},<br>time added :${
                                  createddate
                                } <br>Times edited :${timesedited}<br>Last edited by : ${lasteditby}<br>Time of last edit :${lastedittime}`}
                              >
                                <Badge bg="warning" pill className="">
                                  <i className="fa fa-info"></i>
                                </Badge>
                              </Ctt>
                              &nbsp;
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`edit topic`}
                                className=""
                              >
                                <Badge
                                  bg="primary"
                                  pill
                                  onClick={() => {
                                    Edit(topid);
                                  }}
                                  className="cpp"
                                >
                                  <i className="fa fa-edit"></i>
                                </Badge>
                              </Ctt>
                              &nbsp;
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`delete topic`}
                                className=""
                              >
                                <Badge
                                  bg="danger"
                                  pill
                                  className="cpp"
                                  onClick={() => {
                                    Del(topid);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </Badge>
                              </Ctt>
                              &nbsp;
                            </ListGroup.Item>
                          )
                        )}
                      </ListGroup>
                    </div>
                  ) : (
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 jbtw">
                        {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                        <Talk
                          bg={true}
                          a={`Welcome ,This course is yet to get a topic`}
                          b={`Pls add topic by clicking the add topic button`}
                          c={`topics will be displayed here after adding .`}
                          d={`topics are serially entered in the order of entry  !.`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
