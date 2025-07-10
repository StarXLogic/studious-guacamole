import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#5E8C31] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-bamboo text-2xl"></i>
          <h1 className="text-xl font-bold">成都工业学院计算机工程学院竹石同心三下乡小队</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-200 transition">首页</Link>
          <Link to="/culture-learning" className="hover:text-yellow-200 transition">文化学习</Link>
          <Link to="/integrity" className="hover:text-yellow-200 transition">廉洁文化</Link>
        </nav>
      </div>
    </header>
  );
}