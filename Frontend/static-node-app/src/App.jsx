import React, { useState } from 'react';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';

function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (newEntryText) => {
    const newEntry = {
      _id: Date.now().toString(),
      text: newEntryText,
    };
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry._id !== id));
  };

  return (
    <div>
      <h1>Diary app</h1>
      <div>
        <Entry addEntry={addEntry} />
        <ListOfEntries entries={entries} deleteEntry={deleteEntry} />
      </div>
    </div>
  );
}

export default App;
