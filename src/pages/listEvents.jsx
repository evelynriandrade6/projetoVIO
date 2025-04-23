import { useState, useEffect } from "react";
 // Imports para criação de tabela
 import Table from "@mui/material/Table";
 import TableContainer from "@mui/material/TableContainer";
 // TableHead é onde colocamos os titulos
 import TableHead from "@mui/material/TableHead";
 // TableBody é onde colocamos o conteúdo
 import TableBody from "@mui/material/TableBody";
 import TableRow from "@mui/material/TableRow";
 import TableCell from "@mui/material/TableCell";
 import Paper from "@mui/material/Paper";
 import api from "../axios/axios";
 import { Button, IconButton, Alert, Snackbar } from "@mui/material";
 import { Link, useNavigate } from "react-router-dom";
 import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
 
 function listEvents() {
     const [events, setEvents] = useState([]);
     const [alert, setAlert] = useState({
       // Visibilidade (false = invisible; true:visivel)
       open: false,
       // Nivel do alerta(sucess,error, warning, etc)
       severity: "",
       message: "",
     });
     // Função para exibir o alerta
   const showAlert = (severity, message) => {
     setAlert({ open: true, severity, message });
   };
   //fechar o alert
   const handleCloseAlert = () => {
     setAlert({ ...alert, open: false });
   };
   const navigate = useNavigate();
 
   async function getEvento() {
     // Chamada da Api
     await api.getEvento().then(
       (response) => {
         console.log(response.data.eventos);
         setEvents(response.data.eventos);
       },
       (error) => {
         console.log("Erro ", error);
       }
     );
   }
   async function deleteEvents(id) {
     try {
       await api.deleteEvents(id);
       await getEvento();
       showAlert(
         "sucess",
         "Evento exculido com sucesso")
     } catch (error) {
       console.log("erro ao deletar Evento...", error);
       showAlert("error", error.response.data.error);
     }
   }
   const listEvents = events.map((eventos) => {
     return (
       <TableRow key={events.id_evento}>
         <TableCell align="center">{eventos.nome}</TableCell>
         <TableCell align="center">{eventos.descricao}</TableCell>
         <TableCell align="center">{eventos.data_hora}</TableCell>
         <TableCell align="center">{eventos.local}</TableCell>
         <TableCell align="center">{eventos.fk_id_organizador}</TableCell>
         <TableCell align="center">
           <IconButton onClick={() => deleteEvents(eventos.id_evento)}>
             <DeleteOutlineIcon color="error" />
           </IconButton>
         </TableCell>
       </TableRow>
     );
   })
   function logout() {
     localStorage.removeItem("authenticated");
     navigate("/");
   }
   useEffect(() => {
     // if (!localStorage.getItem("authenticated")) {
     //   navigate("/");
     // }
     getEvento();
   }, []);
   return (
     <div>
       <Snackbar
         open={alert.open}
         autoHideDuration={3000}
         onClose={handleCloseAlert}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
       >
         <Alert onClose={handleCloseAlert} severity={alert.severity}>
           {alert.message}
         </Alert>
       </Snackbar>
       {events.length === 0 ? (
         <h1>Carregando Eventos</h1>
       ) : (
         <div>
           <h5>Lista de Eventos</h5>
           <TableContainer component={Paper} style={{ margin: "2px" }}>
             <Table size="small">
               <TableHead
                 style={{ backgroundColor: "brown", borderStyle: "solid" }}
               >
                 <TableRow>
                   <TableCell align="center">nome</TableCell>
                   <TableCell align="center">descricao</TableCell>
                   <TableCell align="center">data e hora</TableCell>
                   <TableCell align="center">local</TableCell>
                   <TableCell align="center">Organizador</TableCell>
                   <TableCell align=" center">Delete</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>{listEvents}</TableBody>
             </Table>
           </TableContainer>
           <Button fullWidth variant="contained" onClick={logout}>
             SAIR
           </Button>
         </div>
       )}
     </div>
   );
 }
 export default listEvents;