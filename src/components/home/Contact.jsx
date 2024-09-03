// import React,{useState} from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import { Button } from 'react-bootstrap';
// import Typography from '@mui/material/Typography';
// // import { FormInput, FormCheckbox, Form, TextArea } from 'semantic-ui-react';
// import axios from 'axios'
// import Swal from 'sweetalert2';


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function TransitionsModal({cont,openn,setOpenn,handleClosen}) {
//   //   const [open, setOpen] = React.useState(false);
//   //   const handleOpen = () => setOpen(true);
//   const  [contact ,setContact] = useState({})
//     const Submit = async (e) => {
//       e.preventDefault();
      

      

//       // Create a new FormData object
//       const formDataToSend = new FormData();

//       // Iterate through the form data and append each field and value to FormData
//       for (let key in contact) {
//         formDataToSend.append(key, contact[key]);
//       }
//     //   formDataToSend.append('desc', course.desc);
//     //   formDataToSend.append('image', course.image);
//     //   formDataToSend.append('draw', course.draw);
//     //   formDataToSend.append('price', course.price);
//     //   formDataToSend.append('name', course.name);
//     //   formDataToSend.append('cid', course.cid);
//       // formDataToSend.append('api', );

//       try {
//         await axios
//           .post(`${cont.api}contact`, formDataToSend)
//           .then((res) => {
//             if (res.data.success) {
//               Swal.fire({
//                 title: `Your message was delivered successfully`,
//                 text:"We will get back to you shortly !",
//                 icon: 'success',
//                 position:'top-end'
//               });
//             } else {
//               // Dalert('pls check your network connection');
//               Swal.fire({
//                 title: `error : error`,
//                 text: `error`,
//                 icon: 'error',
//               });
              
//             }
//           });
//       } catch (error) {
//         // Handle error if needed
//         console.error('Error:', error);
//         Swal.fire({
//           title: `connection error : pls check your network`,
//           text: `error`,
//           icon: 'error',
//         });
//       }
//       handleClosen()
      
//     };
//   return (
//     <div>
      
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={openn}
//         onClose={handleClosen}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             timeout: 500,
//           },
//         }}
//       >
//         <Fade in={openn}>
//           <Box sx={style}>
//             <Typography id="transition-modal-title" variant="h6" component="h2">
//               Contact us
//             </Typography>
//             <Typography id="transition-modal-description" sx={{ mt: 2 }}>
//               <Form onSubmit={Submit}>
//                 <FormInput
//                   error={{
//                     content: 'Please enter your full names',
//                     pointing: 'below',
//                   }}
//                   fluid
//                   label="Fullname"
//                   placeholder="Full names"
//                   id="form-input-full-name"
//                   required
//                   onChange={(e) => {
//                     setContact((prev) => ({ ...prev, names: e.target.value }));
//                   }}
//                 />
//                 <FormInput
//                   error="Please enter your Email address"
//                   fluid
//                   label="Email address"
//                   placeholder="email address"
//                   type="email"
//                   required
//                   onChange={(e) => {
//                     setContact((prev) => ({ ...prev, email: e.target.value }));
//                   }}
//                 />

//                 <TextArea
//                   error="Please enter your message"
//                   required
//                   style={{ resize: 'none' }}
//                   rows={3}
//                   placeholder="Type message"
//                   onChange={(e) => {
//                     setContact((prev) => ({
//                       ...prev,
//                       message: e.target.value,
//                     }));
//                   }}
//                 />
//                 <div className="jbtw py-3">
//                   <Button
//                     className="my-1 text-center mx-auto btn-primary btn "
//                     value="Submit"
//                     title="Submit"
//                     type="submit"
//                   >
//                     Send message
//                   </Button>
//                   <Button
//                     onClick={handleClosen}
//                     className="my-1 text-center mx-auto btn-danger btn "
//                     value="Close"
//                     title="Close"
//                     type="button"
//                   >
//                     Close
//                   </Button>
//                 </div>
//               </Form>
//             </Typography>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }
