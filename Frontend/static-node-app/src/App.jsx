import  { useState, useEffect } from 'react';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';
import './App.css'
import PigRun from "./components/PigRun.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [entries, setEntries] = useState([]);
  const [entryTextfield, setEntryTextfield] = useState('');
  const [entryToEdit, setEntryToEdit] = useState(null);
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
    .then(() => {
      setEntryToEdit(null);
    })
    .catch(error => console.error('Error adding entry:', error));
  };

  const setupEditEntry = (id, text) => {
    setEntryToEdit(id);
    editTextfield(text);
  };

  const editTextfield = (text) => {
    setEntryTextfield(text);
  };

  const editEntry = (newEntryText) => {
    fetch(`http://localhost:5000/api/entry/update-entry/${entryToEdit}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: newEntryText, date: new Date().toISOString() })
    })
    .then(response => response.json())
    .then((data) => {
      // if entry is entryToEdit --> change its text and date
      setEntries(entries.map(entry => {
        if (entry._id === entryToEdit) {
          return { ...entry, text: newEntryText, date: new Date().toISOString() };
        }
        return entry;
      }));
      setEntryToEdit(null);
    })
    .catch(error => console.error('Error updating entry:', error));
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
      <div className="appBody">
          <div>
            <h1>Diary app</h1>
            <div>
                <Entry addEntry={addEntry} entryTextfield={entryTextfield} editTextfield={editTextfield} entryToEdit={entryToEdit} editEntry={editEntry}/>
                <ListOfEntries entries={entries} setupEditEntry={setupEditEntry} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
            </div>
            <div><PigRun/></div>
        </div>
        <Footer/>
      </div>
  );
}

export default App;
