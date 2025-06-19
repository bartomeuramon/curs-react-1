import { useState } from 'react';
import { registrarUsuari } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registrarUsuari(email, password);
      navigate('/');
    } catch (err) {
      setError('Error en el registre: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registra't</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Correu electrònic"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contrasenya"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
