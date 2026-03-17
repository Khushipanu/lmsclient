import React from 'react'
import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2025 LMS platform. All right reserved. 
                <br />
                Made with &hearts; <a href="">Khushi~</a>
            </p>
            <div className="social-links">
                <a href=""><FaInstagram/> </a>
                <a href=""><FaLinkedin/></a>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer
