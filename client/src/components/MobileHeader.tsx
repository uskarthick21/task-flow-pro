import React, {useState} from 'react'
import { HeaderProps } from './Header'
import { LuBell, LuLogOut, LuMenu, LuSettings } from 'react-icons/lu'
import Logo from './Logo'
import MobileMenuSidebar from './MobileMenuSidebar'

const MobileHeader = ({signOut}:HeaderProps) => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((showMenu) => !showMenu);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-3">
          {/* Toggle Button */}
        <button className="header-menu-mobile-icon" onClick={toggleMenu}>
         <LuMenu className="text-xl" />
        </button>

        <Logo />

        <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center justify-center space-x-2">
                <button 
                aria-label="Logout"
                title="Logout"
                onClick={() => signOut()} 
                className="header-menu-mobile-icon w-6 h-6 rounded-3xl">
                <LuLogOut />
                </button>

                <button 
                aria-label="Settings"
                title="Settings"
                className="header-menu-mobile-icon w-6 h-6 rounded-3xl">
                <LuSettings />
                </button>

                <button 
                aria-label="Notifications"
                title="Notifications"
                className="header-menu-mobile-icon w-6 h-6 rounded-3xl">
                    <LuBell />
                </button>
            </div>
            
            <div className="flex items-center space-x-2">
                <img src="/images/avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
                <div className="hidden lg:block text-sm">
                    <span className="font-medium">Saravanan</span>
                    <span className="block text-gray-500">Admin</span>
                </div>
            </div>
        </div>
      </div>
        
        {/* Sidebar */}
        {<MobileMenuSidebar showMenu={showMenu} toggleMenu={toggleMenu} />}
    </>
  )
}

export default MobileHeader
