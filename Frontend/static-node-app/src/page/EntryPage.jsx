import Entry from "../components/Entry.jsx";
import ListOfEntries from "../components/ListOfEntries.jsx";
import {Calendar} from "@nextui-org/calendar";
import { useState, useEffect } from 'react';

function EntryPage(){
    const [entries, setEntries] = useState([]);
    const [entryTextfield, setEntryTextfield] = useState('');
    const [entryDate, setEntryDate] = useState(null);
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [entryToDelete, setEntryToDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/entry/get-entries')
            .then(response => response.json())
            .then(data => setEntries(data))
            .catch(error => console.error('Error fetching entries:', error));
    }, []);

    const addEntry = (newEntryText) => {
        fetch('http://localhost:5000/api/entry/create-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date().toISOString() })
        })
            .then(response => response.json())
            .then(data => setEntries([...entries, data]))
            .then(() => {
                setEntryToEdit(null);
            })
            .catch(error => console.error('Error adding entry:', error));
    };

    const setupEditEntry = (id, text, date) => {
        setEntryToEdit(id);
        setEntryTextfield(text);
        setEntryDate(date);
    };

    const editEntry = (newEntryText) => {
        fetch(`http://localhost:5000/api/entry/update-entry/${entryToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText })
        })
            .then(response => response.json())
            .then((data) => {
                // if entry is entryToEdit --> change its text
                setEntries(entries.map(entry => {
                    if (entry._id === entryToEdit) {
                        return { ...entry, text: newEntryText };
                    }
                    return entry;
                }));
                setEntryToEdit(null);
            })
            .catch(error => console.error('Error updating entry:', error));
    };

    const deleteEntry = (id) => {
        setEntryToDelete(id);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5000/api/entry/delete-entry/${entryToDelete}`, {
            method: 'DELETE'
        })
            .then(() => {
                setEntries(entries.filter(entry => entry._id !== entryToDelete));
                setEntryToDelete(null);
            })
            .catch(error => console.error('Error deleting entry:', error));
    };

    const cancelDelete = () => {
        setEntryToDelete(null);
    };
    return(
        <div>
            <h1 className="text-3xl font-bold underline">Diary app</h1>
            <div>
                <Calendar />
                <Entry addEntry={addEntry} entryTextfield={entryTextfield} setEntryTextfield={setEntryTextfield} entryDate={entryDate} setEntryDate={setEntryDate} entryToEdit={entryToEdit} editEntry={editEntry}/>
                <ListOfEntries entries={entries} setupEditEntry={setupEditEntry} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />
            </div>
        </div>
    );
}

export default EntryPage