import React, { useState } from "react";
import { Box, TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from "../../mockData/fakeApi";

import "./styles.css";

const LoginPageContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  height: "100vh",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: "0 0 70%",
  height: "100%",
  backgroundImage: `url(${"../../assets/BmtcHome.jpeg"})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const LoginFormContainer = styled(Box)(({ theme }) => ({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  backgroundColor: "#FFF",
  borderRadius: "15px"
}));

const LoginInput = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: "100%",
  input: {
    
  }
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  width: "100%",
  input: {
    
  }
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      console.log("there", res);
      if (res.success) {
        console.log("success");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page-wrapper">
        <LoginFormContainer>
          <Typography variant="h4" gutterBottom className="login-text">
            Welcome to BMTC
          </Typography>
            <LoginInput size="small" label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
            <LoginInput size="small" label="Password" type="password" variant="outlined" value={password} onChange={handlePasswordChange} />
            <LoginButton variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </LoginButton>
        </LoginFormContainer>
    </div>
  );
};

export default Login;

// const LoginPageContainer = styled(Container)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "100vh",
// }));

// const ImageContainer = styled(Box)(({ theme }) => ({
//   flex: "0 0 70%",
//   padding: theme.spacing(4),
// }));

// const LoginFormContainer = styled(Box)(({ theme }) => ({
//   flex: "0 0 30%",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: theme.spacing(4),
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
// }));

// const LoginInput = styled(TextField)(({ theme }) => ({
//   margin: theme.spacing(1),
//   width: "100%",
// }));

// const LoginButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(2),
//   width: "100%",
// }));

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login("username", "password");
//       console.log("there", res);
//       if (res.success) {
//         console.log("success");
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <LoginPageContainer>
//       <ImageContainer>
//         <img src={`../../assets/BmtcHome.jpeg`} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//       </ImageContainer>
//       <LoginFormContainer>
//         <LoginInput label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
//         <LoginInput label="Password" type="password" variant="outlined" value={password} onChange={handlePasswordChange} />
//         <LoginButton variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </LoginButton>
//       </LoginFormContainer>
//     </LoginPageContainer>
//   );
// };

// export default Login;

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     console.log("hello");
//     e.preventDefault();
//     try {
//       const res = await login("username", "password");
//       console.log("there", res);
//       if (res.success) {
//         console.log("success");
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 1 }}>
//           <img src={`../../assets/BmtcHome.jpeg`} alt="Dashboard" style={{ width: "100%", objectFit: "cover" }} />
//         </div>
//         <div style={{ flex: 1 }}>
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <div>
//               <label>Username:</label>
//               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </div>
//             <div>
//               <label>Password:</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
