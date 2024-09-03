import React,{useState,useEffect} from 'react';
import { TabPane, Tab } from 'semantic-ui-react';

import { Link, useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';
// import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
// import Mheader from './Mheader';

import Cookies from 'universal-cookie';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';

import Spinner from 'react-bootstrap/Spinner';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from 'sweetalert2';
import { setCookie, getCookie, removeCookie } from '../cookie';

import './login.css'



const Login = ({ handleClose,cont ,user,setUser,courses}) => {
  const [error, setError] = useState(null);

  const [data, setNewdata] = React.useState({});
  const [vcode, setVcode] = useState('');
  const cookies = new Cookies();

  const [cookieValue, setCookieValue] = useState(cookies.get('myCookie') || '');

  let [signn, setSign] = useState(true);
  let [ss, setSs] = useState(true);
  const [verifying, setVerifying] = useState(false);
  // let [allowsign, setAllowsign] = useState(false);
  // let [lemail, setLemail] = useState('samuelonwodi@yahoo.com');
  // let [pwrd, setLpwrd] = useState('12345678');
  let [lemail, setLemail] = useState('');
  let [pwrd, setLpwrd] = useState('');
  let [wrongemail, setWrongemail] = useState('');
  // let [track, setTrack] = useState(false);
  let [sname, setSsname] = useState('');
  let [verify, setVerify] = useState(false);
 
  let [signups, setSignups] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
    cid:'',
    country:'',
    media:''
  });
  const [nvcode, setNvcode] = useState('');
  const [ll, setLl] = useState(true);
  const [llb, setLlb] = useState(true);
  const [llv, setLlv] = useState(true);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  let [activeb, setActiveb] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    vcode: '',
    // Add more fields as needed
  });
  const Slogin = async (e) => {
    e.preventDefault();
    setLl(false);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Iterate through the form data and append each field and value to FormData
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('pwrd', pwrd);
    formDataToSend.append('email', lemail);

    // alert(formDataToSend.get('vcode'));

    console.log(
      formDataToSend.svcode,
      formDataToSend.token,
      data.token + ' are  fe tokens'
    );

    try {
      await axios.post(`${cont.api}login`, formDataToSend).then((res) => {
        if (res.data.success) {
          if (res.data.user) {
            
            // const expiresin = cont.expiresin;
            // const expires = new Date(new Date().getTime() + expiresin * 1000)
            // localStorage.setItem('user', res.data.user.userid);
            // localStorage.setItem('expires', expires);
            handleClose();
            cookies.set('jwt', res.data.token);
            
            setCookie('userid', res.data.user.userid, 10);
            // alert(res.data.user);
            Swal.fire({
              title: `Welcome back ${res.data.user.name}`,
              text: `Last seen :${res.data.user.lastseen}`,
              // icon: 'info',
              position: 'top-end',
              
              showConfirmButton: false,
              timer: 2500,
            });

            setUser((prev) => res.data.user);
            

            navigate('/');

            
          } else {
            // Dalert(res.data.message);
            Swal.fire({
              title: `${res.data.message}`,
              text: `User not found`,
              icon: 'info',
            });
            setSign(true);
            setVerify(false);
            setLl(true);
          }
        } else {
          // Dalert('pls check your network connection');
          Swal.fire({
            title: `error :${res.data.message}`,
            text: `${res.data.message}`,
            icon: 'info',
          });
          setLl(true);
        }
      });
    } catch (error) {
      // Handle error if needed
      console.error('Error:', error);
      setLl(true);
      // Dalert('pls check your network connection');
    }
  };
  const Signup = async (e) => {
    e.preventDefault();
    if (llb) {
      setLlb(!llb);

      // Create a new FormData object
      const formDataToSend = new FormData();

      // Iterate through the form data and append each field and value to FormData
      for (let key in signups) {
        formDataToSend.append(key, signups[key]);
      }
      


      try {
        await axios.post(`${cont.api}signup`, formDataToSend).then((res) => {
          if (res.data.success) {
            if (!res.data.ifUser){
              setVcode(res.data.vcode);
              setVerify(true);
              setDone(true)

              setTimeout((e) => {
                if(done){
                  setVcode('expired');
                  
                }
              }, 120000);
            } 
            else{
              setVcode('expired');
              setVerify(false);
              setLlb(true);
              setNvcode('');
              // handleClose();
              Swal.fire({
                title: `Email in use  !`,
                text: `Pls use another email`,
                icon: 'caution',
                position: 'top-end',
              });
              
            }
            
          } else {
            if (res.data.message) {
              Swal.fire({
                title: `${res.data.message}`,
                text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                icon: 'error',
              });
              // setSign(true);
              setVerify(false);
              setVerifying(false);
              setVcode('');
            } else {
              Swal.fire({
                title: `Sign up error`,
                text: `pls check your network connection`,
                icon: 'error',
              });
              // setSign(true);
              setVerify(false);
              setVcode('');
              setVerifying(false);
            }
          }
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error:', error);
        setVerifying(false);

      }
      setLlb(true);


    }
  };
  const [inputType, setInputType] = useState('password');
  const [iconName, setIconName] = useState('eye');
  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    if (inputType === 'password') {
      setInputType('text');
      setIconName('eye slash');
    } else {
      setInputType('password');
      setIconName('eye');
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    setDone(false)
    if(vcode === 'expired'){
      setVerify(false);
      setLlb(true);
      setNvcode('');
      handleClose();
      Swal.fire({
        title: `Verification expired !`,
        text: `Pls sign up again`,
        icon: 'caution',
        position: 'top-center',
      });
    }
    else if(vcode === Number(nvcode)){
      if (!verifying) {
        setVerifying(true);

        // Create a new FormData object
        const formDataToSend = new FormData();

        // Iterate through the form data and append each field and value to FormData
        for (let key in signups) {
          formDataToSend.append(key, signups[key]);
        }
        formDataToSend.append('vcode', vcode);

        try {
          await axios.post(`${cont.api}finalsign`, formDataToSend).then((res) => {
            if (res.data.success) {
              if (res.data.user) {
                Swal.fire({
                  title: `Hi ${res.data.user.name} , your registeration was successful`,
                  text: `Welcome to professional excellence !`,
                  icon: 'success',
                });
                setUser(res.data.user);
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1); // Expires in 1 day
                cookies.set('user', data.token, { expires: expirationDate });
                setCookieValue(data.token);
                setLlv(!llv);
                handleClose();
                navigate('/');
              } else {
                Swal.fire({
                  title: `${res.data.message}`,
                  text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                  icon: 'error',
                });
                // setSign(true);
                setVerify(false);
                setVerifying(false);
              }
            } else {
              if (res.data.message) {
                Swal.fire({
                  title: `${res.data.message}`,
                  text: `We are experiencing difficulties verifying your  account at this moment due to the above error message`,
                  icon: 'error',
                });
                // setSign(true);
                setVerify(false);
                setVerifying(false);
                setVcode('');
                setLlv(!llv)
                handleClose()
              } else {
                Swal.fire({
                  title: `Sign up error`,
                  text: `pls check your network connection`,
                  icon: 'error',
                });
                // setSign(true);
                setVerify(false);
                setVcode('');
                setVerifying(false);
              }
            }
          });
        } catch (error) {
          // Handle error if needed
          console.error('Error:', error);
          setVerifying(false);
        }
      }
    }
    else{
      alert(nvcode + ' jhjkj ' + vcode)
      Swal.fire({
        title: `Incorrect verification code`,
        text: `The verification code you entered is incorrect `,
        icon: 'caution',
      });
      handleClose();
      setVerify(false);
      setVerifying(false);
    }
    
  };
  const panes = [
    {
      menuItem: "Sign-up",
      render: ({ handleClose }) => (
        <TabPane>
          <div className="jbtw w-100">
            <h1 className="text-primary">{cont.fname}</h1>
            <i
              onClick={handleClose}
              closeButton
              className="fa fa-times text-danger"
            ></i>
          </div>
          <div class="login-root">
            <div class="box-root flex-flex flex-direction--column stt">
              <div class="box-root  flex-flex flex-direction--column fg-11 zz-9">
                <div class="box-root flex-flex flex-justifyContent--center">
                  <h2>
                    {verify ? "Verify Email account " : "Course enrollment"}
                  </h2>
                </div>
                <div class="formbg-outer">
                  <div class="formbg">
                    {verify ? (
                      <div class="formbg-inner ">
                        <small class="padding-bottom--15 text-enter p-3">
                          A verification code was sent to {signups.email}
                        </small>
                        <form id="stripe-login" onSubmit={handleVerify}>
                          <div class="field padding-bottom--24 p-4">
                            <label for="fname" className="text-center">
                              Enter Verification code
                            </label>
                            <input
                              type="text"
                              name="fname"
                              min="3"
                              id="fname"
                              className="text-center col-6 mx-auto "
                              value={nvcode}
                              onChange={(e) => {
                                setNvcode((prev) => e.target.value);
                              }}
                            />
                          </div>
                          {!verifying ? (
                            <div class="field padding-bottom--24">
                              <input
                                type="submit"
                                name="submit"
                                value="Verify"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <button
                                type="button"
                                className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                              >
                                <Spinner
                                  className="text-center"
                                  animation="border"
                                  variant="light"
                                />
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    ) : (
                      <div class="formbg-inner padding-horizontal--48">
                        <span class="padding-bottom--15">
                          Let's get to know you
                        </span>

                        <form id="stripe-login" onSubmit={Signup}>
                          <div class="field padding-bottom--24">
                            <label for="fname">First name</label>
                            <input
                              type="text"
                              name="fname"
                              min="3"
                              id="fname"
                              value={signups.fname}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  fname: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div class="field padding-bottom--24">
                            <label for="lname">Last name</label>
                            <input
                              min="3"
                              type="text"
                              name="lname"
                              id="lname"
                              value={signups.lname}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  lname: e.target.value,
                                }));
                              }}
                              required
                            />
                          </div>
                          <div class="field padding-bottom--24">
                            <label for="email">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={signups.email}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div class="field padding-bottom--24">
                            <label for="email">Select Course</label>
                            {courses && courses.length > 0 ? (
                              <select
                              type="text"
                              className='form-control text-center'
                              name="course"
                              value={signups.cid}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  cid: e.target.value,
                                }));
                              }}
                            >
                              {courses.map(({ cid, name, image }) => (
                                <option value={cid}>{name}</option>
                              ))}
                            </select>
                            ):(
                              <Spinner/>
                            )}
                          </div>
                          <div class="field padding-bottom--24">
                            <label for="phone">Phone number</label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={signups.phone}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }));
                              }}
                            />
                          </div>
                          <div class="field padding-bottom--24">
                            <div class="grid--50-50">
                              <label for="passwordb">Password</label>
                              
                            </div>
                            
                            <Input
                              action={{
                                content: "",
                                icon: iconName,

                                onClick: togglePasswordVisibility,
                              }}
                              type={inputType}
                              value={signups.password}
                              onChange={(e) => {
                                setSignups((prev) => ({
                                  ...prev,
                                  password: e.target.value,
                                }));
                              }}
                              className="w-75 text-center text-success"
                              id="passwordb"
                            />
                          </div>

                          {llb ? (
                            <div class="field padding-bottom--24">
                              <input
                                type="submit"
                                name="submit"
                                value="Complete sign-up"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <button
                                type="button"
                                className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                              >
                                {/* <CircularProgress className="text-light blinking-text" /> */}
                                <Spinner
                                  className="text-center"
                                  animation="border"
                                  variant="light"
                                />
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      ),
    },
    {
      menuItem: "Login",
      render: ({ handleClose }) => (
        <TabPane>
          <div className="jbtw">
            <h2>Login</h2>
            <i
              onClick={handleClose}
              closeButton
              className="fa fa-times text-danger"
            ></i>
          </div>
          <div class="login-root">
            <div class="box-root flex-flex flex-direction--column stt">
              <div class="box-root  flex-flex flex-direction--column fg-11 zz-9">
                <div class="box-root flex-flex flex-justifyContent--center">
                  <h1 className="text-primary">{cont.fname}</h1>
                </div>
                <div class="formbg-outer">
                  <div class="formbg">
                    <div class="formbg-inner padding-horizontal--48">
                      <span class="padding-bottom--15">
                        Sign in to your account
                      </span>
                      <form id="stripe-login" onSubmit={Slogin}>
                        <div class="field padding-bottom--24">
                          <label for="email">Email</label>
                          <input
                            type="email"
                            placeholder="youremail@email.com"
                            value={lemail}
                            onChange={(e) => setLemail(e.target.value)}
                            name="email"
                            required
                          />
                        </div>
                        <div class="field padding-bottom--24">
                          <div class="grid--50-50">
                            <label for="password">Password</label>
                          </div>
                          <input
                            type="password"
                            placeholder="password"
                            value={pwrd}
                            onChange={(e) => setLpwrd(e.target.value)}
                            name="password"
                            required
                          />
                        </div>
                        {/* <div class="field field-checkbox padding-bottom--24 flex-flex align-center">
                          <label for="checkbox">
                            <input type="checkbox" name="checkbox" /> Stay
                            signed in for a week
                          </label>
                        </div> */}

                        {ll ? (
                          <div class="field padding-bottom--24">
                            <input type="submit" name="submit" value="Login" />
                          </div>
                        ) : (
                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary w-50 text-center clkbtn text-light bg-primary mx-auto dpapa "
                            >
                              {/* <CircularProgress className="text-light blinking-text" /> */}
                              <Spinner
                                className="text-center"
                                animation="border"
                                variant="light"
                              />
                            </button>
                          </div>
                        )}
                        {/* <div class="field">
                          <div class="reset-pass">
                            <Link to="#">Forgot your password?</Link>
                          </div>
                        </div> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      ),
    },
  ];
    return (

    <Tab handleClose={handleClose} panes={panes} />
  )
};

export default Login;
