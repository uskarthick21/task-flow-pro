import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../config/api';
import { useAuth } from "../context/AuthContext";
import { LuSettings, LuBell, LuLogOut  } from "react-icons/lu";

const Header = () => {

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { logout } = useAuth(); // Destructure logout from useAuth
	const {mutate: signOut} = useMutation({
		mutationFn: logOut,
		onSettled: () => {
			queryClient.clear();
			logout();
			navigate("/login", {replace: true})
		}
	})

	return (

		<header className="bg-white border-slate-400 border-b">
			<div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">

				{/** Search Bar */}
			
					<input
						type="text"
						placeholder="Search"
						className="w-40 sm:w-3/5 md:w-2/5 lg:w-2/5 px-4 py-2 text-sm border border-slate-400 rounded-lg focus:outline-none focus:ring focus:ring-gray-200 transition-all duration-300 ease-in-out focus:sm:w-4/5 focus:md:w-3/5 focus:lg:w-3/5"
					/>
			

				<div className="flex items-center justify-center space-x-6">
					<div className="flex items-center justify-center space-x-3">

						<button 
						aria-label="Logout"
						title="Logout"
						onClick={() => signOut()} 
						className="flex items-center justify-center bg-gray-200 w-8 h-8 text-gray-600 hover: text-gray-800 rounded-3xl">
						<LuLogOut />
						</button>

						<button 
						aria-label="Settings"
						title="Settings"
						className="flex items-center justify-center bg-gray-200 w-8 h-8 text-gray-600 hover: text-gray-800 rounded-3xl">
						<LuSettings />
						</button>

						<button 
						aria-label="Notifications"
						title="Notifications"
						className="flex items-center justify-center bg-gray-200 w-8 h-8 text-gray-600 hover: text-gray-800 rounded-3xl">
							<LuBell />
						</button>
					</div>
					
					<div className="flex items-center space-x-2">
						<img src="/images/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
						<div className="hidden lg:block text-sm">
							<span className="font-medium">Saravanan</span>
							<span className="block text-gray-500">Admin</span>
						</div>
          			</div>
					
				</div>

			</div>
		</header>
	);
};
export default Header;