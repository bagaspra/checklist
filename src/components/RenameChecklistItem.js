import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { useNavigate, useParams } from 'react-router-dom';

function RenameChecklistItem() {
  const { checklistId, itemId } = useParams();
  const [newName, setNewName] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleRenameItem = () => {
    const axios = axiosWithAuth(token);

    axios
      .put(`/checklist/${checklistId}/item/rename/${itemId}`, {
        itemName: newName,
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error('Gagal mengubah nama item checklist', error);
      });
  };

  return (
    <div>
      <h2>Rename Checklist Item</h2>
      <input
        type="text"
        placeholder="Nama Baru"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleRenameItem}>Submit</button>
    </div>
  );
}

export default RenameChecklistItem;
