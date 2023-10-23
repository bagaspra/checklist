import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Checklist from './components/Checklist';
import ChecklistItem from './components/ChecklistItem';
import CreateChecklist from './components/CreateChecklist';
import AddChecklistItem from './components/AddChecklistItem';
import RenameChecklistItem from './components/RenameChecklistItem';
import ChecklistItemDetail from './components/ChecklistItemDetail';
import ChecklistItemStatus from './components/ChecklistItemStatus';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Checklist />} />

        <Route path="/create-checklist" element={<CreateChecklist />} />

        <Route path="/checklist/:checklistId" element={<ChecklistItem />} />
        <Route
          path="/checklist/:checklistId/add-item"
          element={<AddChecklistItem />}
        />
        <Route
          path="/checklist/:checklistId/rename-item/:itemId"
          element={<RenameChecklistItem />}
        />
        <Route
          path="/checklist/:checklistId/detail/:checklistItemId"
          element={<ChecklistItemDetail />}
        />
        <Route
          path="/checklist/:checklistId/status/:checklistItemId"
          element={<ChecklistItemStatus />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
