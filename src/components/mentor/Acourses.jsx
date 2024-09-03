import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import Tab1 from "../home/Tab1";
import Tw from "../texts/Tw";
import Talk from "../common/Talk";
import Atext from "../texts/Atext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

// import axiosi from './axiosinstance';
import "../all.css";
// import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Lding from "../common/Lding";
import Ctt from "../common/Ctt";

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";
import zIndex from "@mui/material/styles/zIndex";
import RotatingText from "react-rotating-text";

import {
  //   Table,
  //   TableBody,
  //   TableCell,
  TableContainer,
  TableHead,
  //   TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const Acos = ({ cont, user, setUser }) => {
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [course, setCourse] = useState({});
  const [pix, setPix] = useState();
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    desc: "",
    name: "",

    // Add more fields as needed
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState();
  let [checkCalled, setCheck] = useState(false);

  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

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
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: courses,
    direction: null,
  });
  const { column, data, direction } = state;

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getcoursesa`, {
            headers: {
              userid: "jhgfdfghj",
            },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses(res.data.courses);
                setTeachers(res.data.teachers);
                setPix((prev) => res.data.pix);
                const oi = res.data.pix;
                setImage((prev) => oi[0].image);
                // setFirst(false);

                // navigate('/admin');
              }
            } else {
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
  }, [courses, user, cont, checkCalled]);
  const Scourse = async (e) => {
    e.preventDefault();
    setLlb(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in course) {
      formDataToSend.append(key, course[key]);
    }

    try {
      await axios
        .post(`${cont.api}admin/addcourse`, formDataToSend)
        .then((res) => {
          if (res.data.success) {
            if (res.data.courses) {
              //   alert(res.data.data.latestloginplayertime);
              setCourses(() => res.data.courses);
              const oi = res.data.pix;
              setImage((prev) => oi[0].image);
              handleClose();

              // alert(res.data.user);

              Swal.fire({
                title: `New course added successfully`,

                icon: "success",
              });
            } else {
              // Dalert(res.data.message);
              Swal.fire({
                title: `there was an error performing this action`,
                text: `Error`,
                icon: "error",
              });
            }
          } else {
            // Dalert('pls check your network connection');
            Swal.fire({
              title: `error : error`,
              text: `error`,
              icon: "error",
            });
            setLlb(true);
          }
        });
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error);
      //   setLlb(true);
      // Dalert('pls check your network connection');
    }
    setLlb(true);
  };

  const Focus = async (cid) => {
    const course = courses.filter((el) => el.cid === cid);
    navigate("/course", { state: course });
  };
  const Del = async (cid, name) => {
    async function Goon() {
      await axios.get(`${cont.api}delcourse/${cid}`).then((res) => {
        if (res.data.success) {
          // setFirst(false);

          if (res.data.courses) {
            //   alert(res.data.data.latestloginplayertime);
            setCourses(res.data.courses);
            const oi = res.data.pix;
            setImage((prev) => oi[0].image);
            Swal.fire({
              title: "Deleted !",
              text: "course  deleted successfully ! !",
              icon: "success",
            });
          }
        } else {
          Swal.fire({
            title: "Not Deleted!",
            text: "something went wrong deleting this file.",
            icon: "error",
          });
        }
      });
    }
    Swal.fire({
      title: `Are you sure you want to delete ${name}'s (course) ?`,
      text: `You won't be able to revert this ! `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Goon();
      }
    });
  };
  const ResponsiveTableContainer = styled(TableContainer)({
    "@media (max-width: 600px)": {
      "& thead": {
        display: "none",
      },
      "& tr": {
        display: "block",
        marginBottom: "1rem",
      },
      "& td": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "&:before": {
          content: "attr(data-label)",
          fontWeight: "bold",
          marginRight: "1rem",
        },
      },
    },
  });
  return (
    <div className="px-1 app-container">
      <Header
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        cont={cont}
        setUser={setUser}
        user={user}
        acourse={true}
      />
      <div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Body>
            <div className="text-end col-12 px-2">
              <Link onClick={handleClose} className="text-end">
                <i className="text-danger fa fa-times fa-2x"></i>
              </Link>
            </div>
            <div style={{ marginTop: "" }} className="form-sectionh fera">
              <div class="login-root">
                <div class="box-rootd flex-flex flex-direction--column stt">
                  <div class="box-rootd  flex-flex flex-direction--column fg-11 zz-9">
                    <div class="box-rootd  flex-flex flex-justifyContent--center">
                      <Link
                        to="/"
                        className="navbar-brand d-flex align-items-center px-4 px-lg-5 "
                      >
                        <div className="m-0 codar px-2  jbtw">
                          <img
                            className="logob mt-2"
                            src="/images/codar-logo.png"
                            alt=""
                          />
                          {/* <h1 className="nname imib"> {cont.name}</h1> */}
                        </div>
                      </Link>
                    </div>
                    <div class="formbg-outer">
                      <div class="formbg">
                        <div class="formbg-inner ">
                          <h2 class="padding-bottom--15">Add new course</h2>

                          {/* {teachers && teachers.length > 0 ? (
                            ""
                          ) : (
                            <div>
                              <h4>You have to add teachers  first </h4>
                            </div>
                          )} */}
                          {teachers && teachers.length > 0 ? (
                            <form
                              id="stripe-login"
                              className=""
                              onSubmit={Scourse}
                            >
                              <div class="field mb-1">
                                <input
                                  type="text"
                                  placeholder="Course Tittle"
                                  value={course.name}
                                  required
                                  className="text-center"
                                  minLength={3}
                                  onChange={(e) =>
                                    setCourse((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  name="name"
                                />
                              </div>
                              {/* <p>{teachers.length}</p> */}
                              {course.name && course.name.length > 2 ? (
                                <div>
                                  <div class="field mb-1">
                                    {/* <label for="lname">Last name</label> */}
                                    <input
                                      type="number"
                                      placeholder="Course fee in Naira"
                                      value={course.price}
                                      required
                                      className="text-center"
                                      min={1}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          price: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div class="field mb-1">
                                    {/* <label for="lname">Last name</label> */}
                                    <input
                                      type="number"
                                      placeholder="Course duration in months"
                                      value={course.duration}
                                      required
                                      className="text-center"
                                      min={1}
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          duration: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {course.name &&
                              // course.gender &&
                              course.duration &&
                              course.name.length > 2 &&
                              course.duration > 0 ? (
                                <div>
                                  <div class="field mb-4">
                                    <select
                                      required
                                      className="form-control text-center "
                                      name="level"
                                      id=""
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          tid: e.target.value,
                                        }))
                                      }
                                    >
                                      <option
                                        selected
                                        disabled
                                        value="commonentrance"
                                      >
                                        ~ Select Teacher ~
                                      </option>
                                      {teachers.map((el) => (
                                        <option value={el.userid}>
                                          {el.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {course.name &&
                              course.duration &&
                              course.tid &&
                              course.name.length > 2 &&
                              course.duration > 1 ? (
                                <div>
                                  <div class="fieldmn mb-1">
                                    <img
                                      className="rounded text-center mx-3 mb-3"
                                      style={{
                                        objectFit: "contain",
                                        width: "7vw",
                                      }}
                                      src={course.image}
                                      alt=""
                                    />
                                    {course.image ? (
                                      <div>
                                        <label for="avatar">
                                          Selected course avatar
                                        </label>
                                      </div>
                                    ) : (
                                      <label
                                        className="text-center"
                                        for="avatar"
                                      >
                                        Select course avatar
                                      </label>
                                    )}

                                    <div className="row px-2 w-100 mb-2 rolla py-2">
                                      {pix && pix.length > 0
                                        ? pix.map((el, index) => (
                                            <div
                                              // onClick={(e) =>
                                              //   setImage((prev) => el.image)
                                              // }
                                              onClick={(e) =>
                                                setCourse((prev) => ({
                                                  ...prev,
                                                  image: el.image,
                                                }))
                                              }
                                              className="col-md-4 col-4  rounded text-center tayo cpp"
                                              key={index}
                                            >
                                              <img
                                                style={{
                                                  objectFit: "contain",
                                                  width: "100%",
                                                  height: "100%",
                                                }}
                                                src={el.image}
                                                alt=""
                                              />
                                            </div>
                                          ))
                                        : ""}
                                    </div>
                                  </div>
                                  <div class="fieldkl mb-1 w-100 px-1">
                                    <textarea
                                      name="desc"
                                      placeholder="Course description "
                                      className="form-control w-100 border border-danger"
                                      onChange={(e) =>
                                        setCourse((prev) => ({
                                          ...prev,
                                          desc: e.target.value,
                                        }))
                                      }
                                      id=""
                                      required
                                      style={{ resize: "none" }}
                                    ></textarea>
                                  </div>

                                  {llb ? (
                                    course.desc && course.desc.length > 12 ? (
                                      <div class="field paddingk-bottom--24">
                                        <button
                                          type="submit"
                                          className="button"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    <div className="text-center">
                                      <Lding />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                            </form>
                          ) : (
                            <div>
                              <div className="d-flex jbtw">
                                {/* <h4>You have to add teachers first </h4> */}
                                <div className="w-100 text-success">
                                  <p>
                                    You currently do not have any registered
                                    teacher(s)
                                  </p>
                                  <p>
                                    You can not add a course without a teacher
                                  </p>
                                  <p>
                                    Pls click the button below to add a teaching
                                    staff
                                  </p>
                                </div>
                                <img
                                  className="noop"
                                  src="/gifs/nt.gif"
                                  alt=""
                                />
                              </div>
                              <div className="col-12 justify-content-center d-flex col-12">
                                <div className="col-6 text-center">
                                  <Link
                                    to="/teachers"
                                    className="bg-danger rounded mr-3 text-light fs-4 py-2 px-lg-2 d-none d-lg-block"
                                  >
                                    Add Teacher
                                    <i className="fa fa-arrow-right ms-3"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div class="container-xxl py-5 btran">
          <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="section-title bg-white text-center text-danger px-3">
                Courses
              </h6>
              <h1 class="mb-5">Admin Courses</h1>
            </div>
            <div className="mb-5">
              <Button
                variant="contained"
                color="primary"
                className="bg-danger"
                onClick={setShow}
              >
                Add course
              </Button>
            </div>
            {ll ? (
              <div className="text-center mx-auto mt-5">
                <div className="text-center">
                  <Lding />
                </div>
              </div>
            ) : (
              <ResponsiveTableContainer
                component={Paper}
                class="row g-4 justify-content-center coco"
                // style={{ minHeight: "60vh" }}
              >
                {courses && courses.length > 0 ? (
                  <Table
                    sortable
                    celled
                    sticky
                    className="text-center"
                    // style={{ minHeight: "60vh" }}
                  >
                    <TableHeader style={{ zIndex: 88 }} className="thh  mt-5">
                      <TableRow>
                        <TableHeaderCell
                          className="text-center"
                          sorted={column === "name" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "name" })
                          }
                        >
                          S/N
                        </TableHeaderCell>
                        <TableHeaderCell
                          className="text-center"
                          sorted={column === "name" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "name" })
                          }
                        >
                          Avatar
                        </TableHeaderCell>
                        <TableHeaderCell
                          className="text-center z-7"
                          sorted={column === "name" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "name" })
                          }
                        >
                          Name
                        </TableHeaderCell>
                        <TableHeaderCell
                          className="text-center z-7"
                          sorted={column === "name" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "name" })
                          }
                        >
                          Duration
                        </TableHeaderCell>
                        <TableHeaderCell
                          className="text-center z-7"
                          sorted={column === "name" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "name" })
                          }
                        >
                          Mentor
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "age" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "age" })
                          }
                        >
                          Cost
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Date Added
                        </TableHeaderCell>

                        <TableHeaderCell
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Revenue
                        </TableHeaderCell>
                        <TableHeaderCell
                          className="text-danger"
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Delete
                        </TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map(
                        (
                          {
                            dprice,
                            deployed,
                            cid,
                            addedby,
                            dprofit,
                            image,
                            durationm,
                            createddate,
                            name,
                            teacher,
                            students,
                          },
                          index
                        ) => (
                          <TableRow key={cid} style={{ position: "relative" }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <img className="imm rounded" src={image} alt="" />
                            </TableCell>
                            <TableCell
                              className="tidam fs-5 cpp text-capitalize"
                              onClick={(e) => Focus(cid)}
                            >
                              {name}{" "}
                              {deployed ? (
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`This course has been deployed </br> added by: ${addedby}`}
                                >
                                  <i className="fa fa-check text-success"></i>
                                </Ctt>
                              ) : (
                                <Ctt
                                  id="tooltip-cart"
                                  tooltip={`This course is un-deployed </br> added by: ${addedby}`}
                                >
                                  <i className="fa fa-times text-danger"></i>
                                </Ctt>
                              )}{" "}
                              &nbsp; <small>({students} stdnt(s))</small>
                            </TableCell>
                            <TableCell>{durationm}</TableCell>
                            <TableCell>{teacher}</TableCell>
                            <TableCell>{dprice}</TableCell>
                            <TableCell>{createddate}</TableCell>
                            <TableCell>{dprofit}</TableCell>
                            <TableCell
                              className="text-danger"
                              onClick={(e) => Del(cid, name)}
                            >
                              <i className="fa fa-trash"></i>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <div>
                    <div className="d-flex jbtw col-md-6 mx-auto">
                      <div className="w-100 ">
                        <Talk
                        bg={true}
                          a={`Oops ! Welcome ,  It seems you just onboarded the system `}
                          b={`You currently do not have any course(s) registered`}
                          c={`Pls click the button above to add a course`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </ResponsiveTableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acos;
