import React from 'react';
import { Link } from 'react-router-dom';
import { LuFileEdit, LuFolderClock, LuHome, LuLayoutDashboard  } from "react-icons/lu";
import Logo from './Logo';

const Sidebar: React.FC = () => {
    return(
        <aside className="w-60 flex flex-col bg-white border-white-smoke border-r text-white h-screen">
            <div className="flex my-6 px-4 justify-start items-center">
                <Logo />
            </div>
            <nav>
                <ul className="space-y-2 mt-6">
                    <li>
                        <Link title="Home" className="menu-item" to="/"><LuHome />Home</Link>
                    </li>
                    <li>
                        <Link title="Dashboard" className="menu-item" to="/"> <LuLayoutDashboard />Dashboard</Link>
                    </li>
                    <li>
                        <Link title="Task" className="menu-item" to="/"><LuFileEdit />Task</Link>
                    </li>
                    <li>
                        <Link title="Project" className="menu-item" to="/"><LuFolderClock />Project</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;