import React, { useEffect, useState, useRef } from "react";
// import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "../Header";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
// import "react-calendar/dist/Calendar.css";
import Lding from "../../common/Lding";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Skeleton } from "primereact/skeleton";
import axios from "axios";

import Spinner from "react-bootstrap/Spinner";
import Ctt from "../../common/Ctt";
import Cttb from "../../common/Cttb";
import Modal from "react-modal"; // Make sure to install react-modal first
import "../../common/modal.css";
import Talk from "../../common/Talk";
import { Chart } from "primereact/chart";
// import axiosi from './axiosinstance';

import "animate.css/animate.min.css";
// import _ from "lodash";

import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Editor } from "primereact/editor";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons

import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Scheduler } from "@aldabil/react-scheduler";
import { ReactFullYearScheduler, TEvent } from "react-full-year-scheduler";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { Select, Input, Radio, Form } from "antd";
// import { SpeedDial } from "primereact/speeddial";
import { ProgressBar } from "primereact/progressbar";
import Cttd from "../../common/Cttd";


const Profile = ({cont,user,setUser}) => {
    const[first, setFirst] = useState({});
    // const [first, setFirst] = useState({});
    const [code, setCode] = useState("// Type or paste your code here");

    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function deepEqual(obj1, obj2) {
      if (obj1 === obj2) {
        return true;
      }

      if (
        obj1 === null ||
        typeof obj1 !== "object" ||
        obj2 === null ||
        typeof obj2 !== "object"
      ) {
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      return true;
    }
    function getCurrentMonthYear() {
      const date = new Date();
      const options = { month: "long", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }

    const { whoid } = useParams();

    const month = getCurrentMonthYear().split(" ")[0];
    const [cname, setCname] = useState("");
    const [desc, setDesc] = useState("");
    const [students, setStudents] = useState();
    const [teacher, setTeacher] = useState({});
    const [student, setStudent] = useState({});
    const [course, setCourse] = useState({});

    const [pix, setPix] = useState();
    
    const [llb, setLlb] = useState(true);
    const [done, setDone] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [copied, setCopied] = useState(false);

    const handleCopy = async (whatt) => {
      try {
        await navigator.clipboard.writeText(whatt);
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
    
    const [who, setWho] = useState({});

    const toast = useRef(null);

    const [edit, setEdit] = useState({});
    let [checkCalled, setCheck] = useState(false);
   

    const [ud, setUd] = useState(false);

    useEffect(() => {
      const Check = async () => {
        try {
          // setLlb(false)
          await axios
            .get(`${cont.api}admin/getwho/${whoid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (!res.data.nolicense) {
                if (res.data.success) {
                  
                  setWho((prev) => res.data.who);

                  
                  setLlb(false);
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
        setLlb(false);
      };

      // Check if jwtt and first are truthy
      if (!checkCalled) {
        // Call Check() if conditions are met
        Check();

        // Set the flag to true to indicate that Check() has been called
        setCheck(!checkCalled);
      }
    }, [who, navigate]);
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.altKey && event.key === "b") {
          event.preventDefault();
          console.log("Ctrl + S pressed");
          // alert(course.cid);
          navigate(`/adminbatches/${course.cid}`);
          // Add your logic here
        } else if (event.altKey && event.key === "t") {
          event.preventDefault();
          console.log("Ctrl + S pressed");
          // alert(course.cid);
          navigate(`/admintopics/${course.cid}`);
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
    }, [who, user]);
    

  return (
    <div>
      {who ? (
        <div className="row">
        <div className="col-md-4 col-12 ">
          <Card>
            <Card.Img variant="top" src={who.image} />
            <Card.Body>
              <Card.Title>{who.name}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 col-12">
          <Skeleton
            width="fit-content"
            height="fit-content"
            className="mb-2 text-dark px-2"
          >
            <h1>CODID : {who.userid}</h1>{" "}
          </Skeleton>
          <Skeleton
            width="fit-content"
            height="fit-content"
            className="mb-2 text-dark px-2"
          >
            <h1>Names : {who.name}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Education : {who.education}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Specialty : {who.specialty}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Staff level : {who.level}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>TTM: {who.ttm}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Rating: {who.progress}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Codar coin: {who.cc}</h1>{" "}
          </Skeleton>
        </div>
        <div className="col-md-4 col-12">
          {copied && (
            <div className="bg-dark text-end col-12">
              <div
                className="bg-dark p-3 rounded"
                style={{
                  marginLeft: "10px",
                  color: "white",
                  fontWeight: 900,
                  position: "absolute",
                  textAlign: "center",
                  left: "50%",
                }}
              >
                Copied!
              </div>
              {/* <hr className=" border border-danger" /> */}
            </div>
          )}

          <Skeleton
            width="fit-content"
            height="fit-content"
            className="mb-2 text-dark px-2"
          >
            <h1>Added by : {who.addedby}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>Date added : {who.registered}</h1>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h4>
              Email: <a href={`mailto:${who.email}`}>{who.email}</a>{" "}
              &nbsp;{" "}
              <i
                onClick={() => handleCopy(teacher.email)}
                className="cpp fa fa-copy"
              ></i>{" "}
            </h4>{" "}
          </Skeleton>
          <Skeleton height="fit-content" className="mb-2 text-dark py-2 px-2">
            <h1>
              Mobile: {who.phone} &nbsp;{" "}
              <i
                onClick={() => handleCopy(teacher.phone)}
                className="cpp d-inline fa fa-copy"
              ></i>{" "}
            </h1>{" "}
          </Skeleton>
          {user.host ? (
            <div>
              <Skeleton
                height="fit-content"
                className="mb-2 text-dark py-2 px-2"
              >
                <h3>Last seen: {who.lastseen}</h3>{" "}
              </Skeleton>
              <Skeleton
                height="fit-content"
                className="mb-2 text-dark py-2 px-2"
              >
                <h1>Login times: {who.logintimes}</h1>{" "}
              </Skeleton>
              <Skeleton
                height="fit-content"
                className="mb-2 text-dark py-2 px-2"
              >
                <h1>
                  Private Key: ********** &nbsp;{" "}
                  <i
                    onClick={() => handleCopy(teacher.pwrdb)}
                    className="cpp d-inline fa fa-copy"
                  ></i>{" "}
                </h1>{" "}
              </Skeleton>
              <Skeleton
                height="fit-content"
                className="mb-2 text-dark py-2 px-2"
              >
                <h1>
                  TTE: <span className="text-success">{who.dprofit}</span>
                </h1>{" "}
              </Skeleton>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      ):(
        <Lding/>
      )}
    </div>
  );
};

export default Profile;
