import React from 'react';
import { AppstoreOutlined, SwapOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = React.memo(() => {
  const location = useLocation();
  
  // Determine which menu item should be selected based on current path
  const isHome = location.pathname === '/';
  
  return (
    <div className="w-56 h-full bg-white/80 backdrop-blur-md">
      <nav className="h-full">
        <ul className="py-4">
          <li className="mb-2">
            <Link 
              to="/" 
              className={`flex items-center px-6 py-3 ${isHome ? 'bg-blue-100 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <AppstoreOutlined className={`mr-3 ${isHome ? 'text-blue-600' : 'text-gray-500'}`} />
              <span>Product Details</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/compare" 
              className={`flex items-center px-6 py-3 ${!isHome ? 'bg-blue-100 text-blue-600 border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <SwapOutlined className={`mr-3 ${!isHome ? 'text-blue-600' : 'text-gray-500'}`} />
              <span>Compare Products</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Sidebar; 