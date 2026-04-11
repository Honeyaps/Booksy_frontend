import React, { useState } from "react";
import { OTPModal } from "../../registration/otpverif";
import { SignupModal } from "../../registration/signup";
import { SigninModal } from "../../registration/signin";
import { CiUser, CiLogout } from "react-icons/ci";
import { IoBagCheckOutline, IoNewspaperOutline } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GrMap } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { MdOutlineLocalOffer } from "react-icons/md";
import "./navbar.css";
import { useCart } from "../../../../services/common_service";
import { LuUser2 } from "react-icons/lu";
import UserAPIService from "../../../../services/user_service";
import { IoIosMore } from "react-icons/io";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { cartCount } = useCart();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [isHoveredLogout, setIsHoveredLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleFormDataUpdate = (newFormData) => {
    setFormData(newFormData);
  };

  const handleShowSignUp = () => setShowSignUpModal(true);
  const handleCloseSignUp = () => setShowSignUpModal(false);

  const handleShowSignin = () => setShowSigninModal(true);
  const handleCloseSignin = () => setShowSigninModal(false);

  const handleOpenOTP = () => {
    if (!showOTPModal) {
      setShowSignUpModal(false);
      setShowOTPModal(true);
    }
  };

  const handleCloseOTP = () => setShowOTPModal(false);

  const handleOnSearch = async (query) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const data = { category: query };

    try {
      const response = await UserAPIService.getProducts(data);
      console.log("Products found:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleShowOrders = () => {
    navigate("/order-list");
  };


  return (
    <div>

      {/* Desktop Navbar */}
      <div className="container fullscreen_view">
        <div className="row mt-4">

          <div className="col-md-4">
            <div className="justify-content-start d-flex">
              <a href="/customer-service" className="me-5 text-dark">Customer Service</a>
              <a href="/newin" className="me-5 text-dark">Newin</a>
              {/* <a href="/store-locator" className="me-5 text-dark">Find a store</a> */}
              <div
               className="position-relative"
               onMouseEnter={() => setIsHoveredLogout(true)}
               onMouseLeave={() => setIsHoveredLogout(false)}
              >
              <a className="text-dark"><IoIosMore className="nav-icon" /></a>

              {isHoveredLogout && (
              <div className="order-dropdown position-absolute shadow">
                <button className="order-btn form_btn w-100" onClick={handleShowOrders}>
                  <LiaLuggageCartSolid className="nav-icon fs-4" /> Orders
                </button>
              </div>
            )}
              </div>
              
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div>
              <a href="/">
                <img
                  src="/booksy_main1.png"
                  alt="H&K Logo"
                  style={{ width: "140px", marginBottom: "50px" }}
                />
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="justify-content-end d-flex align-items-center">
              <a className="me-5 text-dark" onClick={handleShowSignin}>
                <LuUser2 className="nav-icon" /> Sign in
              </a>
              <a href="/offers" className="me-5 text-dark">
                <MdOutlineLocalOffer className="nav-icon" /> Offers
              </a>
              <a href="/shoppingbag" className="text-dark">
                <IoBagCheckOutline className="nav-icon" /> Shopping bag ({cartCount})
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar for Desktop */}
         <div className="row search_bar_row">
    <div className="col-12 d-flex justify-content-end">
      <div className="align-items-center handbag-container" style={{ position: "relative" }}>
        <GoSearch className="nav-icon search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search_bar"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleOnSearch(e.target.value); 
          }}
        />
        {/* Absolutely positioned search results dropdown */}
        {products.length > 0 && (
          <div
            className="search-results bg-white"
            style={{
              position: "absolute",
              top: "100%", 
              left: "0",
              width: "100%",
              zIndex: "10",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="border-0 w-100 p-2 text-start bg-transparent">
              {products.map((product) => (
                <a href={`/product-view/${product._id}`} key={product._id} className="mt-2">
                  {product.productName}
                  <br />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

      </div>

      {/* Mobile Navbar */}
      <div className="container-fluid mobile_view">
        <div className="mt-4 justify-content-between d-flex">
          <div>
            <a href="/">
              <img
                src="/booksy_main1.png"
                alt="H&K Logo"
                style={{ width: "100px", marginBottom: "80px" , marginTop: "-20px" }}
              />
            </a>
          </div>

          <div className="d-flex">
            <a href="/shoppingbag" className="me-4 d-block text-center text-dark">
              <div className="handbag-icon-wrapper">
                <BsHandbag className="nav-icon" />
              </div>
              <div className="handbag-count">({cartCount})</div>
            </a>
            <div>
              {!isOpen ? (
                <SlMenu className="nav-icon" onClick={toggleNavbar} />
              ) : (
                <RxCross1 className="nav-icon" onClick={toggleNavbar} />
              )}
            </div>
          </div>
        </div>

        {/* Search Bar for Mobile */}
        {/* Search Bar for Desktop */}
         <div className="row search_bar_row">
    <div className="col-12 d-flex justify-content-center">
      <div className="align-items-center handbag-container" style={{ position: "relative" }}>
        <GoSearch className="nav-icon search-icon" />
        <input
          type="text"
          placeholder="Search"
          className="search_bar"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleOnSearch(e.target.value); 
          }}
        />
        {/* Absolutely positioned search results dropdown */}
        {products.length > 0 && (
          <div
            className="search-results bg-white"
            style={{
              position: "absolute",
              top: "100%", 
              left: "0",
              width: "100%",
              zIndex: "10",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div className="border-0 w-100 p-2 text-start bg-transparent">
              {products.map((product) => (
                <a href={`/product-view/${product._id}`} key={product._id} className="mt-2">
                  {product.productName}
                  <br />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

        {/* Side Navbar for Mobile */}
        <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="#" onClick={handleShowSignin}>
                <CiUser className="nav-icon" /> Sign in
              </a>
            </li>
            <li>
              <a href="/newin">
                <IoNewspaperOutline className="nav-icon" /> Newin
              </a>
            </li>
            <li>
              <a href="/offers">
                <MdOutlineLocalOffer className="nav-icon" /> Offers
              </a>
            </li>
            {/* <li>
              <a href="/shoppingbag">
                <IoBagCheckOutline className="nav-icon" /> Shopping bag
              </a>
            </li> */}
            <li>
              <a href="/customer-service">
                <RiCustomerService2Fill className="nav-icon" /> Customer Service
              </a>
            </li>
            {/* <li>
              <a href="/store-locator">
                <GrMap className="nav-icon" /> Find a store
              </a>
            </li> */}
            <li>
              <a href="/order-list">
              <LiaLuggageCartSolid className="nav-icon fs-4" /> Orders
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Modals */}
      {showSigninModal && (
        <SigninModal
          show={showSigninModal}
          handleClose={handleCloseSignin}
          openSignupModal={() => {
            handleCloseSignin();
            handleShowSignUp();
          }}
        />
      )}

      {showSignUpModal && (
        <SignupModal
          show={showSignUpModal}
          handleClose={handleCloseSignUp}
          handleOpenOTP={handleOpenOTP}
          openSigninModal={() => {
            handleCloseSignUp();
            handleShowSignin();
          }}
          formData={formData}
          onFormDataUpdate={handleFormDataUpdate}
        />
      )}

      {showOTPModal && (
        <OTPModal
          show={showOTPModal}
          handleClose={handleCloseOTP}
          formData={formData}
        />
      )}
    </div>
  );
};
