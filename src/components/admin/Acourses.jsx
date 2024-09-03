import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
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
// import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";


import zIndex from "@mui/material/styles/zIndex";
import RotatingText from "react-rotating-text";
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
Modal.setAppElement("#root");

const Ncourse = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  const [pix, setPix] = useState();
  const [showe, setShowe] = useState(false);
  const [showm, setShowm] = useState(false);
  const [show, setShow] = useState(false);
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
  const handleShow = () => setShow(true);
  const handleShowm = () => setShowm(true);
  const handleShowe = () => setShowe(true);
  const [teachers, setTeachers] = useState();
  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);

  const [image, setImage] = useState("");
 
  
  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getcourses`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                if(res.data.teachers){
                  setTeachers((prev) => [...res.data.teachers]);
                  // secourse(res.data.mentors);
                  setPix((prev) => res.data.pix);
                }
                // alert(res.data.teachers.length);

                if (res.data.courses) {
                  // alert('kjhgfc');
                  setCourses((prev) => [...res.data.courses]);
                  
                  const oi = res.data.pix;
                  setImage((prev) => oi[0].image);
                  // setFirst(false);

                  // navigate('/admin');
                } else {
                  // setCourse([]);
                  // secourse(res.data.mentors);
                  setPix((prev) => res.data.pix);
                  // alert(res.data.pix.length)
                  const oi = res.data.pix;
                  setImage((prev) => oi[0].image);
                }
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
      setLl(false);
    };

    // Check if jwtt and first are truthy
    if (!checkCalled) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [course, user, cont, checkCalled]);
  const Addcourse = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in course) {
      formDataToSend.append(key, course[key]);
    }
    formDataToSend.append('userid', user.userid);
    if(course.tid && course.tid.length > 4){
      try {
        await axios
          .post(`${cont.api}admin/addcourse`, formDataToSend, {
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
                setLlb(true);
              } else {
                if (res.data.courses) {
                  //   alert(res.data.data.latestloginplayertime);
                  setCourses(() => res.data.courses);

                  setCourse(() => ({}));
                  // const oi = res.data.pix;
                  // setImage((prev) => oi[0].image);
                  // setCourse({});

                  handleClose();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New course added successfully`,

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
              setLlb(true);
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
    }
    else{
      Swal.fire({
        title: `Error:it seems you are forgeting something ! .`,
        text: `Pls select teacher`,
        icon: "error",
      });
    }

    
    setLlb(true);
  };


  const Focus = async (cid) => {
    const course = courses.filter((el) => el.cid === cid);
    navigate("/acourse", { state: course });
  };

  const Deploy = async (tid, name) => {
    const ll = courses.find((el) => el.cid === tid);

    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/deploy/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses(res.data.courses);

                Swal.fire({
                  title: `${!ll.deployed ? 'deployment':`undeployment `} was successful`,
                  text: "Toggling deployment frequently is strongly prohibited ! !",
                  icon: "success",
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
    }
    Swal.fire({
      title: `Are you sure you want to ${!ll.deployed ? `deploy ${name}` : `undeploy ${name}`} ?`,
      text: `with cudaccess this is reversible ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, go ahead !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
  };
  const Del = async (tid, name) => {
    const ll = courses.find((el) => el.cid === tid);
    // alert(JSON.stringify(ll.batches))
    if((ll.batches > 0 ) || (ll.students > 0)){

      Swal.fire({
        title: "This is a busy course!",
        text: "You can not delete a course with batches or students .If codarbrain allows this , it will create a serious imbalance in the system  .",
        icon: "caution",
      });

    }


    else{async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/delcourse/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (!res.data.alreadydeleted){
                if (res.data.courses) {
                  //   alert(res.data.data.latestloginplayertime);
                  setCourses(res.data.courses);

                  Swal.fire({
                    title: "course deleted successfully !",
                    text: "Deleting courses frequently is strongly prohibited ! !",
                    icon: "success",
                  });
                }

              }
              else{
                setCourses(res.data.courses);
                Swal.fire({
                  title: "this course seems to have been deleted even before you thought of it !",
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
    }
    Swal.fire({
      title: `Are you sure you want to delete ${name} ?`,
      text: `note :this will also delete batches , and topics associated with this course ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    })}
  };

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
                            className="logob mt-2"
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
                          <h2 class="">Add new Course </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {ll ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : teachers && teachers.length > 0 ? (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Addcourse}
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
                                      value={course.fee}
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
                                <div class="field mb-1 text-light fw-2">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Select course teacher"
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
                                        value="commonentrance"
                                      >
                                        ~ Select Teacher ~
                                      </option>
                                      {teachers.map(({ userid, name }) => (
                                        <option
                                          className="text-light  py-2 bg-danger"
                                          value={userid}
                                        >
                                          {name}
                                        </option>
                                      ))}
                                    </select>
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
                                    {llb ? (
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
              <h1 data-aos="flip-left" class="mb-1 s3">
                Admin Courses
              </h1>
            </div>
            {user.cudaccess ? (
              <div className="mt-1 mb-5 jbtw">
                <Button
                  data-aos="slide-left" 
                  variant="contained"
                  color="primary"
                  className="bg-danger"
                  onClick={setShow}
                >
                  Add Course
                </Button>
              </div>
            ) : (
              ""
            )}
            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : (
              <div className="mt-3">
                {courses && courses.length > 0 ? (
                  <div
                    className="table-container table-responsive rela justify-content-center  mx-auto rounded mt-0  col-12 text-light"
                    style={{
                      maxHeight: "70vh",
                      minHeight: "40vh",
                      overflow: "scroll",
                      width: "100%",
                    }}
                  >
                    <Table
                      sticky
                      striped
                      bordered
                      hover
                      className="table overflow-auto rounded"
                    >
                      <thead className="tstick">
                        <tr>
                          <th>S/N</th>
                          <th>Name</th>
                          <th>Topics </th>
                          <th>Batches</th>
                          <th>New Students</th>
                          <th>Students</th>
                          <th>Attendance</th>
                          <th>Times edited</th>
                          <th>{month.slice(0, 3)} Rev</th>
                          <th>Revenue</th>
                          <th>Locked</th>
                          <th>
                            Deployed ?{"   "}
                            <Cttd
                              id="tooltip-cart"
                              tooltip={`Why deployment option? <br>imagine we are to wait for all the course configurations set up before going live , with deployment toggle the course can be made available on live and when clicked on , a pop up tells them the course is currently unavailable . admin toggles it into deployment mode after he has configured and tested the course .`}
                            >
                              <i className="z-5 fa fa-info text-warning "></i>
                            </Cttd>
                          </th>

                          <th>Delete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map(
                          (
                            {
                              students,
                              mstudents,
                              batches,
                              teacher,
                              cid,
                              createdby,
                              createdbyid,
                              name,
                              deployed,
                              regdate,
                              topics,
                              drev,
                              image,
                              lastedit,
                              attendance,
                              mdrev,
                              dprofit,
                              editedby,
                              locked,
                              lasteditby,
                              createdat,
                              lastedittime,
                              timesedited,
                              createddate,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              data-aos={
                                index % 2 === 1 ? "slide-left" : "slide-right"
                              }
                              key={cid}
                              style={{ position: "relative" }}
                              className="text-center mtr"
                            >
                              <td>{courses.length - index}</td>
                              <td className="tidamJ fs-5 text-start">
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={` <img src=${image} alt="no image" className="z-4" /><br>${name} (${teacher})<br>last edit :${lastedit}<br>last edit by: ${cap(editedby)}<br>last edit time: ${lastedittime}<br>Times edited :${timesedited} <br>created on :${createddate}<br>`}
                                >
                                  {user.cudaccess ? (
                                    <Link to={`/acourse/${cid}`}>
                                      <div>{name}</div>
                                    </Link>
                                  ) : (
                                    <div>{name}</div>
                                  )}
                                </Cttb>
                              </td>

                              <td className="text-capitalise">
                                {user.cudaccess ? (
                                  <Link to={`/admintopics/${cid}`}>
                                    {topics}
                                  </Link>
                                ) : (
                                  <p>{topics}</p>
                                )}
                              </td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${batches} batches`}
                                >
                                  {/* <div>{batches}</div> */}
                                  <Link to={`/adminbatches/${cid}`}>
                                    <h6 className="text-dark text-lowercase">
                                      {batches}
                                    </h6>{" "}
                                  </Link>
                                </Ctt>
                              </td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${mstudents} new students registered this month (${month})`}
                                >
                                  <div>{mstudents}</div>
                                </Ctt>
                              </td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${students} students`}
                                >
                                  <div>{students}</div>
                                </Ctt>
                              </td>

                              {/* <td>{registered}</td> */}
                              <td>{attendance}</td>
                              {/* <td>{lastedittime}</td>
                              <td>{lasteditby}</td> */}
                              <td>{timesedited}</td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${mdrev} realised (from transactions) this month ${month}`}
                                >
                                  <p>{mdrev}</p>
                                </Ctt>
                              </td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${drev} realised (from transactions) this since course inception (all time)`}
                                >
                                  <p>{drev}</p>
                                </Ctt>
                              </td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${locked ? `this means this course is not available for enrollment` : `this means this course is available for enrollment`}, use this tool during system configuration`}
                                >
                                  <div>{locked ? "true" : "false"}</div>
                                </Ctt>
                              </td>

                              <td
                                title={deployed ? `Active` : `un-deployed`}
                                className={`${
                                  deployed ? `text-success` : `text-danger`
                                }`}
                              >
                                {user.cudaccess ? (
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`${
                                      deployed
                                        ? `Deployed :this means that ${name} can be used in live mode (by students and the world at large) ,deploy only after course configurations have been done on course `
                                        : `un-Deployed :this means that ${name}  can not be used in live mode ,deploy only after course configurations have been done on course,students and the world at large will see this course but will not be able to register or read more information about this course in the system or web homepage.`
                                    } `}
                                  >
                                    {deployed ? (
                                      <div
                                        onClick={(e) => Deploy(cid, name)}
                                        className="text-success btn button"
                                      >
                                        true
                                      </div>
                                    ) : (
                                      <div
                                        onClick={(e) => Deploy(cid, name)}
                                        className="text-danger btn button"
                                      >
                                        false
                                      </div>
                                    )}
                                  </Ctt>
                                ) : (
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`${
                                      deployed
                                        ? `Deployed :this means that ${name} can be used in live mode (by students and the world at large) ,deploy only after course configurations have been done on course ,you can not deploy or undeploy`
                                        : `un-Deployed :this means that ${name}  can not be used in live mode ,deploy only after course configurations have been done on course,students and the world at large will see this course but will not be able to register or read more information about this course in the system or web homepage.,you can not deploy or undeploy`
                                    } `}
                                  >
                                    {deployed ? (
                                      <div className="text-success button">
                                        true
                                      </div>
                                    ) : (
                                      <div className="text-danger button">
                                        false
                                      </div>
                                    )}
                                  </Ctt>
                                )}
                              </td>

                              {user.cudaccess ? (
                                <td
                                  className="text-danger cpp"
                                  onClick={(e) => Del(cid, name)}
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Clicking this will delete ${name}' ,its batches and students , as well as topics , even leads too ! , remember this is a system with linearly dependent elements , everything is interconnected ! `}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Ctt>
                                </td>
                              ) : (
                                <td className="text-danger cpp">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={` Oops ! sorry you do not have access to perform this operation`}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </Ctt>
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 jbtw">
                        {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                        <Talk
                          bg={true}
                          a={`Welcome , it seems you just reset/onboarded this management system `}
                          b={`You currently do not have any course yet `}
                          c={`pls click the button above to add a course associate .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ncourse;
