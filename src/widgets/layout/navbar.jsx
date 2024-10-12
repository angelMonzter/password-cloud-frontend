import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName }) {
  const [openNav, setOpenNav] = React.useState(false);
  const location = useLocation(); // Hook para obtener la ruta actual

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // Verificar si la ruta actual es '/profile'
  const isProfilePage = location.pathname === "/profile" || location.pathname === "/password" || location.pathname.startsWith("/password-recobery");

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        {/* Logo */}
        {!isProfilePage && (
          <Link to="/">
            <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
              {brandName}
            </Typography>
          </Link>
        )}

        {/* Mostrar los botones solo si no estás en la página de perfil */}
        {!isProfilePage && (
          <div className="hidden lg:flex gap-4">
            <Link to="/sign-up">
              <Button variant="text" size="sm" color="white">
                Registrarme
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="gradient" size="sm" color="white">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile menu toggle */}
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      {/* Mobile navigation */}
      <MobileNav open={openNav} className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900">
        {!isProfilePage && (
          <div className="container mx-auto">
            <Link to="/sign-up" className="block mb-4">
              <Button variant="text" size="sm" fullWidth>
                Registrarme
              </Button>
            </Link>
            <Link to="/sign-in" className="block">
              <Button variant="gradient" size="sm" fullWidth>
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        )}
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Software Incorp",
};

Navbar.propTypes = {
  brandName: PropTypes.string,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
