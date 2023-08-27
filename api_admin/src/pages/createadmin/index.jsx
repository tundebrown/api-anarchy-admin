import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert, AlertTitle, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Header from "../../components/Header";

const CreateAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(""); 

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(""); 

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); 

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");

  useEffect(() => {
    setInterval(() => {
      setSuccess("");
      setFailed("");
    }, 10000);
  }, []);

  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const isPasswordSecure = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  };

  const validateFirstName = (e) => {
    setFirstName(e.target.value);
    if(!isBetween(firstName.length, 2, 20)){
      setFirstNameError("firstName must be between 3 to 20 characters")
      return true;
    } else {
      setFirstNameError("")
      return false;
    }

  };

  const validateLastName = (e) => {
    setLastName(e.target.value);
    let decision = false;
    if(!isBetween(lastName.length, 2, 20)){
      setLastNameError("lastName must be between 3 to 20 characters")
      decision = true;
    } else {
      setLastNameError("")
      decision = false;
    }
    return decision;
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if(!isEmailValid(email)){
      setEmailError("Invalid email address")
      return true;
    } else {
      setEmailError("")
      return false
    }

  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if(!isPasswordSecure(password)){
      setPasswordError("*hint: should contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and 8 characters")
      return true;
    } else {
      setPasswordError("")
      return false;
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isAdmin = data.get("isAdmin");
    let role = "admin";
    if (isAdmin === "isAdmin"){
      role = "Super-Admin";
    } else {
      role = "Admin";
    }
    

    // setEmail(data.get("email"));
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    let regData
    if(firstName === "" || lastName === "" || email === "" || password === "" || firstNameError.length > 1 || lastNameError.length > 1 || emailError.length > 1 || passwordError.length > 1) {
      console.log("Invalid Inputs")
      return
    } else {
      regData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        isAdmin: role,
      };
    }


      Axios({
        method: "POST",
        data: regData,
        withCredentials: true,
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/register`,
      }).then((res) => {
        if(res.data === "Admin Already Exists"){
          setFailed("Admin Already Exists")
        }

        if(res.data === "Admin Created") {
          setSuccess("Admin registered successfully")
        }

        console.log(res.data)});

        event.target.reset();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMIN" subtitle="Registration" />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {
          failed ? (<Alert severity="error">{failed}</Alert>) : ("")
        }
        {
          success && (<Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>)
        }
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                //   autoComplete="given-name"
                color="grey"
                name="firstName"
                onChange={validateFirstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={firstNameError.length > 1}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="grey"
                required
                fullWidth
                id="lastName"
                onChange={validateLastName}
                label="Last Name"
                name="lastName"
                error={lastNameError.length > 1}
                helperText={lastNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="grey"
                onChange={validateEmail}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={emailError.length > 1}
                helperText={emailError}
                //   autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="grey"
                onChange={validatePassword}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError.length > 1}
                helperText={passwordError}
                //   autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="isAdmin" color="secondary" id="isAdmin" name="isAdmin"/>}
                label="Allow Super-Admin Privileges"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Sign Up
          </Button>
          {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAdmin;
