import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import "./sign.css";
 import Cookies from 'universal-cookie';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Spinner from 'react-bootstrap/Spinner';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from 'sweetalert2';
import { setCookie, getCookie, removeCookie } from '../cookie';
import { Galleria } from "primereact/galleria";
import './login.css'
import axios from "axios";
import Lding from "../common/Lding";
import Course from '../admin/Course';
import Ctt from "../common/Ctt"
// import Lding from "../common/Lding"
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import "primeicons/primeicons.css";
function SignUpForm({cont ,user,setUser}) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
 

  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
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
  const [vcode, setVcode] = useState('');
  const cookies = new Cookies();

  const [cookieValue, setCookieValue] = useState(cookies.get('myCookie') || '');

  let [signn, setSign] = useState(true);
  let [ss, setSs] = useState(true);
  const [verifying, setVerifying] = useState(false);
  // let [allowsign, setAllowsign] = useState(false);
  // let [lemail, setLemail] = useState('samuelonwodi@yahoo.com');
  // let [pwrd, setLpwrd] = useState('12345678');
  let [lemail, setLemail] = useState('');
  let [pwrd, setLpwrd] = useState('');
  let [wrongemail, setWrongemail] = useState('');
  // let [track, setTrack] = useState(false);
  let [sname, setSsname] = useState('');
  let [verify, setVerify] = useState(false);
 
  let [signups, setSignups] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
    cid:'',
    country:'',
    media:''
  });
  const [nvcode, setNvcode] = useState('');

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: null,
    dob: null,
    termsAccepted: false,
  });

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

  const itemTemplate = (item) => {
    return (
      <img src={item.itemImageSrc} alt={item.alt} style={{ width: "100%" }} />
    );
  };
  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} />;
  };

  return (
    <div className="sbody pt-4">
      {verify ? (
        <div class="formbg-inner border border-success">
          <small class="padding-bottom--15 text-enter p-3">
            A verification code was sent to {course.email}
          </small>
          <form id="stripe-login" onSubmit={handleVerify}>
            <div class="field padding-bottom--24 p-4">
              <label for="fname" className="text-center">
                Enter Verification code
              </label>
              <input
                type="text"
                name="fname"
                min="3"
                id="fname"
                className="text-center col-6 mx-auto "
                value={nvcode}
                onChange={(e) => {
                  setNvcode((prev) => e.target.value);
                }}
              />
            </div>
            {!verifying ? (
              <div class="field padding-bottom--24">
                <input type="submit" name="submit" value="Verify" />
              </div>
            ) : (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                >
                  {/* <Spinner
                    className="text-center"
                    animation="border"
                    variant="light"
                  /> */}
                  <Lding />
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="row align-items-center">
          <div className=" col-lg-5 col-md-6 col-sm-12">
            <img
              className="wellj  "
              style={{ height: "40vh" }}
              src="/girls/courses.png"
              alt=""
            />
          </div>

          <div className="p-fluid row px-2 col-md-6 col-6 mx-auto pt-3">
            
            <h2>Signup Form</h2>

            <div className="p-field col-md-6 col-12">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="p-field col-md-6 col-12">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="p-field  col-md-6 col-12">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                name="password"
                toggleMask
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="p-field  col-md-6 col-12">
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

            <div className="p-field  col-md-6 col-12">
              <label htmlFor="dob">Date of Birth</label>
              <Calendar
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                showIcon
                className=" col-md-6 col-12"
              />
            </div>

            <div className="p-field-checkbox">
              <Checkbox
                inputId="terms"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </div>

            {!formData.termsAccepted && (
              <Message
                severity="error"
                text="You must accept the terms and conditions"
              />
            )}

            {!llb ? (
              <div className="text-center">
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
              <button
                onClick={handleSubmit}
                className="button position-relative"
              >
                Sign Up
              </button>
            )}

            {/* <Button label="Sign Up" /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpForm;
