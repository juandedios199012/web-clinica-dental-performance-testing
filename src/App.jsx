import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import RegistrarCita from './pages/RegistrarCita';
import ConsultarCitas from './pages/ConsultarCitas';
import './App.css';

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Clínica Dental Sonrisa Saludable
          </Typography>
          <Button color="inherit" component={Link} to="/registrar">Registrar Cita</Button>
          <Button color="inherit" component={Link} to="/consultar">Consultar Citas</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/registrar" element={<RegistrarCita />} />
          <Route path="/consultar" element={<ConsultarCitas />} />
          <Route path="*" element={<RegistrarCita />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
