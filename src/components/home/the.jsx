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
          <nav className="navbar px-3 navbar-expand-lg tpp bg-white navbar-light shadow sticky-top ">
            <Dropdown className="d-md-none d-block">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <span className="navbar-toggler-icon"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/"
                    className={`${home ? "active" : ""} nav-item nav-link `}
                  >
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/courses"
                    className={`${
                      courses ? "active" : ""
                    } nav-item nav-link py-2`}
                  >
                    Courses
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/prj"
                    className={`${prj ? "active" : ""} nav-item nav-link py-2`}
                  >
                    Build
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/jobs"
                    className={`${jobs ? "active" : ""} nav-item nav-link py-2`}
                  >
                    Careers
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/about"
                    className={`${
                      about ? "active" : ""
                    } nav-item nav-link py-2`}
                  >
                    About Us
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <Link
                    onClick={handleOpenn}
                    className="nav-item nav-link py-2"
                  >
                    Contact us
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center px-4 px-lg-5 "
            >
              <div className="m-0 codar px-2  jbtw">
                <img className="logo mt-2" src="/images/codar.png" alt="" />
                <h1 className="nname imib"> {cont.name}</h1>
              </div>
            </Link>
            <button
              type="button"
              className="navbar-toggler me-4"
              data-bs-toggle="dropdown"
            >
              {/* <span className="dropdown-toggle navbar-toggler-icon"></span> */}

              <span onClick={handleShow} className="text-success ">
                <i className="fa fa-sign-in"></i>
              </span>
            </button>
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

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto p-4 p-lg-0">
                <Link
                  to="/"
                  className={`${home ? "active" : ""} nav-item nav-link `}
                >
                  Online School 
                </Link>
                <Link
                  to="/courses"
                  className={`${courses ? "active" : ""} nav-item nav-link `}
                >
                  Courses
                </Link>

                
                <Dropdown className="d--none d-block">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    For Companies
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link
                        to="/"
                        className={`${home ? "active" : ""} nav-item nav-link `}
                      >
                        Home
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Link
                  to="/jobs"
                  className={`${jobs ? "active" : ""} nav-item nav-link `}
                >
                  Careers
                </Link>
                <Link
                  to="/about"
                  className={`${about ? "active" : ""} nav-item nav-link`}
                >
                  About Us
                </Link>

                <Link onClick={handleOpenn} className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <Link
                to="/sform"
                className="bg-danger rounded mr-3 text-light fs-6 py-2 px-lg-2 d-none d-lg-block"
              >
                Join Now<i className="fa fa-arrow-right ms-3"></i>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
