import React from 'react';
import moment from 'moment';
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import {Button} from "@nextui-org/react";
import "../styles/ListOfEntries.css";
import {Button} from "@nextui-org/react";

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
                            <Button isIconOnly  radius="full" onClick={() => deleteEntry(entry._id)} className="buttonRound" ><MdDeleteForever /></Button>
                            <Button isIconOnly radius="full" onClick={() => setupEditEntry(entry._id, entry.text)} className="buttonRound" ><BiSolidEdit /></Button>
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
