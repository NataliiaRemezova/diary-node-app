import React, { useState } from 'react';
import './App.css';
function App() {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const add = () => {
    setCount(count + 1);
  };
  const deleteEntry = () => {
      setShowModal(true);
    }
    const confirmDelete = () => {
        setCount(count - 1);
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };
  return (
    <div>
      <h1>Hello World</h1>
        <p>heyyy</p>
        <button onClick={add} className="buttonRound" >+</button>
        <button onClick={deleteEntry} className="buttonRound">-</button>
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <p>Möchten Sie wirklich löschen?</p>
                    <button onClick={confirmDelete}>Ja</button>
                    <button onClick={cancelDelete}>Nein</button>
                </div>
            </div>
        )}
      <p>{count}</p>
    </div>
  );
}

export default App;
