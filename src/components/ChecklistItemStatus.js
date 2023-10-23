import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { useNavigate, useParams } from 'react-router-dom';

function ChecklistItemStatus() {
  const { checklistId, checklistItemId } = useParams();
  const [status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      const axios = axiosWithAuth(storedToken);

      axios
        .get(`/checklist/${checklistId}/item/${checklistItemId}`)
        .then((response) => {
          setStatus(response.data.status);
        })
        .catch((error) => {
          console.error('Gagal mengambil status item checklist', error);
        });
    }
  }, [checklistId, checklistItemId]);

  const handleUpdateStatus = () => {
    const axios = axiosWithAuth(token);

    axios
      .put(`/checklist/${checklistId}/item/${checklistItemId}`, {
        status: status,
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error('Gagal mengubah status item checklist', error);
      });
  };

  return (
    <div>
      <h2>Ubah Status Checklist Item</h2>
      <p>Status: {status}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="done">Selesai</option>
        <option value="not-done">Belum Selesai</option>
      </select>
      <button onClick={handleUpdateStatus}>Simpan Perubahan</button>
    </div>
  );
}

export default ChecklistItemStatus;
