import React,{useState,useEffect} from "react";
import "./sign.css";
import {Link} from 'react-router-dom'
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
import Course from "../admin/Course";
import codar from "../../codarbg.png";
import Bob from "./Bubbletest";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Form } from "antd";
import Rin from "./Rin"
const { Option } = Select;







function SignInForm({cont,user,setUser,setCont}) {
  const [state, setState] = React.useState({
    email: "samuelonwodi@yahoo.com",
    // pwrd: "",
    // pwrd: "cdr1236458",
    pwrd: "12345678",
  });
  const {control,handleSubmit,formState: { errors }} = useForm();
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
  const [email, setEmail] = useState('');
  control.password = 'hgfghjhgfgh'

  
  const Slogin = async (e) => {
    e.preventDefault();
    setLl(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("pwrd", state.pwrd);
    formDataToSend.append("email", state.email);

    // alert(formDataToSend.get('vcode'));

    console.log(
      formDataToSend.svcode,
      formDataToSend.token,
      data.token + " are  fe tokens"
    );
    // alert(setCont)
    try {
      await axios.post(`${cont.api}login`, formDataToSend).then((res) => {
        if (res.data.success) {
          if (res.data.nolicense) {
            setLl(true);
            Swal.fire({
              title: `Oops ! account license not found`,
              text: `You will not be able to access this account at the moment , pls contact management as soon as possible`,
              icon: 'info',
              // position: "top-end",

              showConfirmButton: false,
              timer: 6500,
            });
          }
          else if (res.data.user) {
            
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
  };
  return (
    <div
      className="sbody mx-auto col-md-6 col-12"
      style={{ minHeight: "70vh" }}
    > <Rin/>
      <div className="    ">
        {forgot ? (
          <form
            // style={{ }}
            className="formk col-12   text-center mx-auto bgtrans"
            onSubmit={Slogin}
          >
            <h1 className="tida fs-2">Account recovery</h1>

            <Ctt id="tooltip-cart" tooltip="Enter recovery email">
              <input
                type="email"
                placeholder="Enter account email"
                name="email"
                value={email}
                className="text-center rounded col-12"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ boxShadow: "0 9px 3px black" }}
                required
              />
            </Ctt>

            {ll ? (
              <div>
                <div>
                  <button className="mt-3 button mb-3 px-3">
                    Recover account
                  </button>
                  <br />

                  <Link
                    onClick={() => {
                      setForgot(false);
                    }}
                    className="mb-5 mt-5 bg-light px-2 py-2 rounded text-dark fw-5"
                  >
                    or login?
                  </Link>
                </div>
              </div>
            ) : (
              <Lding />
            )}
          </form>
        ) : (
          <div className="col-12">
            <form
              style={{
                minHeight: "90vh",
                zIndex: 5,
              }}
              // style={{ }}
              className="formk col-12  text-center mx-auto"
              onSubmit={Slogin}
            >
              {/* <h1 className="tida fs-2">Sign in</h1> */}
              <img className="well" src="/gifs/well.gif" alt="" />

              <Ctt id="tooltip-cart" tooltip="Enter email">
                <Form.Item for="email" label="Email" className="mt-3 w-100">
                  <Controller
                    name="email"
                    control={control}
                    id="email"
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
              </Ctt>
              

              <Form.Item label="Password" className="align-items-center col-12">
                <Ctt id="tooltip-cart" tooltip="Enter password">
                  <Controller
                    name="pwrd"
                    control={control}
                    // defaultValue={state.pwrd} // Set default value from state
                    render={({ field }) => (
                      <Input.Password
                        style={{ boxShadow: "0 9px 3px black" }}
                        {...field}
                        value={state.pwrd}
                        required
                        className="col-md-11 col-8"
                        onChange={(e) => {
                          // Update form state
                          handleChange(e); // Update local state
                        }}
                      />
                    )}
                  />
                </Ctt>
              </Form.Item>

              {ll ? (
                <div>
                  <div>
                    <Ctt id="tooltip-cart" tooltip="recover account?">
                      <Link
                        onClick={() => {
                          setForgot(true);
                        }}
                        className="mb-5 fw-4 px-2 py-2 rounded text-primary fw-3"
                      >
                        Forgot your password?
                      </Link>
                    </Ctt>

                    <br />
                    <button className="mt-3 mb-3 button">Sign In</button>
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
                  {/* <div className="text-center">
                <Link to="/sform" className="mb-5">
                  or signup
                </Link>
                <br />
              </div> */}
                </div>
              ) : (
                <Lding />
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignInForm;
