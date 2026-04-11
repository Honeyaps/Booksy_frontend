import { Navbar } from "../../navbar/navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiBag } from "react-icons/pi";
import { CiTimer } from "react-icons/ci";
import "./cardView.css";
import { Footer } from "../../footer/footer";
import { CiDeliveryTruck } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAPIService from "../../../../../services/user_service";
import { toast } from "sonner";
import { useCart } from "../../../../../services/common_service";
import { BuyNowModal } from "./buyNow/buyNow";
import { OTPModal } from "../../../registration/otpverif";
import { SignupModal } from "../../../registration/signup";
import { SigninModal } from "../../../registration/signin";

export const CardView = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

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

  const settings = {
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const BuyNow = () => {
    if (!token) {
        setShowSigninModal(true);
        toast.error("Please sign in to buy product");
        return;
    }

    if (!selectedSize) {
        toast.error("Please select a size");
        return;
    }
    setIsBuyNow(true);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPIService.getProducts({ productId });
        setProduct(response.data.product[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };


  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please sign in to add product to cart");
      setShowSigninModal(true);
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const cartData = {
      productId,
      quantity: 1,
      size: selectedSize,
      userId
    };

    try {
      const response = await UserAPIService.addToCart(cartData);
      const addedProduct = {
        productDetail: product,
        size: selectedSize,
        quantity: 1,
      };
      addToCart(addedProduct);

      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error while adding to cart:", error);
      toast.error(`Failed to add product to cart: ${error.message}`);
    }
  };

 

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-7 product_imgs">
            <Slider {...settings}>
              {product?.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="cardView_imgs"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="col-md-5 about_product">
            <div>
              <h1>{product?.productName}</h1>
              <h6 className="price">RS. {product?.price}</h6>
              <img
                src={product?.card_pic}
                alt=""
                className="img-fluid border border-dark my-3"
                style={{ width: "13%" }}
              />
              {/* <h6>SIZES</h6>
              <div className="row d-flex gap-2 my-3 mx-1">
                {product?.size.map((sizes, index) => (
                  <button
                    key={index}  
                    className={`col-md-2 border border-dark p-2 text-center button-size ${selectedSize === sizes ? "selected-size" : ""
                      }`}
                    onClick={() => handleSizeSelection(sizes)} 
                    value={sizes}
                  >
                    {sizes}
                  </button>

                ))}
              </div> */}
              <h6 className="mt-3">DESCRIPTION</h6>
              <p>{product?.description}</p>
              <button className="bg-transparent form_btn text-black border border-black w-100" onClick={BuyNow}>
                BUY NOW
              </button>
              <button className="form_btn w-100 mt-3" onClick={handleAddToCart}>
                <PiBag className="nav-icon" /> Add to Cart
              </button>
              <h6 className="mt-4">
                <CiTimer className="nav-icon fs-4" /> Delivery within 2-7 days
              </h6>
              <h6 className="mt-4">
                <CiDeliveryTruck className="nav-icon fs-4" /> Free shipping
                above 1999
              </h6>
              {/* <div className="material-dropdown">
                <h6 className="mt-4" onClick={toggleDropdown}>
                  Size Chart {isOpen ? '▲' : '▼'}
                </h6>
                {isOpen && (
                  <div className="dropdown-content">
                    <p><strong>Size Chart for Clothing</strong></p>
                    <table className="table table-bordered table-striped mt-2">
                      <thead className="table-light">
                        <tr>
                          <th>Size</th>
                          <th>Chest (inches)</th>
                          <th>Waist (inches)</th>
                          <th>Hip (inches)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>XS</td>
                          <td>31-32</td>
                          <td>24-25</td>
                          <td>33-34</td>
                        </tr>
                        <tr>
                          <td>S</td>
                          <td>33-34</td>
                          <td>26-27</td>
                          <td>35-36</td>
                        </tr>
                        <tr>
                          <td>M</td>
                          <td>35-36</td>
                          <td>28-29</td>
                          <td>37-38</td>
                        </tr>
                        <tr>
                          <td>L</td>
                          <td>37-39</td>
                          <td>30-32</td>
                          <td>39-41</td>
                        </tr>
                        <tr>
                          <td>XL</td>
                          <td>40-42</td>
                          <td>33-35</td>
                          <td>42-44</td>
                        </tr>
                        <tr>
                          <td>XXL</td>
                          <td>43-45</td>
                          <td>36-38</td>
                          <td>45-47</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div> */}

            </div>

            <div className="col-md-12 mt-5">
              <fieldset>
                <legend>Comments</legend>
                <div className="row mx-0">
                  <div className="col-md-12">
                    <form className="">
                      <div className="mb-3">
                        <label htmlFor="addComment" className="col-md-12">
                          Add a comment
                        </label>
                        <textarea
                          className="col-md-12"
                          id="addComment"
                        ></textarea>
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="form_btn col-md-12 mt-3 w-25"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="name" className="col-md-12">
                          @demoName
                        </label>
                        <div>Lorem ipsum</div>
                      </div>
                    </form>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        
      </div>
      <BuyNowModal isOpen={isBuyNow} setIsOpen={setIsBuyNow} productId={productId} size={selectedSize} />
      
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
      <Footer />
    </>
  );
};