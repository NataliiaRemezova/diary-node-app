import React from 'react';

function ListOfEntries({ entries, deleteEntry }) {
  return (
    <div>
      <h2>List of Entries</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry._id}>
            {entry.text}
            <button onClick={() => deleteEntry(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListOfEntries;
