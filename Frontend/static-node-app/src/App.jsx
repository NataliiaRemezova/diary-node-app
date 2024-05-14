import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/system';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';
import NavbarWeb from './components/NavbarWeb.jsx';
import NavbarMobile from './components/NavbarMobile.jsx';
import Home from './components/Home.jsx';
import HabitList from './components/HabitList';
import './App.css';
import PigRun from './components/PigRun.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const isMobile = useMediaQuery({ maxWidth: '1100px' }); // the screen size at which the device is considered mobile
  const navigate = useNavigate(); // navigation for single page routing with react router dom
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
      body: JSON.stringify({ text: newEntryText, date: new Date().toISOString() })
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
    <NextUIProvider navigate={navigate}> {/* for NextUI */}
      <div className="appBody">
        {isMobile ? (<NavbarMobile />) : (<NavbarWeb />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<HabitList />} />
          {/* more routes to follow in the next sprints */}
        </Routes>

        <h1 className="text-3xl font-bold underline">Diary app</h1>
        <div>
          <Entry
            addEntry={addEntry}
            entryTextfield={entryTextfield}
            editTextfield={editTextfield}
            entryToEdit={entryToEdit}
            editEntry={editEntry}
          />
          <ListOfEntries
            entries={entries}
            setupEditEntry={setupEditEntry}
            deleteEntry={deleteEntry}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
            entryToDelete={entryToDelete}
          />
        </div>
        <div><PigRun /></div>
        <Footer />
      </div>
    </NextUIProvider>
  );
}

export default App;
