import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import "../styles/ListOfEntries.css";

function ListOfEntries({ entries, deleteEntry, confirmDelete, cancelDelete, entryToDelete }) {
    return (
        <div>
            <h2>List of Entries</h2>
            <ul>
                {entries.map(entry => (
                    <div key={entry._id} className="entryList">
                        {entry.text}
                        <button onClick={() => deleteEntry(entry._id)} className="buttonRound" ><MdDeleteForever /></button>
                        {entryToDelete === entry._id && (
                            <div className="modal">
                                <div className="modal-content">
                                    <p>Möchten Sie wirklich löschen?</p>
                                    <button onClick={confirmDelete} className="yesNoButton">yes</button>
                                    <button onClick={cancelDelete} className="yesNoButton">no</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ListOfEntries;
