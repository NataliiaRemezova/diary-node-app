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
import RegistrationPage from "./page/RegisterPage.jsx";
import UserTable from "./page/UserTablePage.jsx";


function App() {
  const isMobile = useMediaQuery({ maxWidth: '1100px' }); // the screen size at which the device is considered mobile
  const navigate = useNavigate(); // navigation for single page routing with react router dom

  return (
    <NextUIProvider navigate={navigate} style={{display:"flex", justifyContent:"center"}}>
     <div className="appBody">

      {isMobile ? ( <NavbarMobile/> ) : ( <NavbarWeb/> )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<UserTable/>} />
        <Route path="/entries" element={<EntryPage/>} />
        <Route path="/habits" element={<HabitPage/>} />
        <Route path="/login" element={<LoginPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
      </Routes>
      <Footer/>
      </div>
    </NextUIProvider>
  );
}

export default App;
