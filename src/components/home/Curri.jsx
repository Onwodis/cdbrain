import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "../admin/Header";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Caro";
import Footer from "./Footer";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "./Login";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
// import axiosi from './axiosinstance';
import "../all.css";
// import "animate.css/animate.min.css";

import _ from "lodash";
import Button from "@mui/material/Button";
import { Button as Buttonb } from "react-bootstrap";
import Swal from "sweetalert2";
// import {
//   TableRow,
//   TableHeaderCell,
//   TableHeader,
//   TableCell,
//   TableBody,
//   Table,
// } from "semantic-ui-react";
import Card from "react-bootstrap/Card";
import { Embed } from "semantic-ui-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Ctt from "../common/Ctt";
import VimeoEmbed from "../common/Vm";

import {
  ListHeader,
  ListDescription,
  ListContent,
  ListIcon,
} from "semantic-ui-react";
const Curri = ({ cont, user, setUser, allow }) => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSliderChange = (event) => {
    videoRef.current.currentTime = event.target.value;
  };
  const location = useLocation();
  const { state } = location;

  const ccourse = state && state[0];
  // const ccourse = state && state[0];
  const [course, setCourse] = useState(ccourse ? ccourse : null);

  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);

  const [formData, setFormData] = useState({
    desc: "",
    name: "",

    // Add more fields as needed
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState();
  const [topics, setTopics] = useState();
  let [checkCalled, setCheck] = useState(false);
  let [vid, setVid] = useState(false);

  const [image, setImage] = useState("");
  const [qq, setQq] = useState(false);
  const [title, setTittle] = useState("");
  const [view, setView] = useState("");
  const [tdesc, setTdesc] = useState("");
  const [vlink, setVlink] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [serial, setSerial] = useState();
  const [price, setPrice] = useState(0);
  //   alert(process.env.clname);
  // Initialize Cloudinary instance

  function exampleReducer(state, action) {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }

        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      default:
        throw new Error();
    }
  }
  const [statee, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: courses,
    direction: null,
  });

  useEffect(() => {
    if (!state) {
      navigate("/sorry");
    } else {
      const wu = `${cont.api}gettopics/${course.cid}`;
      const nu = `${cont.api}gettopics/${course.cid}`;
      const Check = async () => {
        try {
          await axios.get(`${user ? `${wu}` : `${nu}`}`).then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.course) {
                //   alert(res.data.data.latestloginplayertime);
                setCourse((prev) => ({ ...prev, ...res.data.course }));
                const cut = res.data.topics;

                setTopics(() => [...cut]);
              }
            } else {
              navigate("/");
            }
          });
        } catch (error) {
          // Handle error if needed
          console.error("Error:", error);
        }
        setLl(false);
      };

      // Check if jwtt and first are truthy
      if (!checkCalled) {
        // Call Check() if conditions are met
        Check();

        // Set the flag to true to indicate that Check() has been called
        setCheck(!checkCalled);
      }
    }
  }, [course, user, cont, checkCalled, navigate, state]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "djtygialg", // Replace with your Cloudinary cloud name
    },
  });

  // Create a Cloudinary video object
  const video = cld.video(vlink);
  video.resize(fill().width(640).height(460));

  const handleVideoEnd = () => {
    setIsPlaying(false);

    // const newt = topics.map((ell) => ({ ...ell, play: true }));
    // // alert(JSON.stringify(newt))

    // setTopics([...newt]);
    setVid(!vid);

    // alert('hi')
  };
  const Watch = () => {};
  const Pay = () => {};
  const Decide = () => {
    if (user) {
      Pay();
    } else {
      setShow(true);
    }
  };
  const Buy = async (cid) => {
    let cos = { ...course };
    setQq(true);
    if (cos.deployed) {
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
              // setUrl(res.data.url);
              setCourse((prev) => ({ ...res.data.course }));
              window.location.href = res.data.url;
            }
          } else {
            // Update the 'courses' state with the new array
            // setCourses((prev) => [...updatedData]);
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
    setQq(false);
  };
  const faqs = [
    {
      quest: "What if I miss a class?",
      ans: "You will never miss a lecture ! You can choose either of the two options : View the recorded session of the class available in your LMS. You can attend the missed session in any other live batch. ",
    },
    {
      quest: "Can I get a demo session before enrollment?",
      ans: "We always keep limited number of participants in a live session to maintain the Quality Standards. But, unfortunately participation in a live session without enrolment is not possible.",
    },
    {
      quest: "Who are the Instructors?",
      ans: "Our Instructors are in-house professionals at least 5 years of relevant experience in various domains. They are subject matter experts and are trained to provide a great learning experience.",
    },
  ];

  const iframeRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      // Add event listener to the iframe's window context
      iframe.addEventListener("load", () => {
        iframe.contentWindow.document.addEventListener(
          "contextmenu",
          handleContextMenu
        );
      });
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (iframe) {
        iframe.contentWindow.document.removeEventListener(
          "contextmenu",
          handleContextMenu
        );
      }
    };
  }, []);

  return (
    <div className="px-1 app-container ">
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        cont={cont}
        setUser={setUser}
        user={user}
        yescos={true}
      />
      {user ? (
        <div className="relgo">
          <div class="container-xxl py-5">
            <div class="container mb-5">
              <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title bg-white text-center text-primary px-3">
                  Course Curriculum
                </h6>
                <h2 className="">
                  <Badge bg="light">
                    <Link to="/">
                      <i className="fa fa-arrow-left text-primary"></i>{" "}
                    </Link>
                  </Badge>
                  <h2 className="tida d-inline" style={{ fontSize: "30px" }}>
                    {course.name}{" "}
                  </h2>
                </h2>
              </div>
              <div className="row mt-5 ola bdjd">
                <div className="col-md-6 col-12 text-center ">
                  {vid ? (
                    <div className="text-center obi">
                      <div className="position-relative">
                        {/* <div className="bg-primary z-4 cara w-100 mt-0 position-absolute"></div> */}

                        <iframe
                          ref={iframeRef}
                          className="z-3"
                          width="100%"
                          height="260"
                          src={`https://www.youtube.com/embed/${course.draw}/?autoplay=1`}
                          title="Course Introduction"
                          frameborder="3"
                          allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                          // referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <span className="d-inline">
                        <Ctt id="tooltip-cart" tooltip="pause video">
                          <i
                            className="fa-solid  fa-pause fa-2x text-success"
                            onClick={() => {
                              setVid(!vid);
                            }}
                          ></i>
                        </Ctt>
                      </span>
                      <h2 className="mb-1 text-center align-items-center">
                        Introductory session
                      </h2>
                    </div>
                  ) : (
                    <div className="obi text-center jbtw">
                      <div className="jcent mx-auto">
                        <Card style={{ width: "28rem" }}>
                          <Card.Img variant="top" src={course.image} />
                          <Card.Body>
                            <Ctt id="tooltip-cart" tooltip="play video">
                              <Card.Title className="jbtjw">
                                <span className="">
                                  <i
                                    className="fa-solid  fa-play fa-2x text-success"
                                    onClick={() => {
                                      setVid(!vid);
                                    }}
                                  ></i>
                                </span>
                                <h2
                                  className=" mb-1 text-center align-items-center"
                                  onClick={() => setVid(!vid)}
                                >
                                  Introductory session
                                </h2>
                              </Card.Title>
                            </Ctt>

                            {/* <Card.Text>{course.desc}</Card.Text> */}
                          </Card.Body>
                        </Card>
                        {/* <h3 className="cpp" onClick={() => setVid(!vid)}>
                        <i className="fa fa-eye"></i>Video mode
                      </h3> */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 z-8 pb-3 text-center">
                  <h2 className="tppj bg-primary text-light tida py-3 ">
                    Course Modules &nbsp; &nbsp;
                  </h2>
                  {ll ? (
                    <div className="text-center mx-auto jbtw mt-5">
                      <Spinner
                        className="text-center mx-auto"
                        animation="border"
                        variant="primary"
                      />
                    </div>
                  ) : (
                    <div class="robop justify-content-center coco w-100">
                      {topics && topics.length > 0 ? (
                        <div className="   w-100">
                          <List
                            sx={{
                              width: "100%",
                              // maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {topics.map(
                              (
                                { tittle, desc, duration, tid, vlink, play },

                                index
                              ) => (
                                <div
                                  className="lbb okoko obi mb-3 align-items-center"
                                  style={{}}
                                >
                                  <ListItem alignItems="flex-center">
                                    <ListItemText
                                      className="tida text-capitalize"
                                      primary={
                                        <div className="tida w-100 align-items-center align-items-center d-flex col-1 py-2">
                                          {/* <p className="d-inline"></p> */}
                                          <h4 className="text-start">
                                            <i className="fa fa-list  "></i>{" "}
                                            &nbsp;
                                            {index + 1} &nbsp;
                                            {tittle} &nbsp; {duration}
                                          </h4>
                                        </div>
                                      }
                                    />
                                    {course.paid ? (
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`${desc} .<br/><br/>This is a paid course`}
                                      >
                                        <i className="fa fa-unlock"></i>
                                      </Ctt>
                                    ) : (
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`${desc} .<br/><br/>Topics will be accessible after payment`}
                                      >
                                        <i className="fa fa-lock"></i>
                                      </Ctt>
                                    )}
                                    &nbsp;
                                    <ListItemAvatar className="jbtw border-danger">
                                      <Avatar
                                        alt="Remy Sharp"
                                        src={course.image}
                                      />
                                      &nbsp; &nbsp; &nbsp;
                                    </ListItemAvatar>
                                  </ListItem>
                                </div>
                              )
                            )}
                          </List>
                        </div>
                      ) : (
                        <h4 className="text-danger text-center mt-5">
                          {" "}
                          No topics yet{" "}
                        </h4>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h2
            className="tida mx-auto mt-1 w-100 text-center"
            style={{ fontSize: "30px" }}
          >
            {course.paid ? (
              <button
                onClick={Watch}
                className="btn btn-primary px-2 py-1 fs-2"
              >
                Watch videos
              </button>
            ) : (
              <Ctt id="tooltip-cart" tooltip="Buy Now">
                {qq ? (
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary text-center clkbtn text-light bg-primary mx-auto dpapa "
                    >
                      {/* <CircularProgress className="text-light blinking-text" /> */}
                      <Spinner
                        className="text-center"
                        animation="border"
                        variant="light"
                      />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      Buy(course.cid);
                    }}
                    className="btn btn-primary px-2 py-1 fs-2"
                  >
                    {course.dprice} <i className="fa fa-shopping-cart"></i>
                  </button>
                )}
              </Ctt>
            )}
          </h2>
          {/* <h2 className="text-center tida fs-3 mb-5">
            ...Welcome {user.name} !
          </h2> */}
        </div>
      ) : (
        <div>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Body>
              <div style={{ marginTop: "" }} className="form-sectionh fera">
                {/* <h2 className=" text-center jbtw">
                      Login/Sign-in{' '}
                      <span>
                        {' '}
                        <i
                          onClick={handleClose}
                          closeButton className="fa fa-times"
                        ></i>
                      </span>
                    </h2> */}
                <Login
                  cont={cont}
                  setUser={setUser}
                  handleClose={handleClose}
                />
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <div class="container-xxl py-5">
            <div class="container">
              <div class="text-center wow fadeInUp">
                <h6 class="section-title bg-white text-center text-primary px-3">
                  Course Curriculum
                </h6>
                <h2 className="">
                  <Badge bg="light">
                    <Link to="/">
                      <i className="fa fa-arrow-left text-primary"></i>{" "}
                    </Link>
                  </Badge>
                  <h2 className="tida d-inline" style={{ fontSize: "40px" }}>
                    {course.name}{" "}
                  </h2>
                </h2>
              </div>
              <div className="row mt-5 ola bdjd">
                <div className="col-md-6 col-12 text-center ">
                  {vid ? (
                    <div className="text-center obi">
                      <div className="position-relative">
                        {/* <VimeoEmbed videoId="959742409" /> */}

                        <iframe
                          ref={iframeRef}
                          className="z-3"
                          width="100%"
                          height="260"
                          src={`https://www.youtube.com/embed/${course.draw}/?autoplay=1`}
                          title="Course Introduction"
                          frameborder="3"
                          allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                          // referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <span className="d-inline">
                        <Ctt id="tooltip-cart" tooltip="pause video">
                          <i
                            className="fa-solid  fa-pause fa-2x text-success"
                            onClick={() => {
                              setVid(!vid);
                            }}
                          ></i>
                        </Ctt>
                      </span>
                      <h2 className="mb-3 text-center align-items-center">
                        Introductory session
                      </h2>
                    </div>
                  ) : (
                    <div className="obi text-center jbtw">
                      <div className="jcent mx-auto">
                        <Card style={{ width: "28rem" }}>
                          <Card.Img variant="top" src={course.image} />
                          <Card.Body>
                            <Ctt id="tooltip-cart" tooltip="play video">
                              <Card.Title className="jbtjw">
                                <span className="">
                                  <i
                                    className="fa-solid  fa-play fa-2x text-success"
                                    onClick={() => {
                                      setVid(!vid);
                                    }}
                                  ></i>
                                </span>
                                <h2
                                  className="cpp text-center align-items-center"
                                  onClick={() => setVid(!vid)}
                                >
                                  Introductory session
                                </h2>
                              </Card.Title>
                            </Ctt>

                            {/* <Card.Text>{course.desc}</Card.Text> */}
                          </Card.Body>
                        </Card>
                        {/* <h3 className="cpp" onClick={() => setVid(!vid)}>
                        <i className="fa fa-eye"></i>Video mode
                      </h3> */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 z-8 pb-2 text-center">
                  <h2 className="tppj bg-primary text-light tida py-3 ">
                    Course modules &nbsp; &nbsp;
                  </h2>
                  {ll ? (
                    <div className="text-center mx-auto jbtw mt-5">
                      <Spinner
                        className="text-center mx-auto"
                        animation="border"
                        variant="primary"
                      />
                    </div>
                  ) : (
                    <div class="robop justify-content-center  coco w-100">
                      {topics && topics.length > 0 ? (
                        <div className="   w-100">
                          <List
                            sx={{
                              width: "100%",
                              // maxWidth: 360,
                              bgcolor: "background.paper",
                            }}
                          >
                            {topics.map(
                              (
                                {
                                  tittle,
                                  desc,
                                  duration,
                                  serial,
                                  tid,
                                  vlink,
                                  play,
                                },

                                index
                              ) => (
                                <div className="lbb okoko obi mb-3" style={{}}>
                                  <ListItem alignItems="flex-center">
                                    <ListItemText
                                      className="px-2 text-capitalize tida"
                                      primary={
                                        <div className="tijda w-100 align-items-center align-items-center d-flex col-1 py-2">
                                          {/* <p className="d-inline"></p> */}
                                          <h4 className="text-start">
                                            <i className="fa fa-list  "></i>{" "}
                                            &nbsp;
                                            {index + 1} &nbsp;
                                            {tittle} &nbsp; {duration}
                                          </h4>
                                        </div>
                                      }
                                    />
                                    {course.paid ? (
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip="this is a paid course"
                                      >
                                        <i className="fa fa-unlock"></i>
                                      </Ctt>
                                    ) : (
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`${desc} .<br/><br/>Topics will be accessible after payment`}
                                      >
                                        <i className="fa fa-lock"></i>
                                      </Ctt>
                                    )}
                                    &nbsp;
                                    <ListItemAvatar className="jbtw border-danger">
                                      <Avatar
                                        alt="Remy Sharp"
                                        src={course.image}
                                      />
                                      &nbsp; &nbsp; &nbsp;
                                    </ListItemAvatar>
                                  </ListItem>
                                </div>
                              )
                            )}
                          </List>
                        </div>
                      ) : (
                        <h4 className="text-danger text-center mt-5">
                          {" "}
                          No topics yet{" "}
                        </h4>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-center">{course.desc}</h2>
          <div className="container text-center">
            {course.paid ? (
              <button
                onClick={Watch}
                className="btn btn-primary py-1 px-md-1 fs-4"
              >
                Watch videos
              </button>
            ) : (
              <Ctt id="tooltip-cart" tooltip=" Buy this course now">
                <button
                  onClick={Decide}
                  className="btn btn-primary py-1 px-md-1 fs-4"
                >
                  {course.dprice} <i className="fa fa-shopping-cart"></i>
                </button>
              </Ctt>
            )}
          </div>
        </div>
      )}

      <div className="container pt-5 mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 col-12 text-center px-5">
            <h2 className="tida fs-3"> Expect -</h2>
            <List as="ul" className="text-center fs-4">
              <ListItem className="text-center">
                {" "}
                <i className="fa-solid fa-check-square"></i> &nbsp;Real-life
                Case Studies
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-solid fa-check-square"></i> &nbsp;Assignments
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-solid fa-check-square"></i> &nbsp;24 x 7 Expert
                Support
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-solid fa-check-square"></i> &nbsp;Certification
                (on project completion)
              </ListItem>
            </List>
          </div>
          <div className="col-md-6 col-12 text-center px-5">
            <h2 className="tida">
              What are the system requirements for this course?
            </h2>

            <List as="ul" className="text-center fs-5">
              <ListItem className="text-center">
                {" "}
                <i className="fa-regular fa-square"></i> &nbsp;Operating System:
                Windows 8 or Mac OS.
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-regular fa-square"></i> &nbsp;Processor:
                Minimum Intel Pentium 4 or higher.
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-regular fa-square"></i> &nbsp;Memory: Minimum
                4GB RAM recommended.
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-regular fa-square"></i> &nbsp;Screen
                resolution: 1280 x 1024 or larger.
              </ListItem>
              <ListItem className="text-center">
                {" "}
                <i className="fa-regular fa-square"></i> &nbsp;Applicatihon
                window size: 1024 x 680 or larger.
              </ListItem>
            </List>
          </div>
        </div>
      </div>
      <div className="container text-center mb-4">
        {course.paid ? (
          <Ctt id="tooltip-cart" tooltip="watch course videos now">
            <button
              onClick={Watch}
              className="btn btn-primary py-1 px-md-1 fs-4"
            >
              Watch videos
            </button>
          </Ctt>
        ) : (
          <Ctt id="tooltip-cart" tooltip=" Buy this course now">
            {qq ? (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary  text-center clkbtn text-light bg-primary mx-auto dpapa "
                >
                  {/* <CircularProgress className="text-light blinking-text" /> */}
                  <Spinner
                    className="text-center"
                    animation="border"
                    variant="light"
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  Buy(course.cid);
                }}
                className="btn btn-primary px-2 py-1 fs-2"
              >
                {course.dprice} <i className="fa fa-shopping-cart"></i>
              </button>
            )}
          </Ctt>
        )}
      </div>
      <div className="container mb-4">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center tida fs-1 mb-2">
              Frequently asked Questions
            </h2>

            <List divided relaxed>
              {faqs.map(({ quest, ans }, index) => (
                <ListItem>
                  {/* <ListIcon name={course.image} size="large" /> */}
                  <i className="fa fa-user  fa-2x px-3"></i>
                  <ListContent>
                    <ListHeader as="a">
                      <h2 className="mb-1 px-2">{quest}</h2>
                    </ListHeader>
                    <br />
                    <ListDescription as="b" className="text-right">
                      <h5 className="col-md-7 me-4 pl-5">{ans}</h5>
                    </ListDescription>
                  </ListContent>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
      <div className="container text-center mb-5">
        {course.paid ? (
          <Ctt id="tooltip-cart" tooltip="watch course videos now">
            <button
              onClick={Watch}
              className="btn btn-primary py-1 px-md-1 fs-4"
            >
              Watch videos
            </button>
          </Ctt>
        ) : (
          <Ctt id="tooltip-cart" tooltip=" Buy this course now">
            {qq ? (
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary  text-center clkbtn text-light bg-primary mx-auto dpapa "
                >
                  {/* <CircularProgress className="text-light blinking-text" /> */}
                  <Spinner
                    className="text-center"
                    animation="border"
                    variant="light"
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  Buy(course.cid);
                }}
                className="btn btn-primary px-2 py-1 fs-2"
              >
                {course.dprice} <i className="fa fa-shopping-cart"></i>
              </button>
            )}
          </Ctt>
        )}
      </div>

      <Footer cont={cont} />
    </div>
  );
};

export default Curri;
