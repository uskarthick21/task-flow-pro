import { Link } from "react-router-dom";
import {
  LuHome,
  LuLayoutDashboard,
  LuFileEdit,
  LuFolderClock,
  LuX,
} from "react-icons/lu";
import SearchBar from "./SearchBar";

type MobileMenuSidebarParams = {
  showMenu: boolean;
  toggleMenu: () => void;
};

const MobileMenuSidebar = ({
  showMenu,
  toggleMenu,
}: MobileMenuSidebarParams) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-white shadow-lg z-50 py-4 px-4 overflow-y-auto ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-end">
          <button className="header-menu-mobile-icon " onClick={toggleMenu}>
            <LuX className="text-xl" />
          </button>
        </div>

        {/* Sidebar */}
        <div className="my-6">
          <SearchBar />
        </div>

        <nav>
          <ul className="mt-6">
            <li>
              <Link title="Home" className="menu-item" to="/">
                <LuHome />
                Home
              </Link>
            </li>
            {/* <li>
                  <Link title="Dashboard" className="menu-item" to="/"> <LuLayoutDashboard />Dashboard</Link>
              </li> */}
            <li>
              <Link title="Task" className="menu-item" to="/task">
                <LuFileEdit />
                Task
              </Link>
            </li>
            {/* <li>
                  <Link title="Project" className="menu-item" to="/"><LuFolderClock />Project</Link>
              </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenuSidebar;
