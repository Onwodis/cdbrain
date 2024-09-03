// import React, { useEffect, useState } from "react";
// import { RevealContent, Image, ImageGroup, Reveal } from "semantic-ui-react";
// import Header from "./Header";
// import { Link, useNavigate } from "react-router-dom";
// import Carousel from "./Caro";
// import Footer from "./Footer";
// import WOW from "wowjs";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import Login from "./Login";
// import Testimonial from "./Testimonial";
// // import axiosi from "../axiosinstance";
// import "../all.css";
// import "animate.css/animate.min.css";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";
// import { setCookie, getCookie, removeCookie } from "../cookie";

// const Coursesu = ({ cont, user, setUser }) => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [courses, setCourses] = useState();
//   let [checkCalled, setCheck] = useState(false);
//   const navigate = useNavigate();
//   const { userid } = useParams();

//   useEffect(() => {
//     const Check = async () => {
//       try {
//         await axios.get(`${cont.api}mycourses/${userid}`).then((res) => {
//           if (res.data.success) {
//             // setFirst(false);

//             if (res.data.courses) {
//               //   alert(res.data.data.latestloginplayertime);
//               setCourses(() => res.data.courses);
//               setUser((prev) => ({ ...prev, ...res.data.user }));
//               setCookie("userid", res.data.user.userid, 10);

//               // setFirst(false);

//               // navigate('/admin');
//             }
//           }
//           //   else {
//           //     navigate('/');
//           //   }
//         });
//       } catch (error) {
//         // Handle error if needed
//         console.error("Error:", error);
//       }
//     };

//     // Check if jwtt and first are truthy
//     if (!checkCalled) {
//       // Call Check() if conditions are met
//       Check();

//       // Set the flag to true to indicate that Check() has been called
//       setCheck(!checkCalled);
//     }
//   }, [courses, user, cont, checkCalled]);
//   const Focus = async (cid) => {
//     const cos = courses.find((el) => el.cid === cid);
//     // alert(cos.name)
//     // navigate('/curriculum', { state: cos });
//     navigate("/watch", { state: [cos] });
//   };
//   const [openn, setOpenn] = React.useState(false);
//   const handleOpenn = () => setOpenn(true);
//   const handleClosen = () => setOpenn(false);
//   return (
//     <div className="px-1 app-container">
//       <Header
//         setShow={setShow}
//         handleClose={handleClose}
//         handleShow={handleShow}
//         mycourses={true}
//         cont={cont}
//         setUser={setUser}
//         user={user}
//         openn={openn}
//         handleClosen={handleClosen}
//         handleOpenn={handleOpenn}
//       />

//       <div>
//         <Offcanvas show={show} onHide={handleClose}>
//           <Offcanvas.Body>
//             <div style={{ marginTop: "" }} className="form-sectionh fera">
//               {/* <h2 className=" text-center jbtw">
//                       Login/Sign-in{' '}
//                       <span>
//                         {' '}
//                         <i
//                           onClick={handleClose}
//                           closeButton className="fa fa-times"
//                         ></i>
//                       </span>
//                     </h2> */}
//               <Login cont={cont} setUser={setUser} handleClose={handleClose} />
//             </div>
//           </Offcanvas.Body>
//         </Offcanvas>

//         <div class="container-xxl py-5 mb-5">
//           <div class="container">
//             <div
//               class="text-center  wow animate__animated animate__slideLeft"
//               data-wow-delay="0.1s"
//             >
//               <h6 class="section-title bg-white text-center text-primary px-3">
//                 Courses
//               </h6>
//               <h1 class="mb-5 tida fs-1">My Course(s)</h1>
//             </div>
//             <div class="row g-4 justify-content-center">
//               {courses && courses.length > 0 ? (
//                 courses.map(({ image, name, paid, cid, dprice }) => (
//                   <div class="col-lg-4 col-md-6  wow animate__animated animate__bounceIn">
//                     <div class="course-item bg-light">
//                       <div class="position-relative overflow-hidden">
//                         <img class="img-fluid" src={image} alt="" />
//                         <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
//                           <div
//                             onClick={() => {
//                               Focus(cid);
//                             }}
//                             class="z-7 flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
//                             style={{ borderRadius: "30px  30px" }}
//                           >
//                             Watch Lectures
//                           </div>
//                         </div>
//                       </div>
//                       {/* <h5 class="mb-4">{name}</h5> */}
//                       <div class="text-center p-4 pb-0">
//                         <h3 class="mb-0">{dprice}</h3>
//                         <div class="mb-3">
//                           <small class="fa fa-star text-primary"></small>
//                           <small class="fa fa-star text-primary"></small>
//                           <small class="fa fa-star text-primary"></small>
//                           <small class="fa fa-star text-primary"></small>
//                           <small class="fa fa-star text-primary"></small>
//                           <small>(123)</small>
//                         </div>
//                         <h2 class="mb-4 tida">{name}</h2>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div>
//                   <h3 className="text-center text-danger">
//                     No paid courses yet !
//                   </h3>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer cont={cont} />
//     </div>
//   );
// };

// export default Coursesu;
