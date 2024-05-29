import {useEffect, useState} from "react";
import moment from 'moment';
import "../styles/PreviewEntry.css";

function PreviewEntry({ entries }) {
    const [lastThreeEntries, setLastThreeEntries] = useState([]);

    useEffect(() => {
        const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastThree = sortedEntries.slice(0, 3);
        setLastThreeEntries(lastThree);
    }, [entries]);

    return (
        <div>
            <h2 className="previewHeader">Last Three Entries</h2>
            <div>
                {lastThreeEntries.map(entry => (
                    <div key={entry._id}>
                        <div className="previewEntry">
                            <div className="previewDate">
                                {moment(entry.date).format('MMMM Do, YYYY')}
                            </div>
                            <div className="previewText">
                                {entry.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default PreviewEntry;