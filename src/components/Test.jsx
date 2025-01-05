import { useEffect, useState } from "react";
import constantApi from "../constantApi";
import axios from "axios";
import { IoMdArrowDropright } from "react-icons/io";

function Test() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [modules, setModules] = useState([]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`${constantApi.baseUrl}/module_master/list`)
      .then((res) => {
        console.log("response ", res);
        setModules(res.data.data); // Assuming 'data' is the correct path
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  console.log("modules", modules);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-3 sm:py-0">
      <nav className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col ">
          <div className="">
            <button
              id="hs-mega-menu"
              type="button"
              className="hs-dropdown-toggle sm:p-2 flex items-center w-full text-gray-600 font-medium hover:text-gray-400 focus:outline-none focus:text-gray-400"
              aria-haspopup="menu"
              aria-label="Mega Menu"
              onClick={toggleMenu}
            >
              Mega Menu
              <svg
                className="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-2 shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className={`hs-dropdown-menu sm:transition-[opacity,margin] sm:ease-in-out sm:duration-[150ms] ${
                isMenuOpen ? "opacity-100 block" : "opacity-0 hidden"
              } w-full z-10 top-full start-0 min-w-60 bg-white sm:shadow-md rounded-lg py-2 sm:px-2 sm:before:absolute`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-mega-menu"
            >
              <div className="sm:grid sm:grid-cols-3 w-full">
                {modules && modules.length > 0 ? (
                  modules.map((module) => (
                    <div key={module.id}>
                      {" "}
                      {/* Assuming each module has a unique 'id' */}
                      <p
                        className="flex items-center py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        href="#"
                      >
                        {module.module_name}
                        <span>
                          <IoMdArrowDropright className="text-xl" />
                        </span>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No modules available</p> // Placeholder message when no modules are loaded
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Test;
