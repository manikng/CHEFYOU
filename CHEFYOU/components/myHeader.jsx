import img from "../src/assets/cheflogo.png";
import cheflogo from "../src/assets/imglogo.png";


export default function Header() {
  return (
    <header className="header w-full p-4 bg-white shadow-md "> 
      <div className="flex items-center justify-center">
        <img src={img} alt="yourChef" className="logo h-12" />
        <h1 className="text-2xl font-bold text-red-900 text-center">ChefYou</h1>
        <img src={cheflogo} alt="chef is am i" className="logo h-12" />
      </div>
      
    </header>
  );
}