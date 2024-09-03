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
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
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


Modal.setAppElement("#root");

const Branches = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [branches, setBranches] = useState();
  const [branch, setBranch] = useState({
    name:"",
    mname:"",
    address:"",
  });
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

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getbranches`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                if (res.data.branches) {
                  setBranches((prev) => [...res.data.branches]);
                  
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
  const Editbranch = async (e) => {
    e.preventDefault();
    setLlb(false)
    
    if (
      branch.name &&
      branch.mname &&
      branch.address &&
      branch.name.length > 4 &&
      branch.mname.length > 4 &&
      branch.address.length > 4
    ) {
      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in branch) {
        formDataToSend.append(key, branch[key]);
      }
      formDataToSend.append("userid", user.userid);
      try {
        await axios
          .post(`${cont.api}admin/editbranch`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:branch name is in use by another branch .`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.branches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBranches(() => res.data.branches);

                  handleClosee();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New branch updated successfully`,

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

              setBranch({
                name: "",
                mname: "",
                address: "",
              })

            } else {
              // Dalert('pls check your network connection');
              Swal.fire({
                title: `error : error`,
                text: `error`,
                icon: "error",
              });
              setLl(true);
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
        title: `Error:Fill in the blanks with valid and real life data! .`,
        text: `Pls enter valid details`,
        icon: "error",
      });
    }

    setLlb(true);
  };
  const Addbranch = async (e) => {
    e.preventDefault();
    setLlb(false)
    
    if (
      branch.name &&
      branch.mname &&
      branch.address &&
      branch.name.length > 4 &&
      branch.mname.length > 4 &&
      branch.address.length > 4
    ) {
      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in branch) {
        formDataToSend.append(key, branch[key]);
      }
      formDataToSend.append("userid", user.userid);
      try {
        await axios
          .post(`${cont.api}admin/addbranch`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:branch name is in use by another branch .`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.branches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBranches(() => res.data.branches);

                  

                  handleClose();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New branch added successfully`,

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
              setBranch({
                name: "",
                mname: "",
                address: "",
              });
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
    } else {
      Swal.fire({
        title: `Error:Fill in the blanks with valid and real life data! .`,
        text: `Pls enter valid details`,
        icon: "error",
      });
    }

    setLlb(true);
  };

  const Focus = async (cid) => {
    const course = courses.filter((el) => el.cid === cid);
    navigate("/acourse", { state: course });
  };

  const Preset = async () => {
    
    async function Goon() {
        setLl(true)
      try {
        await axios
          .get(`${cont.api}admin/presetbranches`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);
              setLl(false)

              if (res.data.branches) {
                setLl(false);

                setBranches((prev) => [...res.data.branches]);
                handleClose()

                Swal.fire({
                  title: `New presets saved successfully`,
                  text: "You just applied saved presets for branches",
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
      setLl(false)
    }
    Swal.fire({
      title: `You are about to apply preset branches ?`,
      text: `note :this will automatically create 3 branches for you (Ikeja , Gbagada , and Vi)`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
    
}
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
  const Del = async (brid, name) => {
    const ll = branches.find((el) => el.brid === brid);
    // alert(JSON.stringify(ll.batches))
    if (ll.batches > 0 || ll.students > 0) {
      Swal.fire({
        title: "This is a busy branch!",
        text: "You can not delete a branch with batches or students .If codarbrain allows this , it will create imbalance in the system  .",
        icon: "caution",
      });
    } else {
      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/delbranch/${brid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (!res.data.alreadydeleted) {
                  if (res.data.branches) {
                    //   alert(res.data.data.latestloginplayertime);
                    setBranches(res.data.branches);

                    Swal.fire({
                      title: "branch deleted successfully !",
                      text: "Deleting branches frequently is strongly prohibited ! !",
                      icon: "success",
                    });
                  }
                } else {
                  setCourses(res.data.branches);
                  Swal.fire({
                    title:
                      "this branch seems to have been deleted even before you thought of it !",
                    text: "Deleting branches frequently is strongly prohibited ! !",
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
        title: `Are you sure you want to delete ${name} branch?`,
        text: `note :this will also delete batches , and topics associated with this course ,this is irreversible ! `,
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
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };
  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        branches={true}
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
                          <h2 class="">Edit Branch </h2>

                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {!llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Addbranch}
                              >
                                <div class="fieldm mb-1">
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="fname">Branch name</label>
                                    <InputText
                                      id="name"
                                      name="name"
                                      placeholder="branch name (e.g Ikeja,Gbagada)"
                                      className=""
                                      value={branch.name}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="lname">Manager name</label>
                                    <InputText
                                      id="mname"
                                      name="mname"
                                      className=""
                                      placeholder="branch manager name"
                                      value={branch.mname}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="lname">
                                      Location Address
                                    </label>
                                    <InputText
                                      id="address"
                                      name="address"
                                      className=""
                                      placeholder="where is branch located ?"
                                      value={branch.address}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  {llb ? (
                                    <div className=" col-md-6 col-lg-12 col-12">
                                      <button onClick={Editbranch}>
                                        Update
                                      </button>
                                    </div>
                                  ) : (
                                    <div className=" col-md-6 col-lg-12 col-12">
                                      <Lding />
                                    </div>
                                  )}
                                </div>
                              </form>
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
                          <h2 class="">
                            Add new Branch{" "}
                            {branches && branches.length > 0 ? (
                              ""
                            ) : (
                              <div className="text-end">
                                <small>or</small> &nbsp;{" "}
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={`When you click this button it will save you the stress of manually adding entries , as at the time of system development ? , codarbrain has 3 branches saved as presets (Ikeja,Gbagada,V.I) with respect to developer knowledge , this preset option is only available when there are no branches saved in the system .`}
                                >
                                  <Button onClick={Preset} className="cpp ">
                                    apply preset branches
                                  </Button>
                                </Cttb>
                              </div>
                            )}{" "}
                          </h2>

                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {!llb ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={Addbranch}
                              >
                                <div class="fieldm mb-1">
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="fname">Branch name</label>
                                    <InputText
                                      id="name"
                                      name="name"
                                      placeholder="branch name (e.g Ikeja,Gbagada)"
                                      className=""
                                      value={branch.name}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="lname">Manager name</label>
                                    <InputText
                                      id="mname"
                                      name="mname"
                                      className=""
                                      placeholder="branch manager name"
                                      value={branch.mname}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className=" col-md-6 col-lg-12 col-12">
                                    <label htmlFor="lname">
                                      Location Address
                                    </label>
                                    <InputText
                                      id="address"
                                      name="address"
                                      className=""
                                      placeholder="where is branch located ?"
                                      value={branch.address}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  {llb ? (
                                    <div className=" col-md-6 col-lg-12 col-12">
                                      <button onClick={Addbranch}>
                                        Add branch
                                      </button>
                                    </div>
                                  ) : (
                                    <div className=" col-md-6 col-lg-12 col-12">
                                      <Lding />
                                    </div>
                                  )}
                                </div>
                              </form>
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
              <h1 class="mb-1 s3">Codar Branches</h1>
            </div>
            {user.cudaccess ? (
              <div className="mt-1 mb-5 jbtw">
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-danger"
                  onClick={setShow}
                >
                  Add Branch
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
                {branches && branches.length > 0 ? (
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
                          <th>Manager</th>
                          {/* <th>Leads</th> */}
                          <th>Students</th>
                          {/* <th>Students</th> */}
                          <th>Batches </th>

                          <th>Progress</th>

                          <th>
                            <Ctt
                              id="tooltip-cart"
                              tooltip={`${month} revenue : gross amount realised from transactions this month`}
                            >
                              <h3>{month.slice(0, 3)} Rev</h3>
                            </Ctt>
                          </th>
                          <th>
                            <Ctt
                              id="tooltip-cart"
                              tooltip={`all time revenue :gross amount realised from branch transactions since branch inception`}
                            >
                              <h3>All.T Rev</h3>
                            </Ctt>
                          </th>

                          <th>Date added</th>
                          <th>Address</th>
                          <th>Edit</th>

                          <th>Delete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {branches.map(
                          (
                            {
                              batches,
                              teacher,
                              cid,
                              leads,
                              brid,
                              dmrev,
                              name,
                              deployed,
                              regdate,
                              topics,
                              drev,

                              dateadded,
                              dprogress,
                              locked,
                              students,
                              address,
                              timesedited,
                              mname,
                              addedby,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              data-aos={
                                index % 2 === 1 ? "slide-left" : "slide-right"
                              }
                              key={brid}
                              style={{ position: "relative" }}
                              className="text-center mtr"
                            >
                              <td>{index + 1}</td>
                              <td className="tidamJ fs-5 text-start">
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={`${name} <br>${address}`}
                                >
                                  <h3>{name}</h3>
                                </Cttb>
                              </td>

                              <td className="text-capitalise">{mname}</td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${students} students`}
                                >
                                  <div>{students}</div>
                                </Ctt>
                              </td>
                              <td>{batches}</td>

                              {/* <td>{registered}</td> */}
                              <td>{dprogress}</td>
                              <td>{dmrev}</td>
                              <td>{drev}</td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`addedby : ${addedby} `}
                                >
                                  <small>{dateadded}</small>
                                </Ctt>
                              </td>
                              <td className="ss3 text-start">{address}</td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`Edit branch profile`}
                                >
                                  <div className="cpp">
                                    <i
                                      onClick={() => {
                                        const br = branches.find(
                                          (el) => el.brid === brid
                                        );

                                        setBranch(br);
                                        handleShowe();
                                      }}
                                      className="fa fa-edit text-primary"
                                    ></i>
                                  </div>
                                </Ctt>
                              </td>

                              <td className="text-danger">
                                <i
                                  onClick={() => Del(brid, name)}
                                  className="fa fa-trash cpp text-danger"
                                ></i>
                              </td>
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
                          b={`You currently do not have any branch yet `}
                          c={`pls click the button above to add a branch .`}
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
}

export default Branches
