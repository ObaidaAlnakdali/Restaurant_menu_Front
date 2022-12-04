import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";

import { Context } from '../context/Context' ;

function Login() {
  const navigate = useNavigate();
  const { alert, setAlert, render, setRender } = useContext(Context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
    setOpenSuccess(false);
    setAlert("none")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var admin = { email, password }
    axios.post(`http://localhost:8000/api/user/signin`, admin)
      .then(async res => {
        localStorage.setItem("token", res.data?.token);
        setAlert("success")
        setOpenSuccess(true);
        navigate("/dashboard")
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message)
        setAlert("error")
        setOpenError(true)
      })
  };

  return (
    <div className="login_page">

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1 },
          backgroundColor: "#ffffffed",
          padding: "20px",
          margin: "20px",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px"
        }}
        >
        <h1>Login</h1>
        <TextField
          label="Email"
          variant="filled"
          size="small"
          type='email'
          required
          color="warning"
          inputProps={{ style: { width: '100%', fontSize: 14, } }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type='password'
          variant="filled"
          size="small"
          color="warning"
          required
          inputProps={{ style: { width: '100%', fontSize: 14, } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="warning"
          type='submit'
          sx={{
            backgroundColor: "#ff661d",
            margin: "8px"
          }}
        >
          Login
        </Button>
      </Box>
      <Box
      sx={{
        position: "absolute",
        top: "10px",
        right: "20px"
      }}
      >
        {
          alert === "success" ?
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
              </Alert>
            </Snackbar>
            : alert === "error" ?
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
              </Alert>
            </Snackbar>
              : <></>
        }
      </Box>
     
    </div>
  );
}

export default Login;
