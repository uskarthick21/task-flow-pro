import { Link } from 'react-router-dom';
const Header = () => {
	return (
		<div className="bg-blue-800 py-4 px-4 md:px-0">
			<div className="container mx-auto flex justify-between">
				<span className="text-3xl text-white font-bold tracking-tight">
					<Link to="/">Task Management Pro</Link>
				</span>
				<span className="flex space-x-2">
					<Link
						className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 "
						to="/register"
					>
						Sign Up
					</Link>
				</span>
			</div>
		</div>
	);
};
export default Header;