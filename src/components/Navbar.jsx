import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, History, BarChart3, Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  
  const toggleMenu = () => setIsOpen(!isOpen);

  
  const navItems = [
    { to: "/", icon: <Home size={20} />, label: "Home" },
    { to: "/timeline", icon: <History size={20} />, label: "Timeline" },
    { to: "/stats", icon: <BarChart3 size={20} />, label: "Stats" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-black text-gray-900">Kin</span>
              <span className="text-2xl font-bold text-[#2d4a43] tracking-tight">Keeper</span>
            </div>
          </Link>

          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className={({ isActive }) => 
                  `flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-200 
                  ${isActive ? 'bg-[#f0fdf4] text-[#2d4a43] shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 py-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)} 
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-black transition-all 
                ${isActive ? 'bg-[#f0fdf4] text-[#2d4a43]' : 'text-gray-500 hover:bg-gray-50'}`
              }
            >
              <span className={({ isActive }) => isActive ? 'text-[#2d4a43]' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="text-lg">{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
