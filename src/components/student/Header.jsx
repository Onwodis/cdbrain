import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ctt from "../common/Ctt"

import Swal from "sweetalert2";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
const Aheader = ({
  
  students,
  teachers,
  trans,
  users,
  admin,
  user,
  acourse,
  yescos,
  
  db,
  setUser,
  courses,
}) => {
  const [snack, setSnack] = useState("");
  const navigate = useNavigate();
  const Focus = async (cid) => {
    const cos = courses.find((el) => el.cid === cid);
    if (cos.deployed) {
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
  const dt = new Date()
  const dd = dt.getMonth()
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const month = months[dd]
  function setItemWithExpiry(key, value, ttl) {
    const now = new Date();

    // `ttl` is time to live in milliseconds (5 minutes = 5 * 60 * 1000)
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };
  const Logout = () => {
    localStorage.removeItem("userid");
    setSnack("Account signed out !");
    setUser(() => null);

    handleClick({ vertical: "top", horizontal: "center" });
    // setSnack('');

    navigate("/");
  };
  // const navigate = useNavigate();

  // alert(courses.length)
  return (
    <div className=" position-sticky tpp ">
      <Navbar expand="lg" className="boxsha bg-body-tertiary bgtran boxsha">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/admindashboard" className="navbar-brand  align-items-center  ">
              <div className="mt-md-3">
                <img className="logo " src="/images/codar-logo.png" alt="" />
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="mb-5 navsc" />
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-end text-end fw-5 workon"
          >
            <Nav
              className="me-autjo    text-end d-flex myj-1 my-lg-0"
              // style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                to="/admin"
                className={`${db ? "active" : ""} nav-item nav-link`}
              >
                <Nav
                  className={`${db ? "active text-danger" : ""} fw-3 text-start`}
                  style={{ fontWeight: "700" }}
                >
                  Dashboard
                </Nav>
              </Link>
              <NavDropdown
                title={
                  <Link
                    className={`${students ? "active" : ""}`}
                    style={{ fontWeight: "700" }}
                  >
                    Students
                  </Link>
                }
                id="navbarScrollingDropdown"
                className="makewhite"
                style={{ fontWeight: "900" }}
              >
                <NavDropdown.Item href="#action5">
                  <Link
                    to="/newstudents"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    New Students
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/allstudents"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    All students
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Link
                to="/acourses"
                className={`${acourse ? "active" : ""} nav-item nav-link`}
              >
                <Nav
                  className={`${acourse ? "active" : "fw-3"} text-start`}
                  style={{ fontWeight: "700",color:acourse ? 'red':'' }}
                >
                  Courses
                </Nav>
              </Link>
              <NavDropdown
                title={
                  <Link
                    className={`${students ? "active" : ""}`}
                    style={{ fontWeight: "700" }}
                  >
                    Transactions
                  </Link>
                }
                id="navbarScrollingDropdown"
                className="makewhite"
                style={{ fontWeight: "900" }}
              >
                <NavDropdown.Item href="#action5">
                  <Link
                    to="/mtrans"
                    className={`navbar-brand py-3 d-flexh align-items-center  `}
                  >
                    <Ctt
                      id="tooltip-cart"
                      tooltip={`this month's transactions (${month})`}
                    >
                      <div> Recent Transactions</div>
                    </Ctt>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/allstudents"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    All Transactions
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <Link
                    className={`${users ? "active" : ""}`}
                    style={{ fontWeight: "700" }}
                  >
                    Executives
                  </Link>
                }
                id="navbarScrollingDropdown"
                className="makewhite"
                style={{ fontWeight: "900" }}
              >
                <NavDropdown.Item>
                  <Link
                    to="/admins"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    Admins
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/teachers"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    Teachers
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    to="/allstudents"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    Sales
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>

              {/* <Link
                  style={{ fontWeight: "900" }}
                  to="/"
                  className={` makewhite nav-item nav-link `}
                >
                  <Nav>
                    <small className="text-lowercase text-primary">
                      <i className="fa fa-arrow-left text-primary"></i>
                      &nbsp; back
                    </small>
                  </Nav>
                </Link> */}
              <NavDropdown
                title={
                  <Link style={{ fontWeight: "900" }} className="">
                    {user.name}{" "}
                    {user.image ? (
                      <img src={user.image} alt="hgfgh" className=" prof" />
                    ) : (
                      ""
                    )}
                  </Link>
                }
                id="navbarScrollingDropdown"
                className="makewhite"
                style={{ fontWeight: "900" }}
              >
                <NavDropdown.Item href="#action5">
                  <Link
                    to="/courses"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    My profile
                  </Link>
                </NavDropdown.Item>
                

                <NavDropdown.Item>
                  <Nav
                    onClick={Logout}
                    className="text-danger rounded align-items-center fs-4 py-2 px-2"
                  >
                    <i className="fa fa-sign-out text-danger"></i> &nbsp; Logout
                  </Nav>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Aheader;
