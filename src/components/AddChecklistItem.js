import React, { useState } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { useNavigate, useParams } from 'react-router-dom';

function AddChecklistItem() {
  const { checklistId } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    const data = {
      itemName: itemName,
    };

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const axios = axiosWithAuth(storedToken);
      axios
        .post(`/checklist/${checklistId}/item`, data)
        .then((response) => {
          console.log('Checklist item berhasil ditambahkan', response.data);
          navigate(`/checklist/${checklistId}`);
        })
        .catch((error) => {
          console.error('Gagal menambahkan checklist item', error);
        });
    }
  };

  return (
    <div>
      <h2>Tambah Checklist Item</h2>
      <input
        type="text"
        placeholder="Nama Checklist Item"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={handleAddItem}>Tambah</button>
    </div>
  );
}

export default AddChecklistItem;
