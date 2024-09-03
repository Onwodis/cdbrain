import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import { Button as Buttonb } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";
import Card from "react-bootstrap/Card";
import { Embed } from "semantic-ui-react";
import {
  ItemMeta,
  ItemImage,
  ItemHeader,
  ItemGroup,
  ItemExtra,
  ItemDescription,
  ItemContent,
  Item,
} from "semantic-ui-react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ListHeader,
  ListDescription,
  ListContent,
  ListIcon,
} from "semantic-ui-react";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const Course = ({ cont, user, setUser }) => {
  const location = useLocation();
  const { state } = location;
  const ccourse = state && state[0];
  // const ccourse = state && state[0];
  const [course, setCourse] = useState(ccourse);

  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);
  const [full, setFull] = useState(false);
  const [showc, setShowc] = useState(false);
  const [showet, setShowet] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const [pix, setPix] = useState([]);
  const [newtopic, setNewtopic] = useState({});
  const [edittopic, setEdittopic] = useState({});
  const [topic, setTopic] = useState({ tittle: "Welcome" });

  // video
  const videoRef = useRef(null);
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

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    desc: "",
    name: "",

    // Add more fields as needed
  });
  const handleCloseet = () => setShowet(false);
  const handleClose = () => setShow(false);
  const handleClosec = () => setShowc(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState();
  const [topics, setTopics] = useState();
  // const [topic, setTopic] = useState();

  let [checkCalled, setCheck] = useState(false);
  let [vid, setVid] = useState(false);

  const [image, setImage] = useState("");
  const [title, setTittle] = useState("");
  const [view, setView] = useState("");
  const [tdesc, setTdesc] = useState("");
  const [vlink, setVlink] = useState("");
  const [draws, setDraws] = useState([]);
  const [tvids, setTvids] = useState([]);
  const [vidnames, setVidnames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [roll, setRoll] = useState(false);
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

  const { column, data, direction } = statee;
  const Addtopic = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("tittle", newtopic.tittle);
    formDataToSend.append("desc", newtopic.desc);
    formDataToSend.append("serial", serial);
    formDataToSend.append("vlink", newtopic.vlink);
    formDataToSend.append("duration", newtopic.duration);
    formDataToSend.append("cid", course.cid);

    try {
      await axios.post(`${cont.api}addtopic`, formDataToSend).then((res) => {
        if (res.data.success) {
          if (res.data.topics) {
            //   alert(res.data.data.latestloginplayertime);
            // setTopics(() => res.data.topics);
            const cut = res.data.topics;
            const newt = cut.map((ell) => ({ ...ell, play: true }));
            setTopics(() => [...newt]);
            setCourse(() => res.data.course);
            // setNewtopic(() => {});
            setSerial(newt.length + 1);
            setDraws((prev) => [...prev, ...res.data.draws]);
            setVidnames((prev) => [...prev, ...res.data.vidnames]);
            setPix((prev) => [...prev, ...res.data.pix]);
            handleClose();
            setTvids((prev) => [...prev, ...res.data.tvids]);

            // alert(res.data.user);

            Swal.fire({
              title: `New topic added successfully`,

              icon: "success",
            });
          } else {
            // Dalert(res.data.message);
            Swal.fire({
              title: `there was an error performing this action`,
              text: `Error`,
              icon: "error",
            });
          }
        } else {
          // Dalert('pls check your network connection');
          Swal.fire({
            title: `error : error`,
            text: `error`,
            icon: "error",
          });
          setLlb(true);
        }
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };
  const Edittopic = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("tittle", edittopic.tittle);
    formDataToSend.append("desc", edittopic.desc);
    formDataToSend.append("serial", edittopic.serial);
    formDataToSend.append("vlink", edittopic.vlink);
    formDataToSend.append("cid", course.cid);
    formDataToSend.append("tid", edittopic.tid);
    formDataToSend.append("duration", edittopic.duration);

    try {
      await axios.post(`${cont.api}edittopic`, formDataToSend).then((res) => {
        if (res.data.success) {
          if (res.data.topics) {
            //   alert(res.data.data.latestloginplayertime);
            // setTopics(() => res.data.topics);
            const cut = res.data.topics;
            const newt = cut.map((ell) => ({ ...ell, play: true }));
            setTopics(() => [...newt]);
            setCourse(() => res.data.course);
            // setNewtopic(() => {});
            // setSerial(newt.length + 1);
            setDraws((prev) => [...prev, ...res.data.draws]);
            setVidnames((prev) => [...prev, ...res.data.vidnames]);
            setPix((prev) => [...prev, ...res.data.pix]);
            handleCloseet();
            setTvids((prev) => [...prev, ...res.data.tvids]);

            Swal.fire({
              title: `edited topic updated successfully`,

              icon: "success",
            });
          } else {
            // Dalert(res.data.message);
            Swal.fire({
              title: `there was an error performing this action`,
              text: `Error`,
              icon: "error",
            });
          }
        } else {
          // Dalert('pls check your network connection');
          Swal.fire({
            title: `error : error`,
            text: `error`,
            icon: "error",
          });
          setLlb(true);
        }
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };

  useEffect(() => {
    const Check = async () => {
      try {
        await axios.get(`${cont.api}gettopics/${course.cid}`).then((res) => {
          if (res.data.success) {
            // setFirst(false);

            if (res.data.course) {
              //   alert(res.data.data.latestloginplayertime);
              setCourse((prev) => ({ ...prev, ...res.data.course }));
              setDraws((prev) => [...prev, ...res.data.draws]);
              // alert(res.data.draws.length);
              setVidnames((prev) => [...prev, ...res.data.vidnames]);
              setPix((prev) => [...prev, ...res.data.pix]);

              const cut = res.data.topics;
              const newt = cut.map((ell) => ({ ...ell, play: true }));
              setTopics(() => [...newt]);
              setTvids((prev) => [...prev, ...res.data.tvids]);
              const tt = newt;

              // const oril = tt.find((el) => el.orientation === true); // Use .find instead of .filter
              // if (oril) {
              //   setVlink(oril.vlink);
              //   setView((prev) => ({ ...prev, ...oril }));
              //   setIsPlaying(false);
              // }
              // else{
              //   setVlink(course.draw);
              // }
              setVlink(course.draw);

              setSerial(tt.length + 1);
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
  }, [course, user, cont, checkCalled]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "djtygialg", // Replace with your Cloudinary cloud name
    },
  });

  const Deploy = async () => {
    setRoll(true);
    try {
      await axios.get(`${cont.api}deployed/${course.cid}`).then((res) => {
        if (res.data.success) {
          // setFirst(false);

          if (res.data.course) {
            setCourse((prev) => ({ ...prev, ...res.data.course }));
          }
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
    }
    setRoll(false);
  };
  const Del = async (tid) => {
    async function Goon() {
      try {
        await axios.get(`${cont.api}deletetopic/${tid}`).then((res) => {
          if (res.data.success) {
            // setFirst(false);

            if (res.data.course) {
              setCourse((prev) => ({ ...prev, ...res.data.course }));
              const cut = res.data.topics;
              const newt = cut.map((ell) => ({ ...ell, play: true }));

              setTopics(() => [...newt]);
              const tt = newt;
              const oril = tt.find((el) => el.orientation === true); // Use .find instead of .filter
              if (oril) {
                setVlink(oril.vlink);
                setView((prev) => ({ ...prev, ...oril }));
                setIsPlaying(false);
              }

              setSerial(tt.length + 1);
              setDraws((prev) => [...prev, ...res.data.draws]);
              setVidnames((prev) => [...prev, ...res.data.vidnames]);
              setPix((prev) => [...prev, ...res.data.pix]);
              setTvids((prev) => [...prev, ...res.data.tvids]);
              Swal.fire({
                title: "Deleted !",
                text: "topic  deleted successfully ! !",
                icon: "success",
              });
            }
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
    }
    Swal.fire({
      title: `Are you sure you want to delete this topic ?`,
      text: `You won't be able to revert this ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
  };
  // Create a Cloudinary video object
  const video = cld.video(vlink);
  video.resize(fill().width(640).height(460));
  const Play = (link, tid) => {
    const newt = topics.map((ell) =>
      ell.tid === tid ? { ...ell, play: !ell.play } : { ...ell, play: true }
    );
    const guy = topics.find((ell) => ell.tid === tid);
    setTopics(() => [...newt]);
    setVlink(link);

    if (guy.play) {
      setIsPlaying(true);
      setVid(true);
      setTopic(() => ({ ...topic, ...guy }));
    } else {
      setIsPlaying(false);
      setVid(false);
      setVlink(course.draw);

      // alert(false)
    }
    const oril = topics.find((el) => el.tid === tid); // Use .find instead of .filter
    setView((prev) => ({ ...prev, ...oril }));
    // alert('hi')
  };
  const handleVideoEnd = () => {
    setIsPlaying(false);

    const newt = topics.map((ell) => ({ ...ell, play: true }));
    // alert(JSON.stringify(newt))

    setTopics([...newt]);

    // alert('hi')
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
  const Ecourse = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("desc", course.desc);
    formDataToSend.append("image", course.image);
    formDataToSend.append("draw", course.draw);
    formDataToSend.append("price", course.price);
    formDataToSend.append("name", course.name);
    formDataToSend.append("cid", course.cid);
    // formDataToSend.append('api', );

    try {
      await axios.post(`${cont.api}editcourse`, formDataToSend).then((res) => {
        if (res.data.success) {
          if (res.data.course) {
            //   alert(res.data.data.latestloginplayertime);
            setCourse(() => res.data.course);
            const oi = res.data.pix;
            setImage((prev) => oi[0].image);
            setDraws((prev) => [...prev, ...res.data.draws]);
            setVidnames((prev) => [...prev, ...res.data.vidnames]);
            setPix((prev) => [...prev, ...res.data.pix]);
            handleClosec();

            // alert(res.data.user);

            Swal.fire({
              title: `Course details updated successfully`,

              icon: "success",
            });
          } else {
            // Dalert(res.data.message);
            Swal.fire({
              title: `there was an error performing this action`,
              text: `Error`,
              icon: "error",
            });
          }
        } else {
          // Dalert('pls check your network connection');
          Swal.fire({
            title: `error : error`,
            text: `error`,
            icon: "error",
          });
          setLlb(true);
        }
      });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };
  // const iframeRef = useRef(null);
  // useEffect(() => {
  //   const handleContextMenu = (event) => {
  //     event.preventDefault();
  //   };

  //   const iframe = iframeRef.current;
  //   if (iframe) {
  //     const onLoad = () => {
  //       iframe.contentWindow.document.addEventListener(
  //         'contextmenu',
  //         handleContextMenu
  //       );
  //     };
  //     iframe.addEventListener('load', onLoad);

  //     // Cleanup
  //     return () => {
  //       if (iframe) {
  //         iframe.removeEventListener('load', onLoad);
  //         if (iframe.contentWindow.document) {
  //           iframe.contentWindow.document.removeEventListener(
  //             'contextmenu',
  //             handleContextMenu
  //           );
  //         }
  //       }
  //     };
  //   }
  // }, []);

  // const YouTubePlayer = ({ videoId }) => (
  //   <iframe
  //     width="560"
  //     height="315"
  //     src={`https://www.youtube.com/embed/${videoId}`}
  //     frameBorder="0"
  //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //     allowFullScreen
  //     title="YouTube Video"
  //   ></iframe>
  // );
  const Ctopic = (tid) => {
    const dtopic = topics.find((el) => el.tid === tid);
    // e.preventDefault()
    setEdittopic((prev) => ({ ...prev, ...dtopic }));
    setShowet(true);
  };
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);
  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        home={true}
        cont={cont}
        setUser={setUser}
        user={user}
        acourse={true}
      />
      <div>
        <Offcanvas show={showet} onHide={handleCloseet}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div className="login-root">
                <div className="box-root flex-flex flex-direction--column stt">
                  <div className="box-root  flex-flex flex-direction--column fg-11 zz-9">
                    <div className="box-root  flex-flex flex-justifyContent--center">
                      <h1>
                        <h2 rel="dofollow">{cont.name}</h2>
                      </h1>
                    </div>
                    <div className="formbg-outer">
                      <div className="formbg">
                        <div className="formbg-inner padding-horizontal--48">
                          <span className="padding-bottom--15">Edit Topic</span>
                          <form id="stripe-login" onSubmit={Edittopic}>
                            <div className="field padding-bottom--24">
                              <label for="email">Topic Title</label>
                              <input
                                type="text"
                                placeholder="e.g front-end development"
                                value={edittopic.tittle}
                                required
                                onChange={(e) =>
                                  setEdittopic((prev) => ({
                                    ...prev,
                                    tittle: e.target.value,
                                  }))
                                }
                                name="tittle"
                              />
                            </div>

                            <div className="field padding-bottom--24">
                              <div className="grid--50-50">
                                <label for="ddr">Describe topic</label>
                              </div>
                              <textarea
                                name="desc"
                                className="form-control"
                                value={edittopic.desc}
                                onChange={(e) =>
                                  setEdittopic((prev) => ({
                                    ...prev,
                                    desc: e.target.value,
                                  }))
                                }
                                id="ddr"
                                required
                                style={{ resize: "none" }}
                              ></textarea>
                            </div>

                            <div class="field padding-bottom--24">
                              <label for="avatar">VIDEO Link</label>

                              <iframe
                                className="z-3"
                                width="100%"
                                height="260"
                                src={`https://www.youtube.com/embed/${edittopic.vlink}`}
                                title={edittopic.tittle}
                                frameborder="3"
                                allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                                // referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                              ></iframe>

                              <div className="row px-2 rolla py-2">
                                <input
                                  className="form-control text-center"
                                  type="text"
                                  name=""
                                  value={edittopic.vlink}
                                  placeholder="enter new topic video link here"
                                  onChange={(e) =>
                                    setEdittopic((prev) => ({
                                      ...prev,
                                      vlink: e.target.value,
                                    }))
                                  }
                                  id=""
                                />
                              </div>
                            </div>
                            <div className="field padding-bottom--24">
                              <label for="dur">Video Duration</label>
                              <input
                                id="dur"
                                type="text"
                                placeholder="e.g 3:15"
                                value={edittopic.duration}
                                required
                                onChange={(e) =>
                                  setEdittopic((prev) => ({
                                    ...prev,
                                    duration: e.target.value,
                                  }))
                                }
                                name="duration"
                                className="text-center"
                              />
                            </div>
                            <div className="field padding-bottom--24">
                              <label for="serial">Serial no </label>
                              <input
                                type="number"
                                placeholder="enter number order serial"
                                value={edittopic.serial}
                                required
                                onChange={(e) =>
                                  setEdittopic((prev) => ({
                                    ...prev,
                                    serial: e.target.value,
                                  }))
                                }
                                name="serial"
                                id="serial"
                                max={15}
                                min={1}
                                className="text-center"
                              />
                            </div>

                            {llb ? (
                              <div className="field padding-bottom--24">
                                <input
                                  type="submit"
                                  name="submit"
                                  value="Save"
                                />
                              </div>
                            ) : (
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                                >
                                  {/* <CircularProgress className="text-light blinking-text" /> */}
                                  <Spinner
                                    className="text-center"
                                    animation="border"
                                    variant="light"
                                  />
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div className="login-root">
                <div className="box-root flex-flex flex-direction--column stt">
                  <div className="box-root  flex-flex flex-direction--column fg-11 zz-9">
                    <div className="box-root  flex-flex flex-justifyContent--center">
                      <h1>
                        <h2 rel="dofollow">{cont.name}</h2>
                      </h1>
                    </div>
                    <div className="formbg-outer">
                      <div className="formbg">
                        <div className="formbg-inner padding-horizontal--48">
                          <span className="padding-bottom--15">
                            Add new Topic
                          </span>
                          <form id="stripe-login" onSubmit={Addtopic}>
                            <div className="field padding-bottom--24">
                              <label for="email">Topic Title</label>
                              <input
                                type="text"
                                placeholder="e.g front-end development"
                                value={newtopic.tittle}
                                required
                                onChange={(e) =>
                                  setNewtopic((prev) => ({
                                    ...prev,
                                    tittle: e.target.value,
                                  }))
                                }
                                name="tittle"
                              />
                            </div>

                            <div className="field padding-bottom--24">
                              <div className="grid--50-50">
                                <label for="ddr">Describe topic</label>
                              </div>
                              <textarea
                                name="desc"
                                className="form-control"
                                value={newtopic.desc}
                                onChange={(e) =>
                                  setNewtopic((prev) => ({
                                    ...prev,
                                    desc: e.target.value,
                                  }))
                                }
                                id="ddr"
                                required
                                style={{ resize: "none" }}
                              ></textarea>
                            </div>
                            {/* <div className="field padding-bottom--24">
                              <label for="vl">Video link</label>
                              <input
                                type="text"
                                placeholder="enter video link"
                                value={vlink}
                                required
                                onChange={(e) => setVlink(e.target.value)}
                                name="vlink"
                                id="vl"
                              />
                            </div> */}
                            <div class="field padding-bottom--24">
                              <label for="avatar">VIDEO Link</label>

                              <iframe
                                className="z-3"
                                width="100%"
                                height="260"
                                src={`https://www.youtube.com/embed/${newtopic.vlink}`}
                                title={topic.tittle}
                                frameborder="3"
                                allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                                // referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                              ></iframe>

                              <div className="row px-2 rolla py-2">
                                <input
                                  className="form-control text-center"
                                  type="text"
                                  name=""
                                  value={newtopic.vlink}
                                  placeholder="enter new topic video link here"
                                  onChange={(e) =>
                                    setNewtopic((prev) => ({
                                      ...prev,
                                      vlink: e.target.value,
                                    }))
                                  }
                                  id=""
                                />
                              </div>
                            </div>
                            <div className="field padding-bottom--24">
                              <label for="dur">Video Duration</label>
                              <input
                                id="dur"
                                type="text"
                                placeholder="e.g 3:15"
                                value={newtopic.duration}
                                required
                                onChange={(e) =>
                                  setNewtopic((prev) => ({
                                    ...prev,
                                    duration: e.target.value,
                                  }))
                                }
                                name="duration"
                                className="text-center"
                              />
                            </div>
                            <div className="field padding-bottom--24">
                              <label for="serial">Serial no </label>
                              <input
                                type="number"
                                placeholder="enter number order serial"
                                value={serial}
                                required
                                onChange={(e) => setSerial(e.target.value)}
                                name="serial"
                                id="serial"
                                max={15}
                                min={1}
                              />
                            </div>

                            {llb ? (
                              <div className="field padding-bottom--24">
                                <input
                                  type="submit"
                                  name="submit"
                                  value="Save"
                                />
                              </div>
                            ) : (
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                                >
                                  {/* <CircularProgress className="text-light blinking-text" /> */}
                                  <Spinner
                                    className="text-center"
                                    animation="border"
                                    variant="light"
                                  />
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas show={showc} onHide={handleClosec}>
          <Offcanvas.Body>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div class="login-root">
                <div class="box-root flex-flex flex-direction--column stt">
                  <div class="box-root  flex-flex flex-direction--column fg-11 zz-9">
                    <div class="box-root  flex-flex flex-justifyContent--center">
                      <h1>
                        <h2
                          rel="dofollow"
                          className="text-primary text-capitalize"
                        >
                          {cont.name}
                        </h2>
                      </h1>
                    </div>
                    <div class="formbg-outer">
                      <div class="formbg">
                        <div class="formbg-inner padding-horizontal--40">
                          <span class="padding-bottom--15">
                            Edit (course) {course.name}
                          </span>
                          <form id="stripe-login" onSubmit={Ecourse}>
                            <div class="field padding-bottom--24">
                              <label for="email">Course Title</label>
                              <input
                                type="text"
                                placeholder="e.g front-end development"
                                value={course.name}
                                required
                                onChange={(e) =>
                                  setCourse((prev) => ({
                                    ...course,
                                    name: e.target.value,
                                  }))
                                }
                                name=""
                              />
                            </div>
                            <div class="field padding-bottom--24">
                              <label for="avatar">Avatar</label>
                              {/* <input
                                type="text"
                                placeholder=""
                                value={image}
                                required
                                onChange={(e) => setImage(e.target.value)}
                                name="image"
                                id="avatar"
                              /> */}
                              {/* <p>{image}</p> */}
                              <img
                                className="rounded text-center mx-3 mb-3"
                                style={{ objectFit: "contain", width: "5vw" }}
                                src={course.image}
                                alt=""
                              />

                              <div className="row px-2 rolla py-2">
                                {pix && pix.length > 0
                                  ? pix.map((el, index) => (
                                      <div
                                        onClick={(e) =>
                                          setCourse((prev) => ({
                                            ...course,
                                            image: el.image,
                                          }))
                                        }
                                        className="col-md-3 col-4  rounded text-center tayo cpp"
                                        key={index}
                                      >
                                        <img
                                          style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                          }}
                                          src={el.image}
                                          alt=""
                                        />
                                        {/* <p>{el.image}</p> */}
                                      </div>
                                    ))
                                  : ""}
                              </div>
                            </div>
                            <div class="field padding-bottom--24">
                              <label for="fee">Course Price</label>
                              <input
                                type="number"
                                placeholder="20000"
                                value={course.price}
                                required
                                onChange={(e) =>
                                  setCourse((prev) => ({
                                    ...course,
                                    price: e.target.value,
                                  }))
                                }
                                name=""
                                id="fee"
                                min="1000"
                              />
                            </div>
                            <div class="field padding-bottom--24">
                              <label for="avatar">Draw VIDEO Link</label>
                              {/* <input
                                type="text"
                                placeholder=""
                                value={image}
                                required
                                onChange={(e) => setImage(e.target.value)}
                                name="image"
                                id="avatar"
                              /> */}

                              {/* <video
                                className="rounded text-center mx-3 mb-3"
                                autoPlay
                                style={{ objectFit: 'contain', width: '10vw' }}
                                src={course.draw}
                                // src={course.draw}
                                controls
                                alt=""
                              /> */}

                              <iframe
                                className="z-3"
                                width="100%"
                                height="260"
                                src={`https://www.youtube.com/embed/${course.draw}`}
                                title={topic.tittle}
                                frameborder="3"
                                allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                                // referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                              ></iframe>

                              <div className="row px-2 rolla py-2">
                                <input
                                  className="form-control text-center"
                                  type="text"
                                  name=""
                                  value={course.draw}
                                  placeholder="enter draw video link here"
                                  onChange={(e) =>
                                    setCourse((prev) => ({
                                      ...prev,
                                      draw: e.target.value,
                                    }))
                                  }
                                  id=""
                                />
                              </div>
                              {/* <div className="row px-2 rolla py-2">
                                {draws && draws.length > 0
                                  ? draws.map((el, index) => (
                                      <div
                                        className="col-md-3 col-4 border-info  rounded text-center tayno cpp"
                                        key={index}
                                      >
                                        
                                        <p>{el.name.split('/')[4]}</p>
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          onClick={(e) =>
                                            setCourse((prev) => ({
                                              ...course,
                                              draw: el.name,
                                            }))
                                          }
                                        >
                                          preview{' '}
                                        </button>
                                      </div>
                                    ))
                                  : ''}
                              </div> */}
                            </div>
                            <div class="field padding-bottom--24">
                              <div class="grid--50-50">
                                <label for="password">Description</label>
                              </div>
                              <textarea
                                name="desc"
                                className="form-control"
                                id=""
                                required
                                value={course.desc}
                                onChange={(e) =>
                                  setCourse((prev) => ({
                                    ...course,
                                    desc: e.target.value,
                                  }))
                                }
                                style={{ resize: "none" }}
                              ></textarea>
                            </div>

                            {llb ? (
                              <div class="field padding-bottom--24">
                                <input
                                  type="submit"
                                  name="submit"
                                  value="Save"
                                />
                              </div>
                            ) : (
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                                >
                                  {/* <CircularProgress className="text-light blinking-text" /> */}
                                  <Spinner
                                    className="text-center"
                                    animation="border"
                                    variant="light"
                                  />
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div className="container-xxl py-5 rat  text-capitalize">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Edit Course
              </h6>
              <h2 className=" text-capitalize fw-5">
                <Badge bg="light">
                  <Link to="/acourses">
                    {" "}
                    <i className="fa fa-arrow-left text-primary"></i>{" "}
                  </Link>
                </Badge>
                {course.name} course<small>{course.dprice}</small>
              </h2>

              <h6 className="mb-1">Created :{course.createddate}</h6>
              <sub>{course.durationm}</sub>
            </div>
            <div className="row mt-5 ola">
              <div
                className={`${
                  full ? `col-md-12` : `col-md-6`
                }  col-12 text-center `}
              >
                {vid ? (
                  <div className="text-center obi">
                    <div className="position-relative bg-primary">
                      {/* <div className="bg-primary z-4 cara w-100 mt-0 position-absolute"></div> */}
                      <iframe
                        className="z-3"
                        width={`${full ? `789` : `100%`}`}
                        height="360"
                        src={`https://www.youtube.com/embed/${vlink}/?autoplay=1`}
                        title={topic.tittle}
                        frameborder="3"
                        allow="accelerometer; autoplay; clipboard-write; picture-in-picture;"
                        // referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                      ></iframe>

                      {/* <div className="bg-primary z-4 carab w-100 position-absolute text-center align-items-center py-1">
                        {full ? (
                          <i
                            onClick={() => setFull(!full)}
                            className="fa fa-compress fa-3x text-light my-auto"
                          ></i>
                        ) : (
                          <i
                            onClick={() => setFull(!full)}
                            className="fa fa-expand fa-3x text-light my-auto"
                          ></i>
                        )}
                      </div> */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "55%",
                          backgroundColor: "transparent",
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                      ></div>
                    </div>
                    <div></div>

                    <span className="d-inline">
                      <i
                        className="fa-solid  fa-pause fa-2x text-success"
                        onClick={() => {
                          setVid(!vid);
                        }}
                      ></i>
                    </span>
                    <h2
                      className="cpp text-center align-items-center"
                      onClick={() => setVid(!vid)}
                    >
                      {vlink !== course.draw ? (
                        <div className="text-capitalize">{topic.tittle}</div>
                      ) : (
                        <div>
                          <h3>Introduction {"  "}</h3>
                        </div>
                      )}
                    </h2>
                  </div>
                ) : (
                  <div className="obi text-center jbtw">
                    <div className="jcent mx-auto">
                      <Card style={{ width: "28rem" }}>
                        <Card.Img variant="top" src={course.image} />
                        <Card.Body>
                          <Card.Title>{course.name}</Card.Title>
                          <Card.Text>{course.desc}</Card.Text>
                          <Button onClick={setShowc} variant="primary">
                            {" "}
                            <i className="fa fa-edit text-primary"></i> Edit
                            course
                          </Button>
                        </Card.Body>
                      </Card>
                      <h3
                        className="cpp mb-4 tida"
                        onClick={() => setVid(!vid)}
                      >
                        <i className="fa fa-eye"></i>Video mode
                      </h3>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`${
                  full ? `col-md-12` : `col-md-6`
                }  col-12 text-center `}
              >
                <h2 className="tppj bg-primary text-light tida py-3 ">
                  Topics ({course.name}) &nbsp; &nbsp;
                  <i
                    onClick={handleShow}
                    className="fa fa-plus text-success cpp bg-light"
                  ></i>
                  &nbsp; &nbsp;
                  {course && course.deployed ? (
                    // <div>

                    <Buttonb onClick={Deploy} variant="success">
                      {roll ? (
                        <div className="text-center p-0 jbtw ">
                          <Spinner
                            className="text-center p-1 mx-auto text-light"
                            animation="border"
                            variant="primary"
                          />
                        </div>
                      ) : (
                        <h5>Deployed</h5>
                      )}
                    </Buttonb>
                  ) : (
                    // </div>
                    // <div>
                    <Buttonb onClick={Deploy} color="danger" variant="danger">
                      {roll ? (
                        <div className="text-center  ">
                          <Spinner
                            className="text-center p-1 text-light"
                            animation="border"
                            variant="danger"
                          />
                        </div>
                      ) : (
                        <h5>Undeployed</h5>
                      )}
                    </Buttonb>
                    // </div>
                  )}
                </h2>
                {ll ? (
                  <div className="text-center mx-auto jbtw mt-5">
                    <Spinner
                      className="text-center mx-auto mt-5"
                      animation="border"
                      variant="primary"
                    />
                  </div>
                ) : (
                  <div className="robop justify-content-center coco w-100">
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
                                duration,
                                desc,
                                serial,
                                tid,
                                vlink,
                                play,
                              },

                              index
                            ) => (
                              <div className="">
                                <ListItem
                                  alignItems="flex-center"
                                  className="lbb mb-2 okoko obi w-100"
                                >
                                  <h1 className="px-3">{index + 1}</h1>
                                  <small>
                                    <sub>{serial}</sub>
                                  </small>
                                  <vr className="text-danger" />
                                  <ListItemAvatar>
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={course.image}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={tittle}
                                    className="jbtw"
                                    secondary={
                                      <React.Fragment>
                                        <div className="jbtw w-100">
                                          <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                          ></Typography>

                                          {desc}
                                          <Badge bg="light">
                                            {play ? (
                                              <i
                                                onClick={() => Play(vlink, tid)}
                                                className="fa fa-play fa-2x cpp text-primary"
                                              ></i>
                                            ) : (
                                              <i
                                                onClick={() => Play(vlink, tid)}
                                                className={`${
                                                  vid
                                                    ? `fa fa-pause`
                                                    : `fa fa-play`
                                                }  fa-2x cpp text-primary`}
                                              ></i>
                                            )}
                                            &nbsp;
                                            <sub className="text-dark">
                                              {duration}
                                            </sub>{" "}
                                            &nbsp;
                                            <i
                                              onClick={() => {
                                                Ctopic(tid);
                                              }}
                                              className="fa fa-edit fa-2x cpp text-primary"
                                            ></i>{" "}
                                            &nbsp;
                                            <i
                                              onClick={() => Del(tid)}
                                              className="fa fa-trash fa-2x cpp text-danger"
                                            ></i>{" "}
                                          </Badge>
                                        </div>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <hr className="text-dark fw-5" />
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
      </div>

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 col-12 text-center px-5">
            <h2 className="tida fs-3">Things to expect</h2>
            <List as="ul" className="text-center fs-4">
              {/* <ListItem className="text-center">
                {' '}
                <i className="fa-solid fa-check-square"></i>{' '}
                &nbsp;Instructor-led Whatsapp tutor access
              </ListItem> */}
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
      <div className="container">
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

      <Footer cont={cont} />
    </div>
  );
};

export default Course;
