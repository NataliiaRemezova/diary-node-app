import { useState } from "react";
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const NavbarWeb = () => {

    // states and functions toggling the page you are on (used later to correctly render the link design)
    const [isClickedHome, setIsClickedHome] = useState(false);
    const [isClickedEntries, setIsClickedEntries] = useState(false);
    const [isClickedHabits, setIsClickedHabits] = useState(false);

    const toggleHome = () => {
        setIsClickedHome(true);
        setIsClickedEntries(false);
        setIsClickedHabits(false);
    }
    const toggleEntries = () => {
        setIsClickedEntries(true);
        setIsClickedHome(false);
        setIsClickedHabits(false);
    }
    const toggleHabits = () => {
        setIsClickedHabits(true);
        setIsClickedHome(false);
        setIsClickedEntries(false);
    }

  return (
    <Navbar shouldHideOnScroll style={{borderRadius: "15px"}}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link style={{color: "#2cb14de1"}} href="/" aria-current="page" onClick={ toggleHome } className={`${isClickedHome ? "font-bold underline" : "foreground"}`}  >
            Home
          </Link> {/* Link component that links the routes when a button is pressed, changes the design of that button
                   (by evaluating the variable) and is connected to react router dom (page will not fully reload) */}
        </NavbarItem>
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button style={{backgroundColor: "#cfe7a7c9", color: "#2cb14de1"}} as={Link} color="primary" href="/login" variant="flat">
            LogOut
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarWeb;
