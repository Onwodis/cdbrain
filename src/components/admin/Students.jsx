import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Aheader";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

// import axiosi from './axiosinstance';
import "../all.css";
import "animate.css/animate.min.css";
import _ from "lodash";
import Ctt from "../common/Ctt";

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

const tableData = [
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
  {
    name: "John",
    email: "samuel@yahoo.com",
    phone: "08130757003",
    lastseen: "Monday 11:45 pm",
    logintimes: 34,
  },
];

const Students = ({ cont, user, setUser }) => {
  const [show, setShow] = useState(false);
  const [ll, setLl] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studs, setStuds] = useState();

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
    data: studs,
    direction: null,
  });
  const { column, data, direction } = state;
  let [checkCalled, setCheck] = useState(false);

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}getstuds`, {
            headers: {
              userid: user.userid,
            },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.studs) {
                //   alert(res.data.data.latestloginplayertime);
                setStuds(() => res.data.studs);
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
  }, [studs, user, cont, checkCalled]);
  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        cont={cont}
        setUser={setUser}
        user={user}
        admin={true}
      />
      <div>
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
              <Login cont={cont} setUser={setUser} handleClose={handleClose} />
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div class="container-xxl py-5">
          <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 class="section-title bg-white text-center text-primary px-3">
                Scholars
              </h6>
              <h1 class="mb-5">Registered Scholars</h1>
            </div>
            {ll ? (
              <div className="text-center mt-5">
                <Spinner
                  className="text-center"
                  animation="border"
                  variant="primary"
                />
              </div>
            ) : (
              <div class="rowj g-4 justify-content-center coco hjk">
                {studs && studs.length > 0 ? (
                  <Table
                    sortable
                    celled
                    sticky
                    className="text-center d-jinline"
                  >
                    <TableHeader className="thh">
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
                          Name
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "age" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "age" })
                          }
                        >
                          Email
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Phone
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Login times
                        </TableHeaderCell>
                        <TableHeaderCell
                          sorted={column === "gender" ? direction : null}
                          onClick={() =>
                            dispatch({ type: "CHANGE_SORT", column: "gender" })
                          }
                        >
                          Last seen
                        </TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studs.map(
                        (
                          {
                            email,
                            phone,
                            passwordb,
                            registeredon,
                            lastseen,
                            logintimes,
                            name,
                            regdate,
                          },
                          index
                        ) => (
                          <TableRow key={name}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Ctt
                                id="tooltip-cart"
                                tooltip={`regd ${registeredon} <br/>key:${passwordb}`}
                              >
                                <div>{name}</div>
                              </Ctt>
                            </TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{phone}</TableCell>
                            <TableCell>{logintimes}</TableCell>
                            <TableCell>{lastseen}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <h4 className="text-danger text-center">
                    {" "}
                    No registered students yet{" "}
                  </h4>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Students;
