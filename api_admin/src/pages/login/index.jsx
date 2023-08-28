import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, useTheme } from "@mui/material";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://anarchy.game/">
        Anarchy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [failed, setFailed] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      // setSuccess("");
      setFailed("");
    }, 10000);
  }, []);

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (!isEmailValid(email)) {
      setEmailError("Invalid email address");
      //   console.log(email)
      return true;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 1) {
      setPasswordError("*Please insert password");
      return true;
    } else {
      setPasswordError("");
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
    let regData;
    if (
      email === "" ||
      password === "" ||
      emailError.length > 1 ||
      passwordError.length > 1
    ) {
      console.log("Invalid Inputs");
      setFailed("invalid inputs")
      return;
    } else {
      regData = {
        email: email,
        password: password,
        remember: data.get("remember"),
      };
      // console.log(regData);
    }

    Axios({
      method: "POST",
      data: regData,
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        console.log("Status: successfully authenticated");

        // navigate('/dashboard');
        window.location.href = '/dashboard';
      } else {
        console.log("status: failure");
        setFailed(res.data)
      }
      // console.log(res);
    });

    // getUser();

    //     event.target.reset();
  };

  // const getUser = () => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:5001/api/v1/authadmin",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundImage:
            "url(https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80)",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 50,
                width: 350,
                maxHeight: { xs: 50, md: 50 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="Anarchy Logo"
              src="https://storage.googleapis.com/anarchy-game-anarchy_1141183825/static/images/logo_with_glo.png"
            />
          </Grid>
          <Typography variant="h1" color="text.secondary" align="center">
            API Reporting Tool
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: theme.palette.primary[900],
          color: theme.palette.secondary[100],
          borderBottom: "none",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
          failed ? (<Alert severity="error">{failed}</Alert>) : ("")
        }
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              color="secondary"
              margin="normal"
              onChange={validateEmail}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError.length > 1}
              helperText={emailError}
            />
            <TextField
              color="secondary"
              margin="normal"
              onChange={validatePassword}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  id="remember"
                  name="remember"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  color={theme.palette.secondary[100]}
                >
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                  <Link href="#" variant="body2" color={theme.palette.secondary[100]}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
            {/* <div>
              <h1>Get User</h1>
              <button onClick={getUser}>Submit</button>
              {data ? <h1>Welcome Back {data.username}</h1> : null}
            </div> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
