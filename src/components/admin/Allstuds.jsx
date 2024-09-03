import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";
import { Pagination } from "react-bootstrap";

import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import Tab1 from "../home/Tab1";
import Talk from "../common/Talk";
import Tw from "../texts/Tw";
import Atext from "../texts/Atext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Ctt from "../common/Ctt";
import Cttb from "../common/Cttb";
import Modal from "react-modal"; // Make sure to install react-modal first
import "../common/modal.css";

// import axiosi from './axiosinstance';
import "../all.css";
// import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Cttd from "../common/Cttd";
import Table from "react-bootstrap/Table";

import zIndex from "@mui/material/styles/zIndex";
import RotatingText from "react-rotating-text";
import { FaCopy } from "react-icons/fa"; // Import the copy icon from react-icons
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

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
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import AOS from "aos";
import "aos/dist/aos.css";

const Students = ({ cont, user, setUser, recent }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  
  console.log(getCurrentMonthYear()[0]);
  const month = getCurrentMonthYear().split(" ")[0];

  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [search, setSearch] = useState(false);

  const [pix, setPix] = useState();

  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);

  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(edit.pwrdb);
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

  const handleShow = () => setShow(true);

  const [sum, setSum] = useState(0);
  const [trans, setTrans] = useState();
  const [strans, setStrans] = useState();
  const [edit, setEdit] = useState({});
  let [checkCalled, setCheck] = useState(false);
  const [neww, setNeww] = useState(false);
  let [ordera, setOrdera] = useState(true);
  let [hidee, setHide] = useState(true);
  let [debt, setDebt] = useState();

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [pageSize] = useState(cont.tableitems); // Items per page
  const Pago = async (page) => {
    try {
      await axios
        .get(
          `${cont.api}admin/${recent ? `recentstudents?page=${page}&limit=${pageSize}` : `allstudents?page=${page}&limit=${pageSize}`}`,
          {
            headers: { userid: user.userid },
          }
        )
        .then((res) => {
          if (!res.data.nolicense) {
            if (res.data.success) {
              setSum(res.data.sum);
              setTrans((prev) => [...res.data.trans]);

              setTotalPages(res.data.totalPages);
              setCurrentPage(res.data.currentPage);
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
  useEffect(() => {
    const Check = async (page = 1) => {
      try {
        await axios
          .get(
            `${cont.api}admin/${recent ? `recentstudents?page=${page}&limit=${pageSize}` : `allstudents?page=${page}&limit=${pageSize}`}`,
            {
              headers: { userid: user.userid },
            }
          )
          .then((res) => {
            if (!res.data.nolicense) {
              if (res.data.success) {
                setSum(res.data.sum);
                setDebt(res.data.debt);
                setTrans((prev) => [...res.data.trans]);

                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
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
      Check(currentPage);

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [
    trans,
    hidee,
    recent,
    navigate,
    pageSize,
    currentPage,
    user,
    cont,
    checkCalled,
  ]);

  const Search = async (tid) => {
    // alert(JSON.stringify(ll.batches))
    if (tid.length > 2) {
      setSearch(true);

      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/searchstuds/${tid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (res.data.strans) {
                  setStrans(res.data.strans);
                } else {
                  setStrans();
                  setSearch(false);
                }
              } else {
                Swal.fire({
                  title: "Action failed!",
                  text: "something went wrong doing this .",
                  icon: "error",
                });
              }
            });
        } catch (err) {
          setStrans();
          setSearch(false);

          //   Swal.fire({
          //     title: "I'm afraid you can't perform this operation now !",
          //     text: "Pls check your internet network ! !",
          //     icon: "caution",
          //   });
        }
      }

      Goon();
    } else {
      setStrans();
      setSearch(false);
    }
  };
  
  const handlePageChange = (page) => {
    Pago(page);
  };
  const getPaginationItems = () => {
    const maxVisiblePages = 3; // Maximum number of pagination buttons to display
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }
  const saveorder = async(ord)=>{
    try {
          await axios
            .get(`${cont.api}admin/studorder/${ord}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                setUser(res.data.user)
              } else {
                Swal.fire({
                  title: "db setting order error !",
                  text: "pls check your connection , something is wrong.",
                  icon: "error",
                });
              }
            });
        } catch (err) {
          Swal.fire({
            title: "I'm afraid you can't perform this operation now !",
            text: "Pls check your internet network ! !",
            icon: "caution",
          });
        }
  }
  function sortorder() {
    // Create a copy of the array to avoid mutating the original array
    const sortedArray = [...trans];

    // Sorting the copied array by the "name" property
    sortedArray.sort((a, b) => {
      if (ordera) {
        return a.name.localeCompare(b.name); // Ascending order
      } else if (!ordera) {
        return b.name.localeCompare(a.name); // Descending order
      }
    });
    setOrdera(!ordera);
    setTrans(sortedArray);
    ordera ? saveorder("asc") : saveorder("desc");

    return sortedArray; // Return the sorted array
  }
  function sortnew(array) {
    // Create a copy of the array to avoid mutating the original array
    const sortedArray = [...array];

    // Sorting the copied array by the "ordstring" date property
    if (neww) {
      sortedArray.sort((a, b) => new Date(a.ordstring) - new Date(b.ordstring));
    } else {
      sortedArray.sort((a, b) => new Date(b.ordstring) - new Date(a.ordstring));
    }
    setNeww(!neww);
    !neww ? saveorder("newest") : saveorder("oldest");


    return sortedArray; // Return the sorted array
  }

  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        ls={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <div class="container-xxl py-2">
          <div class="container-fluid px-2">
            <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
              <h1 class="">
                {recent ? month : "All"} Students{" "}
                <Cttb id="tooltip-cart" tooltip={`students sorting order`}>
                  <sub>
                    (<small>{user.studsort}</small>)
                  </sub>
                </Cttb>
                &nbsp; &nbsp;{" "}
                {user ? (
                  <div className="dfg">
                    <span className="text-muted text-end m-0 p-0">
                      {" "}
                      &sum; paid ({recent ? month : "all  students"}) ={" "}
                      {hidee ? "*******" : sum} &nbsp;{" "}
                      <i
                        onClick={() => {
                          setHide(!hidee);
                        }}
                        className={`${hidee ? `fa fa-eye` : `fa fa-eye-slash`} cpp`}
                      ></i>
                    </span>
                    <span className="text-muted text-end py-0 m-0">
                      &sum; debt ({recent ? month : "all  students"}) ={" "}
                      {hidee ? "********" : debt}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </h1>
            </div>

            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : (
              <div data-aos="fade-down" className=" ">
                {trans && trans.length > 0 ? (
                  <div className="col-12 align-items-center  row mx-auto px-1">
                    <div className="col-4 d-none d-md-block">
                      <ToggleButtonGroup
                        type="radio"
                        name="options"
                        defaultValue={1}
                      >
                        <ToggleButton
                          id="tbg-radio-1"
                          value={1}
                          onClick={() => setTrans(sortnew(trans))}
                        >
                          sort by {neww ? "Oldest" : "Newest"}
                        </ToggleButton>
                        <ToggleButton
                          id="tbg-radio-2"
                          value={2}
                          onClick={() => sortorder()}
                        >
                          {ordera ? "ascending" : "descending"}
                        </ToggleButton>
                        {/* <ToggleButton id="tbg-radio-3" value={3}>
                          Radio 3
                        </ToggleButton> */}
                      </ToggleButtonGroup>
                    </div>
                    <IconField
                      className="col-md-4 mx-auto col-10"
                      iconPosition="right px-5"
                    >
                      <InputIcon className="pi pi-search px-3"> </InputIcon>
                      <InputText
                        v-model="value1"
                        className="text-center"
                        onChange={(e) => Search(e.target.value)}
                        placeholder="Search student"
                      />
                    </IconField>
                    <div className="col-4"></div>
                  </div>
                ) : (
                  ""
                )}
                {trans && trans.length > 0 ? (
                  search ? (
                    strans ? (
                      strans.length > 0 ? (
                        <div
                          className="table-container table-responsive rela justify-content-center  mx-auto rounded mt-0  col-12 text-light"
                          style={{
                            maxHeight: "70vh",
                            minHeight: "40vh",
                            overflow: "scroll",
                            width: "100%",
                          }}
                        >
                          <div
                            class="text-center wow fadeInUp "
                            data-wow-delay="0.1s"
                          >
                            <h2 class="mb-1 text-center text-muted">
                              {" "}
                              Search results
                            </h2>
                          </div>

                          <Table
                            sticky
                            striped
                            bordered
                            hover
                            className="table overflow-auto rounded"
                          >
                            <thead className="tstick">
                              <tr className="mth ">
                                <td className="text-center bg-dark text-light">
                                  S/N
                                </td>

                                <td className="text-center bg-dark text-light z-7">
                                  Matric No
                                </td>

                                <td className="text-center bg-dark text-light z-7">
                                  Name
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Reg
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Course
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Batch
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Branch
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Paid
                                </td>
                                <td className="text-center bg-dark text-light z-7">
                                  Debt
                                </td>

                                <td className="text-center  bg-dark text-light z-7">
                                  Progress
                                </td>
                                <td className="text-center  bg-dark text-light z-7">
                                  Test
                                </td>
                                <td className="text-center  bg-dark text-light z-7">
                                  Exam
                                </td>
                                {/* <td className="text-center  bg-dark text-light z-7">Payment Order</td> */}
                                <td className="text-center  bg-dark text-light z-7">
                                  CGPA
                                </td>
                                <td className="text-center  bg-dark text-light z-7">
                                  Limited
                                </td>
                                <td className="text-center  bg-dark text-light z-7">
                                  Licensed
                                </td>
                                {/* <td className="text-center z-7">
                              Generated by{" "}
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`who generated/collected this payment`}
                              >
                                <i className="z-5 fa fa-info text-danger "></i>
                              </Cttb>
                            </td> */}

                                {/* {user.host ? <td>Delete</td> : ""} */}
                              </tr>
                            </thead>
                            <tbody>
                              {strans.map(
                                (
                                  {
                                    reference,
                                    matricno,
                                    due,
                                    paidby,
                                    branch,
                                    brid,
                                    dpaid,
                                    phone,
                                    progress,
                                    bid,
                                    userid,
                                    type,
                                    restricted,
                                    licensed,
                                    dowe,

                                    cname,
                                    test,
                                    exam,
                                    cgpa,
                                    indebt,
                                    batchname,
                                    dlastpayment,
                                    lastpaymentdate,
                                    name,
                                    male,
                                    gender,
                                    addedby,
                                    cc,
                                    teacher,
                                    registered,
                                    email,
                                  },
                                  index,
                                  el
                                ) => (
                                  <tr
                                    key={reference}
                                    style={{ position: "relative" }}
                                    className={`${indebt ? `bg-danger` : `bg-success`} text-center align-items-center py-1`}
                                  >
                                    <td
                                      className={
                                        progress > 0.69
                                          ? "bg-success text-center"
                                          : progress > 0.5
                                            ? "bg-primary text-center"
                                            : progress > 0.4
                                              ? "text-center bg-warning"
                                              : "text-center bg-danger"
                                      }
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${name} has completed ${progress}% of ${male ? `his` : `her`} batch curriculum`}
                                      >
                                        <p>
                                          {(currentPage - 1) * pageSize +
                                            index +
                                            1}
                                        </p>
                                      </Cttb>
                                    </td>
                                    <td>{matricno}</td>
                                    <td
                                      className="tidamJ fs-5 cpp text-start"
                                      onClick={() => {
                                        navigate(`/getstud/${bid}_${userid}`);
                                      }}
                                    >
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`email :${email},gender:${gender}`}
                                      >
                                        <div>{name}</div>
                                      </Ctt>
                                    </td>
                                    <td className="tidamJ fs-5  text-start">
                                      <Ctt
                                        id="tooltip-cart"
                                        tooltip={`date registered :${registered}<br>registered by:${addedby} <br>phone:${phone} `}
                                      >
                                        <small>{registered}</small>
                                      </Ctt>
                                    </td>
                                    <td className="text-center">
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`teacher :${teacher}`}
                                      >
                                        <div>{cname}</div>
                                      </Cttb>
                                    </td>
                                    <td className="text-center">{batchname}</td>
                                    <td className="text-center">{branch}</td>
                                    <td className="text-success text-center">
                                      {dpaid}
                                    </td>
                                    <td
                                      className={`${indebt ? `text-danger` : `text-success`} text-center`}
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`last payment :${dlastpayment} <br> ${lastpaymentdate} <br>next due date :${due}`}
                                      >
                                        <div>{indebt ? dowe : "nil"}</div>
                                      </Cttb>
                                    </td>
                                    <td className="text-center">
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`this is the rate at which ${name} has completed ${male ? `his` : `her`} course curriculum `}
                                      >
                                        <div>{progress}</div>
                                      </Cttb>
                                    </td>
                                    <td className="text-center">{test}</td>
                                    <td className="text-center">{exam}</td>
                                    <td className="text-center">{cgpa}</td>
                                    <td
                                      className={`${restricted ? `text-danger` : `text-success`} text-center`}
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${restricted ? `${name} will not be able to access core features of ${male ? `his` : `her`} account` : `${name} will be able to access core features of ${male ? `his` : `her`} account`}`}
                                      >
                                        <div>
                                          {restricted ? "true" : "false"}
                                        </div>
                                      </Cttb>
                                    </td>
                                    <td
                                      className={`${!licensed ? `text-danger` : `text-success`} text-center`}
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${!licensed ? `${name} will not be able to login to ${male ? `his` : `her`} account` : `${name} will be able to login to ${male ? `his` : `her`} account`}`}
                                      >
                                        <div>{licensed ? "true" : "false"}</div>
                                      </Cttb>
                                    </td>
                                    {/* {user.host ? (
                                  <td
                                    className="text-center cpp"
                                    onClick={(e) => Del(reference, name)}
                                  >
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`you are about to delete this transaction`}
                                    >
                                      <p>
                                        <i className="fa fa-trash text-danger text-center"></i>
                                      </p>
                                    </Ctt>
                                  </td>
                                ) : (
                                  ""
                                )} */}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      ) : (
                        <h4 className="text-muted text-center">
                          {" "}
                          search result not found !
                        </h4>
                      )
                    ) : (
                      <div>
                        <Lding />
                        {/* <h4 className="text-muted text-center"> search result not found !</h4> */}
                      </div>
                    )
                  ) : (
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
                        className="mybod table overflow-auto rounded"
                      >
                        <thead className="tstick mybod">
                          <tr className="mth">
                            <td className="text-center bg-mycol z">S/N</td>

                            <td className="text-center bg-mycol z z-7">
                              Matric No
                            </td>

                            <td className="text-center bg-mycol z z-7">Name</td>
                            <td className="text-center bg-mycol z z-7">
                              Branch
                            </td>
                            <td className="text-center bg-mycol z z-7">Reg</td>
                            <td className="text-center bg-mycol z z-7">
                              Course
                            </td>
                            <td className="text-center bg-mycol z z-7">
                              Batch
                            </td>

                            <td className="text-center bg-mycol z z-7">Paid</td>
                            <td className="text-center bg-mycol z z-7">Debt</td>

                            <td className="text-center bg-mycol z z-7">
                              Progress
                            </td>
                            <td className="text-center bg-mycol z z-7">Test</td>
                            <td className="text-center bg-mycol z z-7">Exam</td>
                            {/* <td className="text-center bg-mycol z z-7">Payment Order</td> */}
                            <td className="text-center bg-mycol z z-7">CGPA</td>
                            <td className="text-center bg-mycol z z-7">
                              Limited
                            </td>
                            <td className="text-center bg-mycol z z-7">
                              Licensed
                            </td>
                            {/* <td className="text-center z-7">
                              Generated by{" "}
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`who generated/collected this payment`}
                              >
                                <i className="z-5 fa fa-info text-danger "></i>
                              </Cttb>
                            </td> */}

                            {/* {user.host ? <td>Delete</td> : ""} */}
                          </tr>
                        </thead>
                        <tbody>
                          {trans.map(
                            (
                              {
                                reference,
                                restricted,
                                bid,
                                userid,
                                licensed,
                                matricno,
                                due,
                                paidby,
                                branch,
                                brid,
                                dpaid,
                                batch,
                                progress,
                                type,
                                other,
                                dowe,

                                cname,
                                test,
                                exam,
                                cgpa,
                                indebt,
                                batchname,
                                dlastpayment,
                                lastpaymentdate,
                                name,
                                male,
                                addedby,
                                gender,
                                email,
                                dreg,
                                cc,
                                phone,
                                dob,
                                teacher,
                                registered,
                              },
                              index,
                              el
                            ) => (
                              <tr
                                data-aos={
                                  index % 2 === 1 ? "slide-left" : "slide-right"
                                }
                                key={reference}
                                style={{ position: "relative" }}
                                className={`${indebt ? `bg-danger` : `bg-success`} text-center align-items-center py-1`}
                              >
                                <td
                                  className={
                                    progress > 0.69
                                      ? "bg-success text-center"
                                      : progress > 0.5
                                        ? "bg-primary text-center"
                                        : progress > 0.4
                                          ? "text-center bg-warning"
                                          : "text-center bg-danger"
                                  }
                                >
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`${name} has completed ${progress}% of ${male ? `his` : `her`} batch curriculum`}
                                  >
                                    <p>
                                      {(currentPage - 1) * pageSize + index + 1}
                                    </p>
                                  </Cttb>
                                </td>
                                <td>{matricno}</td>
                                <td
                                  className="tidamJ fs-5 cpp text-start"
                                  onClick={() => {
                                    navigate(`/getstud/${bid}_${userid}`);
                                  }}
                                >
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`email:${email}<br>phone:${phone}<br>dob:${new Date(dob).toDateString()}<br>registered :${dreg}<br>gender:${gender},<br>last payment :${dlastpayment} ,<br>last payment date :${
                                      lastpaymentdate
                                    }`}
                                  >
                                    <div className="s">{name}</div>
                                  </Ctt>
                                </td>
                                <td className="text-center ss3">{branch}</td>

                                <td className="tidamJ fs-5  text-start">
                                  <Ctt
                                    id="tooltip-cart"
                                    tooltip={`date registered :${registered},registered by:${addedby}`}
                                  >
                                    <small className="ss3">{registered}</small>
                                  </Ctt>
                                </td>
                                <td className="text-center">
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`teacher :${teacher}`}
                                  >
                                    <div>{cname}</div>
                                  </Cttb>
                                </td>
                                <td className="text-center ss3">{batchname}</td>
                                <td className="text-success text-center ss3">
                                  {dpaid}
                                </td>
                                <td
                                  className={`${indebt ? `text-danger` : `text-success`} text-center`}
                                >
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`last payment :${dlastpayment} <br> ${lastpaymentdate} <br>next due date :${due}`}
                                  >
                                    <div>{indebt ? dowe : "nil"}</div>
                                  </Cttb>
                                </td>
                                <td className="text-center ss3">
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`this is the rate at which ${name} has completed ${male ? `his` : `her`} course curriculum `}
                                  >
                                    <div>{progress}</div>
                                  </Cttb>
                                </td>
                                <td className="text-center">{test}</td>
                                <td className="text-center">{exam}</td>
                                <td className="text-center">{cgpa}</td>
                                <td
                                  className={`${restricted ? `text-danger` : `text-success`} text-center`}
                                >
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`${restricted ? `${name} will not be able to access core features of ${male ? `his` : `her`} account` : `${name} will be able to access core features of ${male ? `his` : `her`} account`}`}
                                  >
                                    <div>{restricted ? "true" : "false"}</div>
                                  </Cttb>
                                </td>
                                <td
                                  className={`${!licensed ? `text-danger` : `text-success`} text-center`}
                                >
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`${!licensed ? `${name} will not be able to login to ${male ? `his` : `her`} account` : `${name} will be able to login to ${male ? `his` : `her`} account`}`}
                                  >
                                    <div>{licensed ? "true" : "false"}</div>
                                  </Cttb>
                                </td>
                                {/* {user.host ? (
                                  <td
                                    className="text-center cpp"
                                    onClick={(e) => Del(reference, name)}
                                  >
                                    <Ctt
                                      id="tooltip-cart"
                                      tooltip={`you are about to delete this transaction`}
                                    >
                                      <p>
                                        <i className="fa fa-trash text-danger text-center"></i>
                                      </p>
                                    </Ctt>
                                  </td>
                                ) : (
                                  ""
                                )} */}
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )
                ) : (
                  <div>
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 jbtw">
                        <Talk
                          bg={true}
                          a={`Codarbrain is yet to get any transaction`}
                          b={` transactions will pop up here as soon as you register any payment for student.`}
                          c={`Go to student biodata to add student transaction , or go to batch in focus to manually add student/transaction .`}
                          d={`pls do not forget to enter only valid details !.`}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-center  mt-5">
                  {!search && trans && trans.length > 0 ? (
                    <Pagination className="custom-pagination">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />

                      {/* Dynamically render the pagination items based on the current range */}
                      {getPaginationItems().map((page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
