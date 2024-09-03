import React, { useEffect, useState, useRef } from "react";
// import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "../Header";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
// import "react-calendar/dist/Calendar.css";
import Lding from "../../common/Lding";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { Toast as Toastb } from "react-bootstrap";
import { Chip } from "primereact/chip";

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
import Createstud from "../tools/Createstud";
import Editstud from "../tools/Editstud";

// import Button from "react-bootstrap/Button";

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
import Table from "react-bootstrap/Table";

import weekday from "dayjs/plugin/weekday";
import { TabView, TabPanel } from "primereact/tabview";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Dialog } from "primereact/dialog";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
// import Cttb from "../../common/Cttd"
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
// import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Chartt from "../tools/Chart";
// import { InputText } from 'primereact/inputtext';
import { InputNumber } from "primereact/inputnumber";
const { Option } = Select;

const Curri = ({ cont, user, setUser }) => {
  const [first, setFirst] = useState({});
  const [gstuds, setGstuds] = useState();
  const [batches, setBatches] = useState();
  const [cbatches, setCbatches] = useState();
  const [pp, setPp] = useState(false);
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

  const { string } = useParams();
  const bid  = string.split("_")[0]
  const userid  = string.split("_")[1]

  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [students, setStudents] = useState();
  const [teacher, setTeacher] = useState({});
  const [student, setStudent] = useState();
  const [details, setDetails] = useState();
  const [course, setCourse] = useState({});

  const [pix, setPix] = useState();
  const [showe, setShowe] = useState(false);
  const [showstud, setShowstud] = useState(false);
  const [showstude, setShowstude] = useState(false);
  const [showm, setShowm] = useState(false);
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
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
  const handleClose = () => setShow(false);
  const handleClosestud = () => setShowstud(false);
  const handleClosestude = () => setShowstude(false);
  const handleClosem = () => setShowm(false);
  const handleClosee = () => setShowe(false);
  const handleShow = () => setShow(true);
  const handleShowm = () => setShowm(true);
  const handleShowe = () => setShowe(true);
  const [batch, setBatch] = useState({});
  const [curris, setCurris] = useState([]);
  const [curri, setCurri] = useState({});

  const toast = useRef(null);

  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);
  let [showa, setShowa] = useState(false);

  const [creator, setCreator] = useState({});
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const [ud, setUd] = useState(false);
  const [trans, setTrans] = useState();

  useEffect(() => {
    const Check = async () => {
      try {
        // setLlb(false)
        await axios
          .get(`${cont.api}admin/getcurri/${bid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                setCurris((prev) => [...res.data.curris]);
                setCourse((prev) => res.data.course);
                setBatches((prev) => res.data.batches);
                setTrans((prev) => res.data.trans);

                setFirst((prev) => res.data.course);
                setBatch((prev) => res.data.batch);
                setCode((prev) => res.data.batch.space);
                setTeacher((prev) => res.data.teacher);
                setStudents((prev) => [...res.data.students]);
                const stud = res.data.students.find((el)=>el.userid === userid)
                setStudent(stud);
                
                const dt =  res.data.trans.filter((el) => el.userid === userid);

                setStdtrans([...dt]);
                setDetails();
                setActiveIndex(4)
                // alert(JSON.stringify(res.data.students))
                setLlb(false);
                if(!stud){

                    Swal.fire({
                        title: "Student account is no available !",
                        text: "It seems you are trying to access a deleted student account ! !",
                        icon: "warning",
                    });
                    
                    navigate("/allstuds")
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
      setLlb(false);
    };

    // Check if jwtt and first are truthy
    if (!checkCalled) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [curris, batch, user, trans, cont, checkCalled, bid, navigate]);
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
  }, [course, curris, user]);
  const datesToHighlight = curris.map((item) => new Date(item.timestring));

  // Convert Date objects to strings in format 'YYYY-MM-DD'
  const highlightDates = datesToHighlight.map(
    (date) => date.toISOString().split("T")[0]
  );

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  function ifex(dateString) {
    // Convert the input date string to a Date object
    const inputDate = new Date(dateString);

    // Get the current date and time
    const currentDate = new Date();

    // Check if the input date is in the past
    return inputDate < currentDate;
  }

  const Delt = async (tid) => {
    const Goons = async () => {
      setLlb(true);

      try {
        await axios
          .get(`${cont.api}admin/deletestdtrans/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.trans) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse(() => res.data.course);
                setTrans(() => res.data.trans);
                setStudents(() => res.data.students);
                setBatches((prev) => res.data.batches);

                setLlb(false);

                Swal.fire({
                  title: `Transaction deleted successfully`,
                  icon: "success",
                });
              } else {
                const ntrans = trans.filter((el) => el.transid !== tid);
                // Dalert(res.data.message);
                setTrans(ntrans);
                Swal.fire({
                  title: `This transaction has been deleted (not by you though )!`,
                  text: `it seems another admin deleted this transaction not too long ago while you were still contemplating deleting it`,
                  icon: "error",
                });
              }
            } else {
              setLlb(false);
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
        Swal.fire({
          title: `Network/server Error:pls check your internet connection.`,
          text: `This is one of the methodologies implored to prevent back engineering`,
          icon: "error",
        });
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }

      setLlb(false);
    };

    Swal.fire({
      title: `Are you sure you want to delete this transaction ?`,
      text: `note :this is irreversible ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goons();
      }
    });
  };
  const Deltstd = async (tid) => {
    const Goons = async () => {
      try {
        await axios
          .get(`${cont.api}admin/deletestud/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.trans) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse(() => res.data.course);
                setTrans(() => res.data.trans);
                setBatches((prev) => res.data.batches);

                setStudents(() => res.data.students);
                setActiveIndex(2);
                setDetails();

                setStudent();

                Swal.fire({
                  title: `Student account deleted successfully`,
                  icon: "success",
                });
              } else {
                setActiveIndex(2);
                setDetails();
                setStudent();
                Swal.fire({
                  title: `student has been deleted already!`,
                  text: `student file not available for deletion `,
                  icon: "error",
                });
              }
            } else {
              setLlb(false);
              Swal.fire({
                title: `error : this student data is corrupted and can not be deleted now`,
                text: `error`,
                icon: "error",
              });
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
    };

    Swal.fire({
      title: `Are you sure you want to delete ${student.name}'s data ?`,
      text: `note :this is irreversible ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goons();
      }
    });
  };
  const Pay = async () => {
    const Goons = async () => {
      setPp(true);
      const fd = new FormData();
      for (let key in studentb) {
        fd.append(key, studentb[key]);
      }

      try {
        await axios
          .post(`${cont.api}admin/addstudpayment`, fd, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            setVisiblea(false);
            if (res.data.success) {
              if (res.data.trans) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse(() => res.data.course);
                setTrans(() => res.data.trans);
                setStudents(() => res.data.students);
                setPp(false);
                setAmount(false);

                Swal.fire({
                  title: `New payment saved successfully`,
                  icon: "success",
                });
              } else {
                setAmount(false);
                setPp(false);
                setVisiblea(false);

                Swal.fire({
                  title: `error encounted!`,
                  text: `we just cant figure this out now !`,
                  icon: "error",
                });
              }
            } else {
              // setPp(true);
              setPp(false);
              setAmount(false);
              Swal.fire({
                title: `error : this transaction data is corrupted and can not be deleted now`,
                text: `error`,
                icon: "error",
              });
            }
          });
      } catch (error) {
        setPp(false);
        setAmount(false);
        Swal.fire({
          title: `Network/server Error:pls check your internet connection.`,
          text: `This is one of the methodologies implored to prevent back engineering`,
          icon: "error",
        });
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }

      setLlb(false);
    };
    // alert(studentb.owe + " jkk")
    if ((studentb.newpayment < user.mininstallment) && (studentb.newpayment !== studentb.owe) ) {
      setAmount(false);
      setPp(false);
      setVisiblea(false);

      Swal.fire({
        title: `you can not make payment less than ${user.dmininstallment}`,
        icon: "warning",
      });
    } else if (studentb.newpayment > studentb.owe) {
      setAmount(false);
      setPp(false);
      setVisiblea(false);

      Swal.fire({
        title: `you can not register payment above what student is in debt of ! (${studentb.name}'s debt = ${studentb.dowe})`,
        icon: "warning",
      });
    } else {
      setPp(false);

      Goons();
    }
    setPp(false);
  };
  const Moveon = async (bid) => {
    const batc = batches.find((el) => el.bid === bid);
    setVisiblef(false);

    const Goons = async () => {
      try {
        // setLlb(false)
        const usethis = student.userid + "_" + bid;
        await axios
          .get(`${cont.api}admin/movetobatch/${usethis}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                setCurris((prev) => [...res.data.curris]);
                setCourse((prev) => res.data.course);
                setBatches((prev) => res.data.batches);
                setTrans((prev) => res.data.trans);

                setFirst((prev) => res.data.course);
                setBatch((prev) => res.data.batch);
                setCode((prev) => res.data.batch.space);
                setTeacher((prev) => res.data.teacher);
                setStudents((prev) => [...res.data.students]);
                // alert(JSON.stringify(res.data.students))
                setLlb(false);
                setStudent(res.data.student);
                Swal.fire({
                  title: "Student moved successfully !",
                  text: "Contact management ! !",
                  icon: "success",
                });
              } else {
                navigate("/");
              }
            } else {
              Swal.fire({
                title: "You do not have the license to visit this route !",
                text: "You just moved a student from one batch to another ! !",
                icon: "warning",
              });
              navigate("/");
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
    };

    Swal.fire({
      title: `Are you sure you want to move ${student.name} to ${course.name} batch "${batc.name}"  ?`,
      text: `note :this is unrecommended ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goons();
      }
    });
  };

  const Editstd = (tid) => {
    const stud = students.find((el) => el.userid === tid);
    setStudent(stud);
    setShowstude(true);
  };

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    // Get the date part
    const dateString = date.toDateString(); // "Wed Aug 22 2024"
    const [dayName, monthName, day, year] = dateString.split(" ");

    // Get the time part
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${dayName} ${monthName} ${year} ${hours}:${minutes} ${ampm}`;
  }
  function convertToLocalTime(utcDateString) {
    const utcDate = new Date(utcDateString);

    // Subtract one hour from the date
    utcDate.setHours(utcDate.getHours() - 1);

    return utcDate.toLocaleString(); // Converts to local time string
  }
  function convertToLocalTimeb(utcDateString) {
    const utcDate = new Date(utcDateString);

    // Subtract one hour from the date
    utcDate.setHours(14, 0, 0, 0);
    // utcDate.setHours(utcDate.getHours() + 4);

    return utcDate.toLocaleString(); // Converts to local time string
  }
  const [visible, setVisible] = useState();
  const [visiblea, setVisiblea] = useState();
  const [visiblef, setVisiblef] = useState();
  const [amount, setAmount] = useState();
  const [studentb, setStudentb] = useState();
  const Move = () => {
    if (batches && batches.length > 0) {
      const cba = batches.filter((el) => el.students < el.batchstud);
      if (cba && cba.length > 0) {
        setCbatches(cba);
        setVisiblef(true);
      } else {
        Swal.fire({
          title: `The available batches are filled to the brim.`,
          text: `Each batch can only contain a maximum of ${batch.batchstud} students per batch .`,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: `Error:There no other course batches to move student to.`,
        text: `This is possible if this is the only batch registered for this course`,
        icon: "error",
      });
    }
  };
  const Comp = (curid) => {
    setUd(true);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const ETopic = (curid) => {
    // alert(curid)
    const el = curris.find((el) => el.curid === curid);
    setCurri({ ...el });

    setFirst({ ...el });
    handleShow();
  };
  const Edate = (curid) => {
    // alert(curid)
    const el = curris.find((el) => el.curid === curid);
    setCurri({ ...el, newg: el.timestring });

    setFirst({ ...el });
    handleShowe();
  };
  const Edittime = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify({first:first.timestring,curri:curri.timestring}));
    // alert(JSON.stringify({firstendhour:(first.endhour),curriendhour:curri.endhour}));

    if (
      first.hour !== curri.hour ||
      first.endhour !== curri.endhour ||
      first.timestring !== curri.newg
    ) {
      setLlb(false);

      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in curri) {
        formDataToSend.append(key, curri[key]);
      }
      formDataToSend.append("userid", user.userid);
      try {
        // alert(JSON.stringify(curri))
        await axios
          .post(`${cont.api}admin/editcurritime`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:topic name is already in use.`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.curris) {
                  setCurris(() => res.data.curris);
                  setCourse((prev) => res.data.course);

                  setFirst((prev) => res.data.course);
                  setBatch((prev) => res.data.batch);
                  setLlb(false);
                  handleClosee();

                  Swal.fire({
                    title: `Curriculum updated successfully`,

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
            } else {
              Swal.fire({
                title: `error : error`,
                text: `error`,
                icon: "error",
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }
    } else {
      Swal.fire({
        title: "no change detected",
        text: " you are yet to make changes   ! ",
        icon: "error",
      });
    }
    setLlb(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify(curri));
    const notthis = curris.filter((el) => el.curid !== curri.curid);

    const iftopic = notthis.find((el) => el.topic === curri.topic);

    const ifsub = notthis.find((el) => el.subtopic === curri.subtopic);
    // alert(ifsub , iftopic);
    if (
      !ifsub &&
      !iftopic &&
      curri.subtopic.length > 12 &&
      curri.topic.length > 3 &&
      !(first.topic === curri.topic && first.subtopic === curri.subtopic)
    ) {
      setLlb(false);

      // Create a new FormData object
      let formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in curri) {
        formDataToSend.append(key, curri[key]);
      }
      formDataToSend.append("userid", user.userid);
      try {
        // alert(JSON.stringify(curri))
        await axios
          .post(`${cont.api}admin/editcurri`, formDataToSend, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (res.data.exist) {
                Swal.fire({
                  title: `Error:topic name is already in use.`,
                  text: `This is one of the methodologies implored to prevent reverse engineering`,
                  icon: "error",
                });
                setLlb(true);
              } else {
                if (res.data.curris) {
                  setCurris(() => res.data.curris);
                  setCourse((prev) => res.data.course);

                  setFirst((prev) => res.data.course);
                  setBatch((prev) => res.data.batch);
                  setLlb(false);
                  handleClose();

                  Swal.fire({
                    title: `Curriculum updated successfully`,

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
            } else {
              Swal.fire({
                title: `error : error`,
                text: `error`,
                icon: "error",
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }
      setLlb(false);
    } else {
      Swal.fire({
        title: "Invalid topic title  ",
        text: "proposed  topic title is too short or already in use! .",
        icon: "error",
      });
    }
  };
  const handleDateChange = (dateStr) => {
    const date = new Date(dateStr);
    const bb = new Date(dateStr);

    // Add 1 day
    // date.setUTCDate(date.getUTCDate() + 1);
    bb.setUTCDate(bb.getUTCDate() + 0);

    // Convert back to the ISO string format
    // const newDateStr = date.toISOString();
    const newDateStr = bb.toISOString();
    setCurri({ ...curri, timestring: date, newg: newDateStr });
  };
  function fmt(date) {
    // const ddate = new Date(date)
    const hours = date.getHours() - 1;
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0-23 hour to 1-12 hour
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const [share, setShare] = useState();
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setStudent((prev) => ({ ...prev, gender: e.target.value }));
    }
  };
  const [modalState, setModalState] = useState({});
  const handleCheckboxChangee = (e) => {
    if (e.target.checked) {
      setEdit((prev) => ({ ...prev, gender: e.target.value }));
    }
  };

  const License = async (tid, name) => {
    const ll = students.find((el) => el.userid === tid);

    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/license?userid=${tid}&fromid=${user.userid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.people) {
                //   alert(res.data.data.latestloginplayertime);
                setStudents(res.data.people);
                //   alert(res.data.people.length);
                //   const oi = res.data.pix;
                //   setImage((prev) => oi[0].image);
                setDetails();

                setStudent();
                Swal.fire({
                  title: "License toggled successfully !",
                  text: "Toggling license frequently is strongly prohibited ! !",
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
      title: `Are you sure you want to ${!ll.licensed ? `give ${name}` : `remove ${name}'s`} license to ${ll.gender === `male` ? `his` : `her`} account ?`,
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
  const Savewp = async () => {
    // alert(code)
    if (code.length > 4) {
      const fm = new FormData();
      fm.append("code", code);
      fm.append("bid", batch.bid);
      setShare(true);

      try {
        // alert(JSON.stringify(curri))
        await axios
          .post(`${cont.api}admin/share`, fm, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: `shared successfully`,

                icon: "success",
              });
            } else if (res.data.nolicense) {
              // Dalert('pls check your network connection');
              Swal.fire({
                title: `error :you do not have license for this`,
                text: `error`,
                icon: "error",
              });
            } else {
              Swal.fire({
                title: `error : error sharing codar workspace`,
                text: `error`,
                icon: "error",
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
        //   setLlb(true);
        // Dalert('pls check your network connection');
      }
      setShare(false);
    } else {
      Swal.fire({
        title: "You can not push invalid data to workspace!",
        text: "Pls use workspace responsibly.",
        icon: "warning",
      });
    }
  };
  const [text, setText] = useState("");
  const header = <img alt="Card" src={course.image} />;
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );
  const [stdtrans, setStdtrans] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const Getstudent = async (userid) => {
    const stud = students.find((el) => el.userid === userid);
    const dt = trans.filter((el) => el.userid === userid);

    setStudent(stud);
    setStdtrans([...dt]);
    setDetails();
    setActiveIndex(4);
  };
  const Remove = () => {
    setActiveIndex(2);
    setDetails();

    setStudent();
  };
  const data = [
    { name: batch.startdate, male: 4000, pvn: 1000, female: 3400 },
    { name: batch.enddate, male: 3000, pvn: 998, female: 2210 },
  ];
  const preptrans = () => {
    const ng = students.filter((el) => {
      if (el.indebt) {
        return {
          ...el,
          front: "Card 1 Front",
          back: "Card 1 Back",
          tapped: true,
        };
      }
    });

    if (ng && ng.length > 0) {
      setGstuds(ng);
      setVisiblea(true);
    } else {
      Swal.fire({
        title: `No debts :All debts paid by this batch`,
        text: `This batch students (all) have have fully paid up (no debts)`,
        icon: "warning",
      });
    }
  };
  const Movestd = () => {};
  // const [flippedCards, setFlip;pedCards] = useState(
  //   Array(gstuds.length).fill(false) // Initialize all cards as unflipped
  // );
  const handleCardClick = (userid) => {
    const yu = students.find((el) => el.userid === userid);
    setStudentb({ ...yu, newpayment: yu.owe });
    setAmount(true);
  };
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
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
                          Edit topic{" "}
                          <span className="text-success">{curri.topic}</span>{" "}
                        </h2>
                        <sub className="text-center w-100">
                          note:this ui/ex will be improved in codarbrain 3
                        </sub>

                        {llb ? (
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
                                label="Topic"
                                className="align-items-center"
                              >
                                <Controller
                                  name="bb"
                                  control={control}
                                  className="col-12"
                                  // defaultValue={state.pwrd} // Set default value from state
                                  render={({ field }) => (
                                    <Input
                                      style={{
                                        boxShadow: "0 9px 3px black",
                                      }}
                                      placeholder="Edit topic title"
                                      className="col-12 "
                                      {...field}
                                      value={curri.topic}
                                      onChange={
                                        (e) =>
                                          setCurri((prev) => ({
                                            ...prev,
                                            topic: e.target.value,
                                          }))
                                        // Update form state
                                        // Update local state
                                      }
                                    />
                                  )}
                                />
                                &nbsp; &nbsp;
                                {/* <Ctt
                                  id="tooltip-cart"
                                  tooltip={`Note : Pls name batch sequentially e.g 'Batch 2 ', 'Batch 3', e.t.c ,it helps the algorithm .`}
                                >
                                  <p className="d-inline">
                                    <i className="fa fa-info text-primary"></i>
                                  </p>
                                </Ctt> */}
                              </Form.Item>
                              <div class="field mb-1">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip="Enter subtopics (less than 120 characters pls)"
                                >
                                  <textarea
                                    name=""
                                    placeholder="Sub-topics"
                                    value={curri.subtopic}
                                    required
                                    minLength={15}
                                    rows={7}
                                    columns={7}
                                    maxLength={120}
                                    onChange={(e) =>
                                      setCurri((prev) => ({
                                        ...prev,
                                        subtopic: e.target.value,
                                      }))
                                    }
                                    id=""
                                    row="4"
                                    col="15"
                                    className="border border-success form-control w-100"
                                    style={{ resize: "none" }}
                                  ></textarea>
                                </Ctt>
                              </div>

                              <div class="field paddingk-bottom--24">
                                {!llb ? (
                                  <div className="field">
                                    <button
                                      type="button"
                                      onClick={onSubmit}
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
      <Offcanvas show={showstud} onHide={handleClosestud}>
        <Offcanvas.Body>
          <Createstud
            course={course}
            setCourse={setCourse}
            handleClosestud={handleClosestud}
            user={user}
            setBatches={setBatches}
            setUser={setUser}
            batch={batch}
            setTrans={setTrans}
            setBatch={setBatch}
            setStudents={setStudents}
            setStudent={setStudent}
            ll={ll}
            setLl={setLl}
            setLlb={setLlb}
            showstud={showstud}
            setShowstud={setShowstud}
            cont={cont}
            batchid={batch.batchid}
          />
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showstude} onHide={handleClosestude}>
        <Offcanvas.Body>
          <Editstud
            handleClosestude={handleClosestude}
            user={user}
            edit={true}
            student={student}
            setBatches={setBatches}
            setUser={setUser}
            batch={batch}
            setTrans={setTrans}
            setBatch={setBatch}
            setStudents={setStudents}
            setStudent={setStudent}
            ll={ll}
            setLl={setLl}
            setLlb={setLlb}
            showstude={showstude}
            setShowstude={setShowstude}
            cont={cont}
            batchid={batch.batchid}
          />
        </Offcanvas.Body>
      </Offcanvas>
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
                        <h2 class="">
                          Change topic Date/Time
                          <span className="text-success">
                            {curri.topic}
                          </span>{" "}
                        </h2>
                        <sub className="text-center w-100">
                          note:this ui/ex will be improved in codarbrain 3
                        </sub>

                        {llb ? (
                          <div className="text-center">
                            <Lding />
                          </div>
                        ) : (
                          <div>
                            <form
                              id="stripe-login"
                              className=""
                              onSubmit={Edittime}
                            >
                              <Form.Item label="Start Time">
                                <Controller
                                  name="time" // Field name
                                  control={control}
                                  // defaultValue={curri.once} // Set default value if needed
                                  // value={newbatch.once} // Set default value if needed
                                  render={({ field }) => (
                                    <Select
                                      required
                                      dropdownMatchSelectWidth={false}
                                      style={{ width: "100%" }}
                                      // mode="multiple"
                                      // name="once"
                                      defaultValue={curri.hour}
                                      value={curri.hour}
                                      onChange={(value) => {
                                        field.onChange(value); // Update the form state

                                        setCurri((prev) => ({
                                          ...curri,
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
                                      defaultValue={curri.endhour}
                                      value={curri.endhour}
                                      onChange={(value) => {
                                        field.onChange(value); // Update the form state

                                        setCurri((prev) => ({
                                          ...curri,
                                          endhour: value, // Update 'twice' in the state
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

                              <label>Select start date:{curri.time}</label>
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
                                    value={new Date(curri.timestring)}
                                    selected={new Date(curri.timestring)}
                                    // Ensures the DatePicker takes the full width
                                  />
                                )}
                              />
                              <div class="field paddingk-bottom--24">
                                {!llb ? (
                                  <div className="field">
                                    <button
                                      type="button"
                                      onClick={Edittime}
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
      <div class="text-center wow fadeInUp mt-2">
        <h1 class="mb-1">
          {course.name} {batch.name} <small className="d-inline">{batch.branch}</small>{" "}
          <Link to={`/adminbatches/${course.cid}`}>
            <sub>(batches)</sub>
          </Link>
        </h1>
      </div>

      <div className="card">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          {/* <TabPanel className="" header="Batch Overview"> */}
          <TabPanel
            className=""
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Overview </h5>} />
              </div>
            }
          >
            <div>
              <div className="jbtw mb-1 row">
                <h3 className="col-6 mx-auto col-md-2">
                  Start date : {batch.startdate}
                </h3>
                <h3 className="col-6 mx-auto col-md-2">
                  Max students allowed in a batch : {batch.batchstud}
                </h3>
                <h3 className="col-6 mx-auto col-md-2">
                  Batch students : {batch.students}
                </h3>
                <h3 className="col-6 mx-auto col-md-2">
                  Batch Revenue : {batch.drev}
                </h3>

                <h3 className="col-6 mx-auto col-md-2">
                  End date : {batch.enddate}
                </h3>
              </div>
              <div class="container-xxl ">
                <div class="container">
                  {!llb ? (
                    <div className="row">
                      <div className="col-12 mb-4">
                        <Card className="cardim mb-2">
                          {curris && course && course.image ? (
                            <div className="custom-day-boxj">
                              <Scheduler
                                view="month"
                                editable={false}
                                deletable={false}
                                disabled={true}
                                events={curris.map((el) => ({
                                  event_id: el.curid,
                                  title: el.topic,
                                  start: new Date(
                                    convertToLocalTime(el.timestring)
                                  ),
                                  end: new Date(
                                    convertToLocalTime(el.hourbstring)
                                  ),

                                  color: ifex(el.hourbstring) ? "red" : "green",
                                }))}
                                sx={{
                                  ".rbc-day-bg": {
                                    height: "50px", // Set the height of the day boxes
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                }}
                                style={{
                                  // Custom styles for the weekdays
                                  ".rbc-day-bg": {
                                    backgroundColor: "#f0f0f0", // Light grey background for weekdays
                                  },
                                  ".rbc-header": {
                                    color: "#3f51b5", // Primary color for weekday names
                                    fontWeight: "bold",
                                    height: "500px",
                                  },
                                }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </Card>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <Lding />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            className=""
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5> Curriculum</h5>} />
              </div>
            }
          >
            <div>
              <div class="container-xxl ">
                <div class="container">
                  {!llb ? (
                    <div className="row">
                      <div className=" col-12">
                        {curris && curris.length > 0 ? (
                          <div>
                            <h2
                              className="text-center rounded position-sticky top-0 bg-dark text-light py-2"
                              style={{ zIndex: 5 }}
                            >
                              Batch Curriculum{" "}
                              <p className="text-end d-inline">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`why cant i delete curriculum topics here ? <br>answer : It will create bugs in the system , debugging , correspondence , topics is one of the crucial elements outlined in the system documentation that needs to be treated with utmost caution`}
                                >
                                  <Badge bg="warning" pill className="">
                                    <i className="fa fa-info "></i>
                                  </Badge>
                                </Ctt>
                              </p>
                            </h2>
                            {batch.progress > 0 ? (
                              <div className="col-md-6 col-lg-8 col-10 px-2 mx-auto mb-2">
                                <ProgressBar
                                  value={batch.progress}
                                ></ProgressBar>
                              </div>
                            ) : (
                              ""
                            )}
                            <ListGroup as="ol" numbered className="z-2">
                              {curris.map(
                                ({
                                  title,
                                  subtopic,
                                  createddate,
                                  createdby,
                                  lastedit,
                                  topic,
                                  generatedby,
                                  datecreated,
                                  timesedited,
                                  topid,
                                  time,
                                  curid,
                                  timecompleted,
                                  whocompleted,
                                  lasteditby,
                                  completed,
                                  timestring,
                                  hourbstring,
                                  datecompleted,

                                  sn,
                                  lastedittime,
                                }) => (
                                  <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between  align-items-center"
                                  >
                                    {" "}
                                    <i className="fa fa-list"></i>
                                    <div className="ms-2 me-auto">
                                      <h3 className="fw-bold">
                                        {topic}{" "}
                                        {ifex(hourbstring) ? (
                                          <small className="text-danger">
                                            (date passed)
                                          </small>
                                        ) : (
                                          ""
                                        )}
                                        {/* {completed ? (
                                          <div className="d-inline">
                                            <Ctt
                                              id="tooltip-cart"
                                              tooltip={`This topic was taught on ${datecompleted}`}
                                            >
                                              <i className=" fa text-success fa-check"></i>
                                            </Ctt>
                                          </div>
                                        ) : (
                                          <div className="d-inline">
                                            <Ctt
                                              id="tooltip-cart"
                                              tooltip={`This topic is yet to be taught`}
                                            >
                                              <i className=" fa text-danger fa-times"></i>
                                            </Ctt>
                                          </div>
                                        )} */}
                                      </h3>
                                      <Skeleton
                                        height=""
                                        className="mb-2 py-2 px-2"
                                      >
                                        {subtopic}{" "}
                                      </Skeleton>
                                    </div>
                                    <h4>
                                      {time} {fmt(new Date(timestring))}{" "}
                                      {user.host ? (
                                        <Badge bg="danger" pill className="cpp">
                                          <i
                                            className="fa fa-info"
                                            onClick={() => setVisible(true)}
                                          ></i>
                                        </Badge>
                                      ) : (
                                        ""
                                      )}
                                    </h4>
                                    &nbsp;
                                    <Dialog
                                      header="Batch topic Profile ?"
                                      visible={visible}
                                      className="col-md-6 col-10"
                                      onHide={() => {
                                        if (!visible) return;
                                        setVisible(false);
                                      }}
                                      closeIcon={
                                        <i className="pi pi-times"></i>
                                      }
                                    >
                                      <p className="m-0 ">
                                        Curriculum Topic was automatically added
                                        by {generatedby} during batch creation
                                        on {datecreated} <br /> Times edited :
                                        {timesedited}
                                        <br /> Last edited by : {lasteditby}
                                        <br /> Time of last edit :{
                                          lastedittime
                                        }{" "}
                                        <br /> last edit action : {lastedit}
                                      </p>
                                    </Dialog>
                                    &nbsp;
                                    {completed ? (
                                      <sub className="text-success">
                                        treated
                                      </sub>
                                    ) : (
                                      <sub className="text-danger">
                                        untreated
                                      </sub>
                                    )}
                                  </ListGroup.Item>
                                )
                              )}
                            </ListGroup>
                          </div>
                        ) : (
                          <div className="d-flex jbtw col-md-6 mx-auto">
                            <div className="w-100 jbtw">
                              {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                              <Talk
                                bg={true}
                                a={`Welcome ,This batch is not fully configured yet`}
                                b={`Pls add topic by clicking the add topic button`}
                                c={`curriculum will be displayed here after adding .`}
                                d={`curriculum are serially entered in the order of entry  !.`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <Lding />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Students </h5>} />
              </div>
            }
          >
            <div class="container-xxl">
              <div class="container">
                <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
                  {/* <h6 class="section-title bg-white text-center text-danger px-3">
                students
              </h6> */}
                  <h1 class="">{batch.name} Students</h1>
                </div>
                {user.cudaccess && !llb ? (
                  batch.students < batch.batchstud ? (
                    <div className="mb-1 jbtw">
                      <Button
                        variant="light"
                        color="light"
                        className="bg-danger cpp text-light"
                        onClick={setShowstud}
                      >
                        Add Student
                      </Button>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {llb ? (
                  <div className="text-center">
                    <Lding />
                  </div>
                ) : (
                  <div className="mt-3">
                    {students && students.length > 0 ? (
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

                              <td className="text-center z-7">Mat no</td>
                              <td className="text-center z-7">Name</td>
                              <td className="text-center z-7">Gender</td>

                              <td>
                                C topics{"   "}
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={`Why this ? <br>This is the number of topics completed by student `}
                                >
                                  <i className="z-5 fa fa-info text-warning "></i>
                                </Cttb>
                              </td>
                              <td>Attendance</td>
                              <td>Test</td>
                              <td>Exam</td>
                              <td>Cgpa</td>
                              <td className="text-success">Payments</td>
                              <td className="text-danger">Debt</td>

                              <td>
                                License{"   "}
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={`Why License ? <br>It is very important host admin has undisputed control over all activities on codarbrain , as host admin will be held accountable for all or any data disruption or corruption in codarbrain system ,Host should be able to suspend staff's license at the slightest suspicion of foul play in the system. `}
                                >
                                  <i className="z-5 fa fa-info text-danger "></i>
                                </Cttb>
                              </td>

                              <td>CC status</td>
                              <td>Cc</td>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map(
                              (
                                {
                                  dprice,
                                  licensed,
                                  cudaccess,
                                  registered,
                                  transactions,
                                  physical,
                                  userid,
                                  dpaid,
                                  cid,
                                  exam,
                                  cgpa,
                                  test,
                                  comp,
                                  courses,
                                  batches,
                                  image,
                                  email,
                                  education,
                                  lmonths,
                                  phone,
                                  humanexpiry,
                                  level,
                                  attendance,
                                  leads,
                                  logindmytimes,
                                  mandyleads,
                                  dmyleads,
                                  logintimes,
                                  lastseen,
                                  gender,
                                  matricno,
                                  createddate,
                                  specialty,
                                  name,
                                  dowe,
                                  indebt,
                                  allowcc,
                                  cc,
                                  desc,
                                  students,
                                },
                                index,
                                el
                              ) => (
                                <tr
                                  key={userid}
                                  style={{ position: "relative" }}
                                  className="mtru align-items-center py-1"
                                >
                                  <td className="text-center">{index + 1}</td>
                                  <td className="text-center">{matricno}</td>
                                  <td
                                    className="tidamJ fs-5 cpp text-center"
                                    onClick={() => Getstudent(userid)}
                                  >
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`${name}<br>${email} ${phone}</br>logged in ${logintimes} times (all time)<br>Today's login ${logindmytimes}</br>date added: ${registered}<br>Last seen :${lastseen} <br>Phone : ${phone}`}
                                    >
                                      <div>{name}</div>
                                    </Cttb>
                                  </td>
                                  <td className="text-center">{gender}</td>

                                  <td className="text-center">{attendance}</td>

                                  <td className="text-center">{comp}</td>
                                  <td className="text-center">{test}</td>
                                  <td className="text-center">{exam}</td>
                                  <td className="text-center">{cgpa}</td>
                                  <td className="text-success text-center">
                                    {transactions}
                                  </td>
                                  <td
                                    className={
                                      indebt
                                        ? "text-center text-danger"
                                        : "text-success text-center"
                                    }
                                  >
                                    {dowe}
                                  </td>
                                  <td>
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`${
                                        licensed
                                          ? `Licensed :this means that ${name}  can access (unrestricted) his account and perform operations within ${gender === "male" ? `his` : `her`} jurisdiction as a student`
                                          : `Un-Licensed :this means that ${name}  can not access (unrestricted) his account and perform operations within ${gender === "male" ? `his` : `her`} jurisdiction as a student`
                                      } `}
                                    >
                                      {licensed ? (
                                        <div
                                          onClick={(e) => License(userid, name)}
                                          className="text-success btn button"
                                        >
                                          licensed
                                        </div>
                                      ) : (
                                        <div
                                          onClick={(e) => License(userid, name)}
                                          className="text-danger btn button"
                                        >
                                          Un-licensed
                                        </div>
                                      )}
                                    </Ctt>
                                  </td>
                                  <td
                                    className={
                                      allowcc ? "text-success" : "text-danger"
                                    }
                                  >
                                    {allowcc ? "active" : "inactive"}
                                  </td>
                                  <td
                                    className={
                                      cc < 10000
                                        ? "text-danger"
                                        : "text-success"
                                    }
                                  >
                                    {cc} cc
                                  </td>

                                  {/* {user.cudaccess ? (
                                    <td
                                      className="text-primary cpp"
                                      onClick={(e) => EditStudents(userid)}
                                    >
                                      <i className="fa fa-edit"></i>
                                    </td>
                                  ) : (
                                    <td className="text-primary cpp">
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={` Oops ! sorry you do not have access to edit ${name}'s account`}
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Ctt>
                                    </td>
                                  )} */}
                                  {/* {user.cudaccess ? (
                                    <td
                                      className="text-danger cpp"
                                      onClick={(e) => Del(userid, name)}
                                    >
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`Clicking this will delete ${name}'s account ! `}
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
                                        <i className="fa fa-trash"></i>
                                      </Ctt>
                                    </td>
                                  )} */}
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
                              a={`This batch is yet to get a registerd student`}
                              b={`This might be because you just onboarded/reset the system `}
                              c={`pls click the button above to add a student .`}
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
          </TabPanel>
          {/* <TabPanel header="Students Metadata"> */}
          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Students Metadata</h5>} />
              </div>
            }
          >
            <div class="container-xxl">
              <div class="container">
                <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
                  {/* <h6 class="section-title bg-white text-center text-danger px-3">
                students
              </h6> */}
                  <h1 class="">{batch.name} Students metadata</h1>
                </div>

                {llb ? (
                  <div className="text-center">
                    <Lding />
                  </div>
                ) : (
                  <div className="mt-3">
                    {students && students.length > 0 ? (
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
                              <td className="text-center">Entry mode</td>

                              <td className="text-center z-7">Name</td>
                              <td className="text-center z-7">Email</td>
                              <td className="text-center z-7">Phone</td>
                              <td className="text-center z-7">Bday</td>

                              {/* <td>Qualification</td> */}

                              <td>Last seen</td>

                              <td>Today Logins</td>
                              <td className="text-center z-7">Date added</td>
                              <td className="text-center z-7">Added by</td>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map(
                              (
                                {
                                  dprice,
                                  licensed,
                                  cudaccess,
                                  dob,
                                  registered,
                                  physical,
                                  userid,
                                  cid,
                                  exam,
                                  cgpa,
                                  test,
                                  comp,
                                  courses,
                                  batches,
                                  image,
                                  email,
                                  education,
                                  lmonths,
                                  phone,
                                  addedby,
                                  dobpassed,
                                  humanexpiry,
                                  level,
                                  attendance,
                                  leads,
                                  logindmytimes,
                                  mandyleads,
                                  dmyleads,
                                  logintimes,
                                  lastseen,
                                  gender,
                                  createddate,
                                  specialty,
                                  name,
                                  desc,
                                  mode,
                                  students,
                                },
                                index,
                                el
                              ) => (
                                <tr
                                  key={userid}
                                  style={{ position: "relative" }}
                                  className="mtr"
                                >
                                  <td>{index + 1}</td>
                                  <td>{mode}</td>
                                  <td
                                    className="tidamJ fs-5  text-start cpp"
                                    onClick={() => Getstudent(userid)}
                                  >
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`${name}<br>${email} ${phone}</br>logged in ${logintimes} times (all time)<br>Today's login ${logindmytimes}</br>date added: ${registered}<br>Last seen :${lastseen} <br>Phone : ${phone}`}
                                    >
                                      <div>{name}</div>
                                    </Cttb>
                                  </td>

                                  <td className="text-capitalise">{email}</td>
                                  <td className="text-capitalise">{phone}</td>
                                  <td
                                    className={`${dobpassed ? `text-success` : `text-danger`} text-capitalise`}
                                  >
                                    {dob.split(" ")[1]} {dob.split(" ")[2]}
                                  </td>

                                  <td>
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`last seen online on :${lastseen}`}
                                    >
                                      <div>{lastseen}</div>
                                    </Ctt>
                                  </td>
                                  <td>
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`todays login times ,note higher logintimes should arouse suspicions on system malpractice from user .`}
                                    >
                                      <div>{logindmytimes}</div>
                                    </Ctt>
                                  </td>
                                  <td>{registered}</td>
                                  <td>{addedby}</td>
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
                              a={`This batch is yet to get a registerd student`}
                              b={`This might be because you just onboareded/reset the system `}
                              c={`pls click the button above to add a student .`}
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
          </TabPanel>

          {student ? (
            // <TabPanel header={`${student.name} (student)`} className="">
            <TabPanel
              header={
                <div className="cardd flex flex-wrap gap-1">
                  <Chip label={<h5>{`${student.name} (student)`}</h5>} />
                </div>
              }
              className="mb-5"
            >
              <Dialog
                className="col-md-6 col-10"
                // style={{ width: "90%", maxWidth: "600px" }}
                header={`Which batch do you want to move ${student.name} to ?`}
                visible={visiblef}
                // style={{ width: "50vw" }}
                onHide={() => {
                  if (!visiblef) return;
                  setVisiblef(false);
                }}
                closeIcon={<i className="pi pi-times"></i>}
              >
                <div>
                  <h2>Select Batch</h2>
                  <div className="row">
                    {cbatches && cbatches.length > 0
                      ? cbatches.map(
                          ({ name, gender, students, bid }, index) => (
                            <div className="col-md-4 col-12 mb-1">
                              <Card
                                className={`card rounded bg-${(index + 1) % 2 === 1 ? `success` : `primary`} cpp pt-2`}
                                onClick={() => Moveon(bid)}
                              >
                                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                <span className="text-center">
                                  {" "}
                                  <h3 className="text-light">{name}</h3>{" "}
                                  <i
                                    className={`fa  fa-class fa-4x text-light`}
                                  ></i>
                                </span>

                                <Card.Body>
                                  <h3 className="text-light">
                                    {students} students
                                  </h3>{" "}
                                </Card.Body>
                              </Card>
                            </div>
                          )
                        )
                      : ""}
                  </div>
                </div>
              </Dialog>
              <div className="row pt-0">
                <h2 className="text-center mb-3">
                  {`${student.name}'s Biodata`} ({student.gender}) &nbsp;
                  &nbsp;&nbsp; &nbsp;
                  <Ctt
                    id="tooltip-cart"
                    tooltip={`click to close ${student.name}'s Data page`}
                  >
                    <small className="text-end px-4">
                      <i
                        onClick={Remove}
                        className="fa cpp fa-times text-danger"
                      ></i>
                    </small>
                  </Ctt>
                  {user.cudaccess ? (
                    <div>
                      {batches && batches.length > 0 ? (
                        <div className="d-inline">
                          <Ctt
                            id="tooltip-cart"
                            tooltip={`Click to move ${student.name} to another ${course.name} batch `}
                          >
                            <p onClick={Move} className="mb-2 d-inline">
                              <strong>
                                <i className="fa cpp fa-arrows-alt"></i>
                              </strong>
                            </p>
                            {/* <p
                            onClick={(e) => Movestd(student.userid)}
                            className="mb-2 d-inline"
                          >
                            <strong>
                              <i className="fa cpp fa-arrows-alt"></i>
                            </strong>
                          </p> */}
                          </Ctt>{" "}
                          &nbsp; &nbsp;
                        </div>
                      ) : (
                        ""
                      )}
                      <Ctt
                        id="tooltip-cart"
                        tooltip={`Click to edit ${student.name}'s Student biodata `}
                      >
                        <p
                          onClick={(e) => Editstd(student.userid)}
                          className="mb-2 d-inline"
                        >
                          <strong>
                            <i className="fa cpp fa-edit"></i>
                          </strong>
                        </p>
                      </Ctt>{" "}
                      &nbsp; &nbsp;
                      <Ctt
                        id="tooltip-cart"
                        tooltip={`Are you sure you want to permanently delete  ${student.name}'s Student Data `}
                      >
                        <p
                          onClick={(e) => Deltstd(student.userid)}
                          className="mb-2 d-inline"
                        >
                          <strong>
                            <i className="fa cpp fa-trash text-danger"></i>
                          </strong>
                        </p>
                      </Ctt>
                    </div>
                  ) : (
                    <div className="text-end">
                      {/* &nbsp; &nbsp;
                      <Ctt
                        id="tooltip-cart"
                        tooltip={`click to close ${student.name}'s Data page`}
                      >
                        <small className="text-end px-4">
                          <i
                            onClick={Remove}
                            className="fa cpp fa-times text-danger"
                          ></i>
                        </small>
                      </Ctt> */}
                    </div>
                  )}
                </h2>
                 {student.indebt ?(<small className="text-center text-danger" style={{fontSize:"13px"}}> {student.name} is in debt ({student.dowe}) ,  next due date : {student.due}</small>):""}
                <div className="col-md-4 col-12 ">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={
                        student.image
                          ? student.image
                          : `${cont.api}admins/noimage.png`
                      }
                    />
                    <Card.Body>
                      <Card.Title>{student.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-4 col-12">
                  <Skeleton
                    width="fit-content"
                    height="fit-content"
                    className="mb-2 text-dark px-2"
                  >
                    <h1>CODID : {student.userid}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    width="fit-content"
                    height="fit-content"
                    className="mb-2 text-dark px-2"
                  >
                    <h1>Names : {student.name}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Matno: {student.matricno}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Date of birth : {student.dob}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Total payments : {student.dpaid}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Test score: {student.test}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Exam score: {student.exam}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>CGPA: {student.cgpa}</h1>{" "}
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
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>Registered : {student.registered}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    width="fit-content"
                    height="fit-content"
                    className="mb-2 text-dark px-2"
                  >
                    <h1>Reg by : {student.addedby}</h1>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h3>
                      Email:{" "}
                      <a href={`mailto:${student.email}`}>{student.email}</a>{" "}
                      &nbsp;{" "}
                      <i
                        onClick={() => handleCopy(teacher.email)}
                        className="cpp fa fa-copy"
                      ></i>{" "}
                    </h3>{" "}
                  </Skeleton>
                  <Skeleton
                    height="fit-content"
                    className="mb-2 text-dark py-2 px-2"
                  >
                    <h1>
                      Mobile: {student.phone} &nbsp;{" "}
                      <i
                        onClick={() => handleCopy(teacher.phone)}
                        className="cpp d-inline fa fa-copy"
                      ></i>{" "}
                      <a
                        href={`https://wa.me/+234${student.phone}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i
                          className="pi pi-whatsapp"
                          style={{ fontSize: "24px", color: "green" }}
                        ></i>
                      </a>
                    </h1>{" "}
                  </Skeleton>
                  {user.host ? (
                    <div>
                      <Skeleton
                        height="fit-content"
                        className="mb-2 text-dark py-2 px-2"
                      >
                        <h3>Last seen: {student.lastseen}</h3>{" "}
                      </Skeleton>
                      <Skeleton
                        height="fit-content"
                        className="mb-2 text-dark py-2 px-2"
                      >
                        <h1>Login times: {student.logintimes}</h1>{" "}
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
                        <h1>Codar coin: {student.cc}</h1>{" "}
                      </Skeleton>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mt-3 ">
                <h2 className="text-center">{student.name}'s transactions</h2>
                {stdtrans && stdtrans.length > 0 ? (
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

                          <td className="text-center z-7">Date</td>

                          <td className="text-center z-7">Name</td>
                          <td className="text-center z-7">Reference</td>

                          <td className="text-center z-7">Mode</td>
                          <td className="text-center z-7">Mat no</td>
                          <td className="text-center z-7">Payment Order</td>
                          <td className="text-center z-7">Amount</td>
                          <td className="text-center z-7">
                            Generated by{" "}
                            <Cttb
                              id="tooltip-cart"
                              tooltip={`who generated/collected this payment`}
                            >
                              <i className="z-5 fa fa-info text-danger "></i>
                            </Cttb>
                          </td>

                          {user.host ? <td>Delete</td> : ""}
                        </tr>
                      </thead>
                      <tbody>
                        {stdtrans.map(
                          (
                            {
                              reference,
                              licensed,
                              transid,
                              cudaccess,
                              registered,
                              physical,
                              userid,
                              type,
                              other,
                              paidby,
                              dpaid,
                              cid,
                              exam,
                              cgpa,
                              test,
                              comp,
                              matno,

                              email,
                              education,
                              lmonths,
                              firstpayment,
                              damount,
                              date,
                              orderb,

                              name,
                              paymentby,
                              cc,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              key={userid}
                              style={{ position: "relative" }}
                              className="text-center align-items-center py-1"
                            >
                              <td>{index + 1}</td>
                              <td>{date}</td>
                              <td className="tidamJ fs-5  text-center">
                                <Cttb id="tooltip-cart" tooltip={`${other}`}>
                                  <div>{name}</div>
                                </Cttb>
                              </td>
                              <td className="text-center">{reference}</td>
                              <td>{type}</td>

                              <td>{matno}</td>

                              <td className="text-center">
                                {orderb}
                                {/* {firstpayment ? "true" : "false"} */}
                              </td>
                              <td>{damount}</td>
                              <td>{paidby}</td>

                              <td
                                className="text-center cpp"
                                onClick={(e) => Deltstd(transid)}
                              >
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`you are about to delete this transaction`}
                                >
                                  <p>
                                    <i className="fa fa-trash text-danger text-center"></i>
                                  </p>
                                </Ctt>
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
                        <Talk
                          bg={true}
                          a={`${student.name} is yet to get any transaction`}
                          b={`${student.name}'s transactions will pop up here as soon as you register any payment for ${student.male ? `him` : `her`} .`}
                          c={`Click "Batch transactions" to add transactions (the sixth tab on this page) .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {(student.edited || student.moved) && user.host ? (
                <div className="mt-3 mb-2">
                  <h2 className="text-center">
                    Technical <i className="fa fa-gear"></i> made on{" "}
                    {student.name}
                  </h2>

                  <div className="px-2">
                    {student.moved ? (
                      <h4 className="text-start mb-2">
                        {" "}
                        <i className="fa fa-list"></i> Summary :
                        {student.movequery}
                      </h4>
                    ) : (
                      ""
                    )}

                    {student.edited ? (
                      <h4 className="text-start mb-5">
                        {" "}
                        <i className="fa fa-list"></i> Summary :
                        {student.editquery}
                      </h4>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </TabPanel>
          ) : null}
          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Teacher </h5>} />
              </div>
            }
            className=""
          >
            <div className="row">
              <div className="col-md-4 col-12 ">
                <Card>
                  <Card.Img variant="top" src={teacher.image} />
                  <Card.Body>
                    <Card.Title>{teacher.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 col-12">
                <Skeleton
                  width="fit-content"
                  height="fit-content"
                  className="mb-2 text-dark px-2"
                >
                  <h1>CODID : {teacher.userid}</h1>{" "}
                </Skeleton>
                <Skeleton
                  width="fit-content"
                  height="fit-content"
                  className="mb-2 text-dark px-2"
                >
                  <h1>Names : {teacher.name}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Education : {teacher.education}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Specialty : {teacher.specialty}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Staff level : {teacher.level}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>TTM: {teacher.ttm}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Rating: {teacher.progress}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Codar coin: {teacher.cc}</h1>{" "}
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
                  <h1>Added by : {teacher.addedby}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>Date added : {teacher.registered}</h1>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h3>
                    Email:{" "}
                    <a href={`mailto:${teacher.email}`}>{teacher.email}</a>{" "}
                    &nbsp;{" "}
                    <i
                      onClick={() => handleCopy(teacher.email)}
                      className="cpp fa fa-copy"
                    ></i>{" "}
                  </h3>{" "}
                </Skeleton>
                <Skeleton
                  height="fit-content"
                  className="mb-2 text-dark py-2 px-2"
                >
                  <h1>
                    Mobile: {teacher.phone} &nbsp;{" "}
                    <i
                      onClick={() => handleCopy(teacher.phone)}
                      className="cpp d-inline fa fa-copy"
                    ></i>{" "}
                    <a
                      href={`https://wa.me/+234${teacher.phone}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i
                        className="pi pi-whatsapp"
                        style={{ fontSize: "24px", color: "green" }}
                      ></i>
                    </a>
                  </h1>{" "}
                </Skeleton>
                {user.host ? (
                  <div>
                    <Skeleton
                      height="fit-content"
                      className="mb-2 text-dark py-2 px-2"
                    >
                      <h3>Last seen: {teacher.lastseen}</h3>{" "}
                    </Skeleton>
                    <Skeleton
                      height="fit-content"
                      className="mb-2 text-dark py-2 px-2"
                    >
                      <h1>Login times: {teacher.logintimes}</h1>{" "}
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
                      <h3>
                        TTE:{" "}
                        <span className="text-success">{teacher.dprofit}</span>
                      </h3>{" "}
                    </Skeleton>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Transactions</h5>} />
              </div>
            }
          >
            <div class="container-xxl">
              <div class="container">
                <Dialog
                  className="col-md-6 col-10"
                  // style={{ width: "90%", maxWidth: "600px" }}
                  header={
                    amount
                      ? "Payment registeration ! "
                      : "Who do you want to register payment for ?"
                  }
                  visible={visiblea}
                  // style={{ width: "50vw" }}
                  onHide={() => {
                    if (!visiblea) return;
                    setVisiblea(false);
                    setAmount(false);
                  }}
                  closeIcon={<i className="pi pi-times"></i>}
                >
                  {!amount ? (
                    <div>
                      <h2>Select Student</h2>
                      <div className="row">
                        {gstuds && gstuds.length > 0
                          ? gstuds.map(
                              ({ name, gender, male, dowe, userid }) => (
                                <div className="col-md-4 col-12 mb-1">
                                  <Card
                                    className={`card rounded bg-primary cpp pt-2`}
                                    onClick={() => handleCardClick(userid)}
                                  >
                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                    <span className="text-center">
                                      {" "}
                                      <h3 className="text-light">
                                        {name}
                                      </h3>{" "}
                                      <i
                                        className={`${male ? `fa-male` : `fa-female`} fa fa-4x text-light`}
                                      ></i>
                                    </span>

                                    <Card.Body>
                                      {/* <Card.Title>
                                      <h4>{name}</h4>
                                    </Card.Title> */}
                                      <p className="text-dark">Owing <span className="text-light d-inline">{dowe}</span></p>
                                    </Card.Body>
                                  </Card>
                                </div>
                              )
                            )
                          : ""}
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <Card className={`card rounded bg-primary pt-2`}>
                        <span className="text-center">
                          {" "}
                          <h3 className="text-light tida">
                            {studentb.name}
                          </h3>{" "}
                        </span>

                        <Card.Body>
                          {user.allowinstallments ? (
                            <Card.Title>Remember {studentb.name} </Card.Title>
                          ) : (
                            <Card.Title>
                              Complete {studentb.name}'s payment{" "}
                            </Card.Title>
                          )}
                          {user.allowinstallments ? (
                            <div>
                              <h2 className="text-light">
                                {" "}
                                is in debt of{" "}
                                <h2 className="text-danger d-inline">
                                  {studentb.dowe}
                                </h2>
                              </h2>
                              <div className="p-inputgroup flex-1 col-md-6 col-lg-6 col-10 mx-auto">
                                <span className="p-inputgroup-addon fs-2">
                                  ₦
                                </span>
                                <InputNumber
                                  placeholder="Amount in ₦"
                                  className="text-center"
                                  value={studentb.newpayment}
                                  onChange={(e) =>
                                    setStudentb((prev) => ({
                                      ...prev,
                                      newpayment: e.value,
                                    }))
                                  } // Corrected the syntax
                                />
                                <span className="p-inputgroup-addon">.00</span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h2 className="text-light">
                                Pay-up {studentb.name}'s &nbsp;
                                <h2 className="text-light d-inline">
                                  {studentb.dowe}
                                </h2>{" "}
                                debt
                              </h2>
                            </div>
                          )}

                          <div className="text-center">
                            {pp ? (
                              <Lding />
                            ) : (
                              <button
                                onClick={Pay}
                                className="button mt-3 mx-auto"
                              >
                                Register Payment
                              </button>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  )}
                </Dialog>
                <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
                  {/* <h6 class="section-title bg-white text-center text-danger px-3">
                students
              </h6> */}
                  <h1 class="">{batch.name} Transactions</h1>
                </div>
                {user.cudaccess && !llb ? (
                  batch.students > 0 ? (
                    <div className="mb-1 jbtw">
                      <Button
                        variant="light"
                        color="light"
                        className="bg-danger cpp text-light"
                        onClick={preptrans}
                      >
                        Add Payment
                      </Button>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {llb ? (
                  <div className="text-center">
                    <Lding />
                  </div>
                ) : (
                  <div className="mt-3">
                    {trans && trans.length > 0 ? (
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

                              <td className="text-center z-7">Date</td>

                              <td className="text-center z-7">Name</td>
                              <td className="text-center z-7">Reference</td>

                              <td className="text-center z-7">Mode</td>
                              <td className="text-center z-7">Mat no</td>
                              <td className="text-center z-7">Payment order</td>
                              <td className="text-center z-7">Amount</td>
                              <td className="text-center z-7">
                                Generated by{" "}
                                <Cttb
                                  id="tooltip-cart"
                                  tooltip={`who generated/collected this payment`}
                                >
                                  <i className="z-5 fa fa-info text-danger "></i>
                                </Cttb>
                              </td>

                              {user.host ? <td>Delete</td> : ""}
                            </tr>
                          </thead>
                          <tbody>
                            {trans.map(
                              (
                                {
                                  reference,
                                  licensed,
                                  transid,
                                  cudaccess,
                                  registered,
                                  physical,
                                  userid,
                                  type,
                                  other,
                                  paidby,
                                  dpaid,
                                  cid,
                                  exam,
                                  cgpa,
                                  test,
                                  comp,
                                  matno,

                                  email,
                                  education,
                                  lmonths,
                                  firstpayment,
                                  damount,
                                  date,
                                  orderb,

                                  name,
                                  paymentby,
                                  cc,
                                },
                                index,
                                el
                              ) => (
                                <tr
                                  key={userid}
                                  style={{ position: "relative" }}
                                  className="text-center align-items-center py-1"
                                >
                                  <td>{index + 1}</td>
                                  <td>{date}</td>
                                  <td className="tidamJ fs-5  text-center">
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`${other}`}
                                    >
                                      <div>{name}</div>
                                    </Cttb>
                                  </td>
                                  <td className="text-center">{reference}</td>
                                  <td>{type}</td>

                                  <td>{matno}</td>

                                  <td className="text-center">{orderb}</td>
                                  {/* <td className="text-center">
                                    {firstpayment ? "true" : "false"}
                                  </td> */}
                                  <td>{damount}</td>
                                  <td>{paidby}</td>

                                  <td
                                    className="text-center cpp"
                                    onClick={(e) => Delt(transid)}
                                  >
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`you are about to delete this transaction`}
                                    >
                                      <p>
                                        <i className="fa fa-trash text-danger text-center"></i>
                                      </p>
                                    </Ctt>
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
                            {batch.students > 0 ? (
                              <Talk
                                bg={true}
                                a={`There is currently no saved transaction record for this batch`}
                                b={`You have students in this batch but no transaction `}
                                c={`This is not an ideal situation , this means one or more transactions have been deleted.`}
                                d={`click the button above to add a transaction !.`}
                              />
                            ) : (
                              <Talk
                                bg={true}
                                a={`This batch is yet to get any transaction`}
                                b={`This might be because you just onboarded/reset the system `}
                                c={`Click "Students" (the third tab on this page) and add students  .`}
                                d={`pls do not forget to enter only valid details !.`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Settings </h5>} />
              </div>
            }
          >
            <div>
              <div class="container-xxl ">
                <div class="container">
                  <div className="fg">
                    <div
                      size="lg"
                      className="bg-dangjer flex-1 jbtw col-6  mx-auto"
                    >
                      <h5 variant="dark" className="activje text-dark">
                        <Link
                          to={`/adminbatches/${course.cid}`}
                          className="text-dark"
                        >
                          <i className="fa fa-angle-double-left "></i> Batches
                        </Link>
                      </h5>
                    </div>
                  </div>

                  {!llb ? (
                    <div className="row">
                      <div className="col-md-5 col-12 mb-4">
                        <Card className="cardim mb-2">
                          {curris && course && course.image ? (
                            <div className="custom-day-boxj">
                              <Scheduler
                                view="month"
                                editable={false}
                                deletable={false}
                                disabled={true}
                                events={curris.map((el) => ({
                                  event_id: el.curid,
                                  title: el.topic,
                                  start: new Date(
                                    convertToLocalTime(el.timestring)
                                  ),
                                  end: new Date(
                                    convertToLocalTime(el.hourbstring)
                                  ),

                                  color: ifex(el.hourbstring) ? "red" : "green",
                                }))}
                                sx={{
                                  ".rbc-day-bg": {
                                    height: "50px", // Set the height of the day boxes
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                }}
                                style={{
                                  // Custom styles for the weekdays
                                  ".rbc-day-bg": {
                                    backgroundColor: "#f0f0f0", // Light grey background for weekdays
                                  },
                                  ".rbc-header": {
                                    color: "#3f51b5", // Primary color for weekday names
                                    fontWeight: "bold",
                                    height: "500px",
                                  },
                                }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </Card>
                      </div>

                      <div className="col-md-7 col-12">
                        {curris && curris.length > 0 ? (
                          <div>
                            <h2
                              className="text-center rounded position-sticky top-0 bg-dark text-light py-2"
                              style={{ zIndex: 5 }}
                            >
                              Batch Curriculum{" "}
                              <p className="text-end d-inline">
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`why cant i delete curriculum topics here ? <br>answer : It will create bugs in the system , debugging , correspondence , topics is one of the crucial elements outlined in the system documentation that needs to be treated with utmost caution`}
                                >
                                  <Badge bg="warning" pill className="">
                                    <i className="fa fa-info "></i>
                                  </Badge>
                                </Ctt>
                              </p>
                            </h2>
                            {batch.progress > 0 ? (
                              <div className="col-md-6 col-lg-8 col-10 px-2 mx-auto mb-2">
                                <ProgressBar
                                  value={batch.progress}
                                ></ProgressBar>
                              </div>
                            ) : (
                              ""
                            )}
                            <ListGroup as="ol" numbered className="z-2">
                              {curris.map(
                                ({
                                  title,
                                  subtopic,
                                  createddate,
                                  createdby,
                                  lastedit,
                                  topic,
                                  generatedby,
                                  datecreated,
                                  timesedited,
                                  topid,
                                  time,
                                  curid,
                                  timecompleted,
                                  whocompleted,
                                  lasteditby,
                                  completed,
                                  timestring,
                                  hourbstring,
                                  datecompleted,

                                  sn,
                                  lastedittime,
                                }) => (
                                  <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between  align-items-center"
                                  >
                                    {" "}
                                    <i className="fa fa-list"></i>
                                    <div className="ms-2 me-auto">
                                      <h3 className="fw-bold">
                                        {topic}{" "}
                                        {ifex(hourbstring) ? (
                                          <small className="text-danger">
                                            (date passed)
                                          </small>
                                        ) : (
                                          ""
                                        )}
                                        {/* {completed ? (
                                          <div className="d-inline">
                                            <Ctt
                                              id="tooltip-cart"
                                              tooltip={`This topic was taught on ${datecompleted}`}
                                            >
                                              <i className=" fa text-success fa-check"></i>
                                            </Ctt>
                                          </div>
                                        ) : (
                                          <div className="d-inline">
                                            <Ctt
                                              id="tooltip-cart"
                                              tooltip={`This topic is yet to be taught`}
                                            >
                                              <i className=" fa text-danger fa-times"></i>
                                            </Ctt>
                                          </div>
                                        )} */}
                                      </h3>
                                      <Skeleton
                                        height=""
                                        className="mb-2 py-2 px-2"
                                      >
                                        {subtopic}{" "}
                                      </Skeleton>
                                    </div>
                                    <h4>
                                      {time} {fmt(new Date(timestring))}
                                    </h4>
                                    &nbsp;
                                    {user.host ? (
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`Curriculum Topic was automatically added by ${generatedby} during batch creation on ${
                                          datecreated
                                        } <br>Times edited :${timesedited}<br>Last edited by : ${lasteditby}<br>Time of last edit :${lastedittime} <br>last edit action : ${lastedit}`}
                                      >
                                        <Badge bg="danger" pill className="">
                                          <i className="fa fa-info"></i>
                                        </Badge>
                                      </Ctt>
                                    ) : (
                                      ""
                                    )}
                                    &nbsp;
                                    {ud ? (
                                      <Lding />
                                    ) : (
                                      <div>
                                        {user.cudaccess ? (
                                          <Ctt
                                            id="tooltip-cart"
                                            tooltip={`edit topic`}
                                            className=""
                                          >
                                            <Dropdown
                                              as={ButtonGroup}
                                              key={`DropdownButton`}
                                              id={`dropdown-button-drop-DropdownButton`}
                                              size="sm"
                                              variant="secondary"
                                              title="edit topic 'parameters'"
                                            >
                                              <Dropdown.Toggle
                                                variant="secondary"
                                                id="dropdown-basic"
                                              >
                                                <i className="fa fa-gear"></i>
                                              </Dropdown.Toggle>
                                              {!completed ? (
                                                <Dropdown.Menu>
                                                  <Dropdown.Item
                                                    eventKey="1"
                                                    onClick={(e) =>
                                                      ETopic(curid)
                                                    }
                                                  >
                                                    Edit topic {}
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    eventKey="2"
                                                    title="change class schedule"
                                                    onClick={(e) =>
                                                      Edate(curid)
                                                    }
                                                  >
                                                    Change schedule
                                                  </Dropdown.Item>
                                                  <Dropdown.Divider />
                                                  <Dropdown.Item eventKey="3">
                                                    {!completed ? (
                                                      ifex(hourbstring) ? (
                                                        <Ctt
                                                          id="tooltip-cart"
                                                          tooltip={`So this batch topic ought to have been taught and marked completed but for some reasons outside the system's logical jurisdiction (Human factor) , it has'nt been taught or marked by tutor , the only reason this option exists is in case admin organised a make up class , also students need to see this topic as completed when they visit their dashboard . this is vital ,this situation should be avoided by all means . This should ideally be checked by the tutor .`}
                                                        >
                                                          <p
                                                            className="text-warning"
                                                            onClick={() =>
                                                              Comp(curid)
                                                            }
                                                          >
                                                            Mark completed
                                                          </p>
                                                        </Ctt>
                                                      ) : (
                                                        <Ctt
                                                          id="tooltip-cart"
                                                          tooltip={`You can not mark completed on a topic for a class set to take place in future`}
                                                        >
                                                          <del className="text-danger">
                                                            Mark completed
                                                          </del>
                                                        </Ctt>
                                                      )
                                                    ) : (
                                                      <Ctt
                                                        id="tooltip-cart"
                                                        tooltip={`Completed on ${timecompleted} by ${whocompleted}`}
                                                      >
                                                        <p className="text-success">
                                                          {" "}
                                                          Completed{" "}
                                                          <i className="text-success fa fa-check"></i>
                                                        </p>
                                                      </Ctt>
                                                    )}
                                                  </Dropdown.Item>
                                                </Dropdown.Menu>
                                              ) : (
                                                ""
                                              )}
                                            </Dropdown>
                                          </Ctt>
                                        ) : (
                                          ""
                                        )}
                                        &nbsp;
                                      </div>
                                    )}
                                  </ListGroup.Item>
                                )
                              )}
                            </ListGroup>
                          </div>
                        ) : (
                          <div className="d-flex jbtw col-md-6 mx-auto">
                            <div className="w-100 jbtw">
                              {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                              <Talk
                                bg={true}
                                a={`Welcome ,This batch is not fully configured yet`}
                                b={`Pls add topic by clicking the add topic button`}
                                c={`curriculum will be displayed here after adding .`}
                                d={`curriculum are serially entered in the order of entry  !.`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <Lding />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Workspace</h5>} />
              </div>
            }
          >
            <div>
              <div class="container-xxl ">
                <div class="container position-relative">
                  {!llb ? (
                    <div className="row position-relative">
                      <div className=" col-12 position-relative">
                        <h2 className="text-center">
                          {batch.name} Workspace &nbsp; &nbsp; &nbsp;
                          <i
                            onClick={() => handleCopy(code)}
                            className="cpp fa fa-copy"
                          ></i>{" "}
                          &nbsp;
                          {share ? (
                            <Spinner animation="border" variant="danger" />
                          ) : (
                            <i onClick={Savewp} className="cpp fa fa-share"></i>
                          )}
                          {copied && (
                            <div className="text-center col-12">
                              <div
                                style={{
                                  marginLeft: "10px",
                                  color: "green",
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
                        </h2>

                        {curris && curris.length > 0 ? (
                          <div
                            style={{
                              backgroundColor: "#1e1e1e",
                              padding: "10px",
                            }}
                          >
                            {" "}
                            {/* VS Code-like background */}
                            <CodeMirror
                              value={code}
                              height="400px"
                              theme={dracula} // VS Code-like dark theme
                              // extensions={[javascript()]} // Enable JavaScript syntax highlighting
                              onChange={(value) => setCode(value)}
                              style={{
                                fontFamily:
                                  'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                                color: "blue",
                              }} // VS Code-like font
                            />
                          </div>
                        ) : (
                          <div className="d-flex jbtw col-md-6 mx-auto">
                            <div className="w-100 jbtw">
                              {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                              <Talk
                                bg={true}
                                a={`Welcome ,This batch is not fully configured yet`}
                                b={`Pls add topic by clicking the add topic button`}
                                c={`curriculum will be displayed here after adding .`}
                                d={`curriculum are serially entered in the order of entry  !.`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <Lding />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel
            header={
              <div className="cardd flex flex-wrap gap-1">
                <Chip label={<h5>Mail</h5>} />
              </div>
            }
          >
            <div>
              <div class="container-xxl ">
                <div class="container position-relative">
                  {!llb ? (
                    <div className="row position-relative">
                      <div className=" col-12 position-relative">
                        <h2 className="text-center">
                          Send Email to {batch.cname} {batch.name} students
                          &nbsp; &nbsp; &nbsp;
                          <i
                            onClick={() => handleCopy(text)}
                            className="cpp fa fa-copy"
                          ></i>{" "}
                          &nbsp;
                          <i onClick={Savewp} className="cpp fa fa-share"></i>
                          {copied && (
                            <div className="text-center col-12">
                              <div
                                style={{
                                  marginLeft: "10px",
                                  color: "green",
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
                        </h2>

                        {curris && curris.length > 0 ? (
                          <div
                            style={{
                              backgroundColor: "#1e1e1e",
                              padding: "10px",
                            }}
                          >
                            <div className="card">
                              <Editor
                                value={text}
                                onTextChange={(e) => setText(e.htmlValue)}
                                style={{ height: "320px" }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex jbtw col-md-6 mx-auto">
                            <div className="w-100 jbtw">
                              {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                              <Talk
                                bg={true}
                                a={`Welcome ,This batch is not fully configured yet`}
                                b={`Pls configure batch with respect to system documentation guideline`}
                                c={`this section simplifies sending emails to ${batch.name} students .`}
                                d={`Welcome once again !.`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mt-5">
                      <Lding />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Curri;
