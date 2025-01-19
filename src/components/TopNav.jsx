import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import MegaMenu from "./MegaMenu/MegaMenu";
import { MdMenuOpen } from "react-icons/md";
import { RiMenuFold4Line } from "react-icons/ri";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function TopNav({ onHamburgerClick, collapsed }) {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token is ---=====", token);
  }, []);

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("authToken");
    navigate("/userlogin", { replace: true });

    // navigate("/userlogin");
  };
  const handleMegaMegu = () => {
    setOpenMegaMenu(!openMegaMenu);
  };

  return (
    <header>
      <nav className="bg-gray-800 text-white border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <div
            className="self-center  font-semibold whitespace-nowrap dark:text-white cursor-pointer"
            onClick={onHamburgerClick}
          >
            {collapsed ? (
              <RiMenuFold4Line className="text-xl" />
            ) : (
              <MdMenuOpen className="text-xl" />
            )}
          </div>

          <div onClick={handleMegaMegu} className="cursor-pointer">
            <h1 className="font-bold text-sm"> MENU</h1>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div>
              <h1 className="text-lg">Admin</h1>
            </div>

            <div className="relative inline-block">
              <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center justify-center"
              >
                <CgProfile className="text-2xl" />
              </div>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile Visit
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {openMegaMenu && (
        <div className="">
          <MegaMenu />
        </div>
      )}
    </header>
  );
}

export default TopNav;
