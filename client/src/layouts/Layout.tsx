
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
interface Props {
	children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
	return (
		<div className="flex h-screen">
			<div className="hidden lg:block">
			<Sidebar  />
			</div>
			<div className="flex-1 flex-col min-h-screen">
				<Header />
				<main className="p-6 flex-1">{children}</main>
			</div>
		</div>
	);
};
export default Layout;