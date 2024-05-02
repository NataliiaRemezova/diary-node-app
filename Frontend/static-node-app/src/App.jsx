import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/system';
import Entry from './components/Entry';
import ListOfEntries from './components/ListOfEntries';
import NavbarWeb from "./components/NavbarWeb.jsx";
import NavbarMobile from './components/NavbarMobile.jsx';
import Home from './components/Home.jsx';
import './App.css'
import PigRun from "./components/PigRun.jsx";


function App() {
  const isMobile = useMediaQuery({maxWidth:"1100px"}); // the screen size at which the device is considered mobile
  const navigate = useNavigate(); // navigation for single page routing with react router dom
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
    <NextUIProvider navigate={navigate}> {/* for NextUI */}
     
      {isMobile ? ( <NavbarMobile/> ) : ( <NavbarWeb/> )}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* more routes to follow in the next sprints */}
      </Routes>
      
      <h1 className="text-3xl font-bold underline">Diary app</h1>
      <div>
        <Entry addEntry={addEntry} />
        <ListOfEntries entries={entries} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
      </div>
      <div><PigRun/></div>
    </NextUIProvider>
  );
}

export default App;
