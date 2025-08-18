import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../axios/axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    try {
      const response = await api.postLogin(user);
      showAlert("success", response.data.message);
      if (response.data.token) {
        localStorage.setItem("authenticated", true);
        localStorage.setItem("token", response.data.token);
        navigate("users/");
      }
    } catch (error) {
      console.log(error);
      showAlert("error", error.response.data.error);
    }
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      showAlert("warning", "Sua sessão expirou, faça login novamente");
    }
  }, []);

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  // Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };
  // Fechar o alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xl">
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "green",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Vio
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 1,
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "green",
            }}
          >
            Entrar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "green",
            }}
          >
            <Link to="/CreateEvent">Cadastro de Eventos</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
