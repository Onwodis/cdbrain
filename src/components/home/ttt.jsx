import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Contact from "./Contact";
// import Swal from 'sweetalert2';
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
// import { FaAngleDoubleRight } from 'react-icons/fa';
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navy from "./Nav";

import Swal from "sweetalert2";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Button from "@mui/material/Button";
const Header = ({
  jobs,
  prj,
  handleShow,
  handleClose,
  mycourses,
  handleClosen,
  handleOpenn,
  openn,
  setShow,
  show,
  about,
  home,
  user,
  cont,
  setUser,
  courses,
}) => {
  const [snack, setSnack] = useState("");
  const navigate = useNavigate();

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
  // alert(courses.length)
  return (
    <div className="position-sticky tpp">
      <Contact
        openn={openn}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
        cont={cont}
      />
      {user ? (
        <div>
          <nav className="navbar navbar-expand-lg tpp bg-white navbar-light shadow sticky-top p-0">
            <Link
              to="/"
              className="navbar-brand d-flex  align-items-center px-4 px-md-5"
            >
              <div className="m-0 codar px-2  jbtw">
                <img className="logo mt-2 " src="/images/codar.png" alt="" />
                <h1 className="nname imib"> {cont.name}</h1>
              </div>
            </Link>
            <Dropdown className="d-md-none d-block">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <span className="navbar-toggler-icon"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <h2 className="d-inline">Hi {user.name}</h2>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/"
                    className={`${home ? "active" : ""} nav-item nav-link py-2`}
                  >
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  {user.acos ? (
                    <Link
                      to={`/user/${user.userid}`}
                      className={`${
                        mycourses ? "active" : ""
                      } nav-item nav-link py-2`}
                    >
                      My courses
                    </Link>
                  ) : (
                    ""
                  )}
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/" className="nav-item nav-link py-2">
                    Courses
                  </Link>
                </Dropdown.Item>

                {user.admin ? (
                  <Dropdown.Item>
                    <Link to="/admin" className="nav-item nav-link py-2">
                      Admin
                    </Link>
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                <Dropdown.Item>
                  <div onClick={Logout} className=" px-lg-2 py-2">
                    <i className="fa fa-sign-out ms-3 text-danger"></i> log out
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* <h2 className='d-inline'>{user.name}</h2> */}

            <div className="collapse navbar-collapse jbtw" id="navbarCollapse">
              <div className="navbar-nav ms-auto p-4 p-lg-0">
                {user.acos ? (
                  <Link
                    to={`/user/${user.userid}`}
                    className={`${mycourses ? "active" : ""} nav-item nav-link`}
                  >
                    My courses
                  </Link>
                ) : (
                  ""
                )}
                <Link
                  to="/"
                  className={`${courses ? "active" : ""} nav-item nav-link`}
                >
                  Explore Courses
                </Link>

                <h4 className="tibda d-md-block d-none align-items-center p-3">
                  Hi {user.name}{" "}
                  {user.admin ? (
                    <Link to="/admin" className="d-inline nav-item nav-link">
                      <i className="fa fa-user text-success"></i>
                    </Link>
                  ) : (
                    ""
                  )}
                </h4>
              </div>
              <div className="jbtw align-items-center">
                <Dropdown className="d-none d-md-block">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <span className="navbar-toggler-icon"></span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/" className="nav-item nav-link">
                        <i className="fa fa-gear codar"></i> Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={Logout}
                        className="btn btn-danger  px-lg-2 d-none d-md-block"
                      >
                        <i className="fa fa-sign-out ms-3 text-light"></i> Log
                        out
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <Navbar bg="light" className="boxsha  align-items-center" expand="lg">
            <Container className="ph">
              <Navbar.Brand href="#home" className="man">
                <Link
                  to="/"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  <div className="mt-2">
                    <img
                      className="logo py-2"
                      src="/images/codar-logo.png"
                      alt=""
                    />
                  </div>
                </Link>
              </Navbar.Brand>

              <Navbar.Toggle
                className=" py-2"
                aria-controls="basic-navbar-nav"
              />
              <Navbar.Collapse
                className="snav  justify-content-end d-flex border border-danger"
                id="basic-navbar-nav"
              >
                <Nav className="text-end text-light dull me-aujto">
                  <NavDropdown
                    className="d-none d-md-block"
                    title={`Courses`}
                    id="basic-nav-dropdown"
                  >
                    {courses && courses.length > 0
                      ? courses.map(({ cid, name }) => (
                          <NavDropdown.Item>
                            <Link
                              className="ulinks"
                              onClick={() => {
                                Focus(cid);
                              }}
                            >
                              {name}
                            </Link>
                          </NavDropdown.Item>
                        ))
                      : ""}
                  </NavDropdown>
                  <Nav.Link className="d-md-none d-block">
                    <Link className="ulinks " to="/courses">
                      Courses
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link className="ulinks" to="/about">
                      About
                    </Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </div>
  );
};

export default Header;
