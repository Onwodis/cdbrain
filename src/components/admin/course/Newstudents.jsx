import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "../Header";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

import WOW from "wowjs";
import Lding from "../../common/Lding";

import Offcanvas from "react-bootstrap/Offcanvas";

import Talk from "../../common/Talk";

import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Ctt from "../../common/Ctt";
import Cttb from "../../common/Cttb";
import Modal from "react-modal"; // Make sure to install react-modal first
import "../../common/modal.css";

// import axiosi from './axiosinstance';
import "../../all.css";
import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

import Cttd from "../../common/Cttd";
import Table from "react-bootstrap/Table";

import zIndex from "@mui/material/styles/zIndex";
import RotatingText from "react-rotating-text";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons

import {
  //   Table,
  //   TableBody,
  //   Table.Cell,
  TableContainer,
  TableHead,
  //   TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
Modal.setAppElement("#root");

const Allstudents = ({ cont, user, setUser }) => {
  const { cid } = useParams();
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const location = useLocation();
  const { state } = location;
  const ccourse = state && state[0];

  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [students, setStudents] = useState({});
  const [pages, setPages] = useState({});

  const [pix, setPix] = useState();
  const [course, setCourse] = useState({});
  const [showe, setShowe] = useState(false);
  const [showm, setShowm] = useState(false);
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  const handleClose = () => setShow(false);
  const handleClosem = () => setShowm(false);
  const handleClosee = () => setShowe(false);
  const handleShow = () => setShow(true);
  const handleShowm = () => setShowm(true);
  const handleShowe = () => setShowe(true);
  let [checkCalled, setCheck] = useState(false);

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

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          //   .get(`${cont.api}admin/getadmins`, {
          .get(`${cont.api}admin/allcoursestudents/${cid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                // setFirst(false);

                if (res.data.students) {
                  // alert('kjhgfc');
                  setStudents((prev) => [...res.data.students]);
                  //   setPages((prev) => [...res.data.pages]);
                  setCourse((prev) => res.data.course);

                  // navigate('/admin');
                } else {
                  setStudents([]);
                  //   setPages((prev) => [...res.data.pages]);
                }
              } else {
                navigate("/");
              }
            } else {
              Swal.fire({
                title: "You do not have the license to visit this route !",
                text: "Contact management ! !",
                icon: "success",
              });
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
  }, [students, user, cont, checkCalled]);
  const Focus = async (cid) => {
    // const course = courses.filter((el) => el.cid === cid);
    navigate("/acourse", { state: course });
  };

  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        users={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <div class="container-xxl py-5">
          <div class="container">
            <div class="text-center wow fadeInUp mb-2" data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                students
              </h6> */}
              <h1 class="mb-1">New {course.name} Students</h1>
              <div className="text-end z-5">
                <h3 className="text-end ">
                  <Ctt
                    id="tooltip-cart"
                    tooltip={`clicking this will take you back to ${course.name} profile page.`}
                  >
                    <Link
                      as
                      button
                      to={`/acourse/${course.cid}`}
                      className="  button z-5"
                    >
                      <i className="fa fa-angle-double-left fa-2x mb-1"></i>
                    </Link>
                  </Ctt>
                </h3>
              </div>
            </div>

            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : (
              <div className="mt-3">
                {students && students.length > 0 ? (
                  <div
                    className="table-container table-responsive rela justify-content-center  mx-auto rounded mt-0  col-12 text-light"
                    style={{
                      maxHeight: "70vh",
                      minHeight: "40vh",
                      overflow: "scroll",
                      width: "100%",
                    }}
                  >
                    <Table
                      sticky
                      striped
                      bordered
                      hover
                      className="table overflow-auto rounded"
                    >
                      <thead style={{ zIndex: 2 }} className="tstick">
                        <tr>
                          <th className="text-center">S/N</th>
                          {/* <th
                          className="text-center"
                          
                        >
                          Image
                        </th> */}
                          <th className="text-center z-7">Mat no</th>
                          <th className="text-center z-7">Name</th>
                          <th>Batch</th>

                          <th>Email</th>
                          <th>Phone</th>

                          <th>Last seen</th>

                          <th>Today Logins</th>

                          <th>Attendance</th>

                          <th>
                            License{"   "}
                            <Cttb
                              id="tooltip-cart"
                              tooltip={`Why License ? <br>It is very important host admin has undisputed control over all activities on codarbrain , as host admin will be held accountable for all or any data disruption or corruption in codarbrain system ,Host should be able to suspend staff's license at the slightest suspicion of foul play in the system. `}
                            >
                              <i className="z-5 fa fa-info text-danger "></i>
                            </Cttb>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(
                          (
                            {
                              dprice,
                              licensed,
                              cudaccess,
                              registered,
                              physical,
                              userid,
                              email,
                              level,
                              batchname,
                              attendance,
                              leads,
                              logindmytimes,
                              mandyleads,
                              dmyleads,
                              logintimes,
                              lastseen,
                              gender,
                              education,
                              phone,
                              createddate,
                              batch,
                              name,
                              desc,
                              students,
                            },
                            index,
                            el
                          ) => (
                            <tr
                              key={userid}
                              style={{ position: "relative" }}
                              className="mtr"
                            >
                              <td>{index + 1}</td>

                              <td className="text-capitalise">{userid}</td>
                              <td className="text-capitalise">{name}</td>
                              <td className="text-capitalise">{batchname}</td>

                              <td className="text-capitalise">{email}</td>
                              <td className="text-capitalise">{phone}</td>
                              <td className="text-capitalise">{lastseen}</td>
                              <td>
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`todays login times ,note higher logintimes should arouse suspicions on system malpractice from user .`}
                                >
                                  <div>{logindmytimes}</div>
                                </Ctt>
                              </td>
                              <td className="text-capitalise">{attendance}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 jbtw">
                        {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                        <Talk
                          bg={true}
                          a={`Welcome , it seems you just reset/onboarded this management system `}
                          b={`You currently do not have any course yet `}
                          c={`pls click the button above to add a course associate .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allstudents;
