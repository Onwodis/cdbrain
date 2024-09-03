import React, { useEffect, useState } from "react";
import { RevealContent, Image, Reveal } from "semantic-ui-react";
import Aheader from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../home/Caro";
import Footer from "../home/Footer";
import WOW from "wowjs";
import Lding from "../common/Lding";
import Cttb from "../common/Cttb";
import ReactTooltip from "react-tooltip";

import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../home/Login";
import Tab1 from "../home/Tab1";
import Talk from "../common/Talk";
import Tw from "../texts/Tw";
import Atext from "../texts/Atext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Ctt from "../common/Ctt";
import Cttd from "../common/Cttd";
import Modal from "react-modal"; // Make sure to install react-modal first
import "../common/modal.css";

// import axiosi from './axiosinstance';
import "../all.css";
// import "animate.css/animate.min.css";
import _ from "lodash";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";


// import { useSpring, animated } from "@react-spring/web";
Modal.setAppElement("#root");

const Actions = ({ cont, user, setUser }) => {
  function getCurrentMonthYear() {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const month = getCurrentMonthYear().split(" ")[0];
  const [cname, setCname] = useState("");
  const [desc, setDesc] = useState("");
  const [actions, setActions] = useState([]);
  //   const [edit, setEdit] = useState([]);
  const [edit, setEdit] = useState({});
  
  const [pix, setPix] = useState();
  const [show, setShow] = useState(false);
  const [showe, setShowe] = useState(false);
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleClosee = () => setShowe(false);
  const handleShowe = () => setShowe(true);
  const handleShow = () => setShow(true);
  const [mentors, seactions] = useState();
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
  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: mentors,
    direction: null,
  });
  
  const { column, data, direction } = state;
  function cap(text) {
    if (typeof text !== "string" || text.length === 0) {
      return "";
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  useEffect(() => {
    const Check = async () => {
      try {
        await axios
          .get(`${cont.api}admin/getactions`, {
            headers: {
              userid: user.userid,
            },
          })
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.actions) {
                //   alert(res.data.data.latestloginplayertime);
                setActions(res.data.actions);
                
                
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
  }, [actions, user, cont, checkCalled]);
  

  const Focus = async (cid) => {
    const course = mentors.filter((el) => el.cid === cid);
    navigate("/sale", { state: course });
  };
  
  
  
  const handleCheckboxChangee = (e) => {
    if (e.target.checked) {
      setEdit((prev) => ({ ...prev, gender: e.target.value }));
    }
  };


  return (
    <div className="px-1 app-container">
      <Aheader
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        cont={cont}
        setUser={setUser}
        user={user}
      />
      <div>
        <div class="container-xxl bg-transparent py-1">
          <div class="container">
            <div class="text-center jcent">
              {/* <h6 class="section-title bg-white text-center text-danger px-3">
                actions
              </h6> */}
              <h1 class="pb-1 mb-3 mt-2  text-center s3">99Actions </h1>
            </div>

            {ll ? (
              <div className="text-center">
                <Lding />
              </div>
            ) : actions && actions.length > 0 ? (
              // <ResponsiveTableContainer
              //   // component={Paper}
              //   class="row g-4 justify-content-center coco"
              // >
              <div
              
                className="table-container table-responsive rela justify-content-center  mx-auto rounded mt-0 border border-success col-12 text-light"
                style={{
                  maxHeight: "70vh",
                  minHeight: "40vh",
                  overflow: "scroll",
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
                    <tr>
                      <th>S/N</th>
                      <th>Time</th>
                      <th>From </th>
                      <th>To</th>

                      <Cttd
                        id="tooltip-cart"
                        tooltip="What is this ?<br> 99Actions shows the activities of staff elements as described in system documentation<br>Why this ? <br>Accountability is one of the tools neccessary for an efficient system, this helps promote system integrity, data analysis, troubleshooting,and conflict resolution ."
                      >
                        <th>
                          Action <i className="  fa fa-info text-primary "></i>
                        </th>
                      </Cttd>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map(
                      (
                        {
                          master,
                          slave,
                          story,
                          when,
                          actiontype,
                          ifhost,
                          payment,
                          serious,
                          masterimage,
                          slaveimage,
                          actionid,
                        },
                        index,
                        el
                      ) => (
                        <tr key={actionid} style={{ position: "relative" }}>
                          <td>{actions.length - index}</td>
                          <td
                            style={{ width: "230px" }}
                            className={ifhost ? `` : ``}
                          >
                            <h6>{when}</h6>
                          </td>

                          <td
                            style={{ width: "130px" }}
                            className="tidamJ fs-6 cpp text-start"
                            // onClick={(e) => Focus(cid)}
                          >
                            <Ctt
                              id="tooltip-cart"
                              tooltip={` action type = ${actiontype}`}
                            >
                              <h5 className={ifhost ? `bg-warning` : ``}>
                                {master}
                              </h5>
                            </Ctt>
                          </td>

                          <td>
                            <h6>{slave}</h6>
                          </td>
                          <td
                            className={`${serious ? `text-danger` : ``} text-start ${payment ? `text-success` : ``} `}
                          >
                            <h6>{story}</h6>
                          </td>
                          {/* <TableCell>{actionid}</TableCell> */}
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            ) : (
              // </ResponsiveTableContainer>
              <div>
                <div className="d-flex jbtw col-md-6 mx-auto">
                  <div className="w-100 jbtw">
                    {/* <img className="noop" src="/gifs/nt.gif" alt="" /> */}

                    <Talk
                      bg={true}
                      a={`Hi ${user.name}`}
                      b={`There are currently no notable actions yet `}
                      c={`action are brief records actions performed  on codar brain  .`}
                      d={`!.`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
