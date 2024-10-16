import Logo from "../components/Logo";

interface Props {
    children: React.ReactNode
}

const AuthLayout = ({children}: Props) => {

    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 overflow-y-scroll md:p-0">
            <div className="pb-10">
            <Logo />
            </div>
            
            {children}
        </div>
    )

}



export default AuthLayout;