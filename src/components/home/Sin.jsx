import React, { useState, useRef, useEffect } from "react";
// import {Link} from "react-router-dom"
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Dialog } from "primereact/dialog";

import "./sign.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./sign.css";
import Cookies from "universal-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import { Input } from "semantic-ui-react";

import Spinner from "react-bootstrap/Spinner";
import CircularProgress from "@mui/material/CircularProgress";

import Swal from "sweetalert2";
import { setCookie, getCookie, removeCookie } from "../cookie";
import DatePicker from "react-datepicker";

import "./login.css";
import axios from "axios";
import Policy from "./Policy"
import Lding from "../common/Lding";
import Ctt from "../common/Ctt";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Form } from "antd";


import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import "primeicons/primeicons.css";
const { Option } = Select;

function Sin({ cont,courses, user,sign, setUser, setCont }) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    control,
    formState: { errors },
  } = useForm();


  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const [llv, setLlv] = useState(true);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  let [activeb, setActiveb] = useState(true);

  const Signup = async (e) => {
    // alert(JSON.stringify(course))
    e.preventDefault();
    if (llb) {
      setLlb(!llb);

      // Create a new FormData object
      const formDataToSend = new FormData();

      for (let key in course) {
        formDataToSend.append(key, course[key]);
      }

      try {
        await axios.post(`${cont.api}signup`, formDataToSend).then((res) => {
          if (res.data.success) {
            if (!res.data.ifUser) {
              setVcode(res.data.vcode);
              setVerify(true);
              setDone(true);

              setTimeout((e) => {
                if (done) {
                  setVcode("expired");
                }
              }, 120000);
            } else {
              setVcode("expired");
              setVerify(false);
              setLlb(true);
              setNvcode("");
              // handleClose();
              Swal.fire({
                title: `Email in use  !`,
                text: `Pls use another email`,
                icon: "caution",
                position: "top-end",
              });
            }
          } else {
            if (res.data.message) {
              Swal.fire({
                title: `${res.data.message}`,
                text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                icon: "error",
              });
              // setSign(true);
              setVerify(false);
              setVerifying(false);
              setVcode("");
            } else {
              Swal.fire({
                title: `Sign up error`,
                text: `pls check your network connection`,
                icon: "error",
              });
              // setSign(true);
              setVerify(false);
              setVcode("");
              setVerifying(false);
            }
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
        setVerifying(false);
      }
      setLlb(true);
    }
  };
  const [inputType, setInputType] = useState("password");
  const [iconName, setIconName] = useState("eye");
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setIconName("eye slash");
    } else {
      setInputType("password");
      setIconName("eye");
    }
  };
  //   const SelectCos = (cid,cname)=>{
  //     let dcos = courses.filter((el)=> el.cid === cid)
  //     dcos.selected = true
  //     let mcos = courses.filter((el)=> el.cid !== cid)
  //     mcos.push(dcos)
  //     setCourse((prev)=>({...dcos}))
  //     setCourses((prev)=> [...mcos])
  //     setScos(!scos);

  //   }
  const [contextMenu, setContextMenu] = useState({
    xPos: "0px",
    yPos: "0px",
    show: false,
  });

  const handleRightClick = (e) => {
    // alert(e.pageX);
    e.preventDefault();

    setContextMenu({
      xPos: `${e.pageX}px`,
      yPos: `${e.pageY}px`,
      show: true,
    });
  };

  const handleClick = () => {
    setContextMenu({
      ...contextMenu,
      show: false,
    });
  };

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const [scos, setScos] = useState(false);
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  // const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    setCourse({
      ...course,
      [evt.target.name]: value,
    });
  };

  const [error, setError] = useState(null);

  const [data, setNewdata] = React.useState({});
  const [vcode, setVcode] = useState("");
  const cookies = new Cookies();

  const [cookieValue, setCookieValue] = useState(cookies.get("myCookie") || "");

  let [signn, setSign] = useState(true);
  let [ss, setSs] = useState(true);
  const [verifying, setVerifying] = useState(false);
  // let [allowsign, setAllowsign] = useState(false);
  // let [lemail, setLemail] = useState('samuelonwodi@yahoo.com');
  // let [pwrd, setLpwrd] = useState('12345678');
  let [lemail, setLemail] = useState("");
  let [pwrd, setLpwrd] = useState("");
  let [wrongemail, setWrongemail] = useState("");
  // let [track, setTrack] = useState(false);
  let [sname, setSsname] = useState("");
  let [verify, setVerify] = useState(false);
  let [policy, setPolicy] = useState(false);

  let [signups, setSignups] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    cid: "",
    country: "",
    media: "",
  });
  const [nvcode, setNvcode] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: null,
    dob: null,
    termsAccepted: false,
  });

  const courseOptions = courses.map((el)=>
   ( { label: el.name, value: el.cid })
  )
  
  const heardOptions = [
    { label: "Instagram", value: "instagram" },
    { label: "Facebook", value: "facebook" },
    { label: "Youtube", value: "youtube" },
    { label: "Advertisements (poster or handbill)", value: "poster" },
  ];
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.checked });
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(formData);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setDone(false);
    if (vcode === "expired") {
      setVerify(false);
      setLlb(true);
      setNvcode("");
      handleClose();
      Swal.fire({
        title: `Verification expired !`,
        text: `Pls sign up again`,
        icon: "caution",
        position: "top-center",
      });
    } else if (vcode === Number(nvcode)) {
      if (!verifying) {
        setVerifying(true);

        // Create a new FormData object
        const formDataToSend = new FormData();

        // Iterate through the form data and append each field and value to FormData
        for (let key in signups) {
          formDataToSend.append(key, signups[key]);
        }
        formDataToSend.append("vcode", vcode);

        try {
          await axios
            .post(`${cont.api}finalsign`, formDataToSend)
            .then((res) => {
              if (res.data.success) {
                if (res.data.user) {
                  Swal.fire({
                    title: `Hi ${res.data.user.name} , your registeration was successful`,
                    text: `Welcome to professional excellence !`,
                    icon: "success",
                  });
                  setUser(res.data.user);
                  const expirationDate = new Date();
                  expirationDate.setDate(expirationDate.getDate() + 1); // Expires in 1 day
                  cookies.set("user", data.token, { expires: expirationDate });
                  setCookieValue(data.token);
                  setLlv(!llv);
                  handleClose();
                  navigate("/");
                } else {
                  Swal.fire({
                    title: `${res.data.message}`,
                    text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                    icon: "error",
                  });
                  // setSign(true);
                  setVerify(false);
                  setVerifying(false);
                }
              } else {
                if (res.data.message) {
                  Swal.fire({
                    title: `${res.data.message}`,
                    text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                    icon: "error",
                  });
                  // setSign(true);
                  setVerify(false);
                  setVerifying(false);
                  setVcode("");
                  setLlv(!llv);
                  handleClose();
                } else {
                  Swal.fire({
                    title: `Sign up error`,
                    text: `pls check your network connection`,
                    icon: "error",
                  });
                  // setSign(true);
                  setVerify(false);
                  setVcode("");
                  setVerifying(false);
                }
              }
            });
        } catch (error) {
          // Handle error if needed
          console.error("Error:", error);
          setVerifying(false);
        }
      }
    } else {
      //   alert(nvcode + " jhjkj " + vcode);
      Swal.fire({
        title: `Incorrect verification code`,
        text: `The verification code you entered is incorrect `,
        icon: "caution",
      });
      handleClose();
      setVerify(false);
      setVerifying(false);
    }
  };
 
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];
  const handleDateChange = (date) => {
    const gg = new Date(date);
    // alert(new Date(date))
    const jsDateString = date.toDateString();
    // alert(new Date(jsDateString));
    setFormData({ ...formData, dob: jsDateString });
  };
  const itemTemplate = (item) => {
    return (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: "100%" }} />
    );
  };
  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  };
  const setPolicyy = ()=>{
    setPolicy(false)
  }
  return (
    <div className="kbody">
      <MDBContainer className="my-3">
        <MDBCard>
          <MDBRow className="g-0 align-items-center">
            <MDBCol md="5" className="d-none d-md-block align-items-center">
              <MDBCardImage
                // src="/girls/cbas.jpeg"
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="7">
              {verify ? (
                ""
              ) : (
                <MDBCardBody className="d-flex flex-column col-12">
                  <div className="text-center py-1">
                    <Link to="/" className=" text-center">
                      <img
                        className="wcod col-4"
                        style={{ objectFit: "contain" }}
                        src="/images/codar-logo.png"
                        alt=""
                      />

                      {/* <span className="h1 fw-bold mb-0">Codar</span> */}
                    </Link>
                  </div>

                  <div className="p-fluid row px-2 col-md-12 col-12 mx-auto pt-3">
                    <h2>Signup Form</h2>

                    <div className="p-field col-md-6 col-lg-4 col-12">
                      <label htmlFor="fname">First name</label>
                      <InputText
                        id="fame"
                        name="fname"
                        className=""
                        value={formData.fname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="p-field col-md-6 col-lg-4 col-12">
                      <label htmlFor="lname">Last name</label>
                      <InputText
                        id="lname"
                        name="lname"
                        className=""
                        value={formData.lname}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="p-field col-md-6 col-lg-4 col-12">
                      <label htmlFor="email">Email</label>
                      <InputText
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="password">Password</label>
                      <Password
                        id="password"
                        name="password"
                        toggleMask
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="gender">Gender</label>
                      <Dropdown
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        options={genderOptions}
                        onChange={handleInputChange}
                        placeholder="Select Gender"
                      />
                    </div>
                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="cid">Select Course</label>
                      <Dropdown
                        id="cid"
                        name="cid"
                        value={formData.cid}
                        options={courseOptions}
                        onChange={handleInputChange}
                        placeholder="Select Course"
                      />
                    </div>

                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="dob">Date of Birth</label>

                      <Controller
                        name="dob"
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
                            value={formData.dob}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            // Ensures the DatePicker takes the full width
                          />
                        )}
                      />
                    </div>
                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="cid">Select Course</label>
                      <Dropdown
                        id="cid"
                        name="cid"
                        value={formData.cid}
                        options={courseOptions}
                        onChange={handleInputChange}
                        placeholder="Select Course"
                      />
                    </div>
                    <div className="p-field  col-md-6 col-lg-4 col-12">
                      <label htmlFor="heard">Heard us from ?.</label>
                      <Dropdown
                        id="heard"
                        name="heard"
                        value={formData.heard}
                        options={heardOptions}
                        onChange={handleInputChange}
                        placeholder="where did you get to hear about us"
                      />
                    </div>
                    <Dialog
                      className="col-md-6 col-10"
                      // style={{ width: "90%", maxWidth: "600px" }}
                      header={`CODAR INSTITUTE`}
                      visible={visible}
                      // style={{ width: "50vw" }}
                      onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                      }}
                      closeIcon={<i className="pi pi-times"></i>}
                    >
                      <div>
                        {/* <h2>Terms and conditions</h2> */}
                        <div className="row">

                          {policy ?(
                            <div>
                             
                              <Policy setPolicyy={setPolicyy}/>

                            </div>
                          ):(<div
                            id="terms-popup"
                            style={{
                              maxWidth: "600px",
                              padding: "20px",
                              borderRadius: "10px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <h2 style={{ textAlign: "center", color: " #333" }}>
                              Terms and Conditions
                            </h2>
                            <p>
                              Welcome to Codar Institute! These terms and
                              conditions outline the rules and regulations for
                              the use of our services, courses, and website.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              1. Acceptance of Terms
                            </h3>
                            <p>
                              By accessing or using any part of our website or
                              enrolling in any of our courses, you agree to
                              comply with and be bound by these terms and
                              conditions. If you disagree with any part of the
                              terms, please do not use our services.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              2. Course Enrollment and Payment
                            </h3>
                            <p>
                              Enrollment in our courses is subject to
                              availability and receipt of the applicable course
                              fees. All fees must be paid in full prior to the
                              start of the course. Once the course fee is paid,
                              it is non-refundable except as specified in our
                              Refund Policy.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              3. Intellectual Property Rights
                            </h3>
                            <p>
                              All content provided in our courses, including but
                              not limited to text, images, videos, and software,
                              is the property of Codar Institute or its content
                              suppliers and is protected by copyright laws. You
                              may not reproduce, distribute, or create
                              derivative works from any of the content without
                              our express written permission.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              4. User Conduct and Responsibilities
                            </h3>
                            <p>
                              As a student of Codar Institute, you are expected
                              to maintain a high standard of academic integrity.
                              Plagiarism, cheating, and other forms of academic
                              dishonesty are strictly prohibited and may result
                              in expulsion from the course without a refund.
                            </p>

                            <h3 style={{ color: "#333" }}>5. Privacy Policy</h3>
                            <p>
                              Your privacy is important to us. We are committed
                              to protecting your personal information. Please
                              review our{" "}
                              <span className="d-inline cpp" onClick={()=>setPolicy(true)}
                                style={{ color: "#007bff" }}
                              >
                                Privacy Policy
                              </span>{" "}
                              for more details on how we collect, use, and
                              safeguard your data.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              6. Limitation of Liability
                            </h3>
                            <p>
                              Codar Institute shall not be held liable for any
                              direct, indirect, incidental, or consequential
                              damages resulting from the use or inability to use
                              our services or courses, even if we have been
                              advised of the possibility of such damages.
                            </p>

                            <h3 style={{ color: "#333" }}>
                              7. Amendments to Terms
                            </h3>
                            <p>
                              Codar Institute reserves the right to amend these
                              terms and conditions at any time. We will notify
                              you of any changes via email or through a notice
                              on our website. Continued use of our services
                              after such changes shall constitute your
                              acceptance of the new terms.
                            </p>

                            <h3 style={{ color: "#333" }}>8. Governing Law</h3>
                            <p>
                              These terms and conditions are governed by the
                              laws of The federal Republic of Nigeria, and any
                              disputes arising out of or in connection with
                              these terms shall be subject to the exclusive
                              jurisdiction of the courts of The federal Republic
                              of Nigeria.
                            </p>

                            <p style={{ textAlign: "center", color: "#555" }}>
                              By clicking "Accept", you acknowledge that you
                              have read, understood, and agree to be bound by
                              these terms and conditions.
                            </p>

                            <div className="mt-2 text-center">
                              <button
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    accept: "accept",
                                  }));

                                  setVisible(false);
                                }}
                                className="mt-2 text-center"
                              >
                                Accept
                              </button>{" "}
                              &nbsp; &nbsp; &nbsp;
                              <button
                                onClick={() => {
                                  setVisible(false);
                                }}
                                className="mt-2 text-center"
                              >
                                Close
                              </button>
                            </div>
                          </div>)}
                        </div>
                      </div>
                    </Dialog>

                    <span className="p-field-checkboxh   align-items-center">
                      <div>
                        <Checkbox
                          inputId="terms"
                          checked={formData.accept === "accept" ? true : false}
                          // checked={formData.termsAccepted}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, accept: "accept" });
                            } else {
                              setFormData({ ...formData, accept: "reject" });
                            }
                          }}
                        />
                      </div>
                      
                      <div className="text-center d-inline">
                        <label htmlFor="terms">
                          I accept the{" "}
                          <span
                            className="d-inline cpp text-danger"
                            onClick={() => {
                              setVisible(true);
                            }}
                          >
                            terms
                          </span>{" "}
                          and conditions
                        </label>
                      </div>
                    </span>

                    {!(formData.accept === "accept") && (
                      <Message
                        severity="error"
                        text="kindly read and accept our terms and conditions"
                      />
                    )}

                    {!llb ? (
                      <div className="text-center  mt-2 col-4">
                        <button
                          type="button"
                          className="btn btn-danger col-md-6 col-lg-4 text-center clkbtn text-light bg-danger mx-auto dpapa "
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
                      <button
                        onClick={handleSubmit}
                        className="button col-4 mx-auto position-relative"
                      >
                        Sign Up
                      </button>
                    )}

                    {/* <Button label="Sign Up" /> */}
                  </div>

                  
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                     login ?{" "}
                    <Link to="/login" style={{ color: "#393f81" }}>
                      login here
                    </Link>
                  </p>

                  {/* <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div> */}
                </MDBCardBody>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Sin;
