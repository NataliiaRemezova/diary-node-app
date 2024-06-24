import moment from 'moment';
import {Button} from "@nextui-org/react";
import "../styles/Entry.css";
function Entry({ addEntry, entryTextfield, setEntryTextfield, selectedDate, entryToEdit, editEntry, deleteEntry, confirmDelete, cancelDelete, entryToDelete }) {

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
              <Button onClick={() => deleteEntry(entryToEdit)}>Delete Entry</Button>
          </>
        )
      )}
      <div>
        {entryToDelete !== null && (
          <div className="modal">
            <p>Möchten Sie wirklich löschen?</p>
            <Button onClick={confirmDelete} className="yesNoButton">yes</Button>
            <Button onClick={cancelDelete} className="yesNoButton">no</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Entry;
