import React, { useEffect, createContext, useContext, useState } from "react";
import 'react-bootstrap'
import axios from "axios";
import Home from "./components/home/Home";
import Admin from "./components/admin/Dashboard";
import Acourse from "./components/admin/Course";
import Controls from "./components/admin/Controls";
import Curri from "./components/home/Curri";
import Acourses from "./components/admin/Acourses";
import Courseallstudents from "./components/admin/course/Allstudents";
import Coursenewstudents from "./components/admin/course/Newstudents";
import Atopics from "./components/admin/Topics";
import Acurri from "./components/admin/batch/Curri";
import Student from "./components/admin/batch/Student";
import Actions from "./components/admin/Actions";
import Asales from "./components/admin/Sales";
import About from "./components/home/About";
import Learnmore from "./components/home/Learnmore";
import Workforce from "./components/home/Workforce";
import Online from "./components/home/Online";
import Careers from "./components/home/Careers";
import Sc from "./components/common/Sc";
import Atrans from "./components/admin/Atrans";
import Adtrans from "./components/admin/Transactions";
import Madtrans from "./components/admin/Mtransactions";
import Pending from "./components/admin/Pending";
import Allleads from "./components/admin/Allleads";
import Mleads from "./components/admin/Mleads";
import Allstuds from "./components/admin/Allstuds";
import Mstuds from "./components/admin/Mstuds";
import Mentors from "./components/admin/Mentors";
import Courses from "./components/home/Courses";
import Watch from "./components/home/Watch";
import Coursesu from "./components/home/Coursesu";
import Course from "./components/admin/Course";
import Prj from "./components/home/Prj";
import Jobs from "./components/home/Jobs";
// import Allcourses from "./components/student/Allcourses";
import Sform from "./components/home/Entry";
import Swal from "sweetalert2";
import Mentordashboard from './components/mentor/Dashboard'
import Admins from './components/admin/Admins'
import Admindashboard from "./components/admin/Dashboard";
import Adminbatches from "./components/admin/Batches";
import Branches from "./components/admin/Branches";
import Marque from './components/home/marque'
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/saga-blue/theme.css"; // Choose your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';



// import "animate.css/animate.min.css";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./res.css";
// import "semantic-ui-css/semantic.min.css";

