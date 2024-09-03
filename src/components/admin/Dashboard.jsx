import { Link } from "react-router-dom";

import "../common/layout.css";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
// import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Scheduler } from "@aldabil/react-scheduler";
import Talk from "../common/Talk";
import { ProgressBar } from "primereact/progressbar";
import Dock from "./Dock"
import Prog from "./batch/Progress"


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
import { MeterGroup } from "primereact/metergroup";
import Ctt from "../common/Ctt";


const Db = ({ user, cont, setUser, sorry, error }) => {
  // const [contextMenu, setContextMenu] = useState({
  //   xPos: "0px",
  //   yPos: "0px",
  //   show: false,
  // });

  // const handleRightClick = (e) => {
  //   // alert(e.pageX);
  //   e.preventDefault();

  //   setContextMenu({
  //     xPos: `${e.pageX}px`,
  //     yPos: `${e.pageY}px`,
  //     show: true,
  //   });
  // };

  // const handleClick = () => {
  //   setContextMenu({
  //     ...contextMenu,
  //     show: false,
  //   });
  // };
  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  const values = [
    { label: "leads", color: "#35d399", value: data.lp, icon: "pi pi-user" },
    { label: "Students", color: "#45b49e", value: data.sp, icon: "pi pi-book" },
    {
      label: "Teachers",
      color: "#60a5fa",
      value: data.tp,
      icon: "pi pi-pencil",
    },
    { label: "Sales", color: "pink", value: data.ssp, icon: "pi pi-dollar" },
    { label: "Admins", color: "orange", value: data.aps, icon: "pi pi-shield" },
  ];
  const valuesb = [
    {
      label: `${data.mm} Male students`,
      color: "#ca0cd3",
      value: data.males,
      icon: "fa fa-male",
    },
    {
      label: `${data.ff} Female students`,
      color: "blue",
      value: data.females,
      icon: "fa fa-female",
    },
  ];
  const [courses, setCourses] = useState([]);
  const [atimes, setAtimes] = useState([]);
  const [curris, setCurris] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();
  const tuser = { ...user };

  let [nc, setNc] = useState(false);

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
              setData((prev) => ({ ...res.data.data, data: true }));
              setCurris((prev) => ([ ...res.data.curris ]));
              setAtimes((prev) => curris.map((el) =>  {
                return {
                  id: el.curid,
                  title: el.topic,
                  startTime: new Date("2024-08-01T12:00:00.000Z"),
                  endTime: new Date(el.timestring),
                };
              }));
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
  }, [courses, user, checkCalled]);
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
  function ifex(dateString) {
    // Convert the input date string to a Date object
    const inputDate = new Date(dateString);

    // Get the current date and time
    const currentDate = new Date();

    // Check if the input date is in the past
    return inputDate < currentDate;
  }

  return (
    <div>
      <Header
        cont={cont}
        setUser={setUser}
        user={user}
        openn={openn}
        db={true}
      />
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
                <div class="card  px-2 border border-danger w-100 corona-gradient-card ">
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
                        <h3 class="mb-1 mb-sm-0 text-light">{user.name}</h3>
                        <p class="mb-0 font-weight-normal d-none d-sm-block text-light">
                          Last seen : {user.lastseen}
                        </p>
                        {user.lastcron && user.lastcron.length > 4 ? (<div className="text-end d-flex justify-content-end">
                          <Ctt
                            id="tooltip-cart"
                            tooltip="This is a very important preventive maintanance feature .valid last cron job date should correspond with todays date (12am -1am)  "
                          >
                            <span style={{width:"fit-content"}} class="mb-0 font-weight-normal  d-none d-sm-block text-light">
                              Last cron job : {user.lastcron}
                            </span>
                          </Ctt>
                        </div>):""}
                      </div>
                      <div class="col-3  col-sm-2 col-xl-2 pl-0 text-center">
                        <span style={{cursor:"crosshair"}} class="btn btn-outline-light btn-rounded get-started-btn">
                          admin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="card py-2 flex justify-content-center">
                <MeterGroup values={values} />
                <MeterGroup values={valuesb} />
                {data.progress > 0 ? (
                  <Ctt
                    id="tooltip-cart"
                    tooltip="This is batch curriculum topics completion index "
                  >
                    <div>
                      <ProgressBar value={data.progress}></ProgressBar>
                    </div>
                  </Ctt>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* {data && data.all && data.all.length > 0 ? (
              <Dock all={data.all} />

            ):""} */}
            <div className="row">
              <div className=" col-md-6 col-12 mb-4">
                <Card className="cardim">
                  {curris && curris.length > 0 ? (
                    <div className=" custom-scheduler">
                      <Scheduler
                        style={{ backgroundColor: "#f0f0f0" }}
                        view="month"
                        editable={false}
                        deletable={false}
                        disabled={true}
                        events={curris.map((el) => ({
                          event_id: el.curid,
                          title: `${el.course} (${el.batchname})  ${el.topic}`,

                          start: new Date(convertToLocalTime(el.timestring)),
                          end: new Date(convertToLocalTimeb(el.timestring)),
                          color: ifex(el.hourbstring) ? "red" : "green",

                          bgColor: "red",
                          customInfo: el.topic,
                        }))}
                      />
                    </div>
                  ) : data ? (
                    <div>
                      <div className="col-md-12 col-11 mx-auto">
                        <div className="w-100 align-items-end">
                          {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                          <Talk
                            bg={true}
                            full={true}
                            a={`Hi , ${user.name} `}
                            b={`Welcome to CODARBRAIN`}
                            c={`I am Codarbot ,I will be your guide as you navigate through the system .`}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Card>
              </div>
              <div className="col-md-6 col-12 mb-5">
                {data && data.data ? (
                  <div>
                    {/* <p>{data.teachers.length}hg</p> */}
                    {data.teachers.length > 0 ? (
                      <div>
                        <div className="row mb-3">
                          <Prog dataa={data.teachers} />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div class="row">
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"success"} text="light" className="mb-2">
                          <Card.Header>New Leads (today)</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.dmyleads} </Card.Title>
                            {data.dmyleads > 0 ? (
                              <Card.Text>
                                {data.dmyleads} lead(s) showed interest today.
                              </Card.Text>
                            ) : (
                              <Card.Text>
                                No lead has shown interest today
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"danger"} text="light" className="mb-2">
                          <Card.Header>{month} lead(s ) </Card.Header>
                          <Card.Body>
                            <Card.Title> {data.mandyleads}</Card.Title>
                            {data.mandyleads > 0 ? (
                              <Card.Text>
                                {data.mandyleads} lead(s) have shown interest
                                this month .
                              </Card.Text>
                            ) : (
                              <Card.Text>
                                No lead has shown interest this month ,
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"primary"} text="light" className="mb-2">
                          <Card.Header>New students (today)</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.dmystudents} </Card.Title>
                            {data.dmystudents > 0 ? (
                              <Card.Text>
                                {data.dmystudents} students signed up today.
                              </Card.Text>
                            ) : (
                              <Card.Text>
                                No student has signed up today
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"info"} text="light" className="mb-2">
                          <Card.Header>New students ({month})</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.mandystudents} </Card.Title>
                            {data.mandystudents > 0 ? (
                              <Card.Text>
                                {data.dmystudents} students signed up in {month}
                                .
                              </Card.Text>
                            ) : (
                              <Card.Text>
                                No student has signed up this month
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"warning"} text="light" className="mb-2">
                          <Card.Header> All Students</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.students} </Card.Title>
                            {data.students > 0 ? (
                              <Card.Text>
                                {data.students} student(s) signed (all time) .
                              </Card.Text>
                            ) : (
                              <Card.Text>
                                No student has signed up (all time)
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"success"} text="light" className="mb-2">
                          <Card.Header> Courses</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.courses} </Card.Title>
                            <Card.Text>
                              <span className="col-12 w-100 text-center text-light">
                                {data.dcourses} deployed {data.ucourses}{" "}
                                undeployed
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 ">
                        <Card bg={"danger"} text="light" className="mb-2">
                          <Card.Header> Teachers</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.mentors} </Card.Title>
                            <Card.Text>
                              All registerd Mentors in codar institute
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                      <div class="col-xl-6  col-10 mx-auto py-1   col-sm-6 mb-5">
                        <Card bg={"primary"} text="light" className="mb-2">
                          <Card.Header> Sales</Card.Header>
                          <Card.Body>
                            <Card.Title> {data.sales} </Card.Title>
                            <Card.Text>
                              All Sales associates in codar institute
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="align-items-center">
                    <Lding />
                  </div>
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
