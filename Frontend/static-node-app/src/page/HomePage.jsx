import { useEffect, useState } from "react";
import PigRun from "../components/PigRun.jsx";
import "../styles/HomePage.css";
import { TypeAnimation } from 'react-type-animation';
import {Button, Link, user} from "@nextui-org/react";
import PreviewEntry from "../components/PreviewEntry.jsx";
import DateTime from "../components/DateTime.jsx";
import Streak from "../components/Streak.jsx";

function Home() {
    const [entries, setEntries] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entry/get-entries',{
                    credentials: 'include',
                });
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

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/check-auth', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(data.authenticated);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication();
    }, []);

    return (
        <div>
            {isAuthenticated ? (
             <div>
                 <div className="headerDiv">
                     <h1 className="headerFont">
                         Welcome back
                     </h1>
                 </div>

                 <div className="outerContainer">
                     <div className="innerContainer">
                         <div className="blockHome box-1">
                             <DateTime />
                         </div>
                         <div className="blockHome box-3">
                             <Streak />
                         </div>
                     </div>
                     <div className="blockHome box-2">
                         <PreviewEntry entries={entries} />
                         <Button as={Link} color="primary" href="/entries" variant="flat" className="buttonRound">
                             click here
                         </Button>
                     </div>
                 </div>
             </div>
            ) : (
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
                            style={{ fontSize: '3em', fontWeight: 'bolder', color: '#1b3776', alignSelf: 'center', justifySelf:'center' }}
                        />
                    </div>
                    <div className="introText">
                        <div className="ellipse"/>
                        Hast du jemals den Wunsch verspürt, deine Gedanken, Erlebnisse und Träume an einem sicheren Ort festzuhalten? <br/>
                        Mit [App-Name] hast dein persönlichen Tagebuch immer bei dir.
                    </div>
                    <div className="outerContainer">
                        <div className="blockFeature">
                            feature 1
                        </div>
                        <div className="blockFeature">
                            feature 2
                        </div>
                        <div className="blockFeature">
                            feature 3
                        </div>
                    </div>
                </div>
            )}
            <PigRun />
        </div>
    );
}

export default Home;