import {
  HashRouter as Router,
  useLocation,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
// import MyContext from './components/context';
// import Signup from './components/Signup';
import Cookies from "js-cookie";
// index.js or App.js
// import "bootstrap/dist/css/bootstrap.min.css";

import codarr from "./codarbg.png";

import "@fortawesome/fontawesome-free/css/all.css";
import { useUser } from "../src/components/usercontext";
import { setCookie, getCookie, removeCookie } from "./components/cookie";
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./styles.module.css";

// import "primereact/resources/themes/lara-light-cyan/theme.css";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;



function App() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { user, setUser } = useUser();
  const codar = "url(/girls/codarbg.png)";
  const dum = {
    name: "Codar",
    fname: "Codar Institute",

    phone: "+234 8130757003",
    email: "info@codarhq.com",
    expiresin: 5,
    idle: 5,
    tableitems: 10,
    cc: false,
    vl: "",
    codar: codarr,
    cmail: "careers@codarinstitute.com",

    // api: "http://localhost:1000/",
    // fe: "http://localhost:3000/",
    api: "https://codarhq2024.onrender.com/",
    fe: "https://codarbrain.netlify.app",
  };

  const [cont, setCont] = useState({...dum});

  // const [user, setUser] = useState(false);

  const hasExpired = () => {
    const nd = new Date();
    const userid = localStorage.getItem("user");
    const expiresin = localStorage.getItem("expires");

    if (userid && expiresin) {
      if (nd > new Date(expiresin)) {
        // Token has expired
        // alert('expired ' + expiresin);
        Swal.fire({
          title: `Time-out`,
          text: `pls login again `,
          icon: "info",
          position: "top-end",

          showConfirmButton: false,
          timer: 2500,
        });
        localStorage.removeItem("user");
        localStorage.removeItem("expires");
        setUser(null);
        // navigate('/') // Uncomment if you have a navigation function
        return true;
      } else {
        // Token is still valid
        return false;
      }
    }

    // If no user or expiresin is found
    return true;
  };
  
  


  const updateUser = (newUser) => {
    setUser(newUser);
    // alert(newUser.idle)
    // setCont((prev)=>({...prev,expiresin:newUser.idle}))
  };
  
  const games = [
    {
      name: "Pick6",
      image: "/images/dice.gif",
      to: "single",
      gameid: "tr14246867550852",
      one: 0,
      two: 0,
      three: 0,
      four: 1.2,
      five: 1.5,
      six: 2.0,
      about:
        "Welcome to Pick6, where your fortunes await at the roll of the dice! Step into a world of thrilling uncertainty, where every click brings you closer to uncovering your fate. In this captivating game of chance, players hold their breath as they watch the dice spin, anticipation building with each passing moment. Will luck be on your side, revealing a winning combination that propels you to victory? Or will you face the challenge head-on, embracing the exhilarating risk that comes with every roll? Join us in the excitement of Pick6, where the journey is as exhilarating as the destination. Dare to roll the dice and discover what fate has in store for you!",
    },
    {
      name: "Team Quest",
      image: "/images/ballers.gif",
      // image: '/images/droll.gif',
      to: "/double",
      gameid: "tr1323744346786",
      about:
        "Step into the world of Adventures, where every roll counts towards victory! In this adrenaline-fueled game of chance, players embark on a thrilling journey of dice rolls, each one bringing them closer to glory. With only ten rolls at their disposal, every decision becomes crucial as they strategize and aim for the highest possible score. Will you play it safe and secure steady points, or risk it all for the chance of a game-changing roll? As the tension mounts with each toss of the dice, the excitement reaches its peak as players race against time to clinch the title of champion. Join us in After 10, where the quest for victory awaits with every roll of the dice!",
    },
  ];
  const [courses, setCourses] = useState();

  const location = useLocation();
  const { state } = location;
  // const [trans, setTrans] = useState([]);
  const [cos, setCos] = useState([]);

  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));
  const [ref, { left, top }] = useMeasure();

  const handleMouseMove = (e) => {
    api.start({ xy: [e.clientX-left, e.clientY-top] });
  };
  useEffect(() => {
    const handleActivity = () => {
      // Retrieve the cookie value
      const userid = getCookie("userid");
      if (user && userid) {
        // setUser(() => user);
        setCont((prev) => ({ ...prev, expiresin: user.idle, idle: user.idle ,tableitems:user.tableitems}));
      

        setCookie("userid", user.userid, cont.idle);
      } else if (user && !userid) {
        setUser(() => null);
        Swal.fire({
          title: `active time expired !`,
          text: `Login again : You have been inactive for too long`,
          icon: "info",
          // position: 'top-end',

          showConfirmButton: false,
          timer: 5500,
        });
        navigate("/");
      }
      console.log("User:", user);
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  });

  return (
    <PrimeReactProvider>
      {/* <MyContext.Provider value={cont}> */}
      <div
        className={`${styles.container} cbg`}
        style={{
          height: "120vh",
          background: codar,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* <svg
          className="d-md-block d-none"
          style={{ position: "absolute", width: 0, height: 0, zIndex: 1 }}
        >
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="30"
            />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
            />
          </filter>
        </svg>
        <div
          ref={ref}
          className={`${styles.hooksMain} d-md-block d-none`}
          onMouseMove={handleMouseMove}
        >
          {trail.map((props, index) => (
            <animated.div
              key={index}
              style={{ transform: props.xy.to(trans) }}
            />
          ))}
        </div> */}
        <Sc />
        <Routes>
          <Route
            path="/user/:userid"
            element={
              <Coursesu
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
              />
            }
          />
          <Route
            path="/adminpendinggettransactions"
            element={
              user && user.admin ? (
                <Adtrans cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/allleads"
            element={
              user && user.admin ? (
                <Allleads cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/newleads"
            element={
              user && user.admin ? (
                <Mleads
                  recent={true}
                  cont={cont}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* <Route
            path="/newleads"
            element={
              user && user.admin ? (
                <Allleads recent={true} cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/allstuds"
            element={
              user && user.admin ? (
                <Allstuds cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* <Route
            path="/newstuds"
            element={
              user && user.admin ? (
                <Allstuds cont={cont} recent={true} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          /> */}
          <Route
            path="/newstuds"
            element={
              user && user.admin ? (
                <Mstuds
                  cont={cont}
                  recent={true}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admingettransactions"
            element={
              user && user.admin ? (
                <Adtrans cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/adminrecenttransactions"
            element={
              user && user.admin ? (
                <Madtrans
                  recent={true}
                  cont={cont}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/pending"
            element={
              user && user.admin ? (
                <Pending
                  recent={true}
                  cont={cont}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/branches"
            element={
              user && user.admin ? (
                <Branches cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/adminbatches/:cid"
            element={
              user && user.admin ? (
                <Adminbatches cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/getstud/:string"
            element={
              user && user.admin ? (
                <Student cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/curri/:bid"
            element={
              user && user.admin ? (
                <Acurri cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/courseallstudents/:cid"
            element={
              user && user.admin ? (
                <Courseallstudents
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/coursenewstudents/:cid"
            element={
              user && user.admin ? (
                <Coursenewstudents
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/controls"
            element={
              user && user.host ? (
                <Controls cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/actions"
            element={
              user && user.host ? (
                <Actions
                  cont={cont}
                  games={games}
                  user={user}
                  dmy={true}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dmyactions"
            element={
              user && user.host ? (
                <Actions
                  cont={cont}
                  games={games}
                  user={user}
                  dmy={true}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/mandyactions"
            element={
              user && user.host ? (
                <Actions
                  cont={cont}
                  games={games}
                  user={user}
                  mandy={true}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/sform"
            element={
              <Sform
                cont={cont}
                setCont={setCont}
                games={games}
                user={user}
                sign={true}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/mentordashboard"
            element={
              user && user.isTeacher ? (
                <Mentordashboard
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                  courses={cos}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admindashboard"
            element={
              user && user.admin ? (
                <Admindashboard cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Sform
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/careers"
            element={
              <Careers
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/online"
            element={
              <Online
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/learnmore"
            element={
              <Learnmore
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/workforce"
            element={
              <Workforce
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={cos}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={courses}
                setCourses={setCourses}
                exact
              />
            }
          />
          <Route
            path="/sorry"
            element={
              <Home
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={courses}
                setCourses={setCourses}
                sorry={true}
                exact
              />
            }
          />
          <Route
            path="/prj"
            element={
              <Prj
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={courses}
                setCourses={setCourses}
              />
            }
          />
          <Route
            path="/jobs"
            element={
              cont ? (
                <Jobs
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                  courses={courses}
                  setCourses={setCourses}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/courses"
            element={
              <Courses
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
              />
            }
          />
          <Route
            path="/admin"
            element={
              user && user.admin ? (
                <Admin
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/acourse/:cid"
            element={
              user && user.admin ? (
                <Acourse cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/admintopics/:cid"
            element={
              user && user.admin ? (
                <Atopics cont={cont} user={user} setUser={updateUser} />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/atrans"
            element={
              user && user.admin ? (
                <Atrans
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/asales"
            element={
              user && user.admin ? (
                <Asales
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />

          <Route
            path="/course"
            element={
              state ? (
                <Course
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/curriculum"
            element={
              state ? (
                <Curri
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/watch"
            element={
              user ? (
                <Watch
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/curriculum"
            element={
              <Curri
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
              />
            }
          />
          <Route
            path="/acourses"
            element={
              user && user.admin ? (
                <Acourses
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          {/* <Route
            path="/allcourses"
            element={
              user ? (
                <Allcourses
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          /> */}
          <Route
            path="/admins"
            element={
              user && user.admin ? (
                <Admins
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/teachers"
            element={
              user && user.admin ? (
                <Mentors
                  cont={cont}
                  games={games}
                  user={user}
                  setUser={updateUser}
                />
              ) : (
                <Navigate to="/sorry" />
              )
            }
          />
          <Route
            path="/about"
            element={
              <About
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
              />
            }
          />
          <Route
            path="/*"
            element={
              <Home
                cont={cont}
                games={games}
                user={user}
                setUser={updateUser}
                courses={courses}
                setCourses={setCourses}
                error={true}
                exact
              />
            }
          />
        </Routes>
        <Marque />
      </div>
      {/* </MyContext.Provider> */}
    </PrimeReactProvider>
  );
}

export default App;
