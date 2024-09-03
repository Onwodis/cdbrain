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

Modal.setAppElement("#root");

const Student = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  
  const { userid } = useParams();

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [students, setStudents] = useState([]);


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
  const [student, setStudent] = useState({});


  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);

  const Focus = async (cid) => {
    const student = students.filter((el) => el.cid === cid);
    navigate("/astudent", { state: student });
  };

  const Updatestudent = async (tid, name) => {
    const ll = students.find((el) => el.cid === tid);

    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/deploy/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.student) {
                

                Swal.fire({
                  title: `${!ll.deployed ? "deployment" : `undeployment `} was successful`,
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
  
  useEffect(() => {
    const Check = async () => {
      try {
        // setLlb(false)
        await axios
          .get(`${cont.api}admin/getstudent/${userid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
           
              if (res.data.success) {
                
                setStudent((prev) => res.data.student);
               
                setLlb(false);
              } else {
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
  }, [student, user, cont, checkCalled]);

  const Editstudent = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in student) {
      formDataToSend.append(key, student[key]);
    }
    formDataToSend.append("userid", user.userid);
    if (student.userid && student.userid.length > 4) {
      setLl(false);

      try {
        await axios
          .post(`${cont.api}admin/editstudent`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:student name has been taken by another student .`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLl(true);
              } else {
                if (res.data.students) {
                  
                  setStudent((prev) => res.data.student);
                  

                  handleClose();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New student updated successfully`,

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
        text: `Pls select student`,
        icon: "error",
      });
    }

    setLl(true);
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
        students={true}
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
                          <h2 class="">Edit {student.name} </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : student && student.email.length > 6 ? (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Editstudent}
                              >
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Edit first name"
                                  >
                                    <input
                                      type="text"
                                      placeholder="First name"
                                      value={student.name}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setStudent((prev) => ({
                                          ...prev,
                                          fname: cap(e.target.value),
                                        }))
                                      }
                                      name="fname"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter student fee"
                                  >
                                    <input
                                      type="number"
                                      placeholder="student fee"
                                      value={student.price}
                                      required
                                      min={10000}
                                      onChange={(e) =>
                                        setStudent((prev) => ({
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
                                    tooltip="Enter student duration in months"
                                  >
                                    <input
                                      type="number"
                                      placeholder="Duration"
                                      value={student.duration}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setStudent((prev) => ({
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
                                    tooltip="Enter student description (less than 120 characters pls)"
                                  >
                                    <textarea
                                      name=""
                                      placeholder="student description"
                                      value={student.desc}
                                      required
                                      minLength={15}
                                      maxLength={120}
                                      onChange={(e) =>
                                        setStudent((prev) => ({
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
                                    src={student.image}
                                    alt=""
                                  />
                                  {student.image ? (
                                    <div>
                                      <label for="avatar">Selected Image</label>
                                    </div>
                                  ) : (
                                    <label for="avatar">
                                      Select student Image
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
                                              setStudent((prev) => ({
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
                                {/* <h4>You have to add students first </h4> */}
                                <div className="w-100 text-success">
                                  <p>
                                    You currently do not have any registered
                                    student(s)
                                  </p>
                                  <p>
                                    You can not add a student without a student
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
                                    to="/students"
                                    className="bg-danger rounded px-3 mr-3 text-light fs-4 py-2 px-lg-2 "
                                  >
                                    Add student
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
                student
              </h6> */}
              <h1 class="mb-1">{student.name}</h1>
            </div>
            <div className="row">
              <div className="col-md-4 col-12 mb-4">
                <Card className="cardim">
                  <Card.Img variant="top" src={student.image} />
                  <Card.Body>
                    <Card.Text>{cap(student.desc)}</Card.Text>
                    <Card.Title className="text-dark ">
                      <div className="jbtw">
                        <h3 className=" text-end">{student.dprice}</h3>
                        <h5 className=" ">{student.durationm}</h5>
                      </div>
                    </Card.Title>
                    {user.cudaccess ? (
                      <div className="text-center">
                        <Button onClick={handleShow} variant="primary">
                          Edit student
                        </Button>
                        {/* <Button variant="danger">Delete student</Button> */}
                      </div>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                  {/* <ListGroup className="list-group-flush">
                    <ListGroup.Item>Created by {student.addedby}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                </Card>
              </div>
              <div className="col-md-8 col-12">
                {llb ? (
                  <div className="text-center mt-5">
                    <Lding />
                  </div>
                ) : (
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
                      <Card.Header>student</Card.Header>
                      <Card.Img variant="top" src={student.image} />
                      <Card.Body>
                        <Card.Title>
                          <h6>
                            {student.education}. {student.student} ( {"  "}
                            {student.level} staff )
                          </h6>
                        </Card.Title>
                        <Card.Text>{student.desc}</Card.Text>
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
                      <Card.Header>student Analytics</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/studentnewstudents/${student.cid}`}>
                            <h6 className="text-light">
                              {student.mandystudents} New students ({month}){" "}
                            </h6>
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          <Link to={`/studentallstudents/${student.cid}`}>
                            <h6 className="text-light">
                              {student.students} Students (all){" "}
                            </h6>
                          </Link>
                        </Card.Title>
                        <Card.Title>
                          <h6>
                            {student.mandyleads} new leads ({month}){" "}
                          </h6>
                        </Card.Title>
                        <Card.Title>
                          {" "}
                          <h6>{student.leads} Leads (all)</h6>{" "}
                        </Card.Title>
                        <Card.Title>
                          {" "}
                          <h6>{student.batches} Batches </h6>{" "}
                        </Card.Title>
                        <Card.Title>
                          {" "}
                          <h6>{student.topics} Topics</h6>{" "}
                        </Card.Title>

                        <Card.Text>Revenue :{student.dprofit}</Card.Text>
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
                      <Card.Header>student Metadata</Card.Header>
                      <Card.Body className="text-lowercase">
                        <Card.Title>
                          {" "}
                          <h6 className="text-lowercase">
                            Added by : {cap(student.addedby)}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            Time added: {student.createddate}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            last edit by : {student.lasteditby}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            time of last edit : {student.lastedittime}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            last edit action: {student.lastedit}
                          </h6>{" "}
                          <h6 className="text-lowercase">
                            student description: {student.desc}
                          </h6>{" "}
                        </Card.Title>
                        {/* <Card.Text>c</Card.Text> */}
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
