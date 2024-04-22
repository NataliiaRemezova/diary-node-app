import React, { useState } from 'react';
import './App.css';
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import PigRun from "./Component/PigRun.jsx";


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
        <button onClick={add} className="buttonRound" ><IoIosAddCircle /></button>
        <button onClick={deleteEntry} className="buttonRound"><MdDeleteForever /></button>
        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <p>Möchten Sie wirklich löschen?</p>
                    <button onClick={confirmDelete} className="yesNoButton">yes</button>
                    <button onClick={cancelDelete} className="yesNoButton">no</button>
                </div>
            </div>
        )}
      <p>{count}</p>
        <div><PigRun/></div>
    </div>
  );
}

export default App;
