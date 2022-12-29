import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = createTheme();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    console.log("Test key:", e.keyCode);
    e.preventDefault();
    setOpen(!open);
    try {
      const userData = await login({ username, password }).unwrap();
      console.log("User Data: ", userData.data);
      let isLoggedIn = true;
      dispatch(setCredentials({ ...userData.data, username, isLoggedIn }));
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      err.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleClose = () => {
    setOpen(false);
  };

  const content = (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errMsg ? (
            <Typography component="h1" variant="h5">
              {errMsg}
            </Typography>
          ) : (
            ""
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              ref={userRef}
              value={username}
              onChange={handleUserInput}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePwdInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  return content;
};
export default Login;
