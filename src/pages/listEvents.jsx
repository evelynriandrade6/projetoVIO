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
import { Button, IconButton, Alert, Snackbar, Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ModalCriarIngresso from "../components/ModalCriarIngresso";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// Atividade de Eventos
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
      showAlert("sucess", "Evento exculido com sucesso");
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
        <TableCell>
          <img
            src={`http://localhost:5000/api/v1/evento/imagem/${eventos.id_evento}`}
            alt="Imagem do evento"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        </TableCell>
        <IconButton onClick={() => deleteEvents(eventos.id_evento)}>
          <DeleteOutlineIcon color="error" />
        </IconButton>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(eventos)}>
            Adicionar
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });
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

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

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

      <ModalCriarIngresso
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />
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
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descricao</TableCell>
                  <TableCell align="center">Data e hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Organizador</TableCell>
                  <TableCell align="center">Imagem</TableCell>
                  <TableCell align=" center">Delete</TableCell>
                  <TableCell align=" center">Criar Ingresso</TableCell>
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
