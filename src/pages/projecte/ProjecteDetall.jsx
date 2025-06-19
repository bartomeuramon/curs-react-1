// ProjecteDetall.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjecte, updateProjecte } from '../../firebase/firebase';

export default function ProjecteDetall() {
  const { id } = useParams();
  const [projecte, setProjecte] = useState(null);
  const [editantParticipants, setEditantParticipants] = useState(false);
  const [participantsEditats, setParticipantsEditats] = useState([]);

  useEffect(() => {
    getProjecte(id).then((proj) => {
      setProjecte(proj);
      setParticipantsEditats(proj.participants);
    });
  }, [id]);

  const handleCanviParticipant = (index, valor) => {
    const actualitzats = [...participantsEditats];
    actualitzats[index] = valor;
    setParticipantsEditats(actualitzats);
  };

  const handleAfegirParticipant = () => {
    setParticipantsEditats([...participantsEditats, ""]);
  };

  const handleEliminarParticipant = (index) => {
    const actualitzats = participantsEditats.filter((_, i) => i !== index);
    setParticipantsEditats(actualitzats);
  };

  const handleEditarParticipants = async (e) => {
    e.preventDefault();
    await updateProjecte(projecte.id, { participants: participantsEditats });
    setProjecte({ ...projecte, participants: participantsEditats });
    setEditantParticipants(false);
  };

  if (!projecte) return <p>Carregant projecte...</p>;

  return (
    <div>
      <h2>{projecte.titol}</h2>

      <button onClick={() => setEditantParticipants(true)}>Editar Participants</button>

      {editantParticipants && (
        <form onSubmit={handleEditarParticipants}>
          {participantsEditats.map((p, i) => (
            <div key={i}>
              <input value={p} onChange={(e) => handleCanviParticipant(i, e.target.value)} />
              <button type="button" onClick={() => handleEliminarParticipant(i)}>✕</button>
            </div>
          ))}
          <button type="button" onClick={handleAfegirParticipant}>+ Afegir participant</button>
          <button type="submit">Desar participants</button>
        </form>
      )}
    </div>
  );
}

