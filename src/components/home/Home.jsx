import React ,{useEffect,useState} from 'react'
import { RevealContent, Image,ImageGroup, Reveal } from 'semantic-ui-react';
import Header from './Header'
import Nav from './Nav'
import { Link, useNavigate } from 'react-router-dom';
import Carousel from './Caro'
import Footer from './Footer'
import Test2 from './Test2'
import WOW from 'wowjs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from './Login';
import Bubbletest from './Bubbletest.jsx'
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from './Dashboard';
import Contact from './Contact';
import Studentdashboard from '../student/Dashboard';
import ContextMenu from "../common/Contextm.jsx";
import Stats from "./Stats";

import Mid from './Mid';
import Other from './Other';
import Appbar from './Appbar';
// import axiosi from './axiosinstance';
import '../all.css'
// import 'animate.css/animate.min.css';
import axios from 'axios'
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
// import "semantic-ui-css/semantic.min.css";
import Na from "../common/Na";
import Lding from "../common/Lding";




const Home = ({ cont,user,setCos,setUser,sorry,error}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  // const [contextMenu, setContextMenu] = useState({
  //   xPos: "0px",
  //   yPos: "0px",
  //   show: false,
  // });

  // const handleRightClick = (e) => {
  //   // alert(e.pageX);
  //   e.preventDefault();

  //   setContextMenu({
  //     xPos: `${e.pageX}px`,
  //     yPos: `${e.pageY}px`,
  //     show: true,
  //   });
  // };

  // const handleClick = () => {
  //   setContextMenu({
  //     ...contextMenu,
  //     show: false,
  //   });
  // };


  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showp, setShowp] = useState(false);
  const [course, setCourse] = useState({});
  const handleClosep = () => setShowp(false);
  const handleShowp = () => setShowp(true);
  const [courses, setCourses] = useState([]);
  let [checkCalled, setCheck] = useState(false);
  const navigate = useNavigate();
  const tuser = {...user}
  
  let [nc, setNc] = useState(false);
  


  useEffect(() => {
    const Check = async () => {
      try {
        setNc(true);

        await axios
          .get(user ? `${cont.api}getcoursesg/${user.userid}` : `${cont.api}getcoursesn`)
          .then((res) => {
            if (res.data.success) {
              // setFirst(false);

              if (res.data.courses.length > 0) {
                //   alert(res.data.data.latestloginplayertime);
                setCourses((prev) => [ ...res.data.courses]);

                // setFirst(false);

                // navigate('/');
              }
            } else {
              navigate('/');
            }
            if(sorry){
              Swal.fire({
                title: `Forbidden !`,
                text: `Actions like the one you just took are forbidden on this platform`,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
            }
            else if(error){
              Swal.fire({
                title: `Oops , That was an error!`,
                text: `The page you tried to access does not exist ! `,
                icon: "info",
                position: "top-end",

                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
      } catch (error) {
        // Handle error if needed
        console.error('Error:', error);
      }
      setNc(false);

      
    };

    // Check if jwtt and first are truthy
    if (!checkCalled && user ) {
      // Call Check() if conditions are met
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
    }
    else if (!checkCalled) {
      Check();

      // Set the flag to true to indicate that Check() has been called
      setCheck(!checkCalled);
      if(user){
        Check();

        // Set the flag to true to indicate that Check() has been called
        setCheck(!checkCalled);
      }
    }
  }, [courses, user, checkCalled]);
  const Focus = async (cid) => {
    const cos = courses.find((el)=> el.cid === cid)
    if (cos.paid) {
      const course = courses.filter((el) => el.cid === cid);
      navigate('/watch', { state: course });
    }
    else if (cos.deployed) {
      const course = courses.filter((el) => el.cid === cid);
      navigate('/curriculum', { state: course });
    } else {
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: 'info',
        position: 'top-end',

        showConfirmButton: false,
        timer: 2500,
      });
    }
    
  };
  const [firstOpen, setFirstOpen] = useState(false);
  // alert(courses.length);

  const Buy = async (cid) => {
    let cos = courses.find((el)=> el.cid === cid)
    if(cos.deployed){
      const course = courses.filter((el) => el.cid === cid);
      const coursees = courses.filter((el) => el.cid !== cid);
      cos.onit = true
      coursees.push(cos)
      const sortedData = coursees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setCourses((prev) => [...sortedData]);

      const formDataToSend = new FormData();
     
      formDataToSend.append('cid', cos.cid);
      formDataToSend.append('userid', user.userid);
      formDataToSend.append('api', cont.api);
      formDataToSend.append('fe', cont.fe);

      try {
        await axios.post(`${cont.api}buy`, formDataToSend).then((res) => {
          if (res.data.success) {
            if(res.data.bought){
              Swal.fire({
                title: `You already paid for this course`,
                text: ``,
                // icon: 'info',
                position: 'top-end',

                showConfirmButton: false,
                timer: 2500,
              });
              navigate('/user/'+user.userid)
            }
            else{
              setUrl(res.data.url);
              setCourse((prev) => ({ ...res.data.course }));
              window.location.href = res.data.url;
            }

            
            
          } else {
            const updatedData = sortedData.map((el) => ({
              ...el,
              onit: false,
            }));

            // Update the 'courses' state with the new array
            setCourses((prev) => [...updatedData]);

          }
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error:', error);
       
      }

      // navigate('/curriculum', { state: course });


    }
    else{
      Swal.fire({
        title: `Un-available`,
        text: ` Oops ! sorry this course is currently unavailable`,
        icon: 'info',
        position: 'top-end',

        showConfirmButton: false,
        timer: 2500,
      });
    }
    
  };
  const [openn, setOpenn] = React.useState(false);
  const handleOpenn = () => setOpenn(true);
  const handleClosen = () => setOpenn(false);

  
  
  return (
    <div
      className={`  app-container`}
      // onContextMenu={handleRightClick}
      // onClick={handleClick}
    >
      {/* <ContextMenu
        xPos={contextMenu.xPos}
        yPos={contextMenu.yPos}
        show={contextMenu.show}
        user={user}
        handleAction={handleClick}
      /> */}
      {/* <div > */}

      {/* </div> */}

      {/* <Appbar/> */}
      <Header
        data-aos="fade-down"
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        home={true}
        cont={cont}
        setUser={setUser}
        user={user}
        ifuser={user ? true : false}
        courses={courses}
        openn={openn}
        db={true}
        handleClosen={handleClosen}
        handleOpenn={handleOpenn}
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
              <Login
                cont={cont}
                setUser={setUser}
                handleClose={handleClose}
                courses={courses}
              />
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div class="container-fluid  p-0 ">
          <Bubbletest />
          {/* <img src="/girls/bimbo.jpg" alt="" /> */}
          <div
            data-aos="fade-down"
            class="tyyjj wow animate__animated animate__fadeIn owl-carousel header-carousel position-relative"
          >
            <Carousel
              setShow={setShow}
              handleClose={handleClose}
              handleShow={handleShow}
              cont={cont}
              setUser={setUser}
              user={user}
              courses={user ? true : false}
              openn={openn}
              handleClosen={handleClosen}
              handleOpenn={handleOpenn}
            />
          </div>
        </div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        > */}
        <Other
          data-aos="fade-up"
          setShow={setShow}
          handleClose={handleClose}
          handleShow={handleShow}
          cont={cont}
          setUser={setUser}
          user={user}
          courses={user ? true : false}
          openn={openn}
          handleClosen={handleClosen}
          handleOpenn={handleOpenn}
        />

        {/* <Mid /> */}
        {/* </motion.div> */}
      </div>

      <Footer cont={cont} />
    </div>
  );
};

export default Home