import React from 'react';
import { PiFacebookLogoLight, PiInstagramLogoLight, PiPinterestLogo, PiYoutubeLogoLight ,PiTiktokLogoLight ,PiSpotifyLogoLight } from "react-icons/pi";
import './footer.css';

export const Footer = () => {
  return (
    <div className="container-fluid mt-5 p-5 footer_section">
      <div className="row">
      
        <div className="col-md-3">
          <h6 className="fw-bold">BOOK CATEGORIES</h6>
          <ul className="list-unstyled">
            <li><a href="#" className="text-dark text-decoration-none">Fiction</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Non-Fiction</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Academic</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Children's Books</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Comics & Manga</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Self-Help</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Magazines</a></li>
          </ul>
        </div>

    
        <div className="col-md-3">
           <h6 className="fw-bold">ABOUT BOOKSY</h6>
          <ul className="list-unstyled">
            <li><a href="#" className="text-dark text-decoration-none">About Us</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Careers</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Our Mission</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Blog</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Press</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Affiliate Program</a></li>
          </ul>
        </div>

        
        <div className="col-md-3">
             <h6 className="fw-bold">CUSTOMER SUPPORT</h6>
          <ul className="list-unstyled">
            <li><a href="#" className="text-dark text-decoration-none">Help Center</a></li>
            <li><a href="#" className="text-dark text-decoration-none">My Account</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Order Tracking</a></li>
            <li><a href="/adminsignin" className="text-dark text-decoration-none">Privacy Policy</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Contact Us</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Report an Issue</a></li>
            <li><a href="#" className="text-dark text-decoration-none">Terms & Conditions</a></li>
          </ul>
        </div>

       
        <div className="col-md-3">
          <p>
            Subscribe to Booksy and get updates on latest books, exclusive deals, and reading tips.
          </p>
          <a href="#" className="text-decoration-none fw-bold text-dark">
            Subscribe Now →
          </a>
        </div>
      </div>

   
      <div className="text-center mt-4">
        <a href="#" className="me-3 text-dark icon"  ><PiInstagramLogoLight /></a>
        <a href="#" className="me-3 text-dark icon"><PiTiktokLogoLight /></a>
        <a href="#" className="me-3 text-dark icon"><PiSpotifyLogoLight /></a>
        <a href="#" className="me-3 text-dark icon"><PiYoutubeLogoLight /></a>
        <a href="#" className="me-3 text-dark icon"><PiPinterestLogo /></a>
        <a href="#" className="me-3 text-dark icon"><PiFacebookLogoLight /></a>
      </div>

      <div className="text-center mt-2" style={{fontSize: "13px", color: "#777"}}>
        © {new Date().getFullYear()} Booksy. All rights reserved.
      </div>
    </div>
  );
};


