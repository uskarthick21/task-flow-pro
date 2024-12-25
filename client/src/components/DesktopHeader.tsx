import { LuSettings, LuBell, LuLogOut } from "react-icons/lu";
import { HeaderProps } from "./Header";
import SearchBar from "./Search/SearchBar";

const DesktopHeader = ({ signOut }: HeaderProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
      <SearchBar />

      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center justify-center space-x-3">
          <button
            aria-label="Logout"
            title="Logout"
            onClick={() => signOut()}
            className="header-menu-mobile-icon w-8 h-8 rounded-3xl"
          >
            <LuLogOut />
          </button>

          <button
            aria-label="Settings"
            title="Settings"
            className="header-menu-mobile-icon w-8 h-8 rounded-3xl"
          >
            <LuSettings />
          </button>

          <button
            aria-label="Notifications"
            title="Notifications"
            className="header-menu-mobile-icon w-8 h-8 rounded-3xl"
          >
            <LuBell />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="/images/avatar.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden lg:block text-sm">
            <span className="font-medium">Saravanan</span>
            <span className="block text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
