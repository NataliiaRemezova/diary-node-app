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
import ToDoListPage from "./page/ToDoListPage.jsx";
import RegistrationPage from "./page/RegisterPage.jsx";
import UserTable from "./page/UserTablePage.jsx";
import PrivateRoute from './components/PrivateRoute';
import UserProfilePage from "./page/UserProfilePage.jsx";

function App() {
  const isMobile = useMediaQuery({ maxWidth: '1100px' });
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
     <div className="appBody">
      {isMobile ? ( <NavbarMobile/> ) : ( <NavbarWeb/> )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<UserTable/>} />
        <Route path="/entries" element={
            <PrivateRoute>
                <EntryPage/>
            </PrivateRoute>} />
        <Route path="/habits" element={
            <PrivateRoute>
                <HabitPage/>
            </PrivateRoute>} />
        <Route path="/todolist" element={
            <PrivateRoute>
                <ToDoListPage/>
            </PrivateRoute>} />
        <Route path="/profile" element={
            <PrivateRoute>
              <UserProfilePage />
             </PrivateRoute>} />
        <Route path="/login" element={<LoginPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
      </Routes>
      <Footer/>
      </div>
    </NextUIProvider>
  );
}

export default App;
