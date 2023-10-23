import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { useParams, Link } from 'react-router-dom';

function ChecklistItemDetail() {
  const { checklistId, checklistItemId } = useParams();
  const [checklistItem, setChecklistItem] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);

      const axios = axiosWithAuth(storedToken);

      axios
        .get(`/checklist/${checklistId}/item/${checklistItemId}`)
        .then((response) => {
          setChecklistItem(response.data);
        })
        .catch((error) => {
          console.error('Gagal mengambil detail item checklist', error);
        });
    }
  }, [checklistId, checklistItemId]);

  return (
    <div>
      <h2>Detail Checklist Item</h2>
      <p>{checklistItem}</p>
      <Link to={`/checklist/${checklistId}`}>Kembali</Link>
    </div>
  );
}

export default ChecklistItemDetail;
