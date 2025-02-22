import React from 'react';
import { FaShieldAlt, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-500 cyber-bg">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaShieldAlt className="h-6 w-6 text-red-500" />
            <span className="ml-2 text-white font-bold">NIDS</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/RanaNasir419" className="text-gray-400 hover:text-red-500">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/md-nasir-uddin-rana-a15b28247/" className="text-gray-400 hover:text-red-500">
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Network Intrusion Detection System designed by Md Nasir Uddin Rana. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
