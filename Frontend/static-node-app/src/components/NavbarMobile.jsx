import {useEffect, useState} from "react";
import {Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";

const NavbarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuItems = [
    "Home",
    "Diary Entries",
    "Habit Tracker",
    "LogOut",
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
        {menuItems.map((item, index) => ( // maps over the menuItems to render each one as a link
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={index === 0 ? "/" :  index === 1 ? "/entries" : index === 2 ? "/habits" : index === 3 ? "/login" : "/error"}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarMobile;
