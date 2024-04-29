import  { useState } from 'react';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';
import './App.css'
import PigRun from "./components/PigRun.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [entries, setEntries] = useState([]);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const addEntry = (newEntryText) => {
    const newEntry = {
      _id: Date.now().toString(),
      text: newEntryText,
    };
    setEntries([...entries, newEntry]);
  };
  const deleteEntry = (id) => {
    setEntryToDelete(id);
  };

  const confirmDelete = () => {
    setEntries(entries.filter(entry => entry._id !== entryToDelete));
    setEntryToDelete(null);
  };

  const cancelDelete = () => {
    setEntryToDelete(null);
  };
  return (
    <div>
      <div>
        <h1>Diary app</h1>
        <div>
          <Entry addEntry={addEntry} />
          <ListOfEntries entries={entries} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
        </div>
        <div><PigRun/></div>
      </div>
        <Footer/>
    </div>
  );
}

export default App;
