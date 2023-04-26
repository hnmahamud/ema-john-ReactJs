import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/Logo.svg";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout()
      .then(() => {
        toast("Logout Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className=" bg-black text-gray-400 font-bold sticky top-0">
      <div className="navbar md:w-[80%] md:mx-auto">
        {/* Logo for large device */}
        <div className="navbar-start hidden lg:flex">
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="" />
          </Link>
        </div>
        {/* NavLink for large device */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "mr-8 text-white" : "mr-8"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                isActive ? "mr-8 text-white" : "mr-8"
              }
            >
              Order
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                isActive ? "mr-8 text-white" : "mr-8"
              }
            >
              Inventory
            </NavLink>

            {user && <NavLink className="mr-8">{user.email}</NavLink>}

            {user ? (
              <NavLink onClick={logoutHandler}>Logout</NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "text-white" : "")}
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>

        {/* NavLink for small device */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-4 shadow bg-black rounded-md space-y-4"
            >
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-white" : "")}
              >
                Shop
              </NavLink>
              <NavLink
                to="/order"
                className={({ isActive }) => (isActive ? "text-white" : "")}
              >
                Order
              </NavLink>
              <NavLink
                to="/inventory"
                className={({ isActive }) => (isActive ? "text-white" : "")}
              >
                Inventory
              </NavLink>

              {user && <NavLink>{user.email}</NavLink>}

              {user ? (
                <NavLink onClick={logoutHandler}>Logout</NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "text-white" : "")}
                >
                  Login
                </NavLink>
              )}
            </ul>
          </div>
        </div>
        {/* Logo for small device */}
        <div className="navbar-end lg:hidden">
          <Link to="/" className="inline-flex items-center">
            <img src={logo} alt="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
