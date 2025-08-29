import { render, screen, fireEvent } from '@testing-library/react';
import RegistrarCita from '../pages/RegistrarCita';

test('no permite registrar cita si falta seleccionar hora', () => {
  render(<RegistrarCita />);
  fireEvent.change(screen.getByLabelText(/Seleccione el médico/i), { target: { value: 'perez' } });
  fireEvent.change(screen.getByLabelText(/Elija el servicio/i), { target: { value: 'limpieza' } });
  fireEvent.change(screen.getByLabelText(/Fecha de la cita/i), { target: { value: '2025-09-01' } });
  fireEvent.change(screen.getByLabelText(/Comentario adicional/i), { target: { value: 'Test' } });
  const submitBtn = screen.getByRole('button', { name: /Registrar Cita/i });
  expect(submitBtn).toBeDisabled();
});
