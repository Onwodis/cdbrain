import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Ctt from "../common/Ctt"

import Swal from "sweetalert2";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
const Aheader = ({
  
  students,
  teachers,branches,
  trans,
  users,
  ls,
  user,
  acourse,
  yescos,
  actions,
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
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "q") {
        event.preventDefault();
        console.log("Ctrl + S pressed");
        // alert(course.cid);
        navigate(`/controls`);
        // Add your logic here
      } 
      // else if (event.altKey && event.key === "t") {
      //   event.preventDefault();
      //   console.log("Ctrl + S pressed");
      //   // alert(course.cid);
      //   navigate(`/admintopics/${course.cid}`);
      //   // Add your logic here
      // }

    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user]);
  // const navigate = useNavigate();

  // alert(courses.length)
  return (
    // <div className=" position-sticky tpp ">
    <Navbar
      style={{ maxHeight: "12vh" }}
      expand="lg"
      className="position-sticky tpp bg-body-tertiary bgtdran boxsha"
    >
      <Container fluid className="">
        <Link
          to="/admindashboard"
          className="navbar-brand  align-items-center  "
        >
          <Nav>
            <img className="logom mb-1" src="/images/codar-logo.png" alt="" />
            {/* COdar */}
          </Nav>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" className=" navsc" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end text-end fw-5 text-start workonn"
        >
          <Nav
            // style={{ maxHeight: "12vh" }}
            className="me-autjo align-items-center   text-end d-flex my-1 my-lg-0"
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
                  className={`${ls ? "active text-danger" : ""}`}
                  style={{ fontWeight: "700" }}
                >
                  L/S
                </Link>
              }
              id="navbarScrollingDropdown"
              className="makewhite"
              style={{ fontWeight: "900" }}
            >
              <NavDropdown.Item>
                <Link
                  to="/newleads"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  New Leads
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/allleads"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  All leads
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/newstuds"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  New Students
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/allstuds"
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
                className={`${courses ? "active text-danger" : "fw-3"} text-start`}
                style={{ fontWeight: "700", color: acourse ? "red" : "" }}
              >
                Courses
              </Nav>
            </Link>
            <NavDropdown
              title={
                <Link
                  className={`${trans ? "active text-danger" : ""}`}
                  style={{ fontWeight: "700" }}
                >
                  Transactions
                </Link>
              }
              id="navbarScrollingDropdown"
              className="makewhite"
              style={{ fontWeight: "900" }}
            >
              <NavDropdown.Item>
                <Link
                  to="/pending"
                  className={`navbar-brand py-1 d-flexh align-items-center  `}
                >
                  <Ctt id="tooltip-cart" tooltip={`un-approved transactions`}>
                    <div> Pending Transactions</div>
                  </Ctt>
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/adminrecenttransactions"
                  className={`navbar-brand py-1 d-flexh align-items-center  `}
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
                  to="/admingettransactions"
                  className="navbar-brand py-1 d-flexh align-items-center  "
                >
                  All Transactions
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <Link
                  className={`${users ? "active" : ""}`}
                  style={{ fontWeight: "700", color: users ? "red" : "" }}
                >
                  Executives
                </Link>
              }
              id="navbarScrollingDropdown"
              className="makewhite"
              style={{ fontWeight: "900" }}
            >
              {user.host ? (
                <NavDropdown.Item style={{ zIndex: 50 }}>
                  <Link
                    to="/admins"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    Admins
                  </Link>
                </NavDropdown.Item>
              ) : (
                ""
              )}
              <NavDropdown.Item style={{ zIndex: 50 }}>
                <Link
                  to="/teachers"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  Teachers
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item style={{ zIndex: 50 }}>
                <Link
                  to="/asales"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  Sales
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to="/branches"
              className={`${acourse ? "active" : ""} nav-item nav-link`}
            >
              <Nav
                className={`${branches ? "" : "fw-3"} text-start`}
                style={{ fontWeight: "700", color: branches ? "red" : "" }}
              >
                Branches
              </Nav>
            </Link>
            {user.allowcc ? (
              <a
                target="__blank"
                href="https://emperor6.com.ng"
                className={`${acourse ? "active" : ""} nav-item nav-link`}
              >
                <Ctt id="tooltip-cart" tooltip="Codar Coins">
                  <Nav
                    className={`${courses ? "" : "fw-3"} text-start`}
                    style={{ fontWeight: "700", color: acourse ? "red" : "" }}
                  >
                    CC
                  </Nav>
                </Ctt>
              </a>
            ) : (
              ""
            )}

            <NavDropdown
              title={
                <Link
                  style={{ fontWeight: "900" }}
                  className=" align-items-center"
                >
                  {user.name}{" "}
                  {/* {user.image ? (
                      <img
                        src={user.image}
                        alt="hgfgh"
                        className="d-md-block prof"
                      />
                    ) : (
                      ""
                    )} */}
                </Link>
              }
              id="navbarScrollingDropdown"
              className="makewhite"
              style={{ fontWeight: "900" }}
            >
              <NavDropdown.Item href="#action5" style={{ zIndex: 50 }}>
                <Link
                  to="/courses"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  My profile
                </Link>
              </NavDropdown.Item>
              {user.host ? (
                <NavDropdown.Item style={{ zIndex: 50 }}>
                  <Link
                    to="/actions"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    <i class="fas fa-cog"></i> 
                    Actions
                  </Link>
                </NavDropdown.Item>
              ) : (
                ""
              )}
              {user.host ? (
                <NavDropdown.Item style={{ zIndex: 50 }}>
                  <Link
                    to="/controls"
                    className="navbar-brand py-3 d-flexh align-items-center  "
                  >
                    <i className="fa fa-gear"></i> Controls
                  </Link>
                </NavDropdown.Item>
              ) : (
                ""
              )}

              <NavDropdown.Item style={{ zIndex: 50 }}>
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
    // </div>
  );
};

export default Aheader;
