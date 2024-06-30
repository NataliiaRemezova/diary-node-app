import moment from 'moment';
import { Button } from "@nextui-org/react";
import "../styles/Entry.css";

function Entry({ addEntry, entryTextfield, setEntryTextfield, selectedDate, entryToEdit, editEntry, deleteEntry, confirmDelete, cancelDelete, entryToDelete }) {

  const handleAddEntry = () => {
    if (entryTextfield !== '') {
      addEntry(entryTextfield);
    }
  };

  const handleEditEntry = () => {
    if (entryTextfield !== '') {
      editEntry(entryTextfield);
    }
  };

  return (
    <div>
      <div className="entryContainer">
        <div class="dateAndTextfield">
          <p>
            {`Date of Entry: ${moment(new Date(selectedDate).toISOString()).format('MMMM Do, YYYY')}`}
          </p>
          <textarea
            type="text"
            value={entryTextfield}
            onChange={(e) => setEntryTextfield(e.target.value)}
            placeholder="Enter new entry"
            className="entryField"
          />
        </div>
        <div className="buttonContainer">
          {entryTextfield.trim() !== '' && ( // Check if entryTextfield is not empty
            entryToEdit === null && (
              <Button style={{ backgroundColor: "#AED4A9" }} onClick={handleAddEntry}>New Entry</Button>
            )
          )}
          {entryTextfield.trim() !== '' && (
            entryToEdit !== null && (
              <>
                <Button style={{ backgroundColor: "#AED4A9" }} onClick={handleEditEntry}>Update Entry</Button>
                <Button style={{ backgroundColor: "#AED4A9" }} onClick={() => deleteEntry(entryToEdit)}>Delete Entry</Button>
              </>
            )
          )}
          {entryToDelete !== null && (
            <div className="modal">
              <p>Möchten Sie wirklich löschen?</p>
              <div class="buttonRow">
                <Button style={{ backgroundColor: "#6e8173" }} onClick={confirmDelete} className="yesNoButton">yes</Button>
                <Button style={{ backgroundColor: "#6e8173" }} onClick={cancelDelete} className="yesNoButton">no</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Entry;
