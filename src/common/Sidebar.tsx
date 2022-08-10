import React from "react";
import { ProSidebar} from 'react-pro-sidebar';
import { Link } from "react-router-dom";



export default function Sidebar(){
    return(
        <>
        <div>
        <ProSidebar>
            <ul>
          <Link to='/User'>
            <span> User</span>
          </Link>
          <Link to='/Product'>
            <li>Products</li>
          </Link>
             </ul>
        </ProSidebar>
        </div>
        </>
    )
}