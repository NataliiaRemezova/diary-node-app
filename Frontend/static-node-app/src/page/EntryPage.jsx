import Entry from "../components/Entry.jsx";

import { useState, useEffect } from 'react';
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import { RiArrowRightSFill, RiArrowLeftSFill } from "react-icons/ri";
import { DayPicker } from "react-day-picker";
import "../styles/EntryPage.css";

function EntryPage() {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const [entries, setEntries] = useState([]);
    const [entryTextfield, setEntryTextfield] = useState('');
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(parseDate(formattedDate));
    const [backgroundNextArrow, setBackgroundNextArrow] = useState("#585a58b0");
    const [foregroundNextArrow, setForegroundNextArrow] = useState("#353830c9");
    const [backgroundPreviousArrow, setBackgroundPreviousArrow] = useState("#5faf4fb0");
    const [foregroundPreviousArrow, setForegroundPreviousArrow] = useState("#424b35c9");
    const [selected, setSelected] = useState(new Date());
    const [allEntriesAsDate, setAllEntriesAsDate] = useState([]);

    const fillEntryForCalendar = () => {
        const dateObjects = entries.map((entry) => {
            return new Date(entry.date)
          });
          setAllEntriesAsDate(dateObjects);
        for(const dateEntries of allEntriesAsDate) {
            console.log("these are the entries with dates" + dateEntries);
        }
    }

    const fetchEntries = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/entry/get-entries', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Error fetching entries');
            }
            const data = await response.json();
            setEntries(data);
        } catch (error) {
            console.error('Error fetching entries', error);
        }
    };

    useEffect(() => {
        const fetchSetup = async () => {
          await fetchEntries();
        };
        fetchSetup();
        console.log('Entries successfully fetched');
    }, []);

    useEffect(() => {
        if (entries.length > 0) {
          fillEntryForCalendar();
        }
    }, [entries]);

    const addEntry = (newEntryText) => {
        fetch('http://localhost:5000/api/entry/create-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date(selectedDate).toString() }),
            credentials: 'include', // Wichtig für das Senden von Cookies
        })
            .then(response => response.json())
            .then(data => {
                setEntries([...entries, data]);
                setEntryToEdit(data._id);
            })
            .catch(error => console.error('Error adding entry:', error));
    };

    const setupEditEntry = (id, text) => {
        setEntryToEdit(id);
        setEntryTextfield(text);
    };

    const setupNewEntry = () => {
        setEntryToEdit(null);
        setEntryTextfield('');
    };

    const editEntry = (newEntryText) => {
        fetch(`http://localhost:5000/api/entry/update-entry/${entryToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newEntryText, date: new Date(selectedDate).toString() }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setEntries(entries.map(entry => {
                    if (entry._id === entryToEdit) {
                        return { ...entry, text: newEntryText, date: new Date(selectedDate).toString() };
                    }
                    return entry;
                }));
                setEntryToDelete(null);
            })
            .catch(error => console.error('Error updating entry:', error));
    };

    const deleteEntry = (id) => {
        setEntryToDelete(id);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5000/api/entry/delete-entry/${entryToDelete}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(() => {
                setEntries(entries.filter(entry => entry._id !== entryToDelete));
                setEntryToDelete(null);
                setupNewEntry();
            })
            .catch(error => console.error('Error deleting entry:', error));
    };

    const cancelDelete = () => {
        setEntryToDelete(null);
    };

    function getDaysInMonth(year, month) {
        // month is 0-indexed (0 = January, 11 = December)
        return new Date(year, month + 1, 0).getDate();
    }

    const findEntryByDate = (newDate) => {

        setSelectedDate(() => {
            const thisDate = new Date(newDate).toString();
            for (const entry of entries) {
                let entrySubstring = entry.date;
                let entryDate = entrySubstring.substring(0, 15);
                if (entryDate === thisDate.substring(0, 15)) {
                    setupEditEntry(entry._id, entry.text);
                    setEntryToDelete(null);
                    return newDate;
                }
            }
            setupNewEntry();
            setEntryToDelete(null);

            return newDate;
        });

        setSelected(new Date(newDate));

        const currentDate = new Date(newDate);

        console.log("current: "+currentDate);

        const today = new Date();

        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

        if(currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear()) {

            if(currentDate.getDate() > today.getDate()) currentDate.setDate(today.getDate());
            if(currentDate.getDate() >= today.getDate()) {
                setBackgroundNextArrow("#585a58b0");
                setForegroundNextArrow("#353830c9");
            }else{
                setBackgroundNextArrow("#5faf4fb0");
                setForegroundNextArrow("#424b35c9");
            }
        }else{
            if(currentDate.getDate() >= daysInMonth) {
                setBackgroundNextArrow("#585a58b0");
                setForegroundNextArrow("#353830c9");
            }else{
                setBackgroundNextArrow("#5faf4fb0");
                setForegroundNextArrow("#424b35c9");
            }

        }

        if(currentDate.getDate() == 1) {
            setBackgroundPreviousArrow("#585a58b0");
            setForegroundPreviousArrow("#424b35c9");
        }else{
            setBackgroundPreviousArrow("#5faf4fb0");
            setForegroundPreviousArrow("#424b35c9");
        }
    };

    const changeToNextDay = () => {
        const currentDate = new Date(selectedDate);

        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

        if(currentDate.getDate() != daysInMonth){
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // checking date to ensure no entries are added for dates ahead of the current date
        const today = new Date();

        if(currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear()) {

            if(currentDate.getDate() > today.getDate()) currentDate.setDate(today.getDate());
            if(currentDate.getDate() >= today.getDate()) {
                setBackgroundNextArrow("#585a58b0");
                setForegroundNextArrow("#353830c9");
            }

        }else{
            if(currentDate.getDate() > daysInMonth) currentDate.setDate(today.getDate());
            if(currentDate.getDate() >= daysInMonth) {
                setBackgroundNextArrow("#585a58b0");
                setForegroundNextArrow("#353830c9");
            }
        }

        const newYear = currentDate.getFullYear();
        const newMonth = (currentDate.getMonth()) + 1;
        const newDay = currentDate.getDate();

        const currentMonth = String(newMonth).padStart(2, '0');
        const nextDay = String(newDay).padStart(2, '0');

        const newSelectedDate = `${newYear}-${currentMonth}-${nextDay}`;
        const selectedDateAsDateObject = new Date(newYear, currentDate.getMonth(), newDay);
        

        findEntryByDate(newSelectedDate);
        setSelectedDate(selectedDateAsDateObject);

        setBackgroundPreviousArrow("#5faf4fb0");
        setForegroundPreviousArrow("#424b35c9");

        setEntryToDelete(null);
    }


    const changeToPreviousDay = () => {
        const currentDate = new Date(selectedDate);

        if(currentDate.getDate() != 1){
            currentDate.setDate(currentDate.getDate() - 1);
        }

        if(currentDate.getDate() == 31) currentDate.setDate(1);
        if(currentDate.getDate() == 1) {
            setBackgroundPreviousArrow("#585a58b0");
            setForegroundPreviousArrow("#424b35c9");
        }

        const newYear = currentDate.getFullYear();
        const newMonth = (currentDate.getMonth()) + 1;
        const newDay = currentDate.getDate();

        const currentMonth = String(newMonth).padStart(2, '0');
        const nextDay = String(newDay).padStart(2, '0');

        const newSelectedDate = `${newYear}-${currentMonth}-${nextDay}`;
        const selectedDateAsDateObject = new Date(newYear, currentDate.getMonth(), newDay);
        
        findEntryByDate(newSelectedDate);
        setSelectedDate(selectedDateAsDateObject);

        setBackgroundNextArrow("#5faf4fb0");
        setForegroundNextArrow("#424b35c9");

        setEntryToDelete(null);
    }

    return (
        <div>
            <h1 className="entryPageHeader">Diary Entries</h1>
            <div className="flexContainer">
                <div>
                <DayPicker className="calendarStyle"
                    defaultMonth={new Date()}
                    modifiers={{ entries: allEntriesAsDate }}
                    disabled={{after: new Date()}}
                    modifiersClassNames={{ entries: "entries" , disabled: "nonselectabledates", selected: "selected"}}
                    onDayClick={findEntryByDate}
                    selected={selected}
                    />
                </div>
                <div className="entry">

                    <Entry addEntry={addEntry} entryTextfield={entryTextfield} setEntryTextfield={setEntryTextfield} selectedDate={selectedDate} entryToEdit={entryToEdit} editEntry={editEntry} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete}/>
                    {/*<ListOfEntries entries={entries} setupEditEntry={setupEditEntry} deleteEntry={deleteEntry} confirmDelete={confirmDelete} cancelDelete={cancelDelete} entryToDelete={entryToDelete} />*/}
                    <div class="buttonBar">
                        <Button isIconOnly aria-label="Previous" className="arrowButton" onClick={changeToPreviousDay} style={{backgroundColor: backgroundPreviousArrow, color: foregroundPreviousArrow}}>
                            <RiArrowLeftSFill />
                        </Button>    
                        <Button isIconOnly aria-label="Next" className="arrowButton" onClick={changeToNextDay} style={{backgroundColor: backgroundNextArrow, color: foregroundNextArrow}}>
                            <RiArrowRightSFill />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EntryPage;
