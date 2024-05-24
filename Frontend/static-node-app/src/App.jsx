import { useMediaQuery } from "react-responsive";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/system';
import NavbarWeb from "./components/NavbarWeb.jsx";
import NavbarMobile from './components/NavbarMobile.jsx';
import './App.css'
import Footer from "./components/Footer.jsx";
import LoginPage from "./page/LoginPage.jsx";
import Home from "./page/HomePage.jsx";
import EntryPage from "./page/EntryPage.jsx";
import HabitPage from "./page/HabitPage.jsx";

function App() {
  const isMobile = useMediaQuery({ maxWidth: '1100px' }); // the screen size at which the device is considered mobile
  const navigate = useNavigate(); // navigation for single page routing with react router dom

  return (
    <NextUIProvider navigate={navigate}> {/* for NextUI */}
     <div className="appBody">
      {isMobile ? ( <NavbarMobile/> ) : ( <NavbarWeb/> )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/entries" element={<EntryPage/>} />
        <Route path="/habits" element={<HabitPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <Footer/>
      </div>
    </NextUIProvider>
  );
}

export default App;
