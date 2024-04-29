import React, { useState } from 'react';
import { MdOutlineSaveAlt } from "react-icons/md";
//import { IoIosAddCircle } from "react-icons/io";
import "../styles/Entry.css";
function Entry({ addEntry, entryTextfield, editTextfield, entryToEdit, editEntry }) {

  // Function to get today's date in the format "MM/DD/YYYY"
  const todayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleAddEntry = () => {
    const entryText = `${entryTextfield}`;
    addEntry(entryText);
    editTextfield('');
  };

  const handleEditEntry = () => {
    const entryText = `${entryTextfield}`;
    editEntry(entryText);
    editTextfield('');
  };

  return (
    <div>
      <p>Today's Date: {todayDate()}</p>
        <div>
            <textarea
                type="text"
                value={entryTextfield}
                onChange={(e) => editTextfield(e.target.value)}
                placeholder="Enter new entry"
                className="entryField"
            />
        </div>
      <button onClick={handleAddEntry} >New Entry</button>
      {entryToEdit !== null && (
        <button onClick={handleEditEntry} >Update Entry</button>
      )}
    </div>
  );
}

export default Entry;
