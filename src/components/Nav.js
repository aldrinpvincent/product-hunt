import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <NavLink to="/" activeClassName="selected" className="item">
        Posts
      </NavLink>
      <NavLink to="/likes" activeClassName="selected" className="item">
        Your Favourites
      </NavLink>
    </>
  );
};

export default Nav;
