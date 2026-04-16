import React from 'react';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import twitter from '../assets/twitter.png';

const Footer = () => {
  return (
    <footer className="bg-[#2d4a43] text-white py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
       
        <div className="mb-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            KinKeeper
          </h2>
        </div>

        
        <p className="text-white/90 max-w-xl mx-auto text-xs md:text-base mb-8 md:mb-10 font-normal leading-relaxed px-2">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

       
        <div className="mb-10 md:mb-12">
          <h4 className="text-[10px] md:text-xs font-bold mb-4 md:mb-6 text-white tracking-[0.2em] uppercase opacity-100">
            Social Links
          </h4>
          
          <div className="flex justify-center gap-4 md:gap-6">
            <a href="#" className="bg-white p-2 md:p-2.5 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img src={instagram} alt="Instagram" className="h-5 w-5 md:h-6 md:w-6 object-contain" />
            </a>
            <a href="#" className="bg-white p-2 md:p-2.5 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img src={facebook} alt="Facebook" className="h-5 w-5 md:h-6 md:w-6 object-contain" />
            </a>
            <a href="#" className="bg-white p-2 md:p-2.5 rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <img src={twitter} alt="X" className="h-5 w-5 md:h-6 md:w-6 object-contain" />
            </a>
          </div>
        </div>

       
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-[11px] text-white/70 font-medium tracking-wide">
          <div className="order-2 md:order-1 uppercase">
            &copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.
          </div>
          
          <div className="flex gap-4 md:gap-8 order-1 md:order-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;