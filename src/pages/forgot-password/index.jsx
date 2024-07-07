// import { Button, IconButton, InputAdornment } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import TextField from "@mui/material/TextField";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { signInValidationSchema } from "@validation";
// import Notification from "@notification";
// import { ToastContainer } from "react-toastify";
// import { useState } from "react";
// import { auth } from "@service";
// import { useNavigate } from "react-router-dom";
// import { ForgotPasswordModal } from "@modal";

// const Index = () => {
//   const navigate = useNavigate();
//   const initialValues = {
//     email: "",
//   };

//   const handleSubmit = async values => {
//     console.log(values);
//     try {
//       const response = await auth.forgot_password(values);
//       if (response.status === 200) {
//         console.log(response);
//         Notification({ title: "Success", type: "success" });
//         localStorage.setItem("access_token", response?.data?.access_token);
//         setTimeout(() => {}, 2500);
//       }
//     } catch (error) {
//       console.log(error);
//       Notification({ title: "Error", type: "error" });
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="w-full h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full sm:w-[600px] p-5 bg-white rounded-lg shadow-lg">
//           <h1 className="text-center my-6 text-4xl font-bold text-gray-800">
//             Forgot-Password
//           </h1>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={signInValidationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form>
//                 <Field
//                   name="email"
//                   type="email"
//                   as={TextField}
//                   label="Email"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   className="mb-4"
//                   helperText={
//                     <ErrorMessage
//                       name="email"
//                       component="p"
//                       className="text-[red] text-sm"
//                     />
//                   }
//                 />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitting}
//                   fullWidth
//                   className="mb-2"
//                 >
//                   {isSubmitting ? "Submitting" : "Submit"}
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;
import { TextField, Button } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { ForgotPasswordModal } from "@modal";
import { auth } from "@service";
import { ValidationForgotPassword } from "@validation";
import Notification from "@notification";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (values, { setSubmitting }) => {
    setEmail(values.email);
    try {
      const response = await auth.forgot_password(values);
      if (response.status === 200) {
        setOpen(true);
        Notification({ title: "Code has been sent", type: "success" });
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Something went wrong", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <ForgotPasswordModal
        open={open}
        handleClose={() => setOpen(false)}
        email={email}
      />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Enter email...</h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ValidationForgotPassword}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
