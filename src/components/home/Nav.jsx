import React  from 'react';
import {useNavigate}  from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import {Link} from "react-router-dom"
import Swal from "sweetalert2";

const Navy = ({jobs,
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
  courses}) => {
    const navigate = useNavigate()
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
  return (
    <nav class="navbar">
      <div class="navbar-container">
        <a href="#" class="navbar-brand">
          MyWebsite
        </a>
        <ul class="navbar-menu">
          <li class="navbar-item">
            <a href="#" class="navbar-link">
              Home
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link">
              About
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link">
              Services
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" class="navbar-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );

}


export default Navy ;