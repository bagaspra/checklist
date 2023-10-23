import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { Link, useParams } from 'react-router-dom';

function ChecklistItem() {
  const { checklistId } = useParams();
  const [checklistItems, setChecklistItems] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      const axios = axiosWithAuth(storedToken);

      axios
        .get(`/checklist/${checklistId}/item`)
        .then((response) => {
          setChecklistItems(response.data);
        })
        .catch((error) => {
          console.error('Gagal mengambil daftar checklist item', error);
        });
    }
  }, [checklistId]);

  const handleDeleteItem = (itemId) => {
    const axios = axiosWithAuth(token);

    axios
      .delete(`/checklist/${checklistId}/item/${itemId}`)
      .then(() => {
        setChecklistItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      })
      .catch((error) => {
        console.error('Gagal menghapus item checklist', error);
      });
  };

  return (
    <div>
      <h2>Daftar Checklist Item</h2>
      <Link to={`/checklist/${checklistId}/add-item`}>
        <button>Tambah Checklist Item</button>
      </Link>
      <ul>
        {checklistItems.map((item) => (
          <li key={item.id}>
            {item.itemName}
            <Link to={`/checklist/${checklistId}/status/${item.id}`}>
              <button>Ubah Status</button>
            </Link>
            <Link to={`/checklist/${checklistId}/detail/${item.id}`}>
              <button>Detail</button>
            </Link>
            <Link to={`/checklist/${checklistId}/rename-item/${item.id}`}>
              <button>Rename</button>
            </Link>
            <button onClick={() => handleDeleteItem(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChecklistItem;
