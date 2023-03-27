import React from 'react';
import logo from '../../assets/images/Logo.svg';

const Header = () => {
  return (
    <div className="navbar bg-headerBg text-white">
      <div className="w-[80%] mx-auto">
        <div className="flex-1">
          <img src={logo} alt="" />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <a href="/order"><li className="ml-8">Order</li></a>
            <a href="/order-review"><li className="ml-8">Order Review</li></a>
            <a href="/manage-inventory"><li className="ml-8">Manage Inventory</li></a>
            <a href="/login"><li className="ml-8">Login</li></a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
