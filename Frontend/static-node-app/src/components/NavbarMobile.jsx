import { useState } from "react";
import {Navbar, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";

const NavbarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "Diary Entries",
    "Emotions Overview",
    "LogOut",
  ];

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
              href={index === 0 ? "/" :  index === 1 ? "/entries" : index === 2 ? "/emotions" : index === 3 ? "/login" : "/error"}
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
