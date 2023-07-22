import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import "./styles.css";

const LoginPage = () => {
  let navigate = useNavigate();

  const [loginPayload, setloginPayload] = useState({
    userName: "admin",
    password: "admin",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setloginPayload((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <TextField
          className="login-field"
          id="username"
          required
          autoComplete="off"
          autoFocus
          variant="outlined"
          value={loginPayload.userName}
          onChange={handleChange}
          InputProps={{
            startAdornment: <AccountCircleIcon />,
          }}
        />

        <label htmlFor="password">Password</label>
        <TextField
          className="login-field"
          id="password"
          type="password"
          variant="outlined"
          value={loginPayload.password}
          onChange={handleChange}
          autoComplete="off"
          required
          InputProps={{
            startAdornment: <LockIcon />,
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
