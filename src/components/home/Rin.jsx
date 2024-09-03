import React,{useState,useRef,useEffect} from "react";
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

import "./login.css";
import axios from "axios";
import Lding from "../common/Lding";
import Ctt from "../common/Ctt";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Form } from "antd";

const { Option } = Select;







function Rin({cont,user,setUser,setCont}) {
  const [state, setState] = React.useState({
    email: "samuelonwodi@yahoo.com",
    // pwrd: "",
    // pwrd: "cdr1236458",
    pwrd: "12345678",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [forgot, setForgot] = useState(false);
  let [activeb, setActiveb] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    vcode: "",
    // Add more fields as needed
  });
  const [error, setError] = useState(null);

  const [data, setNewdata] = React.useState({});
  const [vcode, setVcode] = useState("");
  const cookies = new Cookies();

  const [cookieValue, setCookieValue] = useState(cookies.get("myCookie") || "");

  let [lemail, setLemail] = useState("");
  let [pwrd, setLpwrd] = useState("");
  let [wrongemail, setWrongemail] = useState("");
  // let [track, setTrack] = useState(false);
  let [sname, setSsname] = useState("");
  let [verify, setVerify] = useState(false);
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  const [nvcode, setNvcode] = useState("");
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const [llv, setLlv] = useState(true);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  control.password = "hgfghjhgfgh";

  const Slogin = async (e) => {
    e.preventDefault();
    if(state.pwrd.length > 4 && state.email.includes(".") && state.email.includes("@")){
      setLl(false);

      // Create a new FormData object
      const formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append("pwrd", state.pwrd);
      formDataToSend.append("email", state.email);

      try {
        await axios.post(`${cont.api}login`, formDataToSend).then((res) => {
          if (res.data.success) {
            if (res.data.nolicense) {
              setLl(true);
              Swal.fire({
                title: `Oops ! account license not found`,
                text: `You will not be able to access this account at the moment , pls contact management as soon as possible`,
                icon: "info",
                // position: "top-end",

                showConfirmButton: false,
                timer: 6500,
              });
            } else if (res.data.user) {
              cookies.set("jwt", res.data.token);

              setCookie("userid", res.data.user.userid, 10);
              // alert(res.data.user);
              Swal.fire({
                title: `Welcome back ${res.data.user.name}`,
                text: `Last seen :${res.data.user.lastseen}`,
                // icon: 'info',
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });

              setUser((prev) => res.data.user);
              // alert(res.data.user.idle);
              // setCont((prev) =>( {...prev,expiresin:res.data.user.idle}));
              if (res.data.user.admin) {
                navigate("/admindashboard");
              } else if (res.data.user.isStudent) {
                navigate("/studentdashboard");
              } else if (res.data.user.isTeacher) {
                navigate("/mentordashboard");
              } else {
                navigate("/salesdashboard");
              }

              // navigate("/");
            } else {
              // Dalert(res.data.message);
              Swal.fire({
                title: `${res.data.message}`,
                text: `User not found`,
                icon: "info",
              });

              setLl(true);
            }
          } else {
            // Dalert('pls check your network connection');
            Swal.fire({
              title: `error :${res.data.message}`,
              text: `${res.data.message}`,
              icon: "info",
            });
            setLl(true);
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);

        setLl(true);
        Swal.fire({
          title: `Connection error`,
          text: `Pls check your internet connection `,
          // icon: 'info',
          position: "top-end",

          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
    else{
      Swal.fire({
        title: `error :pls fill in the form correctly`,
        text: `enter valid details`,
        icon: "info",
      });
      setLl(true);
    }
  };
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <div className="kbody">
      <MDBContainer className="my-3">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="d-none d-md-block">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              {forgot ? (
                <MDBCardBody className="d-flex flex-column">
                  <Link to="/" className="d-flex flex-row mt-2">
                    {/* <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                /> */}
                    <img src="/images/codar-logo.png" alt="" />

                    {/* <span className="h1 fw-bold mb-0">Codar</span> */}
                  </Link>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Account Recovery
                  </h5>
                  <Ctt
                    id="tooltip-cart"
                    tooltip="enter the email with which you registered your account "
                  >
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Recovery email address"
                      id="formControlLg"
                      required
                      placeholder="recovery email"
                      type="email" // Use type="email" for email input
                      name="email" // Use type="email" for email input
                      value={state.email}
                      onChange={(e) => {
                        handleChange(e); // Update form state
                        // If you need to update local state, you can do so here
                      }}
                      size="lg"
                    />
                  </Ctt>

                  {ll ? (
                    <div className="mx-auto">
                      <div>
                        <button onClick={Slogin} className=" button">
                          Verify
                        </button>
                        <br />
                        <Ctt
                          id="tooltip-cart"
                          tooltip="click to sign up or register "
                        >
                          <Link to="/sform" className="mt-5 text-light fw-3">
                            or sign up ?
                          </Link>
                        </Ctt>
                      </div>
                    </div>
                  ) : (
                    <Lding />
                  )}
                  <Ctt id="tooltip-cart" tooltip="recover account?">
                    <Link
                      onClick={() => {
                        setForgot(!forgot);
                      }}
                    >
                      or go back to login?
                    </Link>
                  </Ctt>
                  
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <Link to="/sform"  style={{ color: "#393f81" }}>
                      Register here
                    </Link>
                  </p>

                  
                </MDBCardBody>
              ) : (
                <MDBCardBody className="d-flex flex-column">
                  <Link to="/" className="d-flex flex-row mt-2">
                    {/* <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                /> */}
                    <img src="/images/codar-logo.png" alt="" />

                    {/* <span className="h1 fw-bold mb-0">Codar</span> */}
                  </Link>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h5>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    required
                    placeholder="email"
                    type="email" // Use type="email" for email input
                    name="email" // Use type="email" for email input
                    value={state.email}
                    onChange={(e) => {
                      handleChange(e); // Update form state
                      // If you need to update local state, you can do so here
                    }}
                    size="lg"
                  />
                  {/* <Ctt id="tooltip-cart" tooltip="Enter email">
                <Form.Item for="email" label="Email" className="mt-3 w-100">
                  <Controller
                    name="email"
                    control={control}
                    id="email"
                    placeholder="email"
                    // defaultValue={state.email} // Set default value from state
                    render={({ field }) => (
                      <Input
                        style={{ boxShadow: "0 9px 3px black" }}
                        required
                        type="email" // Use type="email" for email input
                        {...field}
                        value={state.email}
                        onChange={(e) => {
                          handleChange(e); // Update form state
                          // If you need to update local state, you can do so here
                        }}
                      />
                    )}
                  />
                </Form.Item>
              </Ctt> */}
                  <div className="password-input-wrapper position-relative">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="formControlLg"
                      type={showPassword ? "text" : "password"} // Toggle type based on state
                      size="lg"
                      name="pwrd"
                      placeholder="password"
                      value={state.pwrd}
                      required
                      onChange={handleChange}
                    />
                    {/* Icon to toggle password visibility */}
                    <MDBIcon
                      icon={showPassword ? "eye-slash" : "eye"} // Icon changes based on state
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                      }} // Position the icon properly
                    />
                  </div>

                  {/* <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                  Login
                </MDBBtn> */}
                  {/* <button onClick={Slogin} className="mt-3 mb-3 button">
                  Sign In
                </button> */}
                  {ll ? (
                    <div className="mx-auto">
                      <div>
                        <button onClick={Slogin} className=" button">
                          Sign In
                        </button>
                        <br />
                        <Ctt
                          id="tooltip-cart"
                          tooltip="click to sign up or register "
                        >
                          <Link to="/sform" className="mt-5 text-light fw-3">
                            or sign up ?
                          </Link>
                        </Ctt>
                      </div>
                    </div>
                  ) : (
                    <Lding />
                  )}
                  <Ctt id="tooltip-cart" tooltip="recover account?">
                    <Link
                      onClick={() => {
                        setForgot(!forgot);
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Ctt>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <Link to="/sform" style={{ color: "#393f81" }}>
                      Register here
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

export default Rin;
