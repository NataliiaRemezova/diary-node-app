import React from 'react';
import moment from 'moment';
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import {Button} from "@nextui-org/react";
import "../styles/ListOfEntries.css";

function ListOfEntries({ entries, setupEditEntry, deleteEntry, confirmDelete, cancelDelete, entryToDelete }) {
    return (
        <div>
            <h2>List of Entries</h2>
            <div className="divList">
                {entries.map(entry => (
                    <div key={entry._id} className="entryList">
                        <div>
                            <div className="singleEntryDate">
                                {moment(entry.date).format('MMMM Do, YYYY')}
                            </div>
                            <div className="singleEntryList">
                                {entry.text}
                            </div>
                        </div>
                        <div>
                            <Button isIconOnly onClick={() => deleteEntry(entry._id)} className="buttonRound" color="blue" ><MdDeleteForever /></Button>
                            <Button isIconOnly onClick={() => setupEditEntry(entry._id, entry.text, entry.date)} className="buttonRound" color="blue"><BiSolidEdit /></Button>
                        </div>
                        {entryToDelete === entry._id && (
                            <div className="modal">
                                <p>Möchten Sie wirklich löschen?</p>
                                <Button onClick={confirmDelete} className="yesNoButton">yes</Button>
                                <Button onClick={cancelDelete} className="yesNoButton">no</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOfEntries;
