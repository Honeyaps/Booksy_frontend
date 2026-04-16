import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";
import { RiDeleteBinLine } from "react-icons/ri";
import './bag.css';
import { useEffect, useState } from "react";
import UserAPIService from "../../../../services/user_service";
import { toast } from "sonner";
import { useCart } from "../../../../services/common_service";
import { Order } from "./order/order";
import { OTPModal } from "../../registration/otpverif";
import { SignupModal } from "../../registration/signup";
import { SigninModal } from "../../registration/signin";


export const ShoppingBag = () => {
    const { cartItems, removeFromCart, setCartItems, updateCartItemQuantity } = useCart();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [isOpen, setIsOpen] = useState(false);

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [showSigninModal, setShowSigninModal] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });

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

    const checkout = () => {
        if (!token) {
            toast.error("Please sign in to checkout");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Please add items to checkout");
            return;
        }
        setIsOpen(true);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return;

            try {
                const response = await UserAPIService.getCartItems({ userId });
                setCartItems(response.data.product);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId, setCartItems]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await UserAPIService.removeCartItem({ userId, productId });
            removeFromCart(productId);
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing item from cart:", error);
            toast.error("Error removing item from cart");
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        updateCartItemQuantity(productId, quantity);
    };



    const totalPrice = cartItems.reduce((total, item) => total + item.productDetail.price * item.quantity, 0).toFixed(2);

    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-between px-5 mt-5">
                {/* <p>Free delivery on orders above ₹999 📚</p> */}
                <p>Free & flexible 15 days return</p>
                <p>Delivery within 2–5 working days</p>
            </div>
            <h1 className="text-center">Your Reading Cart</h1>
            <p className="text-center text-muted">Review your selected books before checkout</p>
            <div className="container mt-5 d-flex">
                <div className="col-md-7 bg-white border p-3">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item._id} className="col-md-12 d-flex p-3 border rounded-1 shadow mt-3">
                                <div className="col-md-3">
                                    <img src={item.productDetail.card_pic} alt={item.productDetail.productName} className="img-fluid" />
                                </div>
                                <div className="col-md-8 p-3">
                                    <div>
                                        <h2>{item.productDetail.productName}</h2>
                                        <h6 className="text-muted mt-3">₹ {item.productDetail.price}</h6>
                                    </div>
                                    {/* <div className="d-flex mt-4">
                                        <div className="">
                                            <h6>Quantity</h6>
                                            <p>{item.quantity}</p>
                                        </div>
                                    </div> */}
                                    <div>
                                        <h6>Quantity</h6>
                                        <select name="" id="" className="form-select w-25" value={item.quantity} onChange={(e) => handleQuantityChange(item.productId, e.target.value)}>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-1 p-3">
                                    <RiDeleteBinLine className="nav-icon" onClick={() => handleRemoveFromCart(item.productId)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        /* From Uiverse.io by Sophiek9h */


                        <div className="main_wrapper mt-3 d-flex flex-column align-items-center">
                            <div class="book">
                                <div class="book__pg-shadow"></div>
                                <div class="book__pg"></div>
                                <div class="book__pg book__pg--2"></div>
                                <div class="book__pg book__pg--3"></div>
                                <div class="book__pg book__pg--4"></div>
                                <div class="book__pg book__pg--5"></div>
                            </div>
                            <h2 className="mt-3">Your Bookshelf is Empty</h2>
                        </div>

                    )}
                </div>
                <div className="col-md-4 bg-white border p-4 mx-4 total_price">
                    {!token && (
                        <div>
                            <div>
                                <p>Sign in to continue your reading journey</p>
                                <button className="form_btn w-100 text-black bg-white border border-dark" onClick={handleShowSignin} >
                                    Sign in
                                </button>
                            </div>
                            <hr />
                        </div>
                    )}

                    <div className="d-flex justify-content-between">
                        <div className="col-md-6">
                            <p>Order value</p>
                            <p>Delivery</p>
                        </div>
                        <div className="col-md-6 text-end">
                            <p>₹ {totalPrice}</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <div className="col-md-6">
                            <h6>Total</h6>
                        </div>
                        <div className="col-md-6 text-end">
                            <h6>₹ {totalPrice}</h6>
                        </div>
                    </div>
                    <button className="form_btn w-100 mt-3" onClick={checkout}>Proceed to Checkout</button>
                    <p className="mt-4 text-muted">
                        At Booksy, we ensure a smooth and reliable shopping experience.
                        Enjoy easy returns within 15 days and quick delivery on all your favorite books.
                        Our support team is always here to help you with your orders.
                    </p>
                </div>
                <Order isOpen={isOpen} setIsOpen={setIsOpen} />


            </div>
            <Footer />

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

        </>
    );
};
