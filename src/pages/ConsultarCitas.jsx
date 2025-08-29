import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import FiltrosCitas from '../components/FiltrosCitas';

function ConsultarCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ doctor: '', servicio: '', fecha: '' });
  const [citasFiltradas, setCitasFiltradas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/citas')
      .then(res => {
        setCitas(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al consultar las citas.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filtrarCitas();
    // eslint-disable-next-line
  }, [citas]);

  const filtrarCitas = () => {
    let filtradas = citas;
    if (filtros.doctor) filtradas = filtradas.filter(c => c.doctor === filtros.doctor);
    if (filtros.servicio) filtradas = filtradas.filter(c => c.servicio === filtros.servicio);
    if (filtros.fecha) filtradas = filtradas.filter(c => c.fecha === filtros.fecha);
    setCitasFiltradas(filtradas);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: 'auto', mt: 4 }} elevation={3}>
      <Typography variant="h5" gutterBottom>Consulta de Citas Registradas</Typography>
      <FiltrosCitas filtros={filtros} setFiltros={setFiltros} onFiltrar={filtrarCitas} />
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box> : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Médico</TableCell>
                <TableCell>Servicio</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Comentario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citasFiltradas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No hay citas registradas.</TableCell>
                </TableRow>
              ) : (
                citasFiltradas.map((cita, idx) => {
                  // Formatear fecha a YYYY-MM-DD
                  let fechaFormateada = cita.fecha;
                  if (fechaFormateada && fechaFormateada.includes('T')) {
                    fechaFormateada = fechaFormateada.split('T')[0];
                  }
                  return (
                    <TableRow key={idx}>
                      <TableCell>{cita.doctor}</TableCell>
                      <TableCell>{cita.servicio}</TableCell>
                      <TableCell>{fechaFormateada}</TableCell>
                      <TableCell>{cita.hora}</TableCell>
                      <TableCell>{cita.comentario}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
    </Paper>
  );
}

export default ConsultarCitas;
