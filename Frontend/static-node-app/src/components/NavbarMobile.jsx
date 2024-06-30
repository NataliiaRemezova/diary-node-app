import {useEffect, useState} from "react";
import {Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";

const NavbarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isClickedHome, setIsClickedHome] = useState(false);
  const [isClickedEntries, setIsClickedEntries] = useState(false);
  const [isClickedHabits, setIsClickedHabits] = useState(false);
  const [isClickedLogin, setIsClickedLogin] = useState(true);

  const toggleHome = () => {
    setIsClickedHome(true);
    setIsClickedEntries(false);
    setIsClickedHabits(false);
    setIsClickedLogin(true);
  }
  const toggleEntries = () => {
    setIsClickedEntries(true);
    setIsClickedHome(false);
    setIsClickedHabits(false);
    setIsClickedLogin(true);
  }
  const toggleHabits = () => {
    setIsClickedHabits(true);
    setIsClickedHome(false);
    setIsClickedEntries(false);
    setIsClickedLogin(true);
  }
  const toggleLogin = () => {
    setIsClickedHome(false);
    setIsClickedEntries(false);
    setIsClickedHabits(false);
    setIsClickedLogin(!isClickedLogin);
  }

  const menuItems = [
    "",
    "Home",
    "Diary Entries",
    "Habit Tracker",
    isAuthenticated ? "Logout" : "Login"
  ];

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
                }
            })
            .catch(err => console.error('Error logging out:', err));
    };
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred="false" className="static">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" size="lg"/>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem key={menuItems[0]}>
          <Link></Link>
        </NavbarMenuItem>
          
        <NavbarMenuItem key={menuItems[1]} >
          <Link 
            color={"primary"}
            className={`${isClickedHome ? "w-full underline" : "w-full"}`}
            href="/"
            size="lg"
            onClick={toggleHome}
          >
            Home
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem key={menuItems[2]} >
          <Link 
            color={"primary"}
            className={`${isClickedEntries ? "w-full underline" : "w-full"}`}
            href="/entries"
            size="lg"
            onClick={toggleEntries}
          >
            Entries
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem key={menuItems[3]}>
          <Link 
            color={"primary"}
            className={`${isClickedHabits ? "w-full underline" : "w-full"}`}
            href="/habits"
            size="lg"
            onClick={toggleHabits}
          >
            Habit Tracker
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem key={menuItems[4]}>
          <Link 
            color={"danger"}
            className="w-full"
            href="/login"
            size="lg"
            onClick={`${isAuthenticated ? handleLogout : toggleLogin}`}
          >
            {`${isAuthenticated ? "Logout" : "Login"}`}
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarMobile;
