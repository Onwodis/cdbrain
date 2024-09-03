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
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


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

const Transactions = ({ cont, user, setUser ,recent}) => {
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
  const [neww, setNeww] = useState(false);
  let [ordera, setOrdera] = useState(true);

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

  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [pageSize] = useState(cont.tableitems); // Items per page
  const Pago = async (page) => {
    try {
      await axios
        .get(
          `${cont.api}admin/gettransactions?page=${page}&limit=${pageSize}}`,
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
    const Check = async (page=1) => {
      try {
        await axios
          .get(
            `${cont.api}admin/${recent ? `recenttransactions?page=${page}&limit=${pageSize}` : `gettransactions?page=${page}&limit=${pageSize}`}`,
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

    // Check if jwtt and first are truthy
    if (!checkCalled) {
      // Call Check() if conditions are met
      Check(currentPage);

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
  }, [trans,currentPage, user, cont, checkCalled]);

  const Search = async (tid) => {
    // alert(JSON.stringify(ll.batches))
    if (tid.length > 2) {
      setSearch(true);

      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/searchtrans/${tid}`, {
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
  const Del = async (tid, name) => {
    const ll = trans.find((el) => el.reference === tid);
    const lln = trans.filter((el) => el.reference !== tid);
    // setTrans(lln)
    
    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/deltransaction/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (!res.data.alreadydeleted) {
                setTrans(lln);

              } else {
                setCourses(res.data.courses);
                Swal.fire({
                  title:
                    "this course seems to have been deleted even before you thought of it !",
                  text: "Deleting courses frequently is strongly prohibited ! !",
                  icon: "error",
                });
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
        Swal.fire({
          title: "I'm afraid you can't perform this operation now !",
          text: "Pls check your internet network ! !",
          icon: "caution",
        });
      }
    }
    Swal.fire({
      title: `Are you sure you want to delete ${name} ?`,
      text: `note :this is irreversible! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
    
  };
  const Dels = async (tid, name) => {
    const ll = strans.find((el) => el.reference === tid);
    const lln = strans.filter((el) => el.reference !== tid);
    // setTrans(lln)
    
    async function Goon() {
      try {
        await axios
          .get(`${cont.api}admin/deltransaction/${tid}`, {
            headers: { userid: user.userid },
          })
          .then((res) => {
            if (res.data.success) {
              if (!res.data.alreadydeleted) {
                setStrans(lln);

              } else {
                setCourses(res.data.courses);
                Swal.fire({
                  title:
                    "this course seems to have been deleted even before you thought of it !",
                  text: "Deleting courses frequently is strongly prohibited ! !",
                  icon: "error",
                });
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
        Swal.fire({
          title: "I'm afraid you can't perform this operation now !",
          text: "Pls check your internet network ! !",
          icon: "caution",
        });
      }
    }
    Swal.fire({
      title: `Are you sure you want to delete ${name} ?`,
      text: `note :this is irreversible! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i am sure !",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
    
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
  };
  const saveorder = async (ord) => {
    try {
      await axios
        .get(`${cont.api}admin/transorder/${ord}`, {
          headers: { userid: user.userid },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
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
  };
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
    <div className="px-1  app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        trans={true}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <div class="container-xxl py-4 ">
          <div class="container-fluid px-md-5">
            <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
              <h1 class="s3">
                {recent ? month : "All"} Transactions{" "}
                <Cttb id="tooltip-cart" tooltip={`students sorting order`}>
                  <sub>
                    (<small>{user.transort}</small>)
                  </sub>
                </Cttb>
                <span className="text-muted text-end">total = {sum}</span>
              </h1>
            </div>
            {/* {user.cudaccess ? (
              <div className="mt-1 mb-5 jbtw">
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-danger"
                  onClick={setShow}
                >
                  Add Course
                </Button>
              </div>
            ) : (
              ""
            )} */}
            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : (
              <div className=" ">
                {trans && trans.length > 0 ? (
                  <div className="col-12 align-items-center row mx-auto px-1">
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
                      iconPosition="right px-5 "
                    >
                      <InputIcon className="pi pi-search px-3"> </InputIcon>
                      <InputText
                        v-model="value1"
                        className="text-center"
                        onChange={(e) => Search(e.target.value)}
                        placeholder="Search transactions"
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
                              <tr className="mth">
                                <td className="text-center">S/N</td>

                                <td className="text-center z-7">Date</td>

                                <td className="text-center z-7">Name</td>
                                <td className="text-center z-7">Branch</td>
                                <td className="text-center z-7">Mat no</td>

                                <td className="text-center z-7">Course</td>
                                <td className="text-center z-7">Batch</td>
                                <td className="text-center z-7">Reference</td>

                                <td className="text-center z-7">Mode</td>
                                {/* <td className="text-center z-7">Payment Order</td> */}
                                <td className="text-center z-7">Amount</td>
                                <td className="text-center z-7">
                                  Generated by{" "}
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`who generated/collected this payment`}
                                  >
                                    <i className="z-5 fa fa-info text-danger "></i>
                                  </Cttb>
                                </td>
                                <td className="text-center z-7">
                                  Approved by{" "}
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`who Approved/accepted this payment`}
                                  >
                                    <i className="z-5 fa fa-info text-danger "></i>
                                  </Cttb>
                                </td>

                                {user.host ? <td>Delete</td> : ""}
                              </tr>{" "}
                            </thead>
                            <tbody>
                              {strans.map(
                                (
                                  {
                                    reference,
                                    licensed,
                                    transid,branch,
                                    userid,
                                    bid,
                                    cudaccess,
                                    registered,
                                    firstpayment,
                                    physical,

                                    type,
                                    other,
                                    paidby,
                                    dpaid,
                                    batch,
                                    matno,

                                    cname,
                                    damount,
                                    date,
                                    orderb,
                                    name,
                                    approvedby,
                                    cid,
                                  },
                                  index,
                                  el
                                ) => (
                                  <tr
                                    key={userid}
                                    style={{ position: "relative" }}
                                    className="text-center align-items-center py-1"
                                  >
                                    <td
                                      className={
                                        firstpayment
                                          ? "bg-success text-center"
                                          : "text-center bg-warning"
                                      }
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`this is ${name}'s ${orderb} payment`}
                                      >
                                        <p>{index + 1}</p>
                                      </Cttb>
                                    </td>
                                    <td>
                                      <small>{date}</small>
                                    </td>
                                    <td
                                      className="tidamJ fs-5 cpp text-start"
                                      onClick={() => {
                                        navigate(`/getstud/${bid}_${userid}`);
                                      }}
                                    >
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${other}`}
                                      >
                                        <div className="ss3">{name}</div>
                                      </Cttb>
                                    </td>
                                    <td>{branch}</td>
                                    <td className="ss3">{matno}</td>
                                    {user && user.cudaccess ? (
                                      <td className="text-center">
                                        <Link to={`/acourse/${cid}`}>
                                          <Cttb
                                            id="tooltip-cart"
                                            tooltip={`${batch}`}
                                          >
                                            <div className="fss">{cname}</div>
                                          </Cttb>
                                        </Link>
                                      </td>
                                    ) : (
                                      <td className="text-center">
                                        <Cttb
                                          id="tooltip-cart"
                                          tooltip={`${batch}`}
                                        >
                                          <div>{cname}</div>
                                        </Cttb>
                                      </td>
                                    )}
                                    <td className="text-center">{batch}</td>
                                    <td className="text-center">{reference}</td>

                                    <td>{type}</td>

                                    {/* <td className="text-center">
                                        {orderb}
                            
                                    </td> */}
                                    <td>{damount}</td>
                                    <td>{paidby}</td>
                                    <td>{approvedby}</td>

                                    {user.host ? (
                                      <td
                                        className="text-center cpp"
                                        onClick={(e) => Dels(reference, name)}
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
                                    )}
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
                        className="table overflow-auto rounded"
                      >
                        <thead className="tstick ">
                          <tr className="mth kbody">
                            <td className="text-center">S/N</td>

                            <td className="text-center z-7">Date</td>

                            <td className="text-center z-7">Name</td>
                            <td className="text-center z-7">Branch</td>
                            <td className="text-center z-7">Mat no</td>

                            <td className="text-center z-7">Course</td>
                            <td className="text-center z-7">Batch</td>
                            <td className="text-center z-7">Reference</td>

                            <td className="text-center z-7">Mode</td>
                            <td className="text-center z-7">Order</td>

                            {/* <td className="text-center z-7">Payment Order</td> */}
                            <td className="text-center z-7">Amount</td>
                            <td className="text-center z-7">
                              Gen by{" "}
                              <Cttb
                                id="tooltip-cart"
                                tooltip={`who generated/collected this payment`}
                              >
                                <i className="z-5 fa fa-info text-danger "></i>
                              </Cttb>
                            </td>
                            <td className="text-center z-7">
                              App by {" "}
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`who Approved/accepted this payment`}
                              >
                                <i className="z-5 fa fa-info text-danger "></i>
                              </Ctt>
                            </td>

                            {user.host ? <td>Delete</td> : ""}
                          </tr>
                        </thead>
                        <tbody>
                          {trans.map(
                            (
                              {
                                reference,
                                cid,
                                bid,
                                paidby,
                                dpaid,
                                batch,
                                matno,
                                type,
                                other,

                                cname,
                                damount,
                                date,
                                orderb,
                                firstpayment,

                                name,branch,
                                approvedby,
                                userid,
                              },
                              index,
                              el
                            ) => (
                              <tr
                                key={reference}
                                style={{ position: "relative" }}
                                className="text-center bg-danger align-items-center py-1"
                              >
                                <td
                                  className={
                                    firstpayment
                                      ? "bg-success text-center"
                                      : "text-center bg-warning"
                                  }
                                >
                                  <Cttb
                                    id="tooltip-cart"
                                    tooltip={`this is ${name}'s ${orderb} payment`}
                                  >
                                    <p>
                                      {(currentPage - 1) * pageSize + index + 1}
                                    </p>
                                  </Cttb>
                                </td>
                                <td>
                                  <small>{date}</small>
                                </td>
                                <td
                                  className="tidamJ fs-5 cpp text-start"
                                  onClick={() => {
                                    navigate(`/getstud/${bid}_${userid}`);
                                  }}
                                >
                                  <Cttb id="tooltip-cart" tooltip={`${other}`}>
                                    <div className="ss3">{name}</div>
                                  </Cttb>
                                </td>
                                <td>{branch}</td>
                                <td className="ss3">{matno}</td>
                                {user && user.cudaccess ? (
                                  <td className="text-center">
                                    <Link to={`/acourse/${cid}`}>
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${batch}`}
                                      >
                                        <div>{cname}</div>
                                      </Cttb>
                                    </Link>
                                  </td>
                                ) : (
                                  <td className="text-center">
                                    <Cttb
                                      id="tooltip-cart"
                                      tooltip={`${batch}`}
                                    >
                                      <div>{cname}</div>
                                    </Cttb>
                                  </td>
                                )}
                                <td className="text-center">{batch}</td>
                                <td className="text-center">{reference}</td>
                                <td>{type}</td>
                                <td>{orderb}</td>

                                <td>{damount}</td>
                                <td className="f ss3">{paidby}</td>
                                <td className="s ss3">{approvedby}</td>
                                {user.host ? (
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
                                )}
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

export default Transactions;
