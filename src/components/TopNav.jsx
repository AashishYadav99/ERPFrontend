import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import MegaMenu from "./MegaMenu/MegaMenu";

function TopNav({ onHamburgerClick }) {
  const [openMegaMenu, setOpenMegaMenu] = useState(false);
  const handleMegaMegu = () => {
    setOpenMegaMenu(!openMegaMenu);
  };
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl text-gray-500">
          <div
            className="self-center  font-semibold whitespace-nowrap dark:text-white cursor-pointer"
            onClick={onHamburgerClick}
          >
            <GiHamburgerMenu className="text-xl" />
          </div>

          <div onClick={handleMegaMegu} className="cursor-pointer">
            <h1 className="font-bold text-sm"> MEGA MENU</h1>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div>
              <h1 className="text-lg">Admin</h1>
            </div>
            <div>
              <CgProfile className="text-2xl" />
            </div>
          </div>
        </div>
      </nav>
      {openMegaMenu && (
        <div>
          <MegaMenu />
        </div>
      )}
    </header>
  );
}

export default TopNav;
