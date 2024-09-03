import { Link } from "react-router-dom";

import "../common/layout.css";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";

import ContextMenu from "../common/Contextm.jsx";

import "../all.css";
// import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
// import "semantic-ui-css/semantic.min.css";
import Na from "../common/Na";
import Lding from "../common/Lding";
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

  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();
  const tuser = { ...user };

  let [nc, setNc] = useState(false);

  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true);

        await axios
          .get(`${cont.api}admin/getdata/${user.userid}`)
          .then((res) => {
            if (res.data.success) {
              setData((prev) => ({...res.data.data,data:true}));
              setUser(()=>res.data.user)

              
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

  return (
    <div>
      <Header
        cont={cont}
        setUser={setUser}
        user={user}
        ifuser={user ? true : false}
        courses={courses}
        openn={openn}
        db={true}
      />
      <div class="px-1 row bg-transparent">
        <div className="py-1 rounded col-12 col-md-12 col-lg-3 mb-5 bgtran" style={{height:"fit-content"}}>
          <Card>
            <Card.Img
              className="px-2"
              variant="top"
              src={user.image ? user.image : `${cont.api}admins/noimage.png`}
            />
            <Card.Body className="bg-tran">
              <Card.Title className="text-center text-success">
                <h3 className="ceo">C.E.O's message</h3>
              </Card.Title>
              <Card.Text>
                <h3 className="motivate fw-6">{user.motivate}</h3>

                <h6 className="text-end text-danger mt-3">
                  {" "}
                  <img className="cim" src="/images/codar.png" alt="" />
                  <span className="d-inline text-dark">codar</span> institute
                  ceo
                </h6>
              </Card.Text>

              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </div>

        <div class="col-12  col-md-12 col-lg-9 fixx">
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
                      </div>
                      <div class="col-3 col-sm-2 col-xl-2 pl-0 text-center">
                        <span class="btn btn-outline-light btn-rounded get-started-btn">
                          admin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data && data.data ? (
              <div>
                <div class="row">
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-primary">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h5 class="mb-4">{data.dmystudents}</h5>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">
                            New Students (today)
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-danger">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.mandystudents}</h1>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">
                            {" "}
                            {month} New students{" "}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-warning">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.preexpiredstudents}</h1>
                            </div>
                          </div>
                          <h4 class="text-light font-weight-normal">
                            Pre-expired Students{" "}
                          </h4>
                          <Ctt
                            id="tooltip-cart"
                            tooltip={`This are students with already expired batches (batches that have exceeded their respective course duration )`}
                          >
                            <i className="fa fa-info text-light text-end"></i>
                          </Ctt>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-success">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.expiredstudents}</h1>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">
                            Expired students
                          </h4>
                          <Ctt
                            className="mt-4"
                            id="tooltip-cart"
                            tooltip={`This are students with already expired batches plus one month additional grace .this is the final stage of expirationn and students at this point can no longer access course materials online (via their student accounts)`}
                          >
                            <i className="fa fa-info text-light text-end"></i>
                          </Ctt>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-warning">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.students}</h1>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">
                            All Students
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4 col-9 mx-auto col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-success">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.courses}</h1>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">Courses</h4>
                          <span className="col-12 w-100 text-center text-light">{data.dcourses} deployed {data.ucourses} undeployed</span>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-primary">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.mentors}</h1>
                            </div>
                          </div>
                          <h4 class="text-light font-weight-normal">
                            Teachers
                          </h4>
                          <Ctt
                            id="tooltip-cart"
                            tooltip={`All registered teaching staffs in codar institute`}
                          >
                            <i className="fa fa-info text-light text-end"></i>
                          </Ctt>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3  col-10 mx-auto py-4  col-sm-6 grid-margin minh stretch-card">
                    <div class="card text-light bg-danger">
                      <div class="card-body">
                        <div class="row">
                          <div class="col-12 mb-3">
                            <div class="d-flex align-items-center align-self-start">
                              <h1 class="mb-4">{data.sales}</h1>
                            </div>
                          </div>

                          <h4 class="text-light font-weight-normal">Sales</h4>
                          <Ctt
                            className="mt-4"
                            id="tooltip-cart"
                            tooltip={`All sales associates`}
                          >
                            <i className="fa fa-info text-light text-end"></i>
                          </Ctt>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Lding />
            )}
            {/* <div class="row">
            <div class="col-md-4 grid-margin minh stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Transaction History</h4>
                  <canvas
                    id="transaction-history"
                    class="transaction-chart"
                  ></canvas>
                  <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div class="text-md-center text-xl-left">
                      <h6 class="mb-1">Transfer to Paypal</h6>
                      <p class="text-light mb-0">07 Jan 2019, 09:12AM</p>
                    </div>
                    <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 class="font-weight-bold mb-0">$236</h6>
                    </div>
                  </div>
                  <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                    <div class="text-md-center text-xl-left">
                      <h6 class="mb-1">Tranfer to Stripe</h6>
                      <p class="text-light mb-0">07 Jan 2019, 09:12AM</p>
                    </div>
                    <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 class="font-weight-bold mb-0">$593</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 grid-margin minh stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h4 class="card-title mb-1">Open Projects</h4>
                    <p class="text-light mb-1">Your data status</p>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="preview-list">
                        <div class="preview-item border-bottom">
                          <div class="preview-thumbnail">
                            <div class="preview-icon bg-primary">
                              <i class="mdi mdi-file-document"></i>
                            </div>
                          </div>
                          <div class="preview-item-content d-sm-flex flex-grow">
                            <div class="flex-grow">
                              <h6 class="preview-subject">
                                Admin dashboard design
                              </h6>
                              <p class="text-light mb-0">
                                Broadcast web app mockup
                              </p>
                            </div>
                            <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p class="text-light">15 minutes ago</p>
                              <p class="text-light mb-0">30 tasks, 5 issues </p>
                            </div>
                          </div>
                        </div>
                        <div class="preview-item border-bottom">
                          <div class="preview-thumbnail">
                            <div class="preview-icon bg-success">
                              <i class="mdi mdi-cloud-download"></i>
                            </div>
                          </div>
                          <div class="preview-item-content d-sm-flex flex-grow">
                            <div class="flex-grow">
                              <h6 class="preview-subject">
                                Wordpress Development
                              </h6>
                              <p class="text-light mb-0">Upload new design</p>
                            </div>
                            <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p class="text-light">1 hour ago</p>
                              <p class="text-muted mb-0">23 tasks, 5 issues </p>
                            </div>
                          </div>
                        </div>
                        <div class="preview-item border-bottom">
                          <div class="preview-thumbnail">
                            <div class="preview-icon bg-info">
                              <i class="mdi mdi-clock"></i>
                            </div>
                          </div>
                          <div class="preview-item-content d-sm-flex flex-grow">
                            <div class="flex-grow">
                              <h6 class="preview-subject">Project meeting</h6>
                              <p class="text-muted mb-0">
                                New project discussion
                              </p>
                            </div>
                            <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p class="text-muted">35 minutes ago</p>
                              <p class="text-muted mb-0">15 tasks, 2 issues</p>
                            </div>
                          </div>
                        </div>
                        <div class="preview-item border-bottom">
                          <div class="preview-thumbnail">
                            <div class="preview-icon bg-danger">
                              <i class="mdi mdi-email-open"></i>
                            </div>
                          </div>
                          <div class="preview-item-content d-sm-flex flex-grow">
                            <div class="flex-grow">
                              <h6 class="preview-subject">Broadcast Mail</h6>
                              <p class="text-muted mb-0">
                                Sent release details to team
                              </p>
                            </div>
                            <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p class="text-muted">55 minutes ago</p>
                              <p class="text-muted mb-0">35 tasks, 7 issues </p>
                            </div>
                          </div>
                        </div>
                        <div class="preview-item">
                          <div class="preview-thumbnail">
                            <div class="preview-icon bg-warning">
                              <i class="mdi mdi-chart-pie"></i>
                            </div>
                          </div>
                          <div class="preview-item-content d-sm-flex flex-grow">
                            <div class="flex-grow">
                              <h6 class="preview-subject">UI Design</h6>
                              <p class="text-muted mb-0">
                                New application planning
                              </p>
                            </div>
                            <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p class="text-muted">50 minutes ago</p>
                              <p class="text-muted mb-0">27 tasks, 4 issues </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
            {/* <div class="row">
            <div class="col-sm-4 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h5>Revenue</h5>
                  <div class="row">
                    <div class="col-8 col-sm-12 col-xl-8 my-auto">
                      <div class="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 class="mb-0">$32123</h2>
                        <p class="text-success ml-2 mb-0 font-weight-medium">
                          +3.5%
                        </p>
                      </div>
                      <h6 class="text-muted font-weight-normal">
                        11.38% Since last month
                      </h6>
                    </div>
                    <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h5>Sales</h5>
                  <div class="row">
                    <div class="col-8 col-sm-12 col-xl-8 my-auto">
                      <div class="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 class="mb-0">$45850</h2>
                        <p class="text-success ml-2 mb-0 font-weight-medium">
                          +8.3%
                        </p>
                      </div>
                      <h6 class="text-muted font-weight-normal">
                        {" "}
                        9.61% Since last month
                      </h6>
                    </div>
                    <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-4 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h5>Purchase</h5>
                  <div class="row">
                    <div class="col-8 col-sm-12 col-xl-8 my-auto">
                      <div class="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 class="mb-0">$2039</h2>
                        <p class="text-danger ml-2 mb-0 font-weight-medium">
                          -2.1%{" "}
                        </p>
                      </div>
                      <h6 class="text-muted font-weight-normal">
                        2.27% Since last month
                      </h6>
                    </div>
                    <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-12 grid-margin">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Order Status</h4>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </th>
                          <th> Client Name </th>
                          <th> Order No </th>
                          <th> Product Cost </th>
                          <th> Project </th>
                          <th> Payment Mode </th>
                          <th> Start Date </th>
                          <th> Payment Status </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              src="assets/images/faces/face1.jpg"
                              alt="imagje"
                            />
                            <span class="pl-2">Henry Klein</span>
                          </td>
                          <td> 02312 </td>
                          <td> $14,500 </td>
                          <td> Dashboard </td>
                          <td> Credit card </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div class="badge badge-outline-success">
                              Approved
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              src="assets/images/faces/face2.jpg"
                              alt="imagje"
                            />
                            <span class="pl-2">Estella Bryan</span>
                          </td>
                          <td> 02312 </td>
                          <td> $14,500 </td>
                          <td> Website </td>
                          <td> Cash on delivered </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div class="badge badge-outline-warning">
                              Pending
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              src="assets/images/faces/face5.jpg"
                              alt="imagje"
                            />
                            <span class="pl-2">Lucy Abbott</span>
                          </td>
                          <td> 02312 </td>
                          <td> $14,500 </td>
                          <td> App design </td>
                          <td> Credit card </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div class="badge badge-outline-danger">
                              Rejected
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              src="assets/images/faces/face3.jpg"
                              alt="imagje"
                            />
                            <span class="pl-2">Peter Gill</span>
                          </td>
                          <td> 02312 </td>
                          <td> $14,500 </td>
                          <td> Development </td>
                          <td> Online Payment </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div class="badge badge-outline-success">
                              Approved
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check form-check-muted m-0">
                              <label class="form-check-label">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                />
                              </label>
                            </div>
                          </td>
                          <td>
                            <img
                              src="assets/images/faces/face4.jpg"
                              alt="imagje"
                            />
                            <span class="pl-2">Sallie Reyes</span>
                          </td>
                          <td> 02312 </td>
                          <td> $14,500 </td>
                          <td> Website </td>
                          <td> Credit card </td>
                          <td> 04 Dec 2019 </td>
                          <td>
                            <div class="badge badge-outline-success">
                              Approved
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-xl-4 grid-margin minh stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-row justify-content-between">
                    <h4 class="card-title">Messages</h4>
                    <p class="text-muted mb-1 small">View all</p>
                  </div>
                  <div class="preview-list">
                    <div class="preview-item border-bottom">
                      <div class="preview-thumbnail">
                        <img
                          src="assets/images/faces/face6.jpg"
                          alt="imagje"
                          class="rounded-circle"
                        />
                      </div>
                      <div class="preview-item-content d-flex flex-grow">
                        <div class="flex-grow">
                          <div class="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 class="preview-subject">Leonard</h6>
                            <p class="text-muted text-small">5 minutes ago</p>
                          </div>
                          <p class="text-muted">
                            Well, it seems to be working now.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="preview-item border-bottom">
                      <div class="preview-thumbnail">
                        <img
                          src="assets/images/faces/face8.jpg"
                          alt="imagje"
                          class="rounded-circle"
                        />
                      </div>
                      <div class="preview-item-content d-flex flex-grow">
                        <div class="flex-grow">
                          <div class="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 class="preview-subject">Luella Mills</h6>
                            <p class="text-muted text-small">10 Minutes Ago</p>
                          </div>
                          <p class="text-muted">
                            Well, it seems to be working now.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="preview-item border-bottom">
                      <div class="preview-thumbnail">
                        <img
                          src="assets/images/faces/face9.jpg"
                          alt="imagje"
                          class="rounded-circle"
                        />
                      </div>
                      <div class="preview-item-content d-flex flex-grow">
                        <div class="flex-grow">
                          <div class="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 class="preview-subject">Ethel Kelly</h6>
                            <p class="text-muted text-small">2 Hours Ago</p>
                          </div>
                          <p class="text-muted">Please review the tickets</p>
                        </div>
                      </div>
                    </div>
                    <div class="preview-item border-bottom">
                      <div class="preview-thumbnail">
                        <img
                          src="assets/images/faces/face11.jpg"
                          alt="imagje"
                          class="rounded-circle"
                        />
                      </div>
                      <div class="preview-item-content d-flex flex-grow">
                        <div class="flex-grow">
                          <div class="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 class="preview-subject">Herman May</h6>
                            <p class="text-muted text-small">4 Hours Ago</p>
                          </div>
                          <p class="text-muted">
                            Thanks a lot. It was easy to fix it .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4 grid-margin minh stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Portfolio Slide</h4>
                  <div
                    class="owl-carousel owl-theme full-width owl-carousel-dash portfolio-carousel"
                    id="owl-carousel-basic"
                  >
                    <div class="item">
                      <img src="assets/images/dashboard/Rectangle.jpg" alt="" />
                    </div>
                    <div class="item">
                      <img src="assets/images/dashboard/Img_5.jpg" alt="" />
                    </div>
                    <div class="item">
                      <img src="assets/images/dashboard/img_6.jpg" alt="" />
                    </div>
                  </div>
                  <div class="d-flex py-4">
                    <div class="preview-list w-100">
                      <div class="preview-item p-0">
                        <div class="preview-thumbnail">
                          <img
                            src="assets/images/faces/face12.jpg"
                            class="rounded-circle"
                            alt=""
                          />
                        </div>
                        <div class="preview-item-content d-flex flex-grow">
                          <div class="flex-grow">
                            <div class="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 class="preview-subject">CeeCee Bass</h6>
                              <p class="text-muted text-small">4 Hours Ago</p>
                            </div>
                            <p class="text-muted">
                              Well, it seems to be working now.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="text-muted">Well, it seems to be working now. </p>
                  <div class="progress progress-md portfolio-progress">
                    <div
                      class="progress-bar bg-success w-50"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 col-xl-4 grid-margin minh stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">To do list</h4>
                  <div class="add-items d-flex">
                    <input
                      type="text"
                      class="form-control todo-list-input"
                      placeholder="enter task.."
                    />
                    <button class="add btn btn-primary todo-list-add-btn">
                      Add
                    </button>
                  </div>
                  <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                      <li>
                        <div class="form-check form-check-primary">
                          <label class="form-check-label">
                            <input class="checkbox" type="checkbox" /> Create
                            invoice{" "}
                          </label>
                        </div>
                        <i class="remove mdi mdi-close-box"></i>
                      </li>
                      <li>
                        <div class="form-check form-check-primary">
                          <label class="form-check-label">
                            <input class="checkbox" type="checkbox" /> Meeting
                            with Alita{" "}
                          </label>
                        </div>
                        <i class="remove mdi mdi-close-box"></i>
                      </li>
                      <li class="completed">
                        <div class="form-check form-check-primary">
                          <label class="form-check-label">
                            <input class="checkbox" type="checkbox" checked />{" "}
                            Prepare for presentation{" "}
                          </label>
                        </div>
                        <i class="remove mdi mdi-close-box"></i>
                      </li>
                      <li>
                        <div class="form-check form-check-primary">
                          <label class="form-check-label">
                            <input class="checkbox" type="checkbox" /> Plan
                            weekend outing{" "}
                          </label>
                        </div>
                        <i class="remove mdi mdi-close-box"></i>
                      </li>
                      <li>
                        <div class="form-check form-check-primary">
                          <label class="form-check-label">
                            <input class="checkbox" type="checkbox" /> Pick up
                            kids from school{" "}
                          </label>
                        </div>
                        <i class="remove mdi mdi-close-box"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Visitors by Countries</h4>
                  <div class="row">
                    <div class="col-md-5">
                      <div class="table-responsive">
                        <table class="table">
                          <tbody>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-us"></i>
                              </td>
                              <td>USA</td>
                              <td class="text-right"> 1500 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                56.35%{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-de"></i>
                              </td>
                              <td>Germany</td>
                              <td class="text-right"> 800 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                33.25%{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-au"></i>
                              </td>
                              <td>Australia</td>
                              <td class="text-right"> 760 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                15.45%{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-gb"></i>
                              </td>
                              <td>United Kingdom</td>
                              <td class="text-right"> 450 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                25.00%{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-ro"></i>
                              </td>
                              <td>Romania</td>
                              <td class="text-right"> 620 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                10.25%{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <i class="flag-icon flag-icon-br"></i>
                              </td>
                              <td>Brasil</td>
                              <td class="text-right"> 230 </td>
                              <td class="text-right font-weight-medium">
                                {" "}
                                75.00%{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col-md-7">
                      <div id="audience-map" class="vector-map"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>

          <footer class="footer z-3 bg-dark px-3 text-light">
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
