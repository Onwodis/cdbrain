import React,{useState,useEffect} from "react";
import { useNavigate ,Link } from "react-router-dom";
// import "./sign.css";
 import Cookies from 'universal-cookie';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Spinner from 'react-bootstrap/Spinner';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from 'sweetalert2';
import { setCookie, getCookie, removeCookie } from '../../cookie';
import { Galleria } from "primereact/galleria";

import axios from "axios";
import Lding from "../../common/Lding";
import Course from '../../admin/Course';
import Ctt from "../../common/Ctt"
// import Lding from "../common/Lding"
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputNumber } from "primereact/inputnumber";
import "primeicons/primeicons.css";
import { useForm, Controller } from "react-hook-form";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";


const Createstud = ({
  user,
  cont,
  batch,setTrans,
  batchid,
  setLl,ll,llb,
  setLlb,course,setCourse,
  setBatch,
  setBatches,
  setStudents,
  setStudent,
  setUser,
  showstud,
  setShowstud,
  handleClosestud,
}) => {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  //   const [ll, setLl] = useState(true);
  //   const [llb, setLlb] = useState(true);
  const [llv, setLlv] = useState(true);
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
  
  // const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();

  

  const [error, setError] = useState(null);

  const [data, setNewdata] = React.useState({});
  const [vcode, setVcode] = useState("");
  const cookies = new Cookies();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cookieValue, setCookieValue] = useState(cookies.get("myCookie") || "");

  let [signn, setSign] = useState(true);
  let [ss, setSs] = useState(true);
  const [verifying, setVerifying] = useState(false);
  
  
  let [verify, setVerify] = useState(false);

  const [nvcode, setNvcode] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "male",
    dob: null,
    amount:course.price,
    termsAccepted: false,
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const genderc = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        gender: e.target.value,
      });
    }
  };

  const handleSubmitb = async () => {
    // Handle form submission logic
    //   alert(JSON.stringify(formData));
    setLlb(true);
    // alert(formData.email);
    if (formData.amount < user.mininstallment) {
      Swal.fire({
        title: "Amount is too low !",
        text: `you can not open a student account with less than ${user.dmininstallment} .`,
        icon: "error",
      });
    } else if (formData.amount > course.price) {
      Swal.fire({
        title: "Amount is higher than course fee !",
        text: "this course fee is  " + course.dprice,
        icon: "error",
      });
    } else if (
      formData.fname &&
      formData.lname &&
      formData.email &&
      formData.gender &&
      formData.phone &&
      formData.dob &&
      formData.amount &&
      formData.fname.length > 2 &&
      formData.lname.length > 2 &&
      formData.email.length > 3 &&
      formData.email.includes("@") &&
      formData.email.includes(".") &&
      formData.phone.length > 3 &&
      formData.dob.length > 3 &&
      formData.gender.length > 3
    ) {
      const details = new FormData();
      for (let key in formData) {
        details.append(key, formData[key]);
      }
      details.append("userid", user.userid);
      details.append("bid", batch.bid);

      //   try {
      await axios
        .post(`${cont.api}admin/createbatchstud`, details, {
          headers: { userid: user.userid },
        })
        .then((res) => {
          if (res.data.success) {
            // setFirst(false);

            if (res.data.students) {
              //   alert(res.data.data.latestloginplayertime);
              setStudents(res.data.students);
              setCourse(res.data.course);
              setBatch(res.data.batch);
              setTrans((prev) => res.data.trans);
              setBatches((prev) => res.data.batches);

              setStudent();
              handleClosestud();

              Swal.fire({
                title: "Account creation was successful !",
                text: "student account created successfully ! !",
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
      //   } catch (err) {
      //     Swal.fire({
      //       title: "I'm afraid you can't perform this operation now !",
      //       text: "Pls check your internet network ! !",
      //       icon: "caution",
      //     });
      //   }
    } else {
      Swal.fire({
        title: "Pls check form again and fill correctly!",
        text: "you have to enter valid details .",
        icon: "error",
      });
    }
    setLlb(false)
  };

  
  const handleDateChange = (date) => {
    const gg = new Date(date);
    // alert(new Date(date))
    const jsDateString = date.toDateString();
    // alert(new Date(jsDateString));
    setFormData({ ...formData, dob: jsDateString, date });
  };

  return (
    <div>
      <div style={{ marginTop: "" }} className="form-sectionh fera">
        <div className="text-end col-12 px-2">
          <Link onClick={handleClosestud} className="text-end">
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
                      className="logob"
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
                    <h2>Create student account</h2>

                    <div className="p-field col-md-6 col-8 mx-auto">
                      <label htmlFor="fname">First name</label>
                      <InputText
                        id="fname"
                        name="fname"
                        keyfilter="alpha"
                        value={formData.fname}
                        onChange={handleInputChange}
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

                    <div className="p-field  col-md-6  col-8 mx-auto mb-2">
                      <label htmlFor="amount">Amount paid in ₦</label>
                      {user.allowinstallments ? (
                        <InputNumber
                          name="amount"
                          value={formData.amount}
                          onValueChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              amount: e.value,
                            }))
                          }
                        />
                      ) : (
                        <h4>{course.dprice}</h4>
                      )}
                    </div>

                    <div className="p-field  col-md-6  col-8 mx-auto">
                      <label htmlFor="gender">Gender</label>

                      <div className="cajkrd jbtwj mt-3">
                        <div className="cardj jbtw">
                          <Form.Check
                            inline
                            label="Male"
                            value="male"
                            checked={formData.gender === "male" ? true : false}
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
                    <div className="p-field align-items-center mt-2 col-md-6  col-8 mx-auto">
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

                    {llb ? (
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

                    {/* <Button label="Sign Up" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createstud
