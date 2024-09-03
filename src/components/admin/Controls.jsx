import { Link } from "react-router-dom";

import "../common/layout.css";
import { Knob } from "primereact/knob";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState ,useRef} from "react";
// import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import Talk from "../common/Talk";
import { ProgressSpinner } from "primereact/progressspinner";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";

import { SelectButton } from "primereact/selectbutton";

// import "../all.css";
// import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
// import Spinner from "react-bootstrap/Spinner";
// import "semantic-ui-css/semantic.min.css";
import Na from "../common/Na";
import Lding from "../common/Lding";
import Button from "react-bootstrap/Button";
import { ScheduleMeeting } from "react-schedule-meeting";
import { ToggleButton } from "primereact/togglebutton";
import { Dialog } from "primereact/dialog";

import Ctt from "../common/Ctt";
import zIndex from "@mui/material/styles/zIndex";

const Db = ({ user, cont, setUser, sorry, error }) => {
  const [visible, setVisible] = useState();
  const [visibleb, setVisibleb] = useState();
  const [visiblec, setVisiblec] = useState();
  const [visibled, setVisibled] = useState();
  const [visibleg, setVisibleg] = useState();
  const [visibleh, setVisibleh] = useState();
  const [visiblei, setVisiblei] = useState();
  const [visiblej, setVisiblej] = useState();

  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  const [courses, setCourses] = useState([]);
  const [atimes, setAtimes] = useState([]);
  const [curris, setCurris] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  let [game, setGame] = useState(false);
  const navigate = useNavigate();
  const tuser = { ...user };

  let [nc, setNc] = useState(false);
  const [valueb, setValueb] = useState(0);
  const [valueg, setValueg] = useState(1);
  const [valuec, setValuec] = useState(0);
  const [valueh, setValueh] = useState(1);
  const [valuei, setValuei] = useState(1);
  const [valuej, setValuej] = useState(10000);
  const [ud, setUd] = useState(false);
  const [udg, setUdg] = useState(false);
  const [udb, setUdb] = useState(false);
  const [udc, setUdc] = useState(false);
  const [udd, setUdd] = useState(false);
  const [udh, setUdh] = useState(false);
  const [udi, setUdi] = useState(false);
  const [ude, setUde] = useState(false);
  const [udj, setUdj] = useState(false);
  const [datab, setDatab] = useState();

  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true);

        await axios
          .get(`${cont.api}admin/getdata/${user.userid}`, {
            headers: {
              userid: user.userid,
            },
          })
          .then((res) => {
            if (res.data.success) {
              setData((prev) => ({ ...res.data.data }));
           
              setDatab(res.data.datab)
              setCurris((prev) => [...res.data.curris]);
              setValuej(res.data.data.mininstallment);
              setAtimes((prev) =>
                curris.map((el) => {
                  return {
                    id: el.curid,
                    title: el.topic,
                    startTime: new Date("2024-08-01T12:00:00.000Z"),
                    endTime: new Date(el.timestring),
                  };
                })
              );
              setValueb(res.data.data.batchstud)
              // alert(res.data.data.defcoin);
              setValuec(res.data.data.defcoin)
             
              setValueg(res.data.data.weeks)
              setValuei(res.data.data.allowinstallments)
              // alert(res.data.data.tableitems)
              setValueh(res.data.data.tableitems)
              setUser(() => res.data.user);
            } else {
              navigate("/");
            }
            if (sorry) {
              Swal.fire({
                title: `Oops , not allowed !`,
                text: `Sorry you are not allowed to access this route`,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
            } else if (error) {
              Swal.fire({
                title: `Oops , That was an error!`,
                text: `The page you tried to access does not exist ! `,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
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
  }, [data,user,cont, curris, error, navigate, setUser, sorry, checkCalled]);
  const Focus = async (cid) => {
    const cos = courses.find((el) => el.cid === cid);
    if (cos.paid) {
      const course = courses.filter((el) => el.cid === cid);
      navigate("/watch", { state: course });
    } else if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      navigate("/curriculum", { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: "info",
        position: "top-end",

        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const [firstOpen, setFirstOpen] = useState(false);
  // alert(courses.length);

  const Buy = async (cid) => {
    let cos = courses.find((el) => el.cid === cid);
    if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      const coursees = courses.filter((el) => el.cid !== cid);
      cos.onit = true;
      coursees.push(cos);
      const sortedData = coursees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setCourses((prev) => [...sortedData]);

      const formDataToSend = new FormData();

      formDataToSend.append("cid", cos.cid);
      formDataToSend.append("userid", user.userid);
      formDataToSend.append("api", cont.api);
      formDataToSend.append("fe", cont.fe);

      try {
        await axios.post(`${cont.api}buy`, formDataToSend).then((res) => {
          if (res.data.success) {
            if (res.data.bought) {
              Swal.fire({
                title: `You already paid for this course`,
                text: ``,
                // icon: 'info',
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
              navigate("/user/" + user.userid);
            } else {
              setUrl(res.data.url);
              setCourse((prev) => ({ ...res.data.course }));
              window.location.href = res.data.url;
            }
          } else {
            const updatedData = sortedData.map((el) => ({
              ...el,
              onit: false,
            }));

            // Update the 'courses' state with the new array
            setCourses((prev) => [...updatedData]);
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }

      // navigate('/curriculum', { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: "info",
        position: "top-end",

        showConfirmButton: false,
        timer: 2500,
      });
    }
  };
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);

  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  console.log(getCurrentMonthYear());
  const month = getCurrentMonthYear();
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
  const [value, setValue] = useState(cont.idle);
  
  
  const toast = useRef(null);
  const updateTImeout = async (v) => {
    setValue(v);
    setUd(true);
    try {
      await axios
        .get(`${cont.api}admin/timeout/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData((prev) => ({ ...res.data.data, data: true }));

            setUser(() => res.data.user);
            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      setValue(cont.idle);
      
      toast.current.show({
        severity: "warn",
        summary: "Time-out update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUd(false);

  };
  const updatePages = async (v) => {
    setValueh(v);
    setUdh(true);
    try {
      await axios
        .get(`${cont.api}admin/table/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData((prev) => ({ ...res.data.data, data: true }));

            setUser(() => res.data.user);
          } else {
            navigate("/");
          }
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      // setValueh(cont.idle);

      toast.current.show({
        severity: "warn",
        summary: "page paginate update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdh(false);
  };
  const updateGracet = async (v) => {
    setValueg(v);
    setUdg(true);
    try {
      await axios
        .get(`${cont.api}admin/grace/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData((prev) => ({ ...res.data.data, data: true }));

            setUser(() => res.data.user);
            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
 
      
      toast.current.show({
        severity: "warn",
        summary: "Grace period update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdg(false);

  };
  const toggcc = async () => {
   
    setUdd(true);
    try {
      await axios
        .get(`${cont.api}admin/allowcc`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setDatab((res.data.data));
            setUser(() => res.data.user);
            

            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
   
      
      toast.current.show({
        severity: "warn",
        summary: "update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdd(false);

  };
  const allowi = async () => {
   
    setUdi(true);
    try {
      await axios
        .get(`${cont.api}admin/allowi`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setDatab((res.data.data));
            // alert(JSON.stringify(res.data.data));
            
            setUser(() => res.data.user);
            
            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
   
      
      toast.current.show({
        severity: "warn",
        summary: "update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdi(false);

  };
  const Install = async (v) => {
   
    setValuej(v);
    setUdj(true);
    try {
      await axios
        .get(`${cont.api}admin/install/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setDatab((res.data.data));
            setValuej((res.data.data.mininstallment));
            setUser(() => res.data.user);


            
          } else {
            setValuej(data.mininstallment);
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      setValuej(data.mininstallment);

   
      
      toast.current.show({
        severity: "warn",
        summary: "update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdj(false);

  };
  const updateCoin = async (v) => {
    setValuec(v);
    setUdc(true);
    try {
      await axios
        .get(`${cont.api}admin/defcoin/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData((prev) => ({ ...res.data.data, data: true }));

            setUser(() => res.data.user);
            setValuec(res.data.data.defcoin);
            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      setValuec(data.defcoin);
      
      toast.current.show({
        severity: "warn",
        summary: "Default codar coin update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdc(false);

  };
  const updateBatches = async (v) => {
    setValueb(v);
    setUdb(true);
    try {
      await axios
        .get(`${cont.api}admin/batchstud/${v}`, {
          headers: {
            userid: user.userid,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setData((prev) => ({ ...res.data.data, data: true }));

            setUser(() => res.data.user);
            setValueb(res.data.data.batchstud);
            
          } else {
            navigate("/");
          }
          
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      setValueb(cont.idle);
      
      toast.current.show({
        severity: "warn",
        summary: "Time-out update failed",
        detail: "check your connection or restart the system",
      });
    }
    setUdb(false);

  };

  return (
    <div>
      {/* <div className="col-8 mt-5" style={{ zIndex: 23 }}> */}
      <Toast color="red" ref={toast} position="top-right"></Toast>
      {/* </div> */}
      <Header cont={cont} setUser={setUser} user={user} openn={openn} />
      <div class="px-1 row bg-transparent">
        <div
          className="py-1 rounded col-12 col-md-12 col-lg-3 mb-1 bgtran"
          style={{ height: "fit-content" }}
        >
          <Card>
            <div className="d-none d-md-block">
              <Card.Img
                className="px-2 "
                variant="top"
                src={user.image ? user.image : `${cont.api}admins/noimage.png`}
              />
            </div>
            <Card.Body className="bg-tran">
              <Card.Title className=" text-center text-success">
                <h3 className="ceo">C.E.O's message</h3>
              </Card.Title>
              <Card.Text>
                <h3 className="motivate fw-6">{user.motivate}</h3>

                <h6 className="text-end text-danger  mt-3">
                  {" "}
                  {/* <img className="cim " src="/images/codar.png" alt="" /> */}
                  <span className="d-inline text-dark">codar</span> institute
                  ceo
                </h6>
              </Card.Text>

              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>

        <div class="col-12  col-md-12 col-lg-9 fixkx position-sticky">
          <div class="content-wrapper px-md-3">
            <div class="row">
              <div class="col-12  grid-margin stretch-card ">
                <div class="card  px-2 border border-danger w-100 bg-dark corona-gradient-cardb ">
                  <div class="card-body py-2 px-0 px-sm-3">
                    <div class="row align-items-center">
                      <div class="col-4 col-sm-3 col-xl-2">
                        <img
                          src="/images/codar.png"
                          class="gradient-corona-img img-fluid"
                          alt=""
                        />
                      </div>
                      <div class="col-5 col-sm-7 col-xl-8 p-0">
                        <h3 class="mb-1 mb-sm-0 text-light">
                          Codar Brain Control Room
                        </h3>
                      </div>
                      <div class="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                        <span class="btn btn-outline-light btn-rounded get-started-btn">
                          system controls
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-5">
                {data ? (
                  <div>
                    <div class="row text-center">
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            System Idle time in mins
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={value}
                                color="red"
                                step={5}
                                min={5}
                                valueColor="red"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                // valueTemplate={"{value} mins"}
                                onChange={(e) => updateTImeout(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {ud ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisible(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="Why idle time ?"
                                visible={visible}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visible) return;
                                  setVisible(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  By default every user on this system is
                                  allowed a minimum of 5 mins idle time out, for
                                  some reasons ,this feature is an added
                                  redundant feature to regulate system time out
                                  , this is an important security feature in
                                  codarbrain .
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            Max students in a batch
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={valueb}
                                color="red"
                                step={5}
                                min={5}
                                max={50}
                                valueColor="green"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                // valueTemplate={"{value} stdts"}
                                onChange={(e) => updateBatches(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {udb ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisibleb(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="Maximum students allowed in a batch !"
                                visible={visibleb}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visibleb) return;
                                  setVisibleb(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  there are two modes student accounts are
                                  created, To increase academic efficiency and
                                  effectiveness , it is neccessary to benchmark
                                  (numerical threshold) the number of students
                                  in a batch , this feature is a redundant
                                  feature.
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            Codar coins
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={valuec}
                                color="red"
                                step={1000}
                                min={0}
                                max={10000}
                                valueColor="green"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                // valueTemplate={"{value} coins"}
                                onChange={(e) => updateCoin(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {udc ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisiblec(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="Default student codar coin!"
                                visible={visiblec}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visiblec) return;
                                  setVisiblec(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  This is the amount of codar coins a student
                                  automatically gets on sign up .
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header>Codar Coins </Card.Header>
                          <Card.Body>
                            {/* <Card.Title>
                              {" "}
                              {data.ifgames ? "On" : "Off"}
                            </Card.Title> */}
                            {data ? (
                              <div className="card flex justify-content-center">
                                <i
                                  onIcon="pi pi-check"
                                  offIcon="pi pi-times"
                                  className={`${user.allowcc ? `fa-toggle-on` : `fa-toggle-off`} fa-4x fa cpp bg-light border-primary border`}
                                  onClick={toggcc}
                                  color="red"
                                ></i>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* <h2>{datab.allowcc ? "yes":"no"} jh</h2> */}

                            <br />
                            <div
                              style={{ height: "30px", position: "relative" }}
                            >
                              {udd ? (
                                <div
                                  className="text-center align-items-center "
                                  style={{
                                    height: "30px",
                                    position: "relative ",
                                  }}
                                >
                                  <ProgressSpinner
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      position: "absolute",
                                    }}
                                    strokeWidth="8"
                                    fill="transparent"
                                    animationDuration=".5s"
                                  />
                                </div>
                              ) : (
                                <i
                                  label="Show"
                                  icon="pi pi-external-link"
                                  onClick={() => setVisibled(true)}
                                  value="show"
                                  className="cpp fa-2x fa fa-info text-warning"
                                ></i>
                              )}
                            </div>
                            <Dialog
                              header="Switch Codar coin off!"
                              visible={visibled}
                              className="col-md-6 col-10"
                              onHide={() => {
                                if (!visibled) return;
                                setVisibled(false);
                              }}
                              closeIcon={<i className="pi pi-times"></i>}
                            >
                              <h2>
                                Codar coin is an interactive game for registered
                                codar students and staff .
                              </h2>
                              <h3>
                                Students/staff can earn/share coins while
                                playing this game .
                              </h3>
                              <p className="m-0 ">
                                toggle switch to switch Codar coin on/off.
                              </p>
                            </Dialog>
                          </Card.Body>
                        </Card>
                      </div>

                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            Grace period in weeks
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={valueg}
                                color="red"
                                step={1}
                                min={1}
                                max={5}
                                valueColor="red"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                valueTemplate={"{value} wk(s)"}
                                onChange={(e) => updateGracet(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {udg ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisibleg(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="What is Grace period?"
                                visible={visibleg}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visibleg) return;
                                  setVisibleg(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  When a student signs up or makes a payment
                                  less than the course fee , he/she gets a grace
                                  period specified in weeks , toggle this to set
                                  grace period in weeks , new effect will be
                                  made on future payments .
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            Paginated rows
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={valueh}
                                color="yellow"
                                step={10}
                                min={10}
                                max={100}
                                valueColor="blue"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                valueTemplate={"{value} rws"}
                                onChange={(e) => updatePages(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {udh ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisibleh(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="Table rows per page"
                                visible={visibleh}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visibleh) return;
                                  setVisibleh(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  When paginating tables , i.e
                                  students/transactions/leads , this represents
                                  number of rows to display in a table per page
                                  .
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="slide-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header className="text-center">
                            Min payment {user.dmininstallment}
                          </Card.Header>
                          <Card.Body className="text-center">
                            <div>
                              <Knob
                                value={valuej}
                                color="yellow"
                                step={10000}
                                min={10000}
                                max={100000}
                                valueColor="green"
                                textColor="white"
                                size={100}
                                // rangeColor="red"
                                // valueTemplate={user.dmininstallment}
                                // valueTemplate={"{value} rws"}
                                onChange={(e) => Install(e.value)}
                              />
                              <div
                                style={{ height: "25px", position: "relative" }}
                              >
                                {udj ? (
                                  <div
                                    className="jcent align-items-center "
                                    style={{
                                      height: "25px",
                                      position: "relative ",
                                    }}
                                  >
                                    <ProgressSpinner
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        position: "absolute",
                                      }}
                                      strokeWidth="8"
                                      fill="transparent"
                                      animationDuration=".5s"
                                    />
                                  </div>
                                ) : (
                                  <i
                                    label="Show"
                                    icon="pi pi-external-link"
                                    onClick={() => setVisiblej(true)}
                                    value="show"
                                    className="cpp fa-2x fa fa-info text-warning"
                                  ></i>
                                )}
                              </div>
                              <Dialog
                                header="Set minimum amount for split payments"
                                visible={visiblej}
                                className="col-md-6 col-10"
                                onHide={() => {
                                  if (!visiblej) return;
                                  setVisiblej(false);
                                }}
                                closeIcon={<i className="pi pi-times"></i>}
                              >
                                <p className="m-0 ">
                                  Set minimum amount for payments by installment
                                  .
                                </p>
                              </Dialog>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div
                        data-aos="fade-up"
                        class="col-xl-3  col-10 mx-auto py-1   col-sm-6 "
                      >
                        <Card bg={"dark"} text="light" className="mb-2">
                          <Card.Header>Allow installments </Card.Header>
                          <Card.Body>
                            {/* <Card.Title>
                              {" "}
                              {data.ifgames ? "On" : "Off"}
                            </Card.Title> */}
                            {data ? (
                              <div className="card flex justify-content-center">
                                <i
                                  onIcon="pi pi-check"
                                  offIcon="pi pi-times"
                                  className={`${datab.allowinstallments ? `fa-toggle-on` : `fa-toggle-off`} fa-4x fa cpp bg-light border-primary border`}
                                  onClick={allowi}
                                  color="red"
                                ></i>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* <h2>{datab.allowcc ? "yes":"no"} jh</h2> */}

                            <br />
                            <div
                              style={{ height: "30px", position: "relative" }}
                            >
                              {udi ? (
                                <div
                                  className="text-center align-items-center "
                                  style={{
                                    height: "30px",
                                    position: "relative ",
                                  }}
                                >
                                  <ProgressSpinner
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      position: "absolute",
                                    }}
                                    strokeWidth="8"
                                    fill="transparent"
                                    animationDuration=".5s"
                                  />
                                </div>
                              ) : (
                                <i
                                  label="Show"
                                  icon="pi pi-external-link"
                                  onClick={() => setVisiblei(true)}
                                  value="show"
                                  className="cpp fa-2x fa fa-info text-warning"
                                ></i>
                              )}
                            </div>
                            <Dialog
                              header="Should payments by installments be allowed ?"
                              visible={visiblei}
                              className="col-md-6 col-10"
                              onHide={() => {
                                if (!visiblei) return;
                                setVisiblei(false);
                              }}
                              closeIcon={<i className="pi pi-times"></i>}
                            >
                              <h2>
                                Toggle to allow or disallow payment by
                                installments.
                              </h2>
                            </Dialog>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Lding />
                )}
              </div>
            </div>
          </div>

          <footer class="footer  z-3 bg-dark px-3 text-light">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-light d-block text-center text-sm-left d-sm-inline-block">
                Copyright © codarhq.com {new Date().getFullYear()}
              </span>
              <span class="float-none text-light float-sm-right d-block mt-1 mt-sm-0 text-center">
                innovation never ends
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Db;
