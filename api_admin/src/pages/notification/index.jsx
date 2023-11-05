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

const Notification = () => {
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState(""); 

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(""); 

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(""); 

  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");
  
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

  const validateUserId = (e) => {
    setUserId(e.target.value);
    if(!isBetween(userId.length, 2, 50)){
      setUserIdError("Userid must be between 3 to 50 characters")
      return true;
    } else {
      setUserIdError("")
      return false;
    }

  };

  const validateUsername = (e) => {
    setUsername(e.target.value);
    let decision = false;
    if(!isBetween(username.length, 2, 20)){
      setUsernameError("Username must be between 3 to 20 characters")
      decision = true;
    } else {
      setUsernameError("")
      decision = false;
    }
    return decision;
  };

  const validateBody = (e) => {
    setBody(e.target.value);
    if(!isBetween(body.length, 2, 50)){
      setBodyError("body must be between 3 to 200 characters")
      return true;
    } else {
      setBodyError("")
      return false;
    }

  };

  const validateTitle = (e) => {
    setTitle(e.target.value);
    if(!isBetween(title.length, 2, 50)){
      setTitleError("title must be between 3 to 50 characters")
      return true;
    } else {
      setTitleError("")
      return false;
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    

    // setEmail(data.get("email"));
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    let regData
    if(userId === "" || username === "" || title === "" || body === "" || userIdError.length > 1 || usernameError.length > 1 || titleError.length > 1 || bodyError.length > 1) {
      console.log("Invalid Inputs")
      return
    } else {
      regData = {
        userId: userId,
        username: username,
        title: title,
        body: body,
      };
    }


      Axios({
        method: "POST",
        data: regData,
        withCredentials: false,
        url: `https://data.anarchygames.in/api/v1/pushnotification/send-notification`,
      }).then((res) => {
        if(res.data){
          if (res.data.error){
            setFailed(res.data.error)
          } else {
            setSuccess(res.data)
          }
        }

        // if(res.data === "Admin Created") {
        //   setSuccess("Admin registered successfully")
        // }

        console.log(res.data)});

        event.target.reset();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="NOTIFICATION" subtitle="Test Notification output based on inputted data" />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography component="h1" variant="h5">
          Input the required data to test the notification output
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
                name="userId"
                onChange={validateUserId}
                required
                fullWidth
                id="userId"
                label="User Id"
                autoFocus
                error={userIdError.length > 1}
                helperText={userIdError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="grey"
                required
                fullWidth
                id="username"
                onChange={validateUsername}
                label="Username"
                name="username"
                error={usernameError.length > 1}
                helperText={usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="grey"
                onChange={validateTitle}
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                error={titleError.length > 1}
                helperText={titleError}
                //   autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="grey"
                onChange={validateBody}
                required
                fullWidth
                name="body"
                label="Body"
                id="body"
                error={bodyError.length > 1}
                helperText={bodyError}
                //   autoComplete="new-password"
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
            Send
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

export default Notification;
