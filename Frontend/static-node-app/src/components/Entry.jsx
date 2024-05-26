import React, { useState } from 'react';
import moment from 'moment';
import {Button} from "@nextui-org/react";
import { MdOutlineSaveAlt } from "react-icons/md";
import "../styles/Entry.css";
function Entry({ addEntry, entryTextfield, setEntryTextfield, selectedDate, entryToEdit, editEntry }) {

  const handleAddEntry = () => {
    if(entryTextfield!=''){
      addEntry(entryTextfield);
    }
    setEntryTextfield('');
  };

  const handleEditEntry = () => {
    editEntry(entryTextfield);
    setEntryTextfield('');
  };

  return (
    <div>
      <p>
        {`Date of Entry: ${moment(new Date(selectedDate).toISOString()).format('MMMM Do, YYYY')}`}
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
