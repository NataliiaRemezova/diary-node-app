import React, { useState } from 'react';
import moment from 'moment';
import {Button} from "@nextui-org/react";
import "../styles/Entry.css";
function Entry({ addEntry, entryTextfield, setEntryTextfield, entryDate, setEntryDate, entryToEdit, editEntry }) {


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
    if(entryText!=''){
      addEntry(entryText);
    }
    setEntryTextfield('');
    setEntryDate(null);
  };

  const handleEditEntry = () => {
    const entryText = `${entryTextfield}`;
    editEntry(entryText);
    setEntryTextfield('');
    setEntryDate(null);
  };

  return (
    <div>
      <p>
        {entryDate === null 
          ? `Today's Date: ${moment(todayDate()).format('MMMM Do, YYYY')}` 
          : `Date of Entry: ${moment(entryDate).format('MMMM Do, YYYY')}`}
      </p>
      <div>
        <textarea
          type="text"
          value={entryTextfield}
          onChange={(e) => setEntryTextfield(e.target.value)}
          placeholder="Enter new entry"
          className="entryField"
        />
      </div>
      {entryTextfield.trim() !== '' && (  // Check if entryTextfield is not empty
        <>
          <Button onClick={handleAddEntry}>New Entry</Button>
          {entryToEdit !== null && (
            <Button onClick={handleEditEntry}>Update Entry</Button>
          )}
        </>
      )}
    </div>
  );
}

export default Entry;
