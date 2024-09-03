import Talk from "../common/Talk";
import React, { useEffect, useState } from "react";
import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Caro";
import Footer from "./Footer";
import Test2 from "./Test2";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Contact from "./Contact";
import Studentdashboard from "../student/Dashboard";
import ContextMenu from "../common/Contextm.jsx";
import Stats from "./Stats";
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
import Mid from "./Mid";
import Other from "./Other";
// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import "semantic-ui-css/semantic.min.css";
import Na from "../common/Na";
import Lding from "../common/Lding";

const Workforce = ({ cont, user, setCos, setUser, sorry, error }) => {
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
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      lineHeight: "1.6",
      margin: "0 auto",
      maxWidth: "900px",
      padding: "20px",
    },
    header: {
      backgroundColor: "#2C3E50",
      color: "#FFF",
      padding: "40px 20px",
      textAlign: "center",
    },
    mainTitle: {
      fontSize: "36px",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "20px",
    },
    section: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "28px",
      color: "#2980B9",
      marginBottom: "15px",
    },
    list: {
      paddingLeft: "20px",
    },
    quote: {
      fontStyle: "italic",
      backgroundColor: "#F4F4F4",
      padding: "10px",
      borderLeft: "5px solid #2980B9",
      marginBottom: "20px",
    },
    ctaSection: {
      backgroundColor: "#ECF0F1",
      padding: "30px",
      textAlign: "center",
    },
    ctaButton: {
      display: "inline-block",
      backgroundColor: "#3498DB",
      color: "#FFF",
      padding: "10px 20px",
      textDecoration: "none",
      borderRadius: "5px",
      fontWeight: "bold",
    },
  };

  return (
    <div
      className=" app-containern"
      // onContextMenu={handleRightClick}
      // onClick={handleClick}
    >
      {/* <ContextMenu
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        show={contextMenu.show}
        user={user}
        handleAction={handleClick}
      /> */}
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        companies={true}
        cont={cont}
        setUser={setUser}
        user={user}
        ifuser={user ? true : false}
        courses={courses}
        openn={openn}
        db={true}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
      />
      <MDBContainer className="my-3">
        <MDBCard>
          <MDBRow className="g-0 align-items-center">
            <MDBCol md="12">
              
              <MDBCardBody className="d-flex flex-column col-12">
                <div className="bg-light">
                  <div style={styles.container}>
                    <header style={styles.header}>
                      <h1 style={styles.mainTitle}>
                        Build a Future-Ready Workforce with Codar Institute
                      </h1>
                      <p style={styles.subtitle}>
                        Empower Your Team with Cutting-Edge Skills and Knowledge
                      </p>
                    </header>

                    <section style={styles.section}>
                      <h2 style={styles.sectionTitle}>
                        Why Choose Codar Institute for Workforce Development?
                      </h2>
                      <p>
                        At Codar Institute, we understand that the success of any
                        organization hinges on the strength and capabilities of its
                        workforce. Our comprehensive training programs are designed to
                        upskill and reskill your employees, ensuring they are equipped
                        with the latest tools and knowledge needed to excel in today's
                        fast-paced, tech-driven world.
                      </p>
                    </section>

                    <section style={styles.section}>
                      <h2 style={styles.sectionTitle}>Our Training Programs</h2>
                      <ul style={styles.list}>
                        <li>
                          Web Development: Master HTML, CSS, JavaScript, React, Node.js,
                          and more.
                        </li>
                        <li>
                          Data Science: Learn Python, R, machine learning, data
                          visualization, and data analysis.
                        </li>
                        <li>
                          Cloud Computing: Get certified in AWS, Azure, Google Cloud, and
                          other cloud platforms.
                        </li>
                        <li>
                          Cybersecurity: Protect your organization with advanced
                          cybersecurity strategies and tools.
                        </li>
                        <li>
                          Project Management: Gain expertise in Agile, Scrum, and other
                          project management methodologies.
                        </li>
                      </ul>
                    </section>

                    <section style={styles.section}>
                      <h2 style={styles.sectionTitle}>
                        Benefits of Partnering with Codar Institute
                      </h2>
                      <ul style={styles.list}>
                        <li>
                          Customized Training Solutions: Tailor-made programs to meet your
                          organization's specific needs.
                        </li>
                        <li>
                          Expert Instructors: Learn from industry leaders with real-world
                          experience.
                        </li>
                        <li>
                          Flexible Learning Options: Choose from on-site, online, or
                          blended learning models.
                        </li>
                        <li>
                          Comprehensive Support: Dedicated support to ensure successful
                          learning outcomes.
                        </li>
                        <li>
                          Proven Results: Track record of transforming teams into
                          high-performing units.
                        </li>
                      </ul>
                    </section>

                    <section style={styles.section}>
                      <h2 style={styles.sectionTitle}>Testimonials</h2>
                      <blockquote style={styles.quote}>
                        "Codar Institute has been instrumental in upskilling our team. The
                        customized training programs were exactly what we needed to stay
                        competitive in the market." –{" "}
                        <strong>Tech Innovators Ltd.</strong>
                      </blockquote>
                      <blockquote style={styles.quote}>
                        "Our employees have gained significant expertise in data science,
                        thanks to the hands-on approach and industry insights provided by
                        Codar Institute." – <strong>Data Dynamics Inc.</strong>
                      </blockquote>
                    </section>

                    <section style={styles.ctaSection}>
                      <h2 style={styles.sectionTitle}>Get Started Today!</h2>
                      <p>
                        Contact us to discuss how Codar Institute can help you build a
                        future-ready workforce.
                      </p>
                      <a
                        href="mailto:conatact@codarhq.com"
                        style={styles.ctaButton}
                      >
                        Contact Us
                      </a>
                    </section>
                  </div>
                </div>
       
              </MDBCardBody>
              
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Workforce;
