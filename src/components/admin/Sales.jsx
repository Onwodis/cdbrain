import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";
import ReactTooltip from "react-tooltip";

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
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";


// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import { styled } from "@mui/system";
import { FaCopy } from 'react-icons/fa'; // Import the copy icon from react-icons

Modal.setAppElement("#root");

const Acos = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [sales, setSales] = useState([]);
  //   const [edit, setEdit] = useState([]);
  const [edit, setEdit] = useState({});
  const [sale, setSale] = useState({
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
  const [show, setShow] = useState(false);
  const [showe, setShowe] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleClosee = () => setShowe(false);
  const handleShowe = () => setShowe(true);
  const handleShow = () => setShow(true);
  const [mentors, seSales] = useState();
  let [checkCalled, setCheck] = useState(false);
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
  const Editsales = (userid) => {
    const salee = sales.find((el) => el.userid === userid);
    setEdit({ ...salee });
    handleShowe();
  };
  const { column, data, direction } = state;
  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getsales`, {
            headers: {
              userid: user.userid,
            },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.sales) {
                //   alert(res.data.data.latestloginplayertime);
                setSales(res.data.sales);
                // seSales(res.data.mentors);
                setPix((prev) => res.data.pix);
                // alert(res.data.pix.length)
                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                // setFirst(false);

                // navigate('/admin');
              }
            } else {
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
  }, [sales, user, cont, checkCalled]);
  const Newsales = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in sale) {
      formDataToSend.append(key, sale[key]);
    }

    try {
      // alert(JSON.stringify(sale))
      await axios
        .post(`${cont.api}admin/addsale`, formDataToSend,{headers:{userid:user.userid}})
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
              if (res.data.sales) {
                //   alert(res.data.data.latestloginplayertime);
                setSales(() => res.data.sales);

                seSales(() => res.data.sales);
                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                setSale({});

                handleClose();

                // alert(res.data.user);

                Swal.fire({
                  title: `New Sales associate added successfully`,

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
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };
  const Edited = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    let formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in edit) {
      formDataToSend.append(key, edit[key]);
    }

    try {
      // alert(JSON.stringify(sale))
      await axios
        .post(`${cont.api}admin/editsale`, formDataToSend,{headers:{userid:user.userid}})
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
              if (res.data.sales) {
                //   alert(res.data.data.latestloginplayertime);
                setSales(() => res.data.sales);

                seSales(() => res.data.sales);
                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                setSale({});

                handleClose();
                handleClosee();

                // alert(res.data.user);

                Swal.fire({
                  title: `Sales account associate updated successfully`,

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
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };

  const Focus = async (cid) => {
    const course = mentors.filter((el) => el.cid === cid);
    navigate("/sale", { state: course });
  };
  const Del = async (tid, name) => {
    // alert(`${cont.api}admin/delsale/${tid}`);
    async function Goon() {
      try {
        await axios.get(`${cont.api}admin/delsale/${tid}`,{
          headers: {
              userid: user.userid,
            }
        }).then((res) => {
          if (res.data.success) {
            // setFirst(false);

            if (res.data.sales) {
              //   alert(res.data.data.latestloginplayertime);
              setSales((prev)=>([...res.data.sales]))
              const oi = res.data.pix;
              setImage((prev) => oi[0].image);
              setSale({});
              Swal.fire({
                title: "Deleted !",
                text: "Sales account  deleted successfully ! !",
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
      title: `Are you sure you want to delete ${name}'s (sales account) ?`,
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
  };
  const License = async (tid, name) => {
    const ll = sales.find((el)=> el.userid ===tid)
    
    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/license?userid=${tid}&fromid=${user.userid}`, {
            headers: {
              userid: user.userid,
            },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.people) {
                //   alert(res.data.data.latestloginplayertime);
                setSales(res.data.people);
                //   alert(res.data.people.length);
                //   const oi = res.data.pix;
                //   setImage((prev) => oi[0].image);
                setSale({});
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
      title: `Are you sure you want to ${!ll.licensed ? `give ${name}` :`remove ${name}'s`} license to ${ll.gender === `male` ?  `his` :`her`} account ?`,
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
  const Cudaccess = async (tid, name) => {
    const ll = sales.find((el)=> el.userid ===tid)
    
    async function Goon() {
      try {
        await axios.get(`${cont.api}admin/cudaccess?userid=${tid}&fromid=${user.userid}`).then((res) => {
          if (res.data.success) {
            // setFirst(false);

            if (res.data.people) {
              //   alert(res.data.data.latestloginplayertime);
              setSales(res.data.people);
            //   alert(res.data.people.length);
            //   const oi = res.data.pix;
            //   setImage((prev) => oi[0].image);
              setSale({});
              Swal.fire({
                title: "Cud access toggled successfully !",
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
      title: `Are you sure you want to ${!ll.licensed ? `give ${name}` :`remove ${name}'s`} license to ${ll.gender === `male` ?  `his` :`her`} account ?`,
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
  
  const handleCheckboxChangee = (e) => {
    if (e.target.checked) {
      setEdit((prev) => ({ ...prev, gender: e.target.value }));
    }
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSale((prev) => ({ ...prev, gender: e.target.value }));
    }
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
                        <div class="formbg-inner ">
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
                            onSubmit={Edited}
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
                                      disabled
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
                                  <p for="male">Edit gender</p>
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
                                    placeholder="20000"
                                    value="male"
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
                                    placeholder="20000"
                                    value="female"
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
                          <h2 class="padding-bottom--15">
                            Add new Sales (associate)
                          </h2>

                          <form
                            id="stripe-login"
                            className=""
                            onSubmit={Newsales}
                          >
                            <Ctt id="tooltip-cart" tooltip="Enter first name">
                              <div class="field mb-1">
                                <input
                                  type="text"
                                  placeholder="First name"
                                  value={sale.fname}
                                  required
                                  minLength={3}
                                  onChange={(e) =>
                                    setSale((prev) => ({
                                      ...prev,
                                      fname: cap(e.target.value),
                                    }))
                                  }
                                  name="fname"
                                />
                              </div>
                            </Ctt>
                            {sale.fname && sale.fname.length > 2 ? (
                              <div class="field mb-1">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Enter last name"
                                >
                                  <div class="field mb-1">
                                    <input
                                      type="text"
                                      placeholder="Last name"
                                      value={sale.lname}
                                      required
                                      minLength={3}
                                      onChange={(e) =>
                                        setSale((prev) => ({
                                          ...prev,
                                          lname: cap(e.target.value),
                                        }))
                                      }
                                      name="lname"
                                    />
                                  </div>
                                </Ctt>
                              </div>
                            ) : (
                              ""
                            )}
                            {sale.lname &&
                            sale.fname.length > 2 &&
                            sale.lname.length > 2 ? (
                              <div className="div">
                                <div class="field mb-1">
                                  <Ctt id="tooltip-cart" tooltip="Enter email">
                                    <div class="field mb-1">
                                      <input
                                        type="email"
                                        placeholder="Email"
                                        value={sale.email}
                                        required
                                        minLength={3}
                                        onChange={(e) =>
                                          setSale((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                          }))
                                        }
                                        name="email"
                                      />
                                    </div>
                                  </Ctt>
                                </div>
                                <div class="field mb-1">
                                  <Ctt id="tooltip-cart" tooltip="Enter phone">
                                    <input
                                      type="text"
                                      placeholder="Phone"
                                      value={sale.phone}
                                      required
                                      minLength={7}
                                      onChange={(e) =>
                                        setSale((prev) => ({
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

                            {sale.fname &&
                            sale.lname &&
                            // sale.gender &&
                            sale.email &&
                            // sale.email.includes(("@" && ".")) &&
                            sale.email.includes("@") &&
                            sale.email.includes(".") &&
                            sale.fname.length > 2 &&
                            sale.lname.length > 2 &&
                            sale.email.length > 2 ? (
                              <div>
                                <div class="field mb-1 text-light fw-2">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip="Highest education"
                                  >
                                    <select
                                      required
                                      className="mb-2 py-2 form-control text-center"
                                      name="level"
                                      id=""
                                      onChange={(e) =>
                                        setSale((prev) => ({
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
                                    tooltip="Enter staff level"
                                  >
                                    <select
                                      required
                                      className="form-control  text-center "
                                      name="level"
                                      id=""
                                      onChange={(e) =>
                                        setSale((prev) => ({
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
                                    tooltip="Enter academic discipline"
                                  >
                                    <input
                                      type="text"
                                      title="Academic discipline or Area of specialty"
                                      placeholder="Academic discipline"
                                      value={sale.specialty}
                                      required
                                      onChange={(e) =>
                                        setSale((prev) => ({
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
                                    <p for="male">Select gender</p>
                                    <label for="male" className="cpp">
                                      <i
                                        className={`${
                                          sale.gender === `male`
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
                                          sale.gender === `female`
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
                            {sale.fname &&
                            sale.email &&
                            sale.lname &&
                            sale.specialty &&
                            sale.education &&
                            sale.gender &&
                            sale.email.includes("@" && ".") &&
                            sale.fname.length > 2 &&
                            sale.lname.length > 2 &&
                            sale.gender.length > 2 &&
                            sale.education.length > 2 &&
                            sale.email.length > 2 ? (
                              <div>
                                <div class="fieldmn mb-1">
                                  <img
                                    className="rounded text-center mx-3 mb-3"
                                    style={{
                                      objectFit: "contain",
                                      width: "7vw",
                                    }}
                                    src={sale.image}
                                    alt=""
                                  />
                                  {sale.image ? (
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
                                              setSale((prev) => ({
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
                                    tooltip="Enter professional achievement or talent"
                                  >
                                    <textarea
                                      name="desc"
                                      placeholder="Description,Achievement or any notable talent"
                                      className="form-control w-100 border border-danger"
                                      onChange={(e) =>
                                        setSale((prev) => ({
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
                                  sale.desc && sale.desc.length > 12 ? (
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

        <div class="container-xxl bg-transparent py-2">
          <div class="container">
            <div class="text-center ">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                Sales
              </h6> */}
              <h1 class="pb-4 mb-3 mt-2 s3">Sales (associates)</h1>
            </div>
            <div className="mb-5 z-5">
              {user.cudaccess ? (
                <div className="mb-1">
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-danger"
                    onClick={setShow}
                  >
                    Add Sales
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : sales && sales.length > 0 ? (
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
                  <thead style={{ zIndex: 2 }} className="thh  mt-5">
                    <tr className="mth">
                      <td className="text-center">S/N</td>
                      {/* <td
                          className="text-center"
                          
                        >
                          Image
                        </td> */}
                      <td className="text-center z-7">Name</td>
                      {/* <td
                          sorted={column === "age" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "age" })
                          }
                        >
                          Email
                        </td> */}
                      <td>Qualification</td>
                      <td>Leads</td>

                      <td>{month} Conversions</td>

                      <td>Staff level</td>
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

                      <td>Revenue</td>

                      <td
                        sorted={column === "gender" ? direction : null}
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_SORT",
                            column: "gender",
                          })
                        }
                      >
                        License
                      </td>
                      <td
                        sorted={column === "age" ? direction : null}
                        onClick={() =>
                          dispatch({ type: "CHANGE_SORT", column: "age" })
                        }
                      >
                        Edit
                      </td>
                      <td className="text-danger">Delete</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map(
                      (
                        {
                          dprice,
                          awd,
                          twd,
                          mwd,
                          licensed,
                          cudaccess,
                          registered,
                          physical,
                          userid,
                          cid,
                          open,
                          dmyconversions,
                          mandyconversions,
                          converted,
                          dprofit,
                          image,
                          email,
                          education,
                          lmonths,
                          phone,
                          humanexpiry,
                          level,
                          attendance,
                          leads,
                          mandyleads,
                          dmyleads,
                          logintimes,
                          lastseen,
                          gender,
                          logindmytimes,
                          createddate,
                          specialty,
                          name,
                          students,
                          desc,
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
                          {user.host ? (
                            <td className="tidamJ fs-5  text-start">
                              <Cttb
                                id="tooltip-cart"
                                tooltip={` <img src=${image} alt="no image" className="z-4" /><br>${name}<br>${email}<br>Talent or achievement: ${cap(desc)}<br> ${phone} <br>${education}<br>${specialty}</br>${desc}</br>logged in ${logintimes} times (all time)<br>Today's login ${logindmytimes}</br>date added: ${registered}<br>Last seen :${lastseen}`}
                              >
                                <div>{name}</div>
                              </Cttb>
                            </td>
                          ) : (
                            <td className="tidamJ fs-5 ">
                              <Cttb
                                id="tooltip-cart"
                                tooltip={` <img src=${image} alt="no image" /><br>${name}<br>${email}<br><br> ${phone} <br>${education}<br>${specialty}</br>${desc}</br>logged in ${logintimes} times</br>date added: ${registered}<br>Last seen :${lastseen}`}
                              >
                                <div>{name}</div>
                              </Cttb>
                            </td>
                          )}

                          {/* <td>{email}</td> */}
                          <td className="text-capitalise">{education}</td>
                          <td>
                            <Ctt
                              id="tooltip-cart"
                              tooltip={`Today's leads :${dmyleads} <br> This month's (${month}) leads :${mandyleads} <br>
                                    Total leads :${leads} <br>
                                `}
                            >
                              <div>{leads}</div>
                            </Ctt>
                          </td>
                          <td>
                            <Ctt
                              id="tooltip-cart"
                              tooltip={`Today's lead conversions :${dmyconversions} <br> This month's conversions :${mandyconversions} <br>
                                    Total conversions :${converted} <br>
                                `}
                            >
                              <div>{mandyconversions}</div>
                            </Ctt>
                          </td>
                          {/* <td>{registered}</td> */}
                          <td>{level}</td>

                          <td>{twd}</td>
                          <td>{mwd}</td>
                          <td>{awd}</td>
                          <td>{dprofit}</td>
                          <td
                            title={licensed ? `Active` : `License expired`}
                            className={`${
                              licensed ? `text-success` : `text-danger`
                            }`}
                          >
                            {user.cudaccess ? (
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`${
                                  licensed
                                    ? `Licensed :this means that ${name}  can access ${gender === "male" ? `his` : `her`} platform and view leads,click to toggle license`
                                    : `Licensed :this means that ${name}  can not access ${gender === "male" ? `his` : `her`} platform and view leads ,click to toggle license`
                                } `}
                              >
                                {licensed ? (
                                  <div
                                    onClick={(e) => License(userid, name)}
                                    className="text-success btn button"
                                  >
                                    Licensed
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
                            ) : (
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`${
                                  licensed
                                    ? `Licensed :this means that ${name}  can access ${gender === "male" ? `his` : `her`} platform and view leads,you can not invoke or revoke license`
                                    : `Licensed :this means that ${name}  can not access ${gender === "male" ? `his` : `her`} platform and view leads ,you can not invoke or revoke license`
                                } `}
                              >
                                {licensed ? (
                                  <div className="text-success button">
                                    Licensed
                                  </div>
                                ) : (
                                  <div className="text-danger button">
                                    Un-licensed
                                  </div>
                                )}
                              </Ctt>
                            )}
                          </td>

                          {user.cudaccess ? (
                            <td
                              className="text-primary cpp"
                              onClick={(e) => Editsales(userid)}
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
                      a={`Welcome , it seems you just reset/onboarded this management system `}
                      b={`You currently do not have any sales yet `}
                      c={`pls click the button above to add a sales associate .`}
                      d={`pls do not forget to enter only valid details !.`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acos;
