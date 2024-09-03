import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";

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

import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Radio , Form } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";


dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
const { Option } = Select;

Modal.setAppElement("#root");

const Batch = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  
  const {cid} = useParams()

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  // const [first, setFirst] = useState({});
  const [desc, setDesc] = useState("");
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState();
  const [course, setCourse] = useState({});
  const [tog, setTog] = useState(false);
  const [batches, setBatches] = useState([]);
  const [bl, setBl] = useState([]);
  const [batch, setBatch] = useState({});
  const [first, setFirst] = useState({});

  const [pix, setPix] = useState();
  const [showe, setShowe] = useState(false);
  const [showm, setShowm] = useState(false);
  const [newbatch, setNewbatch] = useState({
    name: "Batch " + batches.length + 1,
    date1: "",
    date2: "",
    times: "b",
    once: "mon",
    start: new Date().toDateString(),
    twice: "mon_wed",
    cid,
    ifonce:false,
    what : 'two',
    time:'9',hourb:"14",hour:"9"
  });
  const [show, setShow] = useState(false);
  const [ba, setBa] = useState({});
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState("");

  useEffect(() => {
    const Check = async () => {
      try {
        // setLlb(false)
        await axios
          .get(`${cont.api}admin/getbatches/${cid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                
                setCourse((prev) => res.data.course);
                // setFirst((prev) => res.data.course);
                setBatches((prev) => res.data.batches);
                setBranches((prev) => res.data.branches);
                setTeachers((prev) => res.data.teachers);
                const dd = res.data.batches.length + 1
                setNewbatch((prev) => ({...newbatch ,name:"Batch " + (dd)}));
                setBl(res.data.batches.length);

              

                setLl(false);
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
  }, [batches, user, cont, checkCalled]);
  


  const Gradio = async (e) => {
    e.preventDefault()
    setNewbatch((prev) => ({
      ...prev,
      times: e.target.value,
      ifonce: e.target.value === 'b' ? false : true ,
      what: e.target.value === 'b' ? 'two' : 'one' ,
    }));

  };
  const Setb = async (bid) => {
    const ll = batches.find((el) => el.bid === bid);
    setBa({...ll})
    setFirst({...ll,tid:ll.teacherid})
    handleShowe()

    
  };
  const Del = async (bid, name) => {
    const ll = batches.find((el) => el.bid === bid);
    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/delbatch/${bid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (!res.data.alreadydeleted) {
                if (res.data.batches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBatches(() => res.data.batches);
                  const dd = res.data.batches.length + 1;
                  setBl(res.data.batches.length);
                  setFirst({});
                  setBa({});
                  setNewbatch((prev) => ({
                    ...newbatch,
                    name: "Batch " + dd,
                    date1: "",
                    date2: "",
                    // times: "b",
                    // once: "mon",
                    // start: new Date().toDateString(),
                    // twice: "mon_wed",
                    // cid,
                    // ifonce: false,
                  }));

                  // alert(res.data.user);

                  Swal.fire({
                    title: `Batch deleted successfully`,

                    icon: "success",
                  });
                  // navigate(`/adminbatches/${course.cid}`);
                } else {
                  // Dalert(res.data.message);
                  Swal.fire({
                    title: `there was an error performing this action`,
                    text: `Error`,
                    icon: "error",
                  });
                }
              } else {
                setCourses(res.data.courses);
                Swal.fire({
                  title:
                    "this batch seems to have been deleted even before you thought of it !",
                  text: "Deleting batches frequently is strongly prohibited ! !",
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
      text: `note :this will also delete students affiliated with this batch , as well as batch curriculum topics , pls be sure you want to proceed , this is not reversible ! `,
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
  const Lock = async (bid, name) => {
    const ll = batches.find((el) => el.bid === bid);
    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/lock/${bid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              
                if (res.data.batches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBatches(() => res.data.batches);
                  const dd = res.data.batches.length + 1;
                  setBl(res.data.batches.length);
                  setFirst({});
                  setBa({});
                  setNewbatch((prev) => ({
                    ...newbatch,
                    name: "Batch " + dd,
                    date1: "",
                    date2: "",
                    
                  }));

                  
                  Swal.fire({
                    title: `Batch ${ll.locked ? `unlocked`:`locked`} successfully`,

                    icon: "success",
                  });
                  // navigate(`/adminbatches/${course.cid}`);
                } else {
                  // Dalert(res.data.message);
                  Swal.fire({
                    title: `there was an error performing this action`,
                    text: `Error`,
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
      title: `Are you sure you want to ${ll.locked ? `un-lock` :`lock`} ${ll.name} ?`,
      text: `${ll.locked ? `this will make batch open to automatic student entry `:`this will prevent batch from automatic student entry`}`,
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
  const Updateb = async (data) => {
    // alert(JSON.stringify(first));
    const nba = ba.name.toLowerCase()

    const ifname = batches.find((el) => el.name === ba.name );
    if (nba === first.name.toLowerCase() && ba.teacherid === first.teacherid) {
      Swal.fire({
        title: "No changes made yet ,you can not update 'nothing'",
        text: "You have not changed anything! .",
        icon: "error",
      })
    }
    else if (ba.name.length < 4){
      Swal.fire({
        title: "Invalid batch name ",
        text: "proposed Batch name is too short ! .",
        icon: "error",
      })
    }
    else{
      setLlb(false);

      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in ba) {
        formDataToSend.append(key, ba[key]);
      }

      try {
        // alert(JSON.stringify(newbatch))
        await axios
          .post(`${cont.api}admin/editbatch`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:batch name is already in use.`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.batches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBatches(() => res.data.batches);
                  const dd = res.data.batches.length + 1;
                  setBl(res.data.batches.length);
                  setFirst({})
                  setBa({})
                  setNewbatch((prev) => ({
                    ...newbatch,
                    name: "Batch " + dd,
                    date1: "",
                    date2: "",
                    // times: "b",
                    // once: "mon",
                    // start: new Date().toDateString(),
                    // twice: "mon_wed",
                    // cid,
                    // ifonce: false,
                  }));

                  handleClosee();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `Batch updated successfully`,

                    icon: "success",
                  });
                  // navigate(`/adminbatches/${course.cid}`);
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
    }
  };
  const onSubmit = async(data) => {
    // alert(JSON.stringify(newbatch));
    const ifname = batches.find((el)=>el.name === newbatch.name)
    if (!ifname && newbatch.name && newbatch.name.length > 3) {
      setLlb(false);

      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in newbatch) {
        formDataToSend.append(key, newbatch[key]);
      }

      try {
        // alert(JSON.stringify(newbatch))
        await axios
          .post(`${cont.api}admin/newbatch`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:batch name is already in use.`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.batches) {
                  //   alert(res.data.data.latestloginplayertime);
                  setBatches(() => res.data.batches);
                  const dd = res.data.batches.length + 1;
                  setBl(res.data.batches.length);
                  setNewbatch((prev) => ({
                    ...newbatch,
                    name: "Batch " + dd,
                    date1: "",
                    date2: ""
                    // times: "b",
                    // once: "mon",
                    // start: new Date().toDateString(),
                    // twice: "mon_wed",
                    // cid,
                    // ifonce: false,
                  }));

                  handleClose();

                  // alert(res.data.user);

                  Swal.fire({
                    title: `New Batch created successfully`,

                    icon: "success",
                  });
                  // navigate(`/adminbatches/${course.cid}`);

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
    } else {
      Swal.fire({
        title: "Invalid batch name ",
        text: "proposed Batch name is too short or is already in use! .",
        icon: "error",
      });
    }
    
  };
  const handleDateChange =(date)=>{
    const gg = (new Date(date))
    // alert(new Date(date))
    const jsDateString = date.toDateString();
    // alert(new Date(jsDateString));
    setNewbatch({ ...newbatch, start: jsDateString });
  }
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
        Swal.fire({
          title: `error: shortcut key not applicable here`,
          text: `You do not need this shortcut key here as you are in currently in course batches Read system documentation , alt + z = back to course ,alt + t = course topics `,
          icon: "error",
        });
        
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
                          <h2 class="">Edit Batch :{ba.name} </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {ll ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={handleSubmit(Updateb)}
                              >
                                <Form.Item
                                  label="Edit Batch name"
                                  className="align-items-center"
                                >
                                  <Controller
                                    name="bb"
                                    className="col-5"
                                    control={control}
                                    // defaultValue={state.pwrd} // Set default value from state
                                    render={({ field }) => (
                                      <Input
                                        style={{
                                          boxShadow: "0 9px 3px black",
                                        }}
                                        placeholder="Enter new batch name"
                                        className="w-md-50 w-75"
                                        {...field}
                                        value={ba.name}
                                        onChange={
                                          (e) =>
                                            setBa((prev) => ({
                                              ...prev,
                                              name: e.target.value,
                                            }))
                                          // Update form state
                                          // Update local state
                                        }
                                      />
                                    )}
                                  />{" "}
                                  &nbsp; &nbsp;
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Note : Pls re-name batch sequentially e.g 'Batch 2 ', 'Batch 3', e.t.c ,it helps the algorithm .`}
                                  >
                                    <p className="d-inline cpp">
                                      <i className="fa fa-info text-primary"></i>
                                    </p>
                                  </Ctt>
                                </Form.Item>

                                <h5 className="text-start">
                                  Current teacher:{ba.teacher}
                                </h5>

                                <Form.Item label={`Change teacher`}>
                                  {/* <p></p> */}
                                  <Controller
                                    name="teachers" // Field name
                                    control={control}
                                    // defaultValue={newbatch.twice} // Set default value if needed
                                    render={({ field }) => (
                                      <Select
                                        required
                                        dropdownMatchSelectWidth={false}
                                        style={{ width: "100%" }}
                                        // mode="multiple"
                                        defaultValue={ba.teacher} // Set default value if needed
                                        value={ba.teacher} // Set default value if needed
                                        // Controlled component value
                                        {...field}
                                        onChange={(value) => {
                                          field.onChange(value);
                                          // alert(value)

                                          setBa((prev) => ({
                                            ...prev,
                                            tid: value, // Update 'twice' in the state
                                            teacherid: value,
                                            // Update 'twice' in the state
                                          }));
                                        }}
                                      >
                                        {teachers.map(({ name, userid }) => (
                                          <Option value={userid}>{name}</Option>
                                        ))}
                                      </Select>
                                    )}
                                  />
                                </Form.Item>

                                <div class="field paddingk-bottom--24">
                                  {llb ? (
                                    <div className="field">
                                      <button
                                        type="button"
                                        onClick={Updateb}
                                        className="button mt-5 mb-5 "
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
                          <h2 class="">Add new Batch (manually) </h2>
                          <sub className="text-center w-100">
                            note:this ui/ex will be improved in codarbrain 3
                          </sub>

                          {ll ? (
                            <div className="text-center">
                              <Lding />
                            </div>
                          ) : (
                            <div>
                              <form
                                id="stripe-login"
                                className=""
                                onSubmit={handleSubmit(onSubmit)}
                              >
                                <Form.Item
                                  label="Batch name"
                                  className="align-items-center"
                                >
                                  <Controller
                                    name="bb"
                                    control={control}
                                    className="col-5"
                                    // defaultValue={state.pwrd} // Set default value from state
                                    render={({ field }) => (
                                      <Input
                                        style={{
                                          boxShadow: "0 9px 3px black",
                                        }}
                                        placeholder="Enter new batch name"
                                        className="col-7 "
                                        {...field}
                                        value={newbatch.name}
                                        onChange={
                                          (e) =>
                                            setNewbatch((prev) => ({
                                              ...prev,
                                              name: e.target.value,
                                            }))
                                          // Update form state
                                          // Update local state
                                        }
                                      />
                                    )}
                                  />
                                  &nbsp; &nbsp;
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Note : Pls name batch sequentially e.g 'Batch 2 ', 'Batch 3', e.t.c ,it helps the algorithm .`}
                                  >
                                    <p className="d-inline">
                                      <i className="fa fa-info text-primary"></i>
                                    </p>
                                  </Ctt>
                                </Form.Item>
                                <Form.Item label="Choose an option">
                                  <Controller
                                    name="option" // Field name
                                    control={control}
                                    value={newbatch.times}
                                    defaultValue={newbatch.times} // Set default value if needed
                                    render={({ field }) => (
                                      <Radio.Group
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e); // Update the form state

                                          Gradio(e); // Call your custom function
                                        }}
                                        // value={batch.when}
                                      >
                                        <Radio value="a">Once a week</Radio>
                                        <Radio value="b">Twice a week</Radio>
                                      </Radio.Group>
                                    )}
                                  />
                                </Form.Item>
                                {/* <p>{newbatch.once}</p>
                                <p>{newbatch.twice}</p>
                                <p>{newbatch.times}</p> */}
                                {newbatch.times === "b" ? (
                                  <Form.Item label="Select days">
                                    <Controller
                                      name="days" // Field name
                                      control={control}
                                      // defaultValue={newbatch.twice} // Set default value if needed
                                      render={({ field }) => (
                                        <Select
                                          required
                                          dropdownMatchSelectWidth={false}
                                          style={{ width: "100%" }}
                                          // mode="multiple"
                                          defaultValue={newbatch.twice} // Set default value if needed
                                          value={newbatch.twice} // Controlled component value
                                          {...field}
                                          onChange={(value) => {
                                            field.onChange(value); // Update the form state

                                            setNewbatch((prev) => ({
                                              ...newbatch,
                                              twice: value, // Update 'twice' in the state
                                            }));
                                          }}
                                        >
                                          <Option value="mon_wed">
                                            Mondays and Wednesdays
                                          </Option>
                                          <Option value="tue_thu">
                                            Tuesdays and Thursdays
                                          </Option>
                                          <Option value="wed_fri">
                                            Wednesdays and Fridays
                                          </Option>
                                          <Option value="fri_sat">
                                            Fridays and Saturdays
                                          </Option>
                                          <Option value="sat_sun">
                                            Saturdays and Sundays
                                          </Option>
                                        </Select>
                                      )}
                                    />
                                  </Form.Item>
                                ) : (
                                  <Form.Item label="Select day">
                                    <Controller
                                      name="day" // Field name
                                      control={control}
                                      // defaultValue={newbatch.once} // Set default value if needed
                                      // value={newbatch.once} // Set default value if needed
                                      render={({ field }) => (
                                        <Select
                                          required
                                          dropdownMatchSelectWidth={false}
                                          style={{ width: "100%" }}
                                          // mode="multiple"
                                          // name="once"
                                          defaultValue={newbatch.once} // Set default value if needed
                                          value={newbatch.once} // Controlled component value
                                          {...field}
                                          onChange={(value) => {
                                            field.onChange(value); // Update the form state

                                            setNewbatch((prev) => ({
                                              ...newbatch,
                                              once: value, // Update 'twice' in the state
                                            }));
                                          }}
                                        >
                                          <Option value="mon">Mondays</Option>
                                          <Option value="tue">Tuesdays</Option>
                                          <Option value="wed">
                                            Wednesdays
                                          </Option>
                                          <Option value="thu">Thursdays</Option>
                                          <Option value="fri">Fridays</Option>
                                          <Option value="sat">Saturdays</Option>
                                          <Option value="sun">Sundays</Option>
                                        </Select>
                                      )}
                                    />
                                  </Form.Item>
                                )}
                                <Form.Item label="Start Time">
                                  <Controller
                                    name="time" // Field name
                                    control={control}
                                    // defaultValue={newbatch.once} // Set default value if needed
                                    // value={newbatch.once} // Set default value if needed
                                    render={({ field }) => (
                                      <Select
                                        required
                                        dropdownMatchSelectWidth={false}
                                        style={{ width: "100%" }}
                                        // mode="multiple"
                                        // name="once"
                                        defaultValue="9" // Set default value if needed
                                        value="9" // Controlled component value
                                        {...field}
                                        onChange={(value) => {
                                          field.onChange(value); // Update the form state

                                          setNewbatch((prev) => ({
                                            ...newbatch,
                                            hour: value, // Update 'twice' in the state
                                          }));
                                        }}
                                      >
                                        <Option value="1">1 :00 am</Option>
                                        <Option value="2">2 :00 am</Option>
                                        <Option value="3">3 :00 am</Option>
                                        <Option value="4">4 :00 am</Option>
                                        <Option value="5">5 :00 am</Option>
                                        <Option value="6">6 :00 am</Option>
                                        <Option value="7">7 :00 am</Option>
                                        <Option value="8">8 :00 am</Option>
                                        <Option value="9">9 :00 am</Option>
                                        <Option value="10">10 :00 am</Option>
                                        <Option value="11">11 :00 am</Option>
                                        <Option value="12">12 :00 pm</Option>
                                        <Option value="13">1 :00 pm</Option>
                                        <Option value="14">2 :00 pm</Option>
                                        <Option value="15">3 :00 pm</Option>
                                        <Option value="16">4 :00 pm</Option>
                                        <Option value="17">5 :00 pm</Option>
                                        <Option value="18">6 :00 pm</Option>
                                        <Option value="19">7 :00 pm</Option>
                                        <Option value="20">8 :00 pm</Option>
                                        <Option value="21">9 :00 pm</Option>
                                        <Option value="22">10 :00 pm</Option>
                                        <Option value="23">11 :00 pm</Option>
                                        <Option value="24">12 :00 am</Option>

                                        {/* <Option value="23">23 :00 pm</Option> */}
                                      </Select>
                                    )}
                                  />
                                </Form.Item>
                                <Form.Item label="End Time">
                                  <Controller
                                    name="endtime" // Field name
                                    control={control}
                                    // defaultValue={newbatch.once} // Set default value if needed
                                    // value={newbatch.once} // Set default value if needed
                                    render={({ field }) => (
                                      <Select
                                        required
                                        dropdownMatchSelectWidth={false}
                                        style={{ width: "100%" }}
                                        // mode="multiple"
                                        // name="once"
                                        defaultValue="14" // Set default value if needed
                                        value="14" // Controlled component value
                                        {...field}
                                        onChange={(value) => {
                                          field.onChange(value); // Update the form state

                                          setNewbatch((prev) => ({
                                            ...newbatch,
                                            hourb: value, // Update 'twice' in the state
                                          }));
                                        }}
                                      >
                                        <Option value="1">1 :00 am</Option>
                                        <Option value="2">2 :00 am</Option>
                                        <Option value="3">3 :00 am</Option>
                                        <Option value="4">4 :00 am</Option>
                                        <Option value="5">5 :00 am</Option>
                                        <Option value="6">6 :00 am</Option>
                                        <Option value="7">7 :00 am</Option>
                                        <Option value="8">8 :00 am</Option>
                                        <Option value="9">9 :00 am</Option>
                                        <Option value="10">10 :00 am</Option>
                                        <Option value="11">11 :00 am</Option>
                                        <Option value="12">12 :00 pm</Option>
                                        <Option value="13">1 :00 pm</Option>
                                        <Option value="14">2 :00 pm</Option>
                                        <Option value="15">3 :00 pm</Option>
                                        <Option value="16">4 :00 pm</Option>
                                        <Option value="17">5 :00 pm</Option>
                                        <Option value="18">6 :00 pm</Option>
                                        <Option value="19">7 :00 pm</Option>
                                        <Option value="20">8 :00 pm</Option>
                                        <Option value="21">9 :00 pm</Option>
                                        <Option value="22">10 :00 pm</Option>
                                        <Option value="23">11 :00 pm</Option>
                                        <Option value="24">12 :00 am</Option>

                                        {/* <Option value="23">23 :00 pm</Option> */}
                                      </Select>
                                    )}
                                  />
                                </Form.Item>

                                <label>
                                  Select start date:{newbatch.start}
                                </label>
                                <Controller
                                  name="selectedDate"
                                  control={control}
                                  rules={{ required: "Date is required" }}
                                  render={({ field }) => (
                                    <DatePicker
                                      placeholder="Select a date" // Use "placeholder" for Ant Design
                                      // value={field.value} // Use "value" to set the selected date

                                      onChange={handleDateChange}
                                      format="MMMM D, YYYY" // Use "format" to set date format
                                      allowClear // Provides a clear button
                                      style={{ width: "100%" }}
                                      inline
                                      value={newbatch.start}
                                      showYearDropdown
                                      showMonthDropdown
                                      dropdownMode="select"
                                      // Ensures the DatePicker takes the full width
                                    />
                                  )}
                                />

                                <Form.Item
                                  label="Select Branch"
                                  className="mt-3 mb-2"
                                >
                                  <Controller
                                    name="brid" // Field name should match the key you're controlling
                                    control={control}
                                    defaultValue={newbatch.brid} // Set default value if needed
                                    render={({ field }) => (
                                      <select
                                        required
                                        onChange={(e) =>
                                          setNewbatch((prev) => ({
                                            ...prev,
                                            brid: e.target.value, // Update local state if needed
                                          }))
                                        }
                                      >
                                        {branches.map((el) => (
                                          <option key={el.brid} value={el.brid}>
                                            {el.name}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  />
                                </Form.Item>

                                <div class="field paddingk-bottom--24">
                                  {llb ? (
                                    <div className="field">
                                      <button
                                        type="button"
                                        onClick={onSubmit}
                                        className="button mt-5 mb-5 "
                                      >
                                        Create
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
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

        {ll ? (
          <div className="text-center">
            <Lding />
          </div>
        ) : (
          <div class="container-xxl py-1">
            <div class="container">
              <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
                {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
                <div className="mx-auto col-4 mt-3 s3">
                  <h1 class="mb-1">{course.name} Batch(es)</h1>
                </div>
              </div>
              {user.cudaccess ? (
                <div className="mb-1 mt-4 jbtw">
                  <Button
                    variant="light"
                    color="light"
                    className="bg-danger text-light"
                    onClick={setShow}
                  >
                    Add Batch
                  </Button>
                </div>
              ) : (
                ""
              )}
              <div className="text-end ">
                <Link
                  as
                  button
                  to={`/acourse/${course.cid}`}
                  className="col-2  button z-5"
                >
                  <Ctt
                    id="tooltip-cart"
                    tooltip={`clicking this will take you back to ${course.name} profile page.`}
                  >
                    <i className="fa fa-angle-double-left fa-2x "></i>
                  </Ctt>
                </Link>
              </div>
              <div className="mt-3">
                {batches && batches.length > 0 ? (
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
                          {/* <th>S/N</th> */}
                          <Cttb
                            id="tooltip-cart"
                            tooltip={`Order of entry (the order in which batches were created)`}
                          >
                            <th
                              className="cpp"
                              onClick={(e) => {
                                setBatches([...batches.reverse()]);
                                setTog(!tog);
                              }}
                            >
                              Order{" "}
                              <i
                                className={`${tog ? `fas fa-toggle-on` : `fas fa-toggle-off`}`}
                              ></i>
                            </th>
                          </Cttb>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Branch</th>
                          <th>Teacher</th>
                          <th>Topics </th>

                          <th>
                            <Ctt id="tooltip-cart" tooltip={`Treated topics`}>
                              <p>TT</p>
                            </Ctt>
                          </th>
                          <th>
                            <Ctt id="tooltip-cart" tooltip={`Untreated topics`}>
                              <p>UT</p>
                            </Ctt>
                          </th>
                          {/* <th>Un-treated topics</th> */}
                          <th>Students</th>
                          <th>Progress</th>

                          <th>Start date</th>
                          <th>End date</th>
                          <th>Revenue</th>

                          <th>
                            <Ctt
                              id="tooltip-cart"
                              tooltip={`Locked:ideally when students are created automatically, they enter the smallest available batch automatically (also with the least completed topics as set by admin) ,if for some special reasons/cases admin can lock desired batch to prevent automatic entry of students into locked batch when students register online and when a lead transaction is confirmed.`}
                            >
                              <h4>Lock</h4>
                            </Ctt>
                          </th>
                          <th>Edit</th>

                          <th>Delete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batches.map(
                          (
                            {
                              students,
                              drev,
                              batches,
                              teacher,
                              sn,
                              cid,
                              branch,
                              startdate,
                              enddate,
                              createdby,
                              createdbyid,
                              name,
                              deployed,
                              regdate,
                              topics,
                              treatedtopics,
                              untreatedtopics,
                              image,
                              lastedit,
                              attendance,
                              dprofit,
                              editedby,
                              bid,progress,dprogress,

                              lasteditby,
                              createdat,
                              generatedby,
                              lastedittime,
                              timesedited,
                              datecreated,
                              createddate,
                              locked,
                              manual,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              key={cid}
                              style={{ position: "relative" }}
                              className="text-start mtr"
                            >
                              {/* <td>{bl - index}</td> */}
                              <td>{sn}</td>
                              <td className="tidamJ fs-5 text-start">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`this batch was ${manual ? `manually` : `automatically`} generated`}
                                >
                                  {manual ? (
                                    <div className="text-lowercase ss3">
                                      Manual
                                    </div>
                                  ) : (
                                    <div className="text-lowercase ss3">
                                      Auto
                                    </div>
                                  )}
                                </Ctt>
                              </td>
                              <td className="tidamJ fs-5 cpp text-start">
                                <Link to={`/curri/${bid}`}>
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={` <img src=${image} alt="no image" className="z-4" /><br>${name} <br>created by (${generatedby})<br> created on ${
                                      datecreated
                                    }<br>last edit :${lastedit}<br>last edit by: ${cap(editedby)}<br>last edit time: ${lastedittime}<br>Times edited :${timesedited}`}
                                  >
                                    <div className="ss3">{name}</div>
                                  </Cttb>
                                </Link>
                              </td>
                              <td className="text-capitalise text-start">
                                {branch}
                              </td>

                              <td className="text-capitalise ss3 text-start">
                                {teacher}
                              </td>
                              <td className="text-capitalise">{topics}</td>

                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${treatedtopics} treated topics`}
                                >
                                  <div>{treatedtopics}</div>
                                </Ctt>
                              </td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${untreatedtopics} untreated topics`}
                                >
                                  <div>{untreatedtopics}</div>
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
                              <td>{dprogress}</td>
                              <td className="ss3">{startdate}</td>
                              <td className="ss3">{enddate}</td>
                              <td className="ss3">{drev}</td>
                              <td onClick={() => Lock(bid)} className="cpp">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`${locked ? `click to unlock` : `click to lock`}`}
                                >
                                  <i
                                    className={`${locked ? `fa-lock` : `fa-unlock`} fa `}
                                  ></i>
                                </Ctt>
                              </td>

                              {user.cudaccess ? (
                                <td className="cpp" onClick={() => Setb(bid)}>
                                  {" "}
                                  <i className="fa fa-edit  text-primary"></i>{" "}
                                </td>
                              ) : (
                                <td>
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`sorry you do not have the license to do this `}
                                  >
                                    <p>
                                      <i className="fa fa-edit  text-primary"></i>{" "}
                                    </p>
                                  </Ctt>{" "}
                                </td>
                              )}

                              {user.cudaccess ? (
                                <td
                                  className="text-danger cpp"
                                  onClick={(e) => Del(bid, name)}
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`Clicking this will delete ${name}' ,its curriculum topics, data and students ! , remember this is a system with linearly dependent elements , everything is interconnected ! `}
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
                                    <p>
                                      <i className="fa fa-trash"></i>
                                    </p>
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
                          a={`Welcome , ${course.name} is yet to get a batch`}
                          b={` ${course.name} has no batch yet`}
                          c={`pls click the button above to manually add a batch .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;
