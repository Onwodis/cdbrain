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
import Header from "./Header"

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
import Footerb from "./Footerb"

import "./login.css";
import axios from "axios";
import Policy from "./Policy";
import Lding from "../common/Lding";
import Ctt from "../common/Ctt";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Form } from "antd";
import Job from "./Job"
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import "primeicons/primeicons.css";
const { Option } = Select;

function Career(sorry,{ cont, user, sign, setUser, setCont }) {
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
  const [courses, setCourses] = useState();

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

  

  let [ss, setSs] = useState(true);
  const [verifying, setVerifying] = useState(false);
  
  const [nvcode, setNvcode] = useState("");


  let [nc, setNc] = useState(false);
  
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);
  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true);

        await axios
          .get(
            user
              ? `${cont.api}getcoursesg/${user.userid}`
              : `${cont.api}getcoursesn`
          )
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses.length > 0) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses((prev) => [...res.data.courses]);

                // setFirst(false);

                // navigate('/');
              }
            } else {
              navigate("/");
            }
            
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
      setNc(false);
    };

    // Check if jwtt and first are truthy
    if (!checkCalled && user) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    } else if (!checkCalled) {
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
      if (user) {
        Check();

        // Set the flag to true to indicate that Check() has been called
        setCheck(!checkCalled);
      }
    }
  }, [courses, user, checkCalled]);
  return (
    <div className="kbody">
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        careers={true}
        cont={cont}
        setUser={setUser}
        user={user}
        ifuser={user ? true : false}
        courses={courses}
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />
      <MDBContainer className="my-3">
        <MDBCard>
          <MDBRow className="g-0 align-items-center">
            <MDBCol md="12">
              
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

                  <div className="p-fluidD rowJ px-2 col-md-12 col-12 mx-auto ">
                    <h2>Job Openings At Codar</h2>
                    <h4 className="text-center">Apply As Sales Associate</h4>

                    <Job />
                  </div>
                  
              </MDBCardBody>
              
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Footerb cont={cont} />
    </div>
  );
}

export default Career;
