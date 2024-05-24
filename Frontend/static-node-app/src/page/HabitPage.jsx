import React from "react";
import HabitList from "../components/HabitList";

function HabitPage(){

    return (
        <div className="Habit-tracker">
            <header className="Habit-header">
                <h1>Habit Tracker</h1>
                <HabitList />
            </header>
        </div>
    );
}

export default HabitPage
