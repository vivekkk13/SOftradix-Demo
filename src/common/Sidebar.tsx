import React from "react";
import { ProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <div className="shadow bg-body rounded">
        <div className="contain">
          <ul className="sidebar">
            <li>
              <span>Dashboard</span>
            </li>

            <li>
              <span>
                <i className="fa fa-users"></i>
              </span>
              <Link to="/User" className="link-dark">
                <span>Users</span>
              </Link>
            </li>
            <li>
              <span>
                <i className="fa fa-shopping-cart"></i>
              </span>
              <Link to="/Product" className="link-dark">
                <span>Products</span>
              </Link>
            </li>
          </ul>

          <div className="content"></div>
        </div>
      </div>
    </>
  );
}
