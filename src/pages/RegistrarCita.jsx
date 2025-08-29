import React from 'react';
import { Button, TextField, MenuItem, Typography, Box, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const doctores = [
  { value: 'perez', label: 'Dr. Pérez' },
  { value: 'lopez', label: 'Dra. López' },
  { value: 'ramirez', label: 'Dr. Ramírez' }
];

const servicios = [
  { value: 'limpieza', label: 'Limpieza profunda' },
  { value: 'brackets', label: 'Brackets' },
  { value: 'ortodoncia', label: 'Ortodoncia' },
  { value: 'general', label: 'Odontología General' }
];

const schema = yup.object().shape({
  doctor: yup.string().required('Seleccione un médico'),
  servicio: yup.string().required('Seleccione un servicio'),
  fecha: yup.date().required('Seleccione una fecha').min(new Date(), 'No puede seleccionar una fecha pasada'),
  hora: yup.string().required('Seleccione una hora disponible'),
  correo: yup.string().required('Ingrese su correo electrónico'),
  telefono: yup.string().required('Ingrese su número de teléfono'),
  comentario: yup.string().max(200, 'Máximo 200 caracteres')
});

function RegistrarCita() {
  const [horas, setHoras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { doctor: '', servicio: '', fecha: '', hora: '', correo: '', telefono: '', comentario: '' }
  });

  // Simulación de disponibilidad
  const disponibilidad = {
    perez: ['09:00', '10:00', '11:00', '12:00'],
    lopez: ['13:00', '14:00', '15:00'],
    ramirez: ['08:00', '09:30', '11:30']
  };

  const doctor = watch('doctor');
  const fecha = watch('fecha');

  React.useEffect(() => {
    if (doctor && fecha) {
      setHoras(disponibilidad[doctor] || []);
    } else {
      setHoras([]);
    }
  }, [doctor, fecha]);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_URL}/RegistrarCita`, data);
      setSuccess('Cita registrada correctamente.');
      reset();
      setHoras([]);
    } catch (err) {
      setError('Error al registrar la cita.');
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }} elevation={3}>
      <Typography variant="h5" gutterBottom>Registro de Cita</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <TextField select label="Seleccione el médico" {...field} fullWidth required sx={{ mb: 2 }} error={!!errors.doctor} helperText={errors.doctor?.message}>
              {doctores.map(d => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
            </TextField>
          )}
        />
        <Controller
          name="servicio"
          control={control}
          render={({ field }) => (
            <TextField select label="Elija el servicio" {...field} fullWidth required sx={{ mb: 2 }} error={!!errors.servicio} helperText={errors.servicio?.message}>
              {servicios.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
            </TextField>
          )}
        />
        <Controller
          name="fecha"
          control={control}
          render={({ field }) => (
            <TextField type="date" label="Fecha de la cita" {...field} fullWidth required sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} error={!!errors.fecha} helperText={errors.fecha?.message} />
          )}
        />
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">Horas disponibles:</Typography>
          {horas.length > 0 ? horas.map(h => (
            <Controller
              key={h}
              name="hora"
              control={control}
              render={({ field }) => (
                <Button variant={field.value === h ? 'contained' : 'outlined'} sx={{ m: 0.5 }} onClick={() => field.onChange(h)}>{h}</Button>
              )}
            />
          )) : <Typography variant="caption">Seleccione médico y fecha</Typography>}
          {errors.hora && <Typography color="error.main" variant="caption">{errors.hora.message}</Typography>}
        </Box>
        <Controller
          name="correo"
          control={control}
          render={({ field }) => (
            <TextField label="Correo electrónico" {...field} fullWidth required sx={{ mb: 2 }} error={!!errors.correo} helperText={errors.correo?.message} />
          )}
        />
        <Controller
          name="telefono"
          control={control}
          render={({ field }) => (
            <TextField label="Número de teléfono" {...field} fullWidth required sx={{ mb: 2 }} error={!!errors.telefono} helperText={errors.telefono?.message} />
          )}
        />
        <Controller
          name="comentario"
          control={control}
          render={({ field }) => (
            <TextField label="Comentario adicional" {...field} fullWidth multiline rows={2} sx={{ mb: 2 }} error={!!errors.comentario} helperText={errors.comentario?.message} />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Registrar Cita'}
        </Button>
        {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
        {error && <Typography color="error.main" sx={{ mt: 2 }}>{error}</Typography>}
      </Box>
    </Paper>
  );
}

export default RegistrarCita;
