import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import "../styles/ListOfEntries.css";

function ListOfEntries({ entries, deleteEntry, confirmDelete, cancelDelete, entryToDelete }) {
    return (
        <div>
            <h2>List of Entries</h2>
            <div className="divList">
                {entries.map(entry => (
                    <div key={entry._id} className="entryList">
                        <div className="singleEntryList">
                            {entry.text}
                        </div>
                        <div>
                            <button onClick={() => deleteEntry(entry._id)} className="buttonRound" ><MdDeleteForever /></button>
                        </div>
                        {entryToDelete === entry._id && (
                            <div className="modal">
                                <p>Möchten Sie wirklich löschen?</p>
                                <button onClick={confirmDelete} className="yesNoButton">yes</button>
                                <button onClick={cancelDelete} className="yesNoButton">no</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOfEntries;
