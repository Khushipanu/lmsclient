import React from 'react'
import "./common.css"
import {AiOutlineLogout} from "react-icons/ai"
import { FaHome ,FaBook} from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <ul>
            <li>
                <Link to={'/admin/dashboard'}>
                <div className="icon">
                    <FaHome/>
                </div>
                <span>Home</span>
                </Link>
            </li>

             <li>
                <Link to={'/admin/course'}>
                <div className="icon">
                    <FaBook/>
                </div>
                <span>Courses</span>
                </Link>
            </li>
             <li>
                <Link to={'/account'}>
                <div className="icon">
                    <AiOutlineLogout />
                    <span> Logout </span>
                </div>
                
                </Link>
            </li>
        </ul>
        
    </div>
  )
}

export default Sidebar
