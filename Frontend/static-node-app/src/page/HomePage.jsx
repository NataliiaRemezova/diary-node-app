import PigRun from "../components/PigRun.jsx";
import "../styles/HomePage.css";
import { TypeAnimation } from 'react-type-animation';
import {Button,Link} from "@nextui-org/react";
import PreviewEntry from "../components/PreviewEntry.jsx";
import {useEffect, useState} from "react";
function Home (){
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entry/get-entries');
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen der Einträge');
                }
                const data = await response.json();
                setEntries(data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Einträge:', error);
            }
        };

        fetchEntries();
    }, []);
    return (
        <div>
            <div className="headerDiv">
                <TypeAnimation
                    sequence={[
                        "Welcome to your new adventure",
                        1000,
                        "Welcome to your journal",
                        1000,
                        "Welcome to your diary <3",
                        1000,
                    ]}
                    speed={800}
                    repeat={5}
                    style={{fontSize: '3em', fontWeight: 'bolder', color: '#1b3776'}}
                />
            </div>
            <div>
                <div className="container">
                    <div className="blockHome box-1">
                        <p>diary</p>
                        <Button as={Link} color="primary" href="/entries" variant="flat" className="buttonRound">
                            click here</Button>
                    </div>
                    <div className="blockHome box-2">
                        <PreviewEntry entries={entries}/>
                    </div>
                </div>
                <div className="blockHome box-3">
                </div>
            </div>
            <PigRun/>
        </div>
    );
}

export default Home