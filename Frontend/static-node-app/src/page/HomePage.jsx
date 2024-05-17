import PigRun from "../components/PigRun.jsx";
import "../styles/HomePage.css";
import { TypeAnimation } from 'react-type-animation'; // Libery for font animation
function Home (){

    return(
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
                    speed={50}
                    repeat={5}
                    style={{ fontSize: '3em', fontWeight: 'bolder', color:'#1b3776'}}
                />
            </div>
            <PigRun/>
        </div>
    );
}

export default Home