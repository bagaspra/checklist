import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from './axiosWithAuth';

function CreateChecklist() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  const handleCreateChecklist = () => {
    const data = {
      name: name,
    };

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      const axios = axiosWithAuth(storedToken);
      axios
        .post('http://94.74.86.174:8080/api/checklist', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {})
        .catch((error) => {
          console.error('Gagal membuat checklist', error);
        });
    }
  };

  return (
    <div>
      <h2>Buat Checklist Baru</h2>
      <input
        type="text"
        placeholder="Nama Checklist"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateChecklist}>Submit</button>
    </div>
  );
}

export default CreateChecklist;
