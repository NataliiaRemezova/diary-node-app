import {useEffect, useState} from "react";
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const NavbarWeb = () => {

   const [isClickedHome, setIsClickedHome] = useState(false);
    const [isClickedEntries, setIsClickedEntries] = useState(false);
    const [isClickedHabits, setIsClickedHabits] = useState(false);
    const [isClickedToDoList, setIsClickedToDoList] = useState(false);
    
    //sprint_07_matthis
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const [isClickedLogin, setIsClickedLogin] = useState(true);

    const toggleHome = () => {
        setIsClickedHome(true);
        setIsClickedEntries(false);
        setIsClickedHabits(false);
        setIsClickedToDoList(false);
        setIsClickedLogin(true);
    }
    const toggleEntries = () => {
        setIsClickedHome(false);
        setIsClickedEntries(true);
        setIsClickedHabits(false);
        setIsClickedToDoList(false);
        setIsClickedLogin(true);
    }
    const toggleHabits = () => {
        setIsClickedHome(false);
        setIsClickedEntries(false);
        setIsClickedHabits(true);
        setIsClickedToDoList(false);
        setIsClickedLogin(true);
    }
    const toggleToDoList = () => {
        setIsClickedHome(false);
        setIsClickedEntries(false);
        setIsClickedHabits(false);
        setIsClickedToDoList(true);
        setIsClickedLogin(true);
    }
    const toggleLogin = () => {
      setIsClickedHome(false);
      setIsClickedEntries(false);
      setIsClickedHabits(false);
      setIsClickedToDoList(false);
      setIsClickedLogin(!isClickedLogin);
      console.log("testttt");
  }

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

    const handleLogout = () => {
        fetch('http://localhost:5000/api/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    setIsAuthenticated(false);
                    window.location.href = '/';
                    toggleLogin();
                }
            })
            .catch(err => console.error('Error logging out:', err));
    };

  return (
    <Navbar shouldHideOnScroll style={{borderRadius: "15px"}}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link style={{color: "#2cb14de1"}} href="/" aria-current="page" onClick={ toggleHome } className={`${isClickedHome ? "font-bold underline" : "foreground"}`}  >
            Home
          </Link> {/* Link component that links the routes when a button is pressed, changes the design of that button
                   (by evaluating the variable) and is connected to react router dom (page will not fully reload) */}
        </NavbarItem>
          {isAuthenticated ? (
              <NavbarContent>
                  <NavbarItem>
                      <Link style={{color: "#2cb14de1"}} href="/entries" className={`${isClickedEntries ? "font-bold underline" : "foreground"}`} onClick={ toggleEntries } >
                          Diary Entries
                      </Link>
                  </NavbarItem>
                  <NavbarItem>
                      <Link style={{color: "#2cb14de1"}} className={`${isClickedHabits ? "font-bold underline" : "foreground"}`} onClick={ toggleHabits } href="/habits">
                          Habit Tracker
                      </Link>
                  </NavbarItem>
                  <NavbarItem>
                      <Link style={{color: "#2cb14de1"}} className={`${isClickedToDoList ? "font-bold underline" : "foreground"}`} onClick={ toggleToDoList } href="/todolist">
                          To-Do List
                      </Link>
                  </NavbarItem>
              </NavbarContent>
              ) : ( null)}
      </NavbarContent>
      <NavbarContent justify="end">
            {isAuthenticated && (
                <NavbarItem>
                    <Link style={{color: "#2cb14de1"}} href="/profile" className={`${isClickedHome ? "font-bold underline" : "foreground"}`} >
                        Profile
                    </Link>
                </NavbarItem>
            )}
        <NavbarItem>
            {isAuthenticated ? (
                <Button style={{ backgroundColor: "#cfe7a7c9", color: "#2cb14de1" }} onClick={handleLogout} color="primary" variant="flat">
                    Logout
                </Button>
            ) : (
                <Button style={{ backgroundColor: "#cfe7a7c9", color: "#2cb14de1" }} as={Link} onClick={toggleLogin} color="primary" href="/login" variant="flat">
                    Login
                </Button>
            )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarWeb;
