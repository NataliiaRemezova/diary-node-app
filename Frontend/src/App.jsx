import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState([
    { _id: '1', text: 'Entry 1' },
    { _id: '2', text: 'Entry 2' },
    { _id: '3', text: 'Entry 3' },
  ]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleDelete = (id) => {
    try {
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={incrementCount}>Click to increment</button>
      <p>{count}</p>
      <h2>Diary entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            {entry.text}{' '}
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
