import { Link } from "react-router-dom";
import Lists from "./Lists";

const Home = () => {
return (
    <div className="p-8">
    <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">Explore Homes</h1>
            <p className="text-gray-500">Find your perfect stay</p>
        </div>
        <Link 
            to={"/homes/add"} 
            className="bg-[#f4405e] text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#f4405e] transition-colors duration-200 flex items-center gap-1"
        >
            <span className="text-xl">+</span> Add Home
        </Link>
    </div>
    <Lists/>
    </div>
);
};

export default Home;
