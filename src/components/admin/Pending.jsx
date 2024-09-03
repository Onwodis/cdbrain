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
Modal.setAppElement("#root");

const Pending = ({ cont, user, setUser, recent }) => {
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

  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [pageSize] = useState(20); // Items per page
  const Pago = async (page) => {
    try {
      await axios
        .get(`${cont.api}admin/pending?page=${page}&limit=${pageSize}`,
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
            `${cont.api}admin/pending?page=${page}&limit=${pageSize}`,
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
  }, [trans, currentPage, user, cont, checkCalled]);

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
    // alert(JSON.stringify(ll.batches))
    if (ll.batches > 0 || ll.students > 0) {
      Swal.fire({
        title: "This is a busy course!",
        text: "You can not delete a course with batches or students .If codarbrain allows this , it will create a serious imbalance in the system  .",
        icon: "caution",
      });
    } else {
      async function Goon() {
        try {
          await axios
            .get(`${cont.api}admin/deltrans/${tid}`, {
              headers: { userid: user.userid },
            })
            .then((res) => {
              if (res.data.success) {
                if (!res.data.alreadydeleted) {
                  if (res.data.courses) {
                    //   alert(res.data.data.latestloginplayertime);
                    setCourses(res.data.courses);

                    Swal.fire({
                      title: "course deleted successfully !",
                      text: "Deleting courses frequently is strongly prohibited ! !",
                      icon: "success",
                    });
                  }
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
        text: `note :this will also delete batches , and topics associated with this course ! `,
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
  };

  return (
    <div className="px-1 app-container">
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
        <div class="container-xxl py-5">
          <div class="container">
            <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                course
              </h6> */}
              <h1 class="">
                {" "}
                Pending Transactions &nbsp; &nbsp;{" "}
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
              <div className="mt-3 ">
                {trans && trans.length > 0 ? (
                  <div className="col-md-5 col-7 col-lg-4 mx-auto px-3">
                    <IconField iconPosition="right px-5">
                      <InputIcon className="pi pi-search px-3"> </InputIcon>
                      <InputText
                        v-model="value1"
                        className="text-center"
                        onChange={(e) => Search(e.target.value)}
                        placeholder="Search pending transactions"
                      />
                    </IconField>
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
                                <td className="text-center z-7">Course</td>
                                <td className="text-center z-7">Reference</td>

                                <td className="text-center z-7">Mode</td>
                                <td className="text-center z-7">Mat no</td>
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
                              </tr>
                            </thead>
                            <tbody>
                              {strans.map(
                                (
                                  {
                                    reference,
                                    licensed,
                                    transid,
                                    cudaccess,
                                    registered,
                                    physical,
                                    userid,
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
                                    cc,
                                  },
                                  index,
                                  el
                                ) => (
                                  <tr
                                    key={userid}
                                    style={{ position: "relative" }}
                                    className="text-center align-items-center py-1"
                                  >
                                    <td>{index + 1}</td>
                                    <td>{date}</td>
                                    <td className="tidamJ fs-5  text-start">
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${other}`}
                                      >
                                        <div>{name}</div>
                                      </Cttb>
                                    </td>
                                    <td className="text-center">
                                      <Cttb
                                        id="tooltip-cart"
                                        tooltip={`${batch}`}
                                      >
                                        <div>{cname}</div>
                                      </Cttb>
                                    </td>
                                    <td className="text-center">{reference}</td>

                                    <td>{type}</td>

                                    <td>{matno}</td>

                                    {/* <td className="text-center">
                                        {orderb}
                            
                                    </td> */}
                                    <td>{damount}</td>
                                    <td>{paidby}</td>
                                    <td>{approvedby}</td>

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
                        <thead className="tstick">
                          <tr className="mth">
                            <td className="text-center">S/N</td>

                            <td className="text-center z-7">Date</td>

                            <td className="text-center z-7">Name</td>
                            <td className="text-center z-7">Course</td>
                            <td className="text-center z-7">Reference</td>

                            <td className="text-center z-7">Mode</td>
                            <td className="text-center z-7">Mat no</td>
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
                                transid,
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

                                name,
                                approvedby,
                                cc,
                              },
                              index,
                              el
                            ) => (
                              <tr
                                key={reference}
                                style={{ position: "relative" }}
                                className="text-center align-items-center py-1"
                              >
                                <td>
                                  {(currentPage - 1) * pageSize + index + 1}
                                </td>{" "}
                                <td>{date}</td>
                                <td className="tidamJ fs-5  text-start">
                                  <Cttb id="tooltip-cart" tooltip={`${other}`}>
                                    <div>{name}</div>
                                  </Cttb>
                                </td>
                                <td className="text-center">
                                  <Cttb id="tooltip-cart" tooltip={`${batch}`}>
                                    <div>{cname}</div>
                                  </Cttb>
                                </td>
                                <td className="text-center">{reference}</td>
                                <td>{type}</td>
                                <td>{matno}</td>
                                <td>{damount}</td>
                                <td>{paidby}</td>
                                <td>{approvedby}</td>
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
                          a={`There are currently no pending transactions .`}
                          b={`Unverified transactions initiated by sales or students will be displayed here .`}
                          c={`Incase you want to add transactions , locate student in student batch and click transactions while in student batch (only cudaccess).`}
                          d={`pls do not forget to treat data with utmost caution  !.`}
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

export default Pending;
