import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { Link } from 'react-router-dom';

function Checklist() {
  const [checklists, setChecklists] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      const axios = axiosWithAuth(storedToken);
      axios
        .get('/checklist')
        .then((response) => {
          setChecklists(response.data);
        })
        .catch((error) => {
          console.error('Gagal mengambil daftar checklist', error);
        });
    }
  }, []);

  const handleDeleteChecklist = (checklistId) => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      console.error('Token tidak ditemukan.');
      return;
    }

    const axios = axiosWithAuth(storedToken);

    axios
      .delete(`/checklist/${checklistId}`)
      .then((response) => {
        console.log('Checklist berhasil dihapus', response.data);

        const updatedChecklists = checklists.filter(
          (checklist) => checklist.id !== checklistId
        );
        setChecklists(updatedChecklists);
      })
      .catch((error) => {
        console.error('Gagal menghapus checklist', error);
      });
  };

  return (
    <div>
      <Link to={`/login`}>
        <button>Login</button>
      </Link>
      <Link to={`/register`}>
        <button>Register</button>
      </Link>
      <Link to={`/create-checklist`}>
        <button>Buat Checklist Baru</button>
      </Link>
      <h2>Daftar Checklist</h2>
      <ul>
        {checklists.map((checklist) => (
          <li key={checklist.id}>
            {checklist.name}
            <button onClick={() => handleDeleteChecklist(checklist.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
