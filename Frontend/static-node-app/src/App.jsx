import React, { useState, useEffect } from 'react';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';
import './App.css'
import PigRun from "./components/PigRun.jsx";

function App() {
  const [entries, setEntries] = useState([]);
  const [entryToDelete, setEntryToDelete] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/entry/get-entries')
      .then(response => response.json())
      .then(data => setEntries(data))
      .catch(error => console.error('Error fetching entries:', error));
  }, []);

  const addEntry = (newEntryText) => {
    fetch('http://localhost:5000/api/entry/create-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newEntryText, date: new Date().toISOString() })
    })
    .then(response => response.json())
    .then(data => setEntries([...entries, data]))
    .catch(error => console.error('Error adding entry:', error));
  };

  const deleteEntry = (id) => {
    setEntryToDelete(id);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/api/entry/delete-entry/${entryToDelete}`, {
      method: 'DELETE'
    })
    .then(() => {
      setEntries(entries.filter(entry => entry._id !== entryToDelete));
      setEntryToDelete(null);
    })
    .catch(error => console.error('Error deleting entry:', error));
  };

  const cancelDelete = () => {
    setEntryToDelete(null);
  };

  return (
    <div>
      <h1>Diary app</h1>
      <div>
        <Entry addEntry={addEntry} />
        <ListOfEntries entries={entries} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
      </div>
      <div><PigRun/></div>
    </div>
  );
}

export default App;
