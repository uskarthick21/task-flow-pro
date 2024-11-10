import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../config/api';
import { useAuth } from "../context/AuthContext";

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
		<div className="bg-blue-800 py-4 px-4 md:px-0">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to="/">Task Management Pro</Link>
				</span>
				<span className="flex space-x-2">
					<button
						className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 "
						onClick={() => signOut()} 
					>
						Log Out
					</button>
				</span>
			</div>
		</div>
	);
};
export default Header;