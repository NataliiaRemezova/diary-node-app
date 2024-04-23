import React, { useState } from 'react';
import { MdOutlineSaveAlt } from "react-icons/md";
//import { IoIosAddCircle } from "react-icons/io";
import "../styles/Entry.css";
function Entry({ addEntry }) {
  const [newEntryText, setNewEntryText] = useState('');

  // Function to get today's date in the format "MM/DD/YYYY"
  const todayDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleAddEntry = () => {
    const entryTextWithDate = `${newEntryText}, ${todayDate()}`;
    addEntry(entryTextWithDate);
    setNewEntryText('');
  };

  return (
    <div>
      <p>Today's Date: {todayDate()}</p>
        <div>
            <textarea
                type="text"
                value={newEntryText}
                onChange={(e) => setNewEntryText(e.target.value)}
                placeholder="Enter new entry"
                className="entryField"
            />
        </div>
      <button onClick={handleAddEntry} className="buttonRound" ><MdOutlineSaveAlt /></button>
    </div>
  );
}

export default Entry;
