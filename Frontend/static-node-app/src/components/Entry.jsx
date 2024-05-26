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
  };

  const handleEditEntry = () => {
    if(entryTextfield!=''){
      editEntry(entryTextfield);
    }
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
        entryToEdit === null && (
        <>
          <Button onClick={handleAddEntry}>New Entry</Button>
        </>
        )
      )}
      {entryTextfield.trim() !== '' && (
        entryToEdit !== null && (
          <>
              <Button onClick={handleEditEntry}>Update Entry</Button>
          </>
        )
      )}
    </div>
  );
}

export default Entry;
