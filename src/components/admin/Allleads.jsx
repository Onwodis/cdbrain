import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";
import { Pagination } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
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
import Card from "react-bootstrap/Card";
import { Select, Input, Radio} from "antd";
import "../all.css";
// import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import zIndex from "@mui/material/styles/zIndex";
// import RotatingText from "react-rotating-text";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { InputNumber } from "primereact/inputnumber";

const { Option } = Select 

const Allleads = ({ cont, user, setUser, recent }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];

  const [courses, setCourses] = useState([]);

  const [llb, setLlb] = useState(true);
  const [neww, setNeww] = useState(false);
  let [ordera, setOrdera] = useState(true);

  const [lead, setLead] = useState();
  const [leadb, setLeadb] = useState();
  const [sales, setSales] = useState();
  const [search, setSearch] = useState(false);

  const [pix, setPix] = useState();

  const [showe, setShowe] = useState(false);
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);

  const navigate = useNavigate();

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
  const handleClosee = () => setShowe(false);

  const handleShow = () => setShow(true);
  const handleShowe = () => setShowe(true);
  

  const [sum, setSum] = useState(0);
  const [trans, setTrans] = useState();
  const [branches, setBranches] = useState();
  const [strans, setStrans] = useState();
  const [leads, setLeads] = useState();
  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);
  let [pp, setPp] = useState(false);
  let [leadp, setLeadp] = useState();
  let [visible, setVisible] = useState(false);
  let [hide, setHide] = useState(true);
  let [debt, setDebt] = useState();

  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [pageSize] = useState(cont.tableitems); // Items per page
  const Pago = async (page) => {
    try {
      await axios
        .get(
          `${cont.api}admin/${recent ? `recentleads?page=${page}&limit=${pageSize}` : `leads?page=${page}&limit=${pageSize}`}`,
          {
            headers: { userid: user.userid },
          }
        )
        .then((res) => {
          if (!res.data.nolicense) {
            if (res.data.success) {
              setSum(res.data.sum);
              setTrans((prev) => [...res.data.trans]);

              setTotalPages(res.data.totalPages);
              setCurrentPage(res.data.currentPage);
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
  useEffect(() => {
    const Check = async (page = 1) => {
      try {
        await axios
          .get(
            `${cont.api}admin/leads?page=${page}&limit=${pageSize}}`,
            {
              headers: { userid: user.userid },
            }
          )
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                setSum(res.data.sum);
                setTrans((prev) => [...res.data.trans]);
                setCourses(res.data.courses)
                setSales(res.data.sales)
                setBranches((prev) => res.data.branches);
                setUser(user)

                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
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
      Check(currentPage);

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [trans,recent, currentPage, user, cont, checkCalled]);

  const Search = async (tid) => {
    // alert(JSON.stringify(ll.leades))
    if (tid.length > 2) {
      setSearch(true);

      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/searchleads/${tid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (res.data.strans) {
                  setStrans(res.data.strans);
                } else {
                  setStrans();
                  setSearch(false);
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
          setStrans();
          setSearch(false);

          //   Swal.fire({
          //     title: "I'm afraid you can't perform this operation now !",
          //     text: "Pls check your internet network ! !",
          //     icon: "caution",
          //   });
        }
      }

      Goon();
    } else {
      setStrans();
      setSearch(false);
    }
  };
  const Del = async (tid, name) => {
    
      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/dellead/${tid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (!res.data.alreadydeleted) {
                  const tr = trans.filter((el)=>el.lid !== tid)
                  setTrans(tr)
                  Swal.fire({
                    title: "Potential student account deleted successfully !",
                    text: "this is not a commendable action ,.",
                    icon: "success",
                  });
                } else {
                  setCourses(res.data.courses);
                  Swal.fire({
                    title:
                      "this lead seems to have been deleted even before you thought of it !",
                    text: "Deleting leads frequently is strongly prohibited ! !",
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
        text: `note :this will also delete leades , and topics associated with this course ! `,
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
  const handlePageChange = (page) => {
    Pago(page);
  };
  const getPaginationItems = () => {
    const maxVisiblePages = 3; // Maximum number of pagination buttons to display
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    dob: null,
 
    termsAccepted: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const updatein = (e) => {
    const { name, value } = e.target;
    setLeadb({ ...leadb, [name]: value });
  };

  const gendere = (e) => {
    if (e.target.checked) {
      setLeadb({
        ...leadb,
        gender: e.target.value,
      });
    }
  }
  const genderc = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        gender: e.target.value,
      });
    }
  }

  const Submitedit = async () => {
    setLlb(false);
    
    if (
      leadb.fname &&
      leadb.lname &&
      leadb.email &&
      leadb.gender &&
      leadb.phone &&
      leadb.dob &&
      leadb.info &&
      leadb.salesid &&
      leadb.cid &&
      leadb.fname.length > 2 &&
      leadb.lname.length > 2 &&
      leadb.email.length > 3 &&
      leadb.email.includes("@") &&
      leadb.email.includes(".") &&
      leadb.phone.length > 3 &&
      leadb.salesid.length > 3 &&
      leadb.cid.length > 3 &&
      leadb.dob.length > 3 &&
      leadb.info.length > 3 &&
      leadb.gender.length > 3
    ) {
      const salle = sales.find((el) => el.userid === leadb.salesid);
      if (salle.licensed) {
        const details = new FormData();
        for (let key in leadb) {
          details.append(key, leadb[key]);
        }
        details.append("userid", user.userid);
        details.append("page", currentPage);

        try {
          await axios
            .post(`${cont.api}admin/editlead`, details, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                // setFirst(false);

                if (res.data.leads) {
                  setLeads(res.data.leads);
                  setTrans(res.data.leads);
                  setLeadb()
                  handleClosee();

                  Swal.fire({
                    title: "lead account update was successful !",
                    text: "lead account update successfully ! !",
                    icon: "success",
                  });
                }
              } else if (res.data.exist) {
                Swal.fire({
                  title: "Email is in use !",
                  text: "Duplicate emails are forbidden in database .",
                  icon: "error",
                });
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
      } else {
        Swal.fire({
          title: "Assigned sales agent is unlicensed !",
          text: "You can not assign a sales agent with revoked license .",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Pls check form again and fill correctly!",
        text: "you have to enter valid details .",
        icon: "error",
      });
    }
    setLlb(true);
  };
  const handleSubmitb = async () => {
    
    setLlb(true);
    // alert(formData.email);
     if (
       formData.fname &&
       formData.lname &&
       formData.email &&
       formData.gender &&
       formData.phone &&
       formData.dob &&
       formData.info &&
       formData.salesid &&
       formData.cid &&
       formData.fname.length > 2 &&
       formData.lname.length > 2 &&
       formData.email.length > 3 &&
       formData.email.includes("@") &&
       formData.email.includes(".") &&
       formData.phone.length > 3 &&
       formData.salesid.length > 3 &&
       formData.cid.length > 3 &&
       formData.dob.length > 3 &&
       formData.info.length > 3 &&
       formData.gender.length > 3
     ) {
        const salle = sales.find((el)=>el.userid === formData.salesid)
        if(salle.licensed){
          const details = new FormData();
          for (let key in formData) {
            details.append(key, formData[key]);
          }
          details.append("userid", user.userid);


          try {
            await axios
              .post(`${cont.api}admin/createlead`, details, {
                headers: { userid: user.userid },
              })
              .then((res) => {
                if (res.data.success) {
                  // setFirst(false);

                  if (res.data.leads) {
                    setLeads(res.data.leads);
                    setTrans(res.data.leads);
                    setLead({})
                    setFormData({})
                    handleClose()

                    Swal.fire({
                      title: "lead account creation was successful !",
                      text: "lead account created successfully ! !",
                      icon: "success",
                    });
                  }
                  else{
                    navigate("/")
                  }
                } else if (res.data.exist) {
                  Swal.fire({
                    title: "Email is in use !",
                    text: "Duplicate emails are forbidden in database .",
                    icon: "error",
                  });
                } else {
                  Swal.fire({
                    title: "Action failed!",
                    text: "something went wrong doing this .",
                    icon: "error",
                  });
                }
              });
          }
          catch (err) {
            Swal.fire({
              title: "I'm afraid you can't perform this operation now !",
              text: "Pls check your internet network ! !",
              icon: "caution",
            });
          }
        }
        else{
          Swal.fire({
            title: "Assigned sales agent is unlicensed !",
            text: "You can not assign a sales agent with revoked license .",
            icon: "error",
          });
        }
     } else {
       Swal.fire({
         title: "Pls check form again and fill correctly!",
         text: "you have to enter valid details .",
         icon: "error",
       });
     }
    setLlb(true);
  };

  const handleDateChange = (date) => {
    const gg = new Date(date);
    // alert(new Date(date))
    const jsDateString = date.toDateString();
    // alert(new Date(jsDateString));
    setFormData({ ...formData, dob: jsDateString, date });
  };
  const handleDateChangee = (date) => {
    const gg = new Date(date);
    // alert(new Date(date))
    const jsDateString = date.toDateString();
    // alert(new Date(jsDateString));
    setLeadb({ ...leadb, dob: jsDateString, date });
  };
  const elead = (lid)=>{
    
    const ulead = trans.find((el)=>el.lid === lid) 
    setLeadb(ulead)
    // alert(JSON.stringify(leadb));

    handleShowe()
  }
  const preptrans = (lid) => {
    
    const ng = trans.find((el) => el.lid === lid)

    if (ng) {
      setLeadp((prev)=>({...prev,...ng,amount:ng.cfee,brid:branches[0].brid}));
      // alert(JSON.stringify(leadp.name))
      setVisible(true);
    } else {
      Swal.fire({
        title: `No debts :All debts paid by this batch`,
        text: `This batch students (all) have have fully paid up (no debts)`,
        icon: "warning",
      });
    }
  }
  const Pay = async () => {
    const Goons = async () => {
      setLlb(false);
      const fd = new FormData();
      for (let key in leadp) {
        fd.append(key, leadp[key]);
      }
      fd.append("limit", pageSize);
      fd.append("page", currentPage);

      try {
        await axios
          .post(`${cont.api}admin/leadpayment`, fd, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            setVisible(false);
            if (res.data.success) {
              setSum(res.data.sum);
              setTrans((prev) => [...res.data.leads]);
              setCourses(res.data.courses);
              setSales(res.data.sales);
              setUser(user);

              setTotalPages(res.data.totalPages);
              setCurrentPage(res.data.currentPage);

              Swal.fire({
                title: `Lead payment was successful`,
                icon: "success",
              });
              navigate(`/getstud/${res.data.bid}_${res.data.userid}`);
              
            } else {
            
              Swal.fire({
                title: `error : this transaction data is corrupted and can not be deleted now`,
                text: `error`,
                icon: "error",
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
        setLlb(false);
        
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
    if (leadp.amount < user.mininstallment) {
      
      setPp(false);
      setVisible(false);

      Swal.fire({
        title: `you can not make payment less than ${user.dmininstallment}`,
        icon: "warning",
      });
    } else if (leadp.amount > leadp.cfee) {
      
      setPp(false);
      setVisible(false);

      Swal.fire({
        title: `you can not register payment above course fee (${leadp.cfee})`,
        icon: "warning",
      });
    } else {
      setPp(false);

      Goons();
    }
    setLlb(true);
  };
  const saveorder = async (ord) => {
    try {
      await axios
        .get(`${cont.api}admin/leadorder/${ord}`, {
          headers: { userid: user.userid },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            Swal.fire({
              title: "db setting order error !",
              text: "pls check your connection , something is wrong.",
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
  };
  function sortorder() {
    // Create a copy of the array to avoid mutating the original array
    const sortedArray = [...trans];


    // Sorting the copied array by the "name" property
    sortedArray.sort((a, b) => {
      if (ordera) {
        return a.name.localeCompare(b.name); // Ascending order
        
      } else if (!ordera) {
        return b.name.localeCompare(a.name); // Descending order
      }
      
    });
    setOrdera(!ordera);
    setTrans(sortedArray);
    ordera ? saveorder("asc") : saveorder("desc");


    return sortedArray; // Return the sorted array
  }
  function sortnew(array) {
    // Create a copy of the array to avoid mutating the original array
    const sortedArray = [...array];

    // Sorting the copied array by the "ordstring" date property
    if (neww) {
      sortedArray.sort((a, b) => new Date(a.ordstring) - new Date(b.ordstring));
    } else {
      sortedArray.sort((a, b) => new Date(b.ordstring) - new Date(a.ordstring));
    }
    setNeww(!neww);
    !neww ? saveorder("newest") : saveorder("oldest");

    return sortedArray; // Return the sorted array
  }
  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        ls={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <Offcanvas show={showe} onHide={handleClosee}>
        <Offcanvas.Body>
          <div style={{ marginTop: "" }} className="form-sectionh fera">
            <div className="text-end col-12 px-2">
              <Link onClick={handleClosee} className="text-end">
                <i className="text-danger fa fa-times fa-2x"></i>
              </Link>
            </div>
            {leadb ? (
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
                      <div className="row align-items-center">
                        <div className=" col-lg-5 col-md-6 col-sm-12">
                          <img
                            className="wellj  "
                            style={{ height: "40vh" }}
                            src="/girls/courses.png"
                            alt=""
                          />
                        </div>

                        <div className="p-fluid row px-2  col-12 mx-auto ">
                          <h2>Edit Lead account</h2>

                          <div className="p-field col-md-6 col-8 mx-auto">
                            <label htmlFor="fname">First name</label>
                            <InputText
                              id="fname"
                              name="fname"
                              keyfilter="alpha"
                              value={leadb.fname}
                              onChange={updatein}
                              placeholder="enter first name"
                            />
                          </div>

                          <div className="p-field col-md-6  col-8 mx-auto">
                            <label htmlFor="lname">Last name</label>
                            <InputText
                              id="lname"
                              keyfilter="alpha"
                              name="lname"
                              value={leadb.lname}
                              onChange={updatein}
                              placeholder="enter last name"
                            />
                          </div>

                          <div className="p-field col-md-6  col-8 mx-auto">
                            <label htmlFor="email">Email</label>
                            <InputText
                              keyfilter="email"
                              id="email"
                              name="email"
                              value={leadb.email}
                              onChange={updatein}
                              placeholder="enter email"
                            />
                          </div>
                          <div className="p-field col-md-6  col-8 mx-auto">
                            <label htmlFor="phone">Phone</label>

                            <InputText
                              id="phone"
                              name="phone"
                              value={leadb.phone}
                              onChange={updatein}
                              placeholder="phone no"
                            ></InputText>
                          </div>
                          <div className="p-field col-md-6  col-8 mx-auto mb-5 mt-3">
                            <Form.Group controlId="exampleForm.SelectCustom">
                              <Form.Label>Select Course</Form.Label>
                              <Form.Select
                                name="cid"
                                value={leadb.cid}
                                onChange={updatein}
                              >
                                {courses.map((el) => (
                                  <option selected key={el.cid} value={el.cid}>
                                    {el.name} &nbsp; {el.dprice}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                          {sales && sales.length > 0 ? (
                            <div className="p-field col-md-6  col-8 mx-auto mb-5 mt-3">
                              <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Assign sales</Form.Label>
                                <Form.Select
                                  name="salesid"
                                  value={leadb.salesid}
                                  onChange={updatein}
                                >
                                  {sales.map((el) => (
                                    <option
                                      selected
                                      key={el.userid}
                                      value={el.userid}
                                    >
                                      {el.name}{" "}
                                      {!el.licensed ? "(unlicensed)" : ""}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="p-field  col-md-6  col-8 mx-auto">
                            <label htmlFor="gender">Gender</label>

                            <div className="cajkrd jbtwj mt-3">
                              <div className="cardj jbtw">
                                <Form.Check
                                  inline
                                  label="Male"
                                  value="male"
                                  checked={
                                    leadb.gender === "male" ? true : false
                                  }
                                  onChange={gendere}
                                  name="gender"
                                  type="radio"
                                  id={`inline-radio-1`}
                                />
                                <Form.Check
                                  inline
                                  label="Female"
                                  checked={
                                    leadb.gender === "female" ? true : false
                                  }
                                  name="gender"
                                  onChange={gendere}
                                  type="radio"
                                  value="female"
                                  id={`inline-radio-2`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="p-field col-md-6  col-8 mx-auto">
                            <label htmlFor="phone">Additional Info</label>

                            <Form.Control
                              as="textarea"
                              id="info"
                              name="info"
                              value={leadb.info}
                              onChange={updatein}
                              placeholder="Lead's concern or how you met the lead (relationship)"
                            />
                          </div>
                          <div className="p-field align-items-center mt-2 col-md-8  col-8 mx-auto">
                            <label>Edit Birthday</label>
                            <Controller
                              name="selectedDate"
                              control={control}
                              selected={new Date()}
                              rules={{ required: "Date is required" }}
                              render={({ field }) => (
                                <DatePicker
                                  placeholder="Select a date" // Use "placeholder" for Ant Design
                                  // value={field.value} // Use "value" to set the selected date
                                  required
                                  onChange={handleDateChangee}
                                  format="MMMM D, YYYY" // Use "format" to set date format
                                  allowClear // Provides a clear button
                                  style={{ width: "100%" }}
                                  inline
                                  value={leadb.dob}
                                  showYearDropdown
                                  showMonthDropdown
                                  dropdownMode="select"
                                  // Ensures the DatePicker takes the full width
                                />
                              )}
                            />
                          </div>

                          {!llb ? (
                            <div className="text-center ">
                              <button
                                type="button"
                                className="btn btn-danger col-md-12 col-6 text-center clkbtn text-light bg-danger mx-auto dpapa "
                              >
                                {/* <CircularProgress className="text-light blinking-text" /> */}
                                <Lding
                                  className="text-center"
                                  animation="border"
                                  variant="light"
                                />
                              </button>
                            </div>
                          ) : (
                            <div className="col-md-9  text-center mx-auto mt-5">
                              <button
                                onClick={Submitedit}
                                className="button position-relative"
                              >
                                Update lead
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
                      <div className="m-0 codar px-1  jbtw">
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
                    <div className="row align-items-center">
                      <div className=" col-lg-5 col-md-6 col-sm-12">
                        <img
                          className="wellj  "
                          style={{ height: "40vh" }}
                          src="/girls/courses.png"
                          alt=""
                        />
                      </div>

                      <div className="p-fluid row px-2  col-12 mx-auto ">
                        <h2>Create Lead account</h2>

                        <div className="p-field col-md-6 col-8 mx-auto">
                          <label htmlFor="fname">First name</label>
                          <InputText
                            id="fname"
                            name="fname"
                            keyfilter="alpha"
                            value={formData.fname}
                            onChange={handleInputChange}
                            placeholder="enter first name"
                          />
                        </div>

                        <div className="p-field col-md-6  col-8 mx-auto">
                          <label htmlFor="lname">Last name</label>
                          <InputText
                            id="lname"
                            keyfilter="alpha"
                            name="lname"
                            value={formData.lname}
                            onChange={handleInputChange}
                            placeholder="enter last name"
                          />
                        </div>

                        <div className="p-field col-md-6  col-8 mx-auto">
                          <label htmlFor="email">Email</label>
                          <InputText
                            keyfilter="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="enter email"
                          />
                        </div>
                        <div className="p-field col-md-6  col-8 mx-auto">
                          <label htmlFor="phone">Phone</label>

                          <InputText
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="phone no"
                          ></InputText>
                        </div>
                        <div className="p-field col-md-6  col-8 mx-auto mb-5 mt-3">
                          <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select Course</Form.Label>
                            <Form.Select
                              name="cid"
                              value={formData.cid}
                              onChange={handleInputChange}
                            >
                              {" "}
                              <option selected disabled>
                                ~ Select course ~
                              </option>
                              {courses.map((el) => (
                                <option key={el.cid} value={el.cid}>
                                  {el.name} &nbsp; {el.dprice}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </div>
                        {sales && sales.length > 0 ? (
                          <div className="p-field col-md-6  col-8 mx-auto mb-5 mt-3">
                            <Form.Group controlId="exampleForm.SelectCustom">
                              <Form.Label>Assign sales</Form.Label>
                              <Form.Select
                                name="salesid"
                                value={formData.salesid}
                                onChange={handleInputChange}
                              >
                                <option selected disabled>
                                  ~ Select sales ~
                                </option>
                                {sales.map((el) => (
                                  <option key={el.userid} value={el.userid}>
                                    {el.name}{" "}
                                    {!el.licensed ? "(unlicensed)" : ""}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="p-field  col-md-6  col-8 mx-auto">
                          <label htmlFor="gender">Gender</label>

                          <div className="cajkrd jbtwj mt-3">
                            <div className="cardj jbtw">
                              <Form.Check
                                inline
                                label="Male"
                                value="male"
                                checked={
                                  formData.gender === "male" ? true : false
                                }
                                onChange={genderc}
                                name="gender"
                                type="radio"
                                id={`inline-radio-1`}
                              />
                              <Form.Check
                                inline
                                label="Female"
                                checked={
                                  formData.gender === "female" ? true : false
                                }
                                name="gender"
                                onChange={genderc}
                                type="radio"
                                value="female"
                                id={`inline-radio-2`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-field col-md-6  col-8 mx-auto">
                          <label htmlFor="phone">Additional Info</label>

                          <Form.Control
                            as="textarea"
                            id="info"
                            name="info"
                            value={formData.info}
                            onChange={handleInputChange}
                            placeholder="Lead's concern or how you met the lead (relationship)"
                          />
                        </div>
                        <div className="p-field align-items-center mt-2 col-md-8  col-8 mx-auto">
                          <label>Select Birthday</label>
                          <Controller
                            name="selectedDate"
                            control={control}
                            selected={new Date()}
                            rules={{ required: "Date is required" }}
                            render={({ field }) => (
                              <DatePicker
                                placeholder="Select a date" // Use "placeholder" for Ant Design
                                // value={field.value} // Use "value" to set the selected date
                                required
                                onChange={handleDateChange}
                                format="MMMM D, YYYY" // Use "format" to set date format
                                allowClear // Provides a clear button
                                style={{ width: "100%" }}
                                inline
                                value={formData.dob}
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                // Ensures the DatePicker takes the full width
                              />
                            )}
                          />
                        </div>

                        {!llb ? (
                          <div className="text-center ">
                            <button
                              type="button"
                              className="btn btn-danger col-md-12 col-6 text-center clkbtn text-light bg-danger mx-auto dpapa "
                            >
                              {/* <CircularProgress className="text-light blinking-text" /> */}
                              <Lding
                                className="text-center"
                                animation="border"
                                variant="light"
                              />
                            </button>
                          </div>
                        ) : (
                          <div className="col-md-9  text-center mx-auto mt-5">
                            <button
                              onClick={handleSubmitb}
                              className="button position-relative"
                            >
                              Create account
                            </button>
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
      <Offcanvas show={visible} onHide={() => setVisible(false)}>
        <Offcanvas.Body>
          <div style={{ marginTop: "" }} className="form-sectionh fera">
            <div className="text-end col-12 px-2">
              <Link onClick={() => setVisible(false)} className="text-end">
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
                      <div className="m-0 codar px-1  jbtw">
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
                    <div className="row align-items-center">
                      <div className=" col-lg-5 col-md-6 col-sm-12">
                        <img
                          className="wellj  "
                          style={{ height: "40vh" }}
                          src="/girls/courses.png"
                          alt=""
                        />
                      </div>

                      {leadp ? (
                        <div className="p-fluid row px-2  col-12 mx-auto ">
                          <h2> Lead payment</h2>
                          <h3 className="text-center">{leadp.name}</h3>

                          {user.allowinstallments ? (
                            <div className="p-field col-md-9 col-8 mx-auto">
                              <div className="p-inputgroup flex-1 col-12 mx-auto">
                                <span className="p-inputgroup-addon fs-2">
                                  ₦
                                </span>
                                <InputNumber
                                  placeholder="Amount in ₦"
                                  className="text-center"
                                  value={leadp.cfee}
                                  onChange={(e) =>
                                    setLeadp((prev) => ({
                                      ...prev,
                                      amount: e.value,
                                    }))
                                  } // Corrected the syntax
                                />
                                <span className="p-inputgroup-addon">.00</span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-field col-md-9 col-8 mx-auto">
                              <div className="p-inputgroup flex-1 col-12 mx-auto">
                                <span className="p-inputgroup-addon fs-2">
                                  ₦
                                </span>
                                <InputNumber
                                  placeholder="Amount in ₦"
                                  className="text-center"
                                  value={leadp.cfee}
                                  disabled
                                  name="amount"
                                />
                                <span className="p-inputgroup-addon">.00</span>
                              </div>
                            </div>
                          )}
                          {branches ? (
                            <div className="px-2 py-3 mt-3">
                              <label>Select branch &nbsp;</label>
                              <select
                                className="p-2"
                                required
                                onChange={(e) =>
                                  setLeadp((prev) => ({
                                    ...prev,
                                    brid: e.target.value, // Update local state if needed
                                  }))
                                }
                              >
                                {branches.map((el) => (
                                  <option
                                    className="p-3 py-2 rounded"
                                    key={el.brid}
                                    value={el.brid}
                                  >
                                    {el.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            ""
                          )}

                          {!llb ? (
                            <div className="text-center ">
                              <button
                                type="button"
                                className="btn btn-danger col-md-12 col-6 text-center clkbtn text-light bg-danger mx-auto dpapa "
                              >
                                {/* <CircularProgress className="text-light blinking-text" /> */}
                                <Lding
                                  className="text-center"
                                  animation="border"
                                  variant="light"
                                />
                              </button>
                            </div>
                          ) : (
                            <div className="col-md-9  text-center mx-auto mt-5">
                              <button
                                onClick={Pay}
                                className="button position-relative"
                              >
                                Register payment
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div>
        <div class="container-xxl py-5">
          <div class="container">
            <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
              <h1 class="">
                All leads
                <Cttb id="tooltip-cart" tooltip={`students sorting order`}>
                  <sub>
                    (<small>{user.leadsort}</small>)
                  </sub>
                </Cttb>
                &nbsp; &nbsp;{" "}
                {user ? (
                  <div className="dfg">
                    <span className="text-muted text-end m-0 p-0">
                      {" "}
                      &sum; worth ={hide ? "************" : sum} &nbsp;{" "}
                      <i
                        onClick={() => {
                          setHide(!hide);
                        }}
                        className={`${hide ? `fa fa-eye` : `fa fa-eye-slash`} cpp`}
                      ></i>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </h1>
            </div>

            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : (
              <div className=" align-items-center">
                {user ? (
                  <div className="col-12 align-items-center row mx-auto px-1">
                    <div className="col-5 col-md-4 mx-auto jbtw align-items-center  d-md-flex">
                      {user.cudaccess ? (
                        <div className="  mb-1  mx-auto jbtw">
                          <Button
                            variant="contained"
                            color="primary"
                            className="w-100 bg-danger "
                            onClick={setShow}
                          >
                            Create Lead
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                      {trans && trans.length > 0 ? (
                        <ToggleButtonGroup
                          className="d-none d-md-block"
                          type="radio"
                          name="options"
                          defaultValue={1}
                        >
                          <ToggleButton
                            id="tbg-radio-1"
                            value={1}
                            onClick={() => setTrans(sortnew(trans))}
                          >
                            sort by {neww ? "Oldest" : "latest"}
                          </ToggleButton>
                          <ToggleButton
                            id="tbg-radio-2"
                            value={2}
                            onClick={() => sortorder()}
                          >
                            {ordera ? "ascending" : "descending"}
                          </ToggleButton>
                          {/* <ToggleButton id="tbg-radio-3" value={3}>
                          Radio 3
                        </ToggleButton> */}
                        </ToggleButtonGroup>
                      ) : (
                        <div className="col-4"></div>
                      )}
                    </div>

                    {trans && trans.length > 0 ? (
                      <IconField
                        className="col-md-4 mx-auto col-10"
                        iconPosition="right px-5"
                      >
                        <InputIcon className="pi pi-search px-3"> </InputIcon>
                        <InputText
                          v-model="value1"
                          className="text-center"
                          onChange={(e) => Search(e.target.value)}
                          placeholder="Search leads"
                        />
                      </IconField>
                    ) : (
                      <div className="col-md-4 mx-auto col-10"></div>
                    )}
                    <div className="col-4"></div>
                  </div>
                ) : (
                  ""
                )}
                {trans && trans.length > 0 ? (
                  search ? (
                    strans ? (
                      strans.length > 0 ? (
                        <div
                          className="table-container table-responsive rela justify-content-center  mx-auto rounded mt-0  col-12 text-light"
                          style={{
                            maxHeight: "70vh",
                            minHeight: "40vh",
                            overflow: "scroll",
                            width: "100%",
                          }}
                        >
                          <div
                            class="text-center wow fadeInUp "
                            data-wow-delay="0.1s"
                          >
                            <h2 class="mb-1 text-center text-muted">
                              {" "}
                              Search results
                            </h2>
                          </div>

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

                                <td className="text-center z-7">Date</td>

                                <td className="text-center z-7">Name</td>
                                <td className="text-center z-7">Gender</td>
                                <td className="text-center z-7">Course</td>
                                {/* <td className="text-center z-7">id</td> */}

                                {/* <td className="text-center z-7">Mode</td> */}
                                {/* <td className="text-center z-7">Email</td> */}
                                {/* <td className="text-center z-7">Payment Order</td> */}
                                <td className="text-center z-7">Phone</td>
                                <td className="text-center z-7">From Admin</td>
                                {/* <td className="text-center z-7">Phone</td> */}
                                <td className="text-center z-7">
                                  Generated by{" "}
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`who created lead account`}
                                  >
                                    <i className="z-5 fa fa-info text-warning "></i>
                                  </Cttb>
                                </td>
                                <td className="text-center z-7">
                                  Assigned to{" "}
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`sales agent lead is assigned to `}
                                  >
                                    <i className="z-5 fa fa-info text-warning "></i>
                                  </Cttb>
                                </td>

                                {user.cudaccess ? <td>Edit</td> : ""}
                                <td>Pay</td>
                                {user.cudaccess ? <td>Delete</td> : ""}
                              </tr>
                            </thead>
                            <tbody>
                              {strans.map(
                                (
                                  {
                                    reference,
                                    cid,

                                    registered,

                                    userid,
                                    type,
                                    email,
                                    phone,
                                    sales,
                                    lid,
                                    info,
                                    gender,
                                    dob,

                                    cname,
                                    fromadmin,
                                    fromsales,
                                    date,

                                    addedby,
                                    dcfee,

                                    name,
                                    timesedited,
                                    editwhen,
                                    approvedby,
                                    lasteditedby,
                                    cc,
                                  },
                                  index,
                                  el
                                ) => (
                                  <tr
                                    data-aos={
                                      index % 2 === 1
                                        ? "slide-left"
                                        : "slide-right"
                                    }
                                    key={userid}
                                    style={{ position: "relative" }}
                                    className="text-center align-items-center py-1"
                                  >
                                    <td
                                      className={
                                        fromadmin
                                          ? `bg-primary text-center`
                                          : `bg-success`
                                      }
                                    >
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`${fromadmin ? `blue background indicates lead was assigned to sales by admin , in this case ${addedby}(admin) assigned ${name}(lead) to ${user.name}(sales) on ${registered}` : `this lead was added by ${user.name}`}`}
                                      >
                                        <div>{index + 1}</div>
                                      </Ctt>
                                    </td>
                                    <td>{date}</td>
                                    {user.host ? (
                                      <td className="tidamJ fs-5  text-start">
                                        <Cttb
                                          id="tooltip-cart"
                                          tooltip={`email:${email}<br />times edited :${timesedited} <br>time of last edit :${editwhen},<br>last edit by ${lasteditedby} <br>info:${info}`}
                                        >
                                          <div>{name}</div>
                                        </Cttb>
                                      </td>
                                    ) : (
                                      <td className="tidamJ fs-5  text-start">
                                        <Cttb
                                          id="tooltip-cart"
                                          tooltip={`email:${email} <br>info:${info}`}
                                        >
                                          <div>{name}</div>
                                        </Cttb>
                                      </td>
                                    )}
                                    <td>{gender}</td>

                                    {user && user.cudaccess ? (
                                      <td className="text-center">
                                        <Link to={`/acourse/${cid}`}>
                                          <Cttb
                                            id="tooltip-cart"
                                            tooltip={`${dcfee}`}
                                          >
                                            <div>{cname}</div>
                                          </Cttb>
                                        </Link>
                                      </td>
                                    ) : (
                                      <td className="text-center">
                                        <Cttb
                                          id="tooltip-cart"
                                          tooltip={`${dcfee}`}
                                        >
                                          <div>{cname}</div>
                                        </Cttb>
                                      </td>
                                    )}

                                    <td>{phone}</td>
                                    <td className="text-center">
                                      {fromadmin ? "true" : "false"}
                                    </td>
                                    {/* <td>{fromsales}</td> */}
                                    <td>{addedby}</td>
                                    <td>{sales}</td>

                                    {user.cudaccess ? (
                                      <td
                                        className="text-center cpp"
                                        onClick={(e) => elead(lid)}
                                      >
                                        <Ctt
                                          id="tooltip-cart"
                                          tooltip={`Click to edit ${name}'s lead account`}
                                        >
                                          <p>
                                            <i className="fa fa-edit text-primary text-center"></i>
                                          </p>
                                        </Ctt>
                                      </td>
                                    ) : (
                                      ""
                                    )}

                                    <td
                                      className="text-center cpp"
                                      onClick={(e) => preptrans(lid)}
                                    >
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`Click to make payment for ${name}, this payment will make ${name} a student`}
                                      >
                                        <p>
                                          <i class="text-success fa fa-money-check-alt"></i>
                                        </p>
                                      </Ctt>
                                    </td>

                                    {user.cudaccess ? (
                                      <td
                                        className="text-center cpp"
                                        onClick={(e) => Del(lid, name)}
                                      >
                                        <Ctt
                                          id="tooltip-cart"
                                          tooltip={`you are about to delete ${name}'s lead account`}
                                        >
                                          <p>
                                            <i className="fa fa-trash text-danger text-center"></i>
                                          </p>
                                        </Ctt>
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <h4 className="text-muted text-center">
                          {" "}
                          search result not found !
                        </h4>
                      )
                    ) : (
                      <div>
                        <Lding />
                        {/* <h4 className="text-muted text-center"> search result not found !</h4> */}
                      </div>
                    )
                  ) : (
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

                            <td className="text-center z-7">Registered Date</td>

                            <td className="text-center z-7">Name</td>
                            <td className="text-center z-7">Gender</td>
                            <td className="text-center z-7">Course</td>
                            {/* <td className="text-center z-7">id</td> */}

                            {/* <td className="text-center z-7">Mode</td> */}
                            {/* <td className="text-center z-7">Email</td> */}
                            {/* <td className="text-center z-7">Payment Order</td> */}
                            <td className="text-center z-7">Phone</td>
                            <td className="text-center z-7">From Admin</td>
                            {/* <td className="text-center z-7">Phone</td> */}
                            <td className="text-center z-7">
                              Gen by{" "}
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`who generated lead account`}
                              >
                                <i className="z-5 fa fa-info text-warning "></i>
                              </Cttb>
                            </td>
                            <td className="text-center z-7">
                              Ass. to{" "}
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`sales agent lead is assigned to `}
                              >
                                <i className="z-5 fa fa-info text-warning "></i>
                              </Cttb>
                            </td>

                            {user.cudaccess ? <td>Edit</td> : ""}
                            <td>Pay</td>
                            {user.cudaccess ? <td>Delete</td> : ""}
                          </tr>
                        </thead>
                        <tbody>
                          {trans.map(
                            (
                              {
                                reference,

                                registered,

                                userid,
                                type,
                                email,
                                phone,
                                sales,
                                lid,
                                info,
                                gender,
                                dob,

                                cname,
                                cid,
                                fromadmin,
                                fromsales,
                                date,

                                addedby,
                                dcfee,
                                timesedited,

                                name,
                                editwhen,
                                lasteditedby,
                              },
                              index,
                              el
                            ) => (
                              <tr
                                data-aos={
                                  index % 2 === 1 ? "slide-left" : "slide-right"
                                }
                                key={userid}
                                style={{ position: "relative" }}
                                className="text-center align-items-center text-center py-1"
                              >
                                <td
                                  className={
                                    fromadmin
                                      ? `bg-primary text-center`
                                      : `bg-success`
                                  }
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`${fromadmin ? `blue background indicates lead was assigned to sales by admin , in this case ${addedby}(admin) assigned ${name}(lead) to ${user.name}(sales) on ${registered}` : `this lead was added by ${user.name}`}`}
                                  >
                                    <div>{index + 1}</div>
                                  </Ctt>
                                </td>
                                <td>{date}</td>
                                {user.host ? (
                                  <td className="tidamJ fs-5  text-start">
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`email:${email}<br />times edited :${timesedited} <br>time of last edit :${editwhen},<br>last edit by ${lasteditedby} <br>info:${info}`}
                                    >
                                      <div>{name}</div>
                                    </Cttb>
                                  </td>
                                ) : (
                                  <td className="tidamJ fs-5  text-start">
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`email:${email} <br>info:${info}`}
                                    >
                                      <div>{name}</div>
                                    </Cttb>
                                  </td>
                                )}
                                <td>{gender}</td>

                                {user && user.cudaccess ? (
                                  <td className="text-center">
                                    <Link to={`/acourse/${cid}`}>
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${dcfee}`}
                                      >
                                        <div>{cname}</div>
                                      </Cttb>
                                    </Link>
                                  </td>
                                ) : (
                                  <td className="text-center">
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`${dcfee}`}
                                    >
                                      <div>{cname}</div>
                                    </Cttb>
                                  </td>
                                )}

                                <td>{phone}</td>
                                <td className="text-center">
                                  {fromadmin ? "true" : "false"}
                                </td>
                                {/* <td>{fromsales}</td> */}
                                <td>{addedby}</td>
                                <td>{sales}</td>

                                {user.cudaccess ? (
                                  <td
                                    className="text-center cpp"
                                    onClick={(e) => elead(lid)}
                                  >
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`Click to edit ${name}'s lead account`}
                                    >
                                      <p>
                                        <i className="fa fa-edit text-primary text-center"></i>
                                      </p>
                                    </Ctt>
                                  </td>
                                ) : (
                                  ""
                                )}

                                <td
                                  className="text-center cpp"
                                  onClick={(e) => preptrans(lid)}
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Click to make payment for ${name}, this payment will make ${name} a student`}
                                  >
                                    <p>
                                      <i class="text-success fa fa-money-check-alt"></i>
                                    </p>
                                  </Ctt>
                                </td>

                                {user.cudaccess ? (
                                  <td
                                    className="text-center cpp"
                                    onClick={(e) => Del(lid, name)}
                                  >
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`you are about to delete ${name}'s lead account`}
                                    >
                                      <p>
                                        <i className="fa fa-trash text-danger text-center"></i>
                                      </p>
                                    </Ctt>
                                  </td>
                                ) : (
                                  ""
                                )}
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )
                ) : (
                  <div>
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 jbtw">
                        <Talk
                          bg={true}
                          a={`Codarbrain is yet to get leads`}
                          b={` leads will pop up here as soon as you register one.`}
                          c={`Leads are potential students who are still in negotiation .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-center  mt-5">
                  {!search && trans && trans.length > 0 ? (
                    <Pagination className="custom-pagination">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />

                      {/* Dynamically render the pagination items based on the current range */}
                      {getPaginationItems().map((page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  ) : (
                    ""
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

export default Allleads;
