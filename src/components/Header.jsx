import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Text } from "@chakra-ui/react";

function Header() {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const logoutHandler = () => {
    logOut()
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Colleges</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Admission</a>
            </li>
            <li>
              <a>My college</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Online Aid</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Colleges</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Admission</a>
          </li>
          <li>
            <a>My college</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <SearchBar />
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? (
              // If user is logged in, show profile link
              <li>
                <Link to="/profile" className="justify-between">
                  {user.displayName} Profile
                  <span className="badge">New</span>
                </Link>
              </li>
            ) : null}
            <li>
              <a>Settings</a>
            </li>
            <li>
              {user ? (
                <Text onClick={logoutHandler}>Logout</Text>
              ) : (
                <Link to="login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
