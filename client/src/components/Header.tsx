import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { logOut } from '../config/api';
import { useAuth } from "../context/AuthContext";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

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
		<header className="bg-white border-white-smoke border-b">
			{/* Desktop Header: Show on large screens */}
			<div className="hidden lg:block">
				<DesktopHeader signOut={signOut} />
			</div>

			{/* Mobile Header: Show on small screens */}
			<div className="block lg:hidden">
				<MobileHeader  />
			</div>
		</header>
	);
};
export default Header;