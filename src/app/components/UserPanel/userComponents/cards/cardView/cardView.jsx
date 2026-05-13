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
import Card from "../card";
import { FaStar } from "react-icons/fa";

export const CardView = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
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
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
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

    setIsBuyNow(true);
  };

  useEffect(() => {
    // Clear old data instantly
    setProduct(null);
    setReviews([]);

    const fetchData = async () => {
      try {
        // Product API
        const productResponse = await UserAPIService.getProducts({
          productId,
        });

        setProduct(productResponse.data.product[0]);

        // Reviews API
        const reviewResponse = await UserAPIService.getAllReviews({
          productId,
        });

        setReviews(reviewResponse.data.product || []);

      } catch (error) {
        console.error(error);
        setReviews([]);
      }
    };

    fetchData();
  }, [productId]);


  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please sign in to add product to cart");
      setShowSigninModal(true);
      return;
    }


    const cartData = {
      productId,
      quantity: 1,
      userId
    };

    try {
      const response = await UserAPIService.addToCart(cartData);
      const addedProduct = {
        productDetail: product,
        quantity: 1,
      };
      addToCart(addedProduct);

      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error while adding to cart:", error);
      toast.error(`Failed to add product to cart: ${error.message}`);
    }
  };


  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please sign in to add review");
      setShowSigninModal(true);
      return;
    }

    try {
      const reviewData = {
        userId,
        productId,
        comment,
        rating
      };

      const response = await UserAPIService.addReview(reviewData);

      toast.success(response.message);

      // Refetch updated reviews
      const reviewResponse = await UserAPIService.getAllReviews({
        productId,
      });

      setReviews(reviewResponse.data.product || []);

      setComment("");
      setRating(5);


    } catch (error) {
      console.error(error);
      toast.error("Failed to add review");
    }
  };



  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 product_imgs">
            {product?.card_pic?.length > 0 && (
              <img
                src={product.card_pic}
                alt="Product"
                className="cardView_imgs img-fluid"
              />
            )}
          </div>

          <div className="col-md-6 about_product">
            <div>
              <h1>{product?.productName}</h1>
              <h6 className="price">Rs. {product?.price}</h6>
              {/* <img
                src={product?.card_pic}
                alt=""
                className="img-fluid border border-dark my-3"
                style={{ width: "13%" }}
              /> */}

              <h6 className="mt-4">DESCRIPTION</h6>
              <p>{product?.description}</p>
              <h6 className="mt-4">
                <CiTimer className="nav-icon fs-4" /> Delivery within 2-7 days
              </h6>
              <h6 className="mt-4">
                <CiDeliveryTruck className="nav-icon fs-4" /> Free shipping
              </h6>
              <button className="bg-transparent form_btn text-black border border-black w-100 mt-3" onClick={BuyNow}>
                BUY NOW
              </button>
              <button className="form_btn w-100 mt-3" onClick={handleAddToCart}>
                <PiBag className="nav-icon" /> Add to Cart
              </button>

            </div>

            <div className="col-md-12 mt-5">
              <fieldset>
                <legend>Comments</legend>
                <div className="row mx-0">
                  <div className="col-md-12">
                    <form className="" onSubmit={handleAddReview}>
                      <div className="mb-3">
                        <label htmlFor="addComment" className="col-md-12">
                          Add a Comment
                        </label>
                        <textarea
                          className="col-md-12"
                          id="addComment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="mt-2 d-flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={25}
                              style={{ cursor: "pointer" }}
                              color={star <= rating ? "#ffc107" : "#e4e5e9"}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            type="submit"
                            className="form_btn col-md-12 mt-3 w-25"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                      {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                          <div className="mb-3 border-bottom pb-3" key={index}>

                            {/* Username */}
                            <label className="col-md-12 fw-bold">
                              @{review?.userDetail?.username}
                            </label>

                            {/* Rating */}
                            <div className="d-flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  size={18}
                                  color={star <= review.rating ? "#ffc107" : "#e4e5e9"}
                                />
                              ))}
                            </div>

                            {/* Comment */}
                            <div>
                              {review.comment?.split(" ").length > 20 ? (
                                <>
                                  {review.comment.split(" ").slice(0, 20).join(" ")}...
                                  <span
                                    style={{
                                      color: "blue",
                                      cursor: "pointer",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => alert(review.comment)}
                                  >
                                    Read More
                                  </span>
                                </>
                              ) : (
                                review.comment
                              )}
                            </div>

                          </div>
                        ))
                      ) : (
                        <div>No reviews yet</div>
                      )}
                    </form>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div>
          <Card />
        </div>

      </div>
      <BuyNowModal isOpen={isBuyNow} setIsOpen={setIsBuyNow} productId={productId} />

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