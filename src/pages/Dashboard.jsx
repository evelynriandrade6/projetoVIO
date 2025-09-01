import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import sheets from "../axios/axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { BorderColor } from "@mui/icons-material";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getDados() {
      try {
        const responseEventos = await sheets.getEvento();
        const responseUsuarios = await sheets.getUsers();
        setEventos(responseEventos.data.eventos);
        setUsuarios(responseUsuarios.data.users);
      } catch (error) {
        console.error(error);
      }
    }
    getDados();
  }, []);

  // Processar o dados para o gráfico de eventos por organizador
  const eventosPorOrganizador = {};
  eventos.forEach((evento) => {
    const orgId = evento.fk_id_organizador;
    eventosPorOrganizador[orgId] = (eventosPorOrganizador[orgId] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(eventosPorOrganizador),
    datasets: [
      {
        label: "Eventos por Organizador",
        data: Object.values(eventosPorOrganizador),
        backgroundColor: " rgba(75,192,192,0.6)",
      },
    ],
  };

  // Processar o dados para o gráfico Pizza de aniversário dos usuários

  const usuariosPorMes = {};
  usuarios.forEach(u => {
    const mes = new Date(u.data_nascimento).getMonth() + 1;
    usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(usuariosPorMes).map(m => `Mês ${m}`),
    datasets: [
      {
        data: Object.values(usuariosPorMes),
        backgroundColor: ["#f5a9b8", "#5cccfc", "#FFFFFF", "#4CAF50", "#FF9800", "#9C27B0"]
      }
    ]
  };


  return (
    <div style={{ padding: 20 }}>
      <h2> Dashboards </h2>
      <div style={{ width: "600px", marginBottom: 40 }}>
        <Bar data={barData} />
      </div>
     <div style={{ width: "400px" }}>
        <Pie data={pieData} style={{        borderColor:"#000000"}}/>
      </div>
    </div>
  );
}

export default Dashboard;
