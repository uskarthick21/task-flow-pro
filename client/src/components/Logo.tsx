import { Link } from "react-router-dom";

const Logo = () => {
    return (
      <div className="text-sky-blue font-sans font-bold text-xl lg:text-3xl">
        {/* <span className="text-cyan-bright font-mono font-bold text-4xl">T</span>ask Flow Pro */}
        <Link title="Task Flow Pro" to="/">Task Flow Pro</Link>
      </div>
    );
  };
  
  export default Logo;