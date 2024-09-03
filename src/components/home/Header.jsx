import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login'
import Contact from './Contact'
// import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
// import { FaAngleDoubleRight } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navy from "./Nav"
import Ctt from "../common/Ctt"
import Form from "react-bootstrap/Form"; 

import Swal from "sweetalert2";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import Bob from './Bubbletest'
const Header = ({
  jobs,
  prj,
  online,companies,
  
  careers,
  entry,
  
  user,
  yescos,
  cont,
  db,
  setUser,
  courses,
}) => {
  const [snack, setSnack] = useState('');
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
  }

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
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };
  const Logout = () => {
    localStorage.removeItem('userid');
    setSnack('Account signed out !');
    setUser(() => null);

    handleClick({ vertical: 'top', horizontal: 'center' });
    // setSnack('');

    navigate('/');
  };
  // const navigate = useNavigate();
  
  // alert(courses.length)
  return (
    // <div className="ug position-sticky tpp">

    <Navbar
      // style={{ maxHeight: "12vh" }}
      expand="md"
      className={`${entry ? `bgtran` : `bg-body-tekrtiary`}  position-sticky tpp boxsha ugm bll text-light  bgtlran`}
    >
      <Container fluid className="align-items-center">
        <Link to="/" className="navbar-brand  align-items-center  ">
          <Nav>
            <img className="logomm mt-1 " src="/girls/codarlogo.png" alt="" />
            {/* COdar */}
          </Nav>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" className=" navsc" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end text-end fw-5 workonn"
        >
          <Nav
            className="me-audto px-4"
            // style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {" "}
            <Link
              to="/login"
              className="d-md-none d-block bsha text-success rounded text-start col-4 fs-4 py-2 px-1"
            >
              Login
            </Link>
            <Link
              to="/online"
              className={`${online ? "active text-danger" : ""} nav-item nav-link makewhite `}
            >
              <Ctt className="mt-4" id="tooltip-cart" tooltip="Online school ">
                <Nav
                  className={`${online ? `text-danger` : `text-light`}  ms3 fw-3`}
                  style={{
                    fontWeight: "700",
                    color: online ? "red" : "white",
                  }}
                >
                  Online
                </Nav>
              </Ctt>
            </Link>
            <NavDropdown
              title={
                <Link
                  className={`${companies ? "active" : "text-light"}  3`}
                  style={{
                    fontWeight: companies ? "900" : "700",
                    color: companies ? "red" : "white",
                  }}
                >
                  For Companies
                </Link>
              }
              id="navbarScrollingDropdown"
              className="makewhite"
              style={{ fontWeight: "700" }}
            >
              <NavDropdown.Item>
                <Link
                  to="/workforce"
                  className="navbar-brand py-3"
                >
                  Build your workforce
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  to="/learnmore"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  Learn more
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="makewhite"
              title={
                <Link
                  className={`${yescos ? `active` : ``} s3`}
                  style={{
                    fontWeight: yescos ? "900" : "700",
                    color: `${yescos ? `red` : "white"}`,
                  }}
                >
                  Courses
                </Link>
              }
              style={{ fontWeight: "700", color: "red" }}
              id="navbarScrollingDropdown"
            >
              {courses && courses.length > 0
                ? courses.map(({ cid, name }) => (
                    <div>
                      <Link
                        style={{ fontWeight: "700" }}
                        className="ulinkks text-capitalize"
                        onClick={() => {
                          Focus(cid);
                        }}
                      >
                        <NavDropdown.Item key={cid}>{name}</NavDropdown.Item>
                        <NavDropdown.Divider />
                      </Link>
                    </div>
                  ))
                : ""}

              <NavDropdown.Item>
                <Link
                  to="/courses"
                  className="navbar-brand py-3 d-flexh align-items-center  "
                >
                  View all courses
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link
              to="/careers"
              style={{ fontWeight: "700" }}
              className={`${careers ? "active text-danger" : "text-light"} makewhite nav-item nav-link s3`}
            >
              <Nav>Careers</Nav>
            </Link>
          </Nav>
          <div className="d-none d-md-block text-centerk px-2 ">
            <Link
              to="/login"
              className="bg-danger rounded  text-light fs-5 py-2 px-3"
            >
              Login
            </Link>
          </div>
          {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // </div>
  );
};


export default Header