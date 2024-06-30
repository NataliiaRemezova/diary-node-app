import { useEffect, useState } from "react";
import PigRun from "../components/PigRun.jsx";
import "../styles/HomePage.css";
import { TypeAnimation } from 'react-type-animation';
import { Button, Link } from "@nextui-org/react";
import PreviewEntry from "../components/PreviewEntry.jsx";
import DateTime from "../components/DateTime.jsx";
import Streak from "../components/Streak.jsx";
import FeatureDiscription from "../components/FeatureDiscription.jsx";

function Home() {
    const [entries, setEntries] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/entry/get-entries', {
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
                    if (data.authenticated && data.user && data.user._id) {
                        setUser(data.user); // Store user details in state
                    }
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication()
    }, []);

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <div className="headerDiv">
                        <h1 className="headerFont">
                            Welcome back, {user && user.username}
                        </h1>
                    </div>

                    <div className="outerContainer">
                        <div className="innerContainer">
                            <div className="blockHome ">
                                <DateTime />
                            </div>
                            <div style={{display:"flex"}}>
                                <div className="blockHome" style={{width:"20vw", alignContent:"center"}}>
                                    <Streak />
                                </div>
                                <div className="blockHome" style={{width:"20vw"}}>
                                    hello
                                </div>
                            </div>
                        </div>
                        <div className="blockHome" style={{width:"35vw"}}>
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
                            style={{ fontSize: '3em', fontWeight: 'bolder', color: '#1b3776', alignSelf: 'center', justifySelf: 'center' , fontFamily: 'pixelFont'}}
                        />
                    </div>
                    <div className="introText">
                        <div className="ellipseRing"/>
                        <div className="ellipse"/>
                        <div className="starTranslate">
                            <div className="star"/>
                        </div>
                        Hast du jemals den Wunsch verspürt, deine Gedanken, Erlebnisse und Träume an einem sicheren Ort festzuhalten? <br/>
                        Mit [App-Name] hast dein persönlichen Tagebuch immer bei dir.
                    </div>
                    <div className="outerContainer">
                        <FeatureDiscription />
                    </div>
                </div>
            )}
            <PigRun />
        </div>
    );
}

export default Home;
