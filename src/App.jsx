import { Routes, Route, Navigate } from 'react-router-dom';
import Inici from './pages/inici/Inici';
import Login from './pages/login/Login';
import Register from './pages/register/Register'; // nova vista de registre
import ProjecteDetall from './pages/projecte/ProjecteDetall';
import RutaPrivada from './components/rutaPrivada/RutaPrivada';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RutaPrivada>
              <Inici />
            </RutaPrivada>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/projecte/:id"
          element={
            <RutaPrivada>
              <ProjecteDetall />
            </RutaPrivada>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
