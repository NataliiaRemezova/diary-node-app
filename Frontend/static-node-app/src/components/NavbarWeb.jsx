import { useState } from "react";
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const NavbarWeb = () => {

    // states and functions toggling the page you are on (used later to correctly render the link design)
    const [isClickedHome, setIsClickedHome] = useState(false);
    const [isClickedEntries, setIsClickedEntries] = useState(false);
    const [isClickedEmotions, setIsClickedEmotions] = useState(false);

    const toggleHome = () => {
        setIsClickedHome(true);
        setIsClickedEntries(false);
        setIsClickedEmotions(false);
    }
    const toggleEntries = () => {
        setIsClickedEntries(true);
        setIsClickedHome(false);
        setIsClickedEmotions(false);
    }
    const toggleEmotions = () => {
        setIsClickedEmotions(true);
        setIsClickedHome(false);
        setIsClickedEntries(false);
    }

  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" aria-current="page" onClick={ toggleHome } className={`${isClickedHome ? "font-bold underline" : "foreground"}`}  >
            Home
          </Link> {/* Link component that links the routes when a button is pressed, changes the design of that button
                   (by evaluating the variable) and is connected to react router dom (page will not fully reload) */}
        </NavbarItem>
        <NavbarItem>
          <Link href="/entries" className={`${isClickedEntries ? "font-bold underline" : "foreground"}`} onClick={ toggleEntries } >
            Diary Entries
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={`${isClickedEmotions ? "font-bold underline" : "foreground"}`} onClick={ toggleEmotions } href="/emotions">
            Emotions Overview
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            LogOut
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarWeb;
