import React from 'react';
import { ShoppingOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = React.memo(() => {
  return (
    <header className="flex items-center justify-between bg-blue-900 p-5">
      <div className="flex items-center space-x-3">
        <ShoppingOutlined className="text-white text-2xl" />
        <h3 className="text-white text-xl font-bold m-0">ProductCompare</h3>
      </div>
      <div className="flex items-center">
        <UserOutlined className="text-white text-2xl" />
      </div>
    </header>
  );
});

export default Navbar; 