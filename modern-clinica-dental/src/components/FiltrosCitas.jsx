import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const doctores = [
  { value: '', label: 'Todos' },
  { value: 'perez', label: 'Dr. Pérez' },
  { value: 'lopez', label: 'Dra. López' },
  { value: 'ramirez', label: 'Dr. Ramírez' }
];

const servicios = [
  { value: '', label: 'Todos' },
  { value: 'limpieza', label: 'Limpieza profunda' },
  { value: 'brackets', label: 'Brackets' },
  { value: 'ortodoncia', label: 'Ortodoncia' },
  { value: 'general', label: 'Odontología General' }
];

function FiltrosCitas({ filtros, setFiltros, onFiltrar }) {
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField select label="Médico" name="doctor" value={filtros.doctor} onChange={handleChange} size="small">
        {doctores.map(d => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
      </TextField>
      <TextField select label="Servicio" name="servicio" value={filtros.servicio} onChange={handleChange} size="small">
        {servicios.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
      </TextField>
      <TextField type="date" label="Fecha" name="fecha" value={filtros.fecha} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
      <Button variant="contained" onClick={onFiltrar}>Filtrar</Button>
    </Box>
  );
}

export default FiltrosCitas;
