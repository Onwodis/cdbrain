import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";


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
import Button from "@mui/material/Button";
import Swal from "sweetalert2";


import zIndex from "@mui/material/styles/zIndex";
import RotatingText from "react-rotating-text";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons


Modal.setAppElement("#root");

const Mentors = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState({
    fname: "",
    lname: "",
    gender: "",
    education: "",
    email: "",
    phone: "",
    specialty: "",
    image: "",
    desc: "",
  });
  const [pix, setPix] = useState();
  const [showe, setShowe] = useState(false);
  const [showm, setShowm] = useState(false);
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    desc: "",
    name: "",

    // Add more fields as needed
  });
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
  const [mentors, setjdmins] = useState();
  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);

  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  
  function exampleReducer(state, action) {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: mentors,
    direction: null,
  });
  const { column, data, direction } = state;

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getteachers`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                // setFirst(false);

                if (res.data.teachers) {
                  // alert('kjhgfc');
                  setAdmins((prev) => [...res.data.teachers]);
                  // seadmins(res.data.mentors);
                  setPix((prev) => res.data.pix);
                  // alert(res.data.pix.length)
                  const oi = res.data.pix;
                  setImage((prev) => oi[0].image);
                  // setFirst(false);

                  // navigate('/admin');
                } else {
                  setAdmins([]);
                  // seadmins(res.data.mentors);
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
  }, [admins, user, cont, checkCalled]);
  const Newadmin = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in admin) {
      formDataToSend.append(key, admin[key]);
    }

    try {
      await axios
        .post(`${cont.api}admin/addteacher`, formDataToSend, {
          headers: { userid: user.userid },
        })
        .then((res) => {
          if (res.data.success) {
            if (res.data.exist) {
              Swal.fire({
                title: `Error:email/image is already in use by another user.`,
                text: `This is one of the methodologies implored to prevent reverse engineering`,
                icon: "error",
              });
              setLlb(true);
            } else {
              if (res.data.teachers) {
                //   alert(res.data.data.latestloginplayertime);
                setAdmins(() => res.data.teachers);

                setAdmins(() => res.data.teachers);
                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                setAdmin({});

                handleClose();

                // alert(res.data.user);

                Swal.fire({
                  title: `New teacher added successfully`,

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
    setLlb(true);
  };
  const EditAdmins = (userid) => {
    const admine = admins.find((el) => el.userid === userid);
    setEdit({ ...admine });
    handleShowe();
  };
  const EditAdmin = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in edit) {
      formDataToSend.append(key, edit[key]);
    }

    try {
      // alert(JSON.stringify(edit))
      await axios
        .post(`${cont.api}admin/editteacher`, formDataToSend, {
          headers: { userid: user.userid },
        })
        .then((res) => {
          if (res.data.success) {
            if (res.data.exist) {
              Swal.fire({
                title: `Error:email/image is already in use by another user.`,
                text: `This is one of the methodologies implored to prevent reverse engineering`,
                icon: "error",
              });
              setLlb(true);
            } else {
              if (res.data.teachers) {
                //   alert(res.data.data.latestloginplayertime);
                setAdmins(() => res.data.teachers);

                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                setEdit({});

                handleClosee();

                // alert(res.data.user);

                Swal.fire({
                  title: `Teacher account  updated successfully`,

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
          } else if (res.data.nolicense) {
            // Dalert('pls check your network connection');
            Swal.fire({
              title: `error :you do not have license for this`,
              text: `error`,
              icon: "error",
            });
            setLlb(true);
          } else {
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
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };

  const Focus = async (cid) => {
    const course = mentors.filter((el) => el.cid === cid);
    navigate("/admin", { state: course });
  };
  const Del = async (tid, name) => {
    const tea = admins.find((el)=>el.userid === tid)
    if(tea.courses > 0){
      Swal.fire({
        title: "You can not delete this mentor (busy mentor) !",
        text: `${tea.name} is currently assigned to a course, deleting mentor will create disruption in the system .    suggestion:go to course ,re-assign another teacher(s) to the course(s) until ${tea.name} no longer has any course(s) before you can delete ${tea.name}`,
        icon: "error",
      });
    }
    else{
      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/delteacher/${tid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                // setFirst(false);

                if (res.data.teachers) {
                  //   alert(res.data.data.latestloginplayertime);
                  setAdmins(res.data.teachers);
                  const oi = res.data.pix;
                  setImage((prev) => oi[0].image);
                  setAdmin({});
                  Swal.fire({
                    title: "Deleted !",
                    text: "mentor account  deleted successfully ! !",
                    icon: "success",
                  });
                }
              } else {
                Swal.fire({
                  title: "Not Deleted!",
                  text: "something went wrong deleting this staff.",
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
        title: `Are you sure you want to delete ${name}'s (teacher account) ?`,
        text: `You won't be able to revert this ! `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Goon();
        }
      });
    }
    
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setAdmin((prev) => ({ ...prev, gender: e.target.value }));
    }
  };
  const [modalState, setModalState] = useState({});
  const handleCheckboxChangee = (e) => {
    if (e.target.checked) {
      setEdit((prev) => ({ ...prev, gender: e.target.value }));
    }
  };
  const openModal = (id) => {
    setModalState((prevState) => ({ ...prevState, [id]: true }));
  };
  const Access = async (tid, name) => {
    const ll = admins.find((el) => el.userid === tid);

    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/access?userid=${tid}&fromid=${user.userid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.teachers) {
                //   alert(res.data.data.latestloginplayertime);
                setAdmins(res.data.teachers);

                setAdmin({});
                Swal.fire({
                  title: "cudaccess toggled successfully !",
                  text: "Toggling cudaccess frequently is strongly prohibited ! !",
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
      title: `Are you sure you want to ${!ll.cudaccess ? `give ${name}` : `remove ${name}'s`} cudaccess to ${ll.gender === `male` ? `his` : `her`} account ?`,
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
  const License = async (tid, name) => {
    const ll = admins.find((el) => el.userid === tid);

    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/license?userid=${tid}&fromid=${user.userid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.people) {
                //   alert(res.data.data.latestloginplayertime);
                setAdmins(res.data.people);
                //   alert(res.data.people.length);
                //   const oi = res.data.pix;
                //   setImage((prev) => oi[0].image);
                setAdmin({});
                Swal.fire({
                  title: "License toggled successfully !",
                  text: "Toggling license frequently is strongly prohibited ! !",
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
      title: `Are you sure you want to ${!ll.licensed ? `give ${name}` : `remove ${name}'s`} license to ${ll.gender === `male` ? `his` : `her`} account ?`,
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
  const closeModal = (id) => {
    setModalState((prevState) => ({ ...prevState, [id]: false }));
  };
  
  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        users={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <Offcanvas show={showe} onHide={handleClosee}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div className="text-end col-12 px-2">
                <Link onClick={handleClosee} className="text-end">
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
                        <div class="formbg-inner text-center ">
                          <h2 class="">Edit {edit.name}'s (account)</h2>
                          <div className="  text-center align-items-center col-12">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                              className="  "
                            >
                              <span>copy key </span>
                              <FaCopy
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={handleCopy}
                                title="Copy to clipboard"
                              />
                              {copied && (
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    color: "green",
                                  }}
                                >
                                  Copied!
                                </span>
                              )}
                            </div>
                          </div>

                          <form
                            id="stripe-login"
                            className=""
                            onSubmit={EditAdmin}
                          >
                            <div class="field mb-1">
                              <Ctt id="tooltip-cart" tooltip="Edit first name">
                                <input
                                  type="text"
                                  placeholder="First name"
                                  value={edit.fname}
                                  required
                                  minLength={3}
                                  onChange={(e) =>
                                    setEdit((prev) => ({
                                      ...prev,
                                      fname: cap(e.target.value),
                                    }))
                                  }
                                  name="fname"
                                />
                              </Ctt>
                            </div>

                            <div class="field mb-1">
                              {/* <label for="lname">Last name</label> */}
                              <Ctt id="tooltip-cart" tooltip="Edit Last name">
                                <input
                                  type="text"
                                  placeholder="Last name"
                                  value={edit.lname}
                                  required
                                  minLength={3}
                                  onChange={(e) =>
                                    setEdit((prev) => ({
                                      ...prev,
                                      lname: cap(e.target.value),
                                    }))
                                  }
                                  name="fname"
                                />
                              </Ctt>
                            </div>

                            <div className="div">
                              <div class="field mb-1">
                                {/* <label for="email">Email</label> */}

                                <Ctt id="tooltip-cart" tooltip="Edit email">
                                  <input
                                    type="email"
                                    placeholder="Email"
                                    value={edit.email}
                                    required
                                    minLength={3}
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                      }))
                                    }
                                    name="email"
                                  />
                                </Ctt>
                              </div>
                              <div class="field mb-1">
                                <Ctt id="tooltip-cart" tooltip="Edit phone">
                                  <input
                                    type="text"
                                    placeholder="Phone"
                                    value={edit.phone}
                                    required
                                    minLength={7}
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        phone: e.target.value,
                                      }))
                                    }
                                    name="phone"
                                  />
                                </Ctt>
                              </div>
                            </div>

                            <div>
                              <div class="field mb-1 text-light fw-2">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Edit educational level"
                                >
                                  <select
                                    required
                                    className="mb-2 py-2 form-control text-center"
                                    name="level"
                                    id=""
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        education: e.target.value,
                                      }))
                                    }
                                  >
                                    <option selected value={edit.education}>
                                      {edit.education}
                                    </option>
                                    <option
                                      className="text-light  py-2 bg-danger"
                                      value="commonentrance"
                                    >
                                      Primary school leaving certificate
                                    </option>
                                    <option
                                      className="text-light  py-2 bg-danger"
                                      value="ssce"
                                    >
                                      School certificate e.g(Waec ,Neco)
                                    </option>
                                    <option
                                      className="text-dark  py-2 bg-warning"
                                      value="nce"
                                    >
                                      National Certificate of Education
                                    </option>
                                    <option
                                      className="text-dark  py-2 bg-warning"
                                      value="ond"
                                    >
                                      Ordinary National Diploma
                                    </option>
                                    <option
                                      className="text-light  py-2 bg-success"
                                      value="hnd"
                                    >
                                      Higher National Diploma
                                    </option>
                                    <option
                                      className="text-light  py-2 bg-success"
                                      value="bsc"
                                    >
                                      {" "}
                                      Bachelor of Science
                                    </option>
                                    <option
                                      className="bg-success text-light "
                                      value="msc"
                                    >
                                      Master of Sciences
                                    </option>
                                    <option
                                      className="bg-success text-light "
                                      value="phd"
                                    >
                                      Doctor of Philosophy
                                    </option>
                                  </select>
                                </Ctt>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Edit staff level"
                                >
                                  <select
                                    required
                                    className="form-control  text-center "
                                    name="level"
                                    id=""
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        level: e.target.value,
                                      }))
                                    }
                                  >
                                    <option
                                      selected
                                      value={edit.level}
                                      className="text-capitalise bg-info text-light"
                                    >
                                      ~ {edit.level} (current level) ~
                                    </option>
                                    <option value="intern">Intern</option>
                                    <option value="junior">Junior staff</option>
                                    <option value="senior">Senior</option>
                                    <option value="senior">Executive</option>
                                  </select>
                                </Ctt>
                              </div>
                              <div class="field mb-1">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Edit academic discipline"
                                >
                                  <input
                                    type="text"
                                    title="Academic discipline or Area of specialty"
                                    placeholder="Academic discipline"
                                    value={edit.specialty}
                                    required
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        specialty: e.target.value,
                                      }))
                                    }
                                  />
                                </Ctt>
                              </div>
                              <div class="field col-12 mb-1 d-flex mt-4">
                                <div className="jbtw col-6 align-items-center">
                                  <p>Edit gender</p>
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Re-assign male gender"
                                  >
                                    <label for="male" className="cpp">
                                      <i
                                        className={`${
                                          edit.gender === `male`
                                            ? `text-success fa-4x`
                                            : `text-dark fa-3x`
                                        } fa fa-male`}
                                      ></i>
                                    </label>
                                  </Ctt>

                                  <input
                                    type="radio"
                                    hidden
                                    value="male"
                                    checked={
                                      edit.gender === "male" ? true : false
                                    }
                                    required
                                    onChange={handleCheckboxChangee}
                                    name="gender"
                                    id="male"
                                  />
                                </div>
                                &nbsp;
                                <div className="jbtw col-12">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Re-assign female gender"
                                  >
                                    <label for="female" className="cpp">
                                      <i
                                        className={`${
                                          edit.gender === `female`
                                            ? `text-success fa-4x`
                                            : `text-dark fa-3x`
                                        } fa fa-female`}
                                      ></i>
                                    </label>
                                  </Ctt>

                                  <input
                                    hidden
                                    width={20}
                                    type="radio"
                                    checked={
                                      edit.gender === "female" ? true : false
                                    }
                                    placeholder="20000"
                                    value="female"
                                    required
                                    onChange={handleCheckboxChangee}
                                    name="gender"
                                    id="female"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div class="fieldmn mb-1">
                                <img
                                  className="rounded text-center mx-3 mb-3"
                                  style={{
                                    objectFit: "contain",
                                    width: "7vw",
                                  }}
                                  src={edit.image}
                                  alt=""
                                />
                                <div>
                                  <label for="avatar">
                                    selected profile Image
                                  </label>
                                </div>

                                <div className="row px-2 w-100 mb-2 rolla py-2">
                                  <label for="avatar">Select Image</label>
                                  {pix && pix.length > 0
                                    ? pix.map((el, index) => (
                                        <div
                                          // onClick={(e) =>
                                          //   setImage((prev) => el.image)
                                          // }
                                          onClick={(e) =>
                                            setEdit((prev) => ({
                                              ...prev,
                                              image: el.image,
                                            }))
                                          }
                                          className="col-md-4 col-4  rounded text-center tayo cpp"
                                          key={index}
                                        >
                                          <Ctt
                                            id="tooltip-cart"
                                            tooltip="select this image"
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
                                          </Ctt>
                                        </div>
                                      ))
                                    : ""}
                                </div>
                              </div>
                              <div class="fieldkl mb-1 w-100 px-1 mt-2">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`Write professional achievement (i.e verifiable professional achievement about ${edit.name})`}
                                >
                                  <textarea
                                    name="desc"
                                    value={edit.desc}
                                    placeholder="Description,Achievement or any notable talent"
                                    className="form-control w-100 border border-danger"
                                    onChange={(e) =>
                                      setEdit((prev) => ({
                                        ...prev,
                                        desc: e.target.value,
                                      }))
                                    }
                                    id=""
                                    required
                                    style={{ resize: "none" }}
                                  ></textarea>
                                </Ctt>
                              </div>

                              {llb ? (
                                edit.desc && edit.desc.length > 12 ? (
                                  <div class="field paddingk-bottom--24 mt-3">
                                    {/* <input
                                        type="submit"
                                        name="submit"
                                        value="Save"
                                      /> */}
                                    <button type="submit" className="button">
                                      Save
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )
                              ) : (
                                <div className="text-center">
                                  <Lding />
                                </div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
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
                          <h2 class="padding-bottom--15">Add new Teacher</h2>

                          <form
                            id="stripe-login"
                            className=""
                            onSubmit={Newadmin}
                          >
                            <div class="field mb-1">
                              <Ctt id="tooltip-cart" tooltip="Enter First name">
                                <input
                                  type="text"
                                  placeholder="First name"
                                  value={admin.fname}
                                  required
                                  minLength={3}
                                  onChange={(e) =>
                                    setAdmin((prev) => ({
                                      ...prev,
                                      fname: cap(e.target.value),
                                    }))
                                  }
                                  name="fname"
                                />
                              </Ctt>
                            </div>
                            {admin.fname && admin.fname.length > 2 ? (
                              <div class="field mb-1">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Enter Last name"
                                >
                                  <input
                                    type="text"
                                    placeholder="Last name"
                                    value={admin.lname}
                                    required
                                    minLength={3}
                                    onChange={(e) =>
                                      setAdmin((prev) => ({
                                        ...prev,
                                        lname: cap(e.target.value),
                                      }))
                                    }
                                    name="lname"
                                  />
                                </Ctt>
                              </div>
                            ) : (
                              ""
                            )}
                            {admin.lname &&
                            admin.fname.length > 2 &&
                            admin.lname.length > 2 ? (
                              <div className="div">
                                <div class="field mb-1">
                                  <Ctt id="tooltip-cart" tooltip="Enter email">
                                    <input
                                      type="email"
                                      placeholder="Email"
                                      value={admin.email}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          email: e.target.value,
                                        }))
                                      }
                                      name="email"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Enter phone number"
                                  >
                                    <input
                                      type="text"
                                      placeholder="Phone"
                                      value={admin.phone}
                                      required
                                      minLength={7}
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          phone: e.target.value,
                                        }))
                                      }
                                      name="phone"
                                    />
                                  </Ctt>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {admin.fname &&
                            admin.lname &&
                            // admin.gender &&
                            admin.email &&
                            // admin.email.includes(("@" && ".")) &&
                            admin.email.includes("@") &&
                            admin.email.includes(".") &&
                            admin.fname.length > 2 &&
                            admin.lname.length > 2 &&
                            admin.email.length > 2 ? (
                              <div>
                                <div class="field mb-1 text-light fw-2">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Set highest educational level"
                                  >
                                    <select
                                      required
                                      className="mb-2 py-2 form-control text-center"
                                      name="level"
                                      id=""
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          education: e.target.value,
                                        }))
                                      }
                                    >
                                      <option
                                        selected
                                        disabled
                                        value="commonentrance"
                                      >
                                        ~ Highest Qualification ~
                                      </option>
                                      <option
                                        className="text-light  py-2 bg-danger"
                                        value="commonentrance"
                                      >
                                        Primary school leaving certificate
                                      </option>
                                      <option
                                        className="text-light  py-2 bg-danger"
                                        value="ssce"
                                      >
                                        School certificate e.g(Waec ,Neco)
                                      </option>
                                      <option
                                        className="text-dark  py-2 bg-warning"
                                        value="nce"
                                      >
                                        National Certificate of Education
                                      </option>
                                      <option
                                        className="text-dark  py-2 bg-warning"
                                        value="ond"
                                      >
                                        Ordinary National Diploma
                                      </option>
                                      <option
                                        className="text-light  py-2 bg-success"
                                        value="hnd"
                                      >
                                        Higher National Diploma
                                      </option>
                                      <option
                                        className="text-light  py-2 bg-success"
                                        value="bsc"
                                      >
                                        {" "}
                                        Bachelor of Science
                                      </option>
                                      <option
                                        className="bg-success text-light "
                                        value="msc"
                                      >
                                        Master of Sciences
                                      </option>
                                      <option
                                        className="bg-success text-light "
                                        value="phd"
                                      >
                                        Doctor of Philosophy
                                      </option>
                                    </select>
                                  </Ctt>
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Set staff level"
                                  >
                                    <select
                                      required
                                      className="form-control  text-center "
                                      name="level"
                                      id=""
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          level: e.target.value,
                                        }))
                                      }
                                    >
                                      <option
                                        selected
                                        disabled
                                        value=""
                                        className="bg-info text-light"
                                      >
                                        ~ Staff Hierachy ~
                                      </option>
                                      <option value="intern">Intern</option>
                                      <option value="junior">
                                        Junior staff
                                      </option>
                                      <option value="senior">Senior</option>
                                      <option value="senior">Executive</option>
                                    </select>
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Academic discipline or specialty"
                                  >
                                    <input
                                      type="text"
                                      title="Academic discipline or Area of specialty"
                                      placeholder="Academic discipline"
                                      value={admin.specialty}
                                      required
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          specialty: e.target.value,
                                        }))
                                      }
                                      name="course"
                                    />
                                  </Ctt>
                                </div>
                                <div class="field col-12 mb-1 d-flex mt-4">
                                  <div className="jbtw col-6 align-items-center">
                                    <p for="male">Select gender :Male</p>
                                    <label for="male" className="cpp">
                                      <i
                                        className={`${
                                          admin.gender === `male`
                                            ? `text-success fa-4x`
                                            : `text-dark fa-3x`
                                        } fa fa-male`}
                                      ></i>
                                    </label>

                                    <input
                                      type="radio"
                                      hidden
                                      placeholder="20000"
                                      value="male"
                                      required
                                      onChange={handleCheckboxChange}
                                      name="gender"
                                      id="male"
                                    />
                                  </div>
                                  &nbsp;
                                  <div className="jbtw col-12">
                                    <label for="female" className="cpp">
                                      <i
                                        className={`${
                                          admin.gender === `female`
                                            ? `text-success fa-4x`
                                            : `text-dark fa-3x`
                                        } fa fa-female`}
                                      ></i>
                                    </label>

                                    <input
                                      hidden
                                      width={20}
                                      type="radio"
                                      placeholder="20000"
                                      value="female"
                                      required
                                      onChange={handleCheckboxChange}
                                      name="gender"
                                      id="female"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {admin.fname &&
                            admin.email &&
                            admin.lname &&
                            admin.specialty &&
                            admin.education &&
                            admin.gender &&
                            admin.email.includes("@" && ".") &&
                            admin.fname.length > 2 &&
                            admin.lname.length > 2 &&
                            admin.gender.length > 2 &&
                            admin.education.length > 2 &&
                            admin.email.length > 2 ? (
                              <div>
                                <div class="fieldmn mb-1">
                                  <img
                                    className="rounded text-center mx-3 mb-3"
                                    style={{
                                      objectFit: "contain",
                                      width: "7vw",
                                    }}
                                    src={admin.image}
                                    alt=""
                                  />
                                  {admin.image ? (
                                    <div>
                                      <label for="avatar">Selected Image</label>
                                    </div>
                                  ) : (
                                    <label for="avatar">Select Image</label>
                                  )}

                                  <div className="row px-2 w-100 mb-2 rolla py-2">
                                    {pix && pix.length > 0
                                      ? pix.map((el, index) => (
                                          <div
                                            // onClick={(e) =>
                                            //   setImage((prev) => el.image)
                                            // }
                                            onClick={(e) =>
                                              setAdmin((prev) => ({
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
                                </div>
                                <div class="fieldkl mb-1 w-100 px-1">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="professional achievement or any notable talent"
                                  >
                                    <textarea
                                      name="desc"
                                      placeholder="Description,Achievement or any notable talent"
                                      className="form-control w-100 border border-danger"
                                      onChange={(e) =>
                                        setAdmin((prev) => ({
                                          ...prev,
                                          desc: e.target.value,
                                        }))
                                      }
                                      id=""
                                      required
                                      style={{ resize: "none" }}
                                    ></textarea>
                                  </Ctt>
                                </div>

                                {llb ? (
                                  admin.desc && admin.desc.length > 12 ? (
                                    <div class="field paddingk-bottom--24">
                                      {/* <input
                                        type="submit"
                                        name="submit"
                                        value="Save"
                                      /> */}
                                      <button type="submit" className="button">
                                        Save
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <div className="text-center">
                                    <Lding />
                                  </div>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </form>
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
            <div class="text-center wow fadeInUp mb-2" data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                admins
              </h6> */}
              <h1 class="mb-1 s3">Teachers</h1>
            </div>
            {user.cudaccess ? (
              <div className="mb-5 jbtw">
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-danger"
                  onClick={setShow}
                >
                  Add Teacher
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
                {admins && admins.length > 0 ? (
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
                        <tr className="mth">
                          <td className="text-center">S/N</td>

                          <td className="text-center z-7">Name</td>

                          <td>Qualification</td>

                          <td>Last seen</td>

                          <td>Today Logins</td>

                          <td>
                            Courses{" "}
                            <Cttb
                              id="tooltip-cart"
                              tooltip={`Why this ? <br>This shows the number of courses taken by staff this is one of the measures used to measure staff efficiency and effectiveness`}
                            >
                              <i className="z-5 fa fa-info text-warning "></i>
                            </Cttb>
                          </td>
                          <td>Batches</td>
                          <td>Students</td>
                          {user.host ? (
                            <th>
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`Todays activity : This a measure of the number of times user has manipulated data on codarbrain database today, by manipulation we mean created/updated or deleted a document .this is an additional feature to measure user's work contribution on a daily basis .`}
                              >
                                <h4>TA</h4>
                              </Cttb>
                            </th>
                          ) : (
                            ""
                          )}
                          {user.host ? (
                            <th>
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`Month activity (${month}) : This a measure of the number of times user has manipulated data on codarbrain database this month (${month}), by manipulation we mean created/updated or deleted a document .this is an additional feature to measure user's work contribution on monthlyy basis .`}
                              >
                                <h4>MA</h4>
                              </Cttb>
                            </th>
                          ) : (
                            ""
                          )}
                          {user.host ? (
                            <th>
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`All time activity : This a measure of the number of times user has manipulated data on codarbrain database since he/she was registered, by manipulation we mean created/updated or deleted a document .this is an additional feature to measure user's all time work contribution .`}
                              >
                                <h4>AA</h4>
                              </Cttb>
                            </th>
                          ) : (
                            ""
                          )}

                          <td>
                            C topics{"   "}
                            <Cttb
                              id="tooltip-cart"
                              tooltip={`Why this ? <br>This is the number of topics completed by staff (all time) this is one of the measures used to measure staff efficiency and effectiveness`}
                            >
                              <i className="z-5 fa fa-info text-warning "></i>
                            </Cttb>
                          </td>

                          <td>
                            License{"   "}
                            <Cttb
                              id="tooltip-cart"
                              tooltip={`Why License ? <br>It is very important host admin has undisputed control over all activities on codarbrain , as host admin will be held accountable for all or any data disruption or corruption in codarbrain system ,Host should be able to suspend staff's license at the slightest suspicion of foul play in the system. `}
                            >
                              <i className="z-5 fa fa-info text-danger "></i>
                            </Cttb>
                          </td>
                          <td>Edit</td>
                          <td className="text-danger">Delete</td>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map(
                          (
                            {
                              dprice,
                              licensed,
                              cudaccess,
                              awd,
                              twd,
                              mwd,
                              registered,
                              physical,
                              userid,
                              cid,
                              comp,
                              courses,
                              batches,
                              image,
                              email,
                              education,
                              lmonths,
                              phone,
                              humanexpiry,
                              level,
                              attendance,
                              leads,
                              logindmytimes,
                              mandyleads,
                              dmyleads,
                              logintimes,
                              lastseen,
                              gender,
                              createddate,
                              specialty,
                              name,
                              desc,
                              students,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              key={userid}
                              style={{ position: "relative" }}
                              className="mtr"
                            >
                              <td>{index + 1}</td>
                              <td className="tidamJ fs-5  text-start">
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={` <img src=${image} alt="no image" className="z-4" /><br>${name}<br>${email}<br>Achievement: ${cap(desc)}<br> ${phone} <br>${education}<br>${specialty}</br>${desc}</br>logged in ${logintimes} times (all time)<br>Today's login ${logindmytimes}</br>date added: ${registered}<br>staff level: ${level}<br>Last seen :${lastseen} <br>Phone : ${phone}`}
                                >
                                  <div>{name}</div>
                                </Cttb>
                              </td>

                              <td className="text-capitalise">{education}</td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`last seen online on :${lastseen}`}
                                >
                                  <div>{lastseen}</div>
                                </Ctt>
                              </td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`todays login times ,note higher logintimes should arouse suspicions on system malpractice from user .`}
                                >
                                  <div>{logindmytimes}</div>
                                </Ctt>
                              </td>
                              {/* <td>{registered}</td> */}
                              <td>{courses}</td>
                              <td>{batches}</td>
                              <td>{students}</td>
                              <td>{twd}</td>
                              <td>{mwd}</td>
                              <td>{awd}</td>
                              <td>{comp}</td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${
                                    licensed
                                      ? `Licensed :this means that ${name}  can access (unrestricted) his account and perform operations within ${gender === "male" ? `his` : `her`} jurisdiction as a teacher`
                                      : `Un-Licensed :this means that ${name}  can not access (unrestricted) his account and perform operations within ${gender === "male" ? `his` : `her`} jurisdiction as a teacher`
                                  } `}
                                >
                                  {licensed ? (
                                    <div
                                      onClick={(e) => License(userid, name)}
                                      className="text-success btn button"
                                    >
                                      licensed
                                    </div>
                                  ) : (
                                    <div
                                      onClick={(e) => License(userid, name)}
                                      className="text-danger btn button"
                                    >
                                      Un-licensed
                                    </div>
                                  )}
                                </Ctt>
                              </td>

                              {user.cudaccess ? (
                                <td
                                  className="text-primary cpp"
                                  onClick={(e) => EditAdmins(userid)}
                                >
                                  <i className="fa fa-edit"></i>
                                </td>
                              ) : (
                                <td className="text-primary cpp">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={` Oops ! sorry you do not have access to edit ${name}'s account`}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Ctt>
                                </td>
                              )}
                              {user.cudaccess ? (
                                <td
                                  className="text-danger cpp"
                                  onClick={(e) => Del(userid, name)}
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Clicking this will delete ${name}'s account ! `}
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
                          a={`Welcome , it seems you just reset/onboarded this system `}
                          b={`You currently do not have any teachers yet `}
                          c={`pls click the button above to add a teacher .`}
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

export default Mentors;
