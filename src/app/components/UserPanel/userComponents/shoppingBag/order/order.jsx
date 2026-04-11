import './order.css';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Step1 } from './step1/step1';
import { Step2 } from './step2/step2';
import { useCart } from '../../../../../services/common_service';
import UserAPIService from '../../../../../services/user_service';

export const Order = ({ isOpen, setIsOpen }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const { cartItems, setCartItems } = useCart();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const steps = [
        { name: 'User Details', component: <Step1 /> },
        { name: 'Payment', component: <Step2 /> },
    ];

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            height: '600px',
            width: '1200px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return;

            try {
                const response = await UserAPIService.getCartItems({ userId });
                const filteredItems = response.data.product.filter(item => item.status === 1);

                setCartItems(filteredItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [userId, setCartItems]);

    const totalPrice = cartItems.reduce((total, item) => total + item.productDetail.price * item.quantity, 0).toFixed(2);

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <div className="row">
                <div className='col-md-4 p-3 order_summary'>
                    <div className='d-flex justify-content-between'>
                        <h5>Order Summary</h5>
                        <div><IoBagOutline className='nav-icon' /></div>
                    </div>

                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                    <div className='bg-white p-3 mt-2 rounded d-flex' key={item._id}>
                        <div className='col-md-4'>
                            <img src={item.productDetail.card_pic} alt="" className='w-50 rounded'/>
                        </div>
                        <div className='col-md-8'>
                            <div>
                                <h6>{item.productDetail.productName} - {item.size}</h6>
                            </div>

                            <div className='d-flex justify-content-between mt-3'>
                                <div>Quantity : {item.quantity}</div>
                                <div>Price : RS. {item.productDetail.price}</div>
                            </div>
                        </div>
                    </div>
                    ))
                    ) : (
                        <div>No items in the cart</div>
                    )}

                   
                    <div className='bg-white p-3 mt-2 rounded'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-between'>
                                <div>Subtotal</div>
                                <div>RS. {totalPrice}</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div>Shipping</div>
                                <div>Free</div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <h5>Total</h5>
                                <h6>RS. {totalPrice}</h6>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white p-3 mt-2 rounded d-flex border border-light shadow'>
                        <div className='col-md-1'>
                            <RiDiscountPercentFill className='fs-4' />
                        </div>
                        <div className='col-md-11 mt-1 mx-3'>
                            <div>
                                <h6>Apply Coupon</h6>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='col-md-8'>
                    <div className='text-end'>
                        <button className="border-0 text-muted bg-transparent fs-3 close-btn"
                            onClick={() => setIsOpen(false)}>
                            <IoMdClose />
                        </button>
                    </div>

                    <div className="multistep-container">
                        {/* Step Indicators */}
                        <div className="step-indicators">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`step-label ${currentStep === index + 1 ? 'active' : ''}`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="step-content">
                            {steps[currentStep - 1].component}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="button-container">
                            <button
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className={currentStep === 1 ? 'disabled' : ''}
                            >
                                <IoIosArrowDropleft className="fs-4" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentStep === steps.length}
                                className={currentStep === steps.length ? 'disabled' : ''}
                            >
                                <IoIosArrowDropright className="fs-4" />
                            </button>
                        </div>
                    </div>

                   

                </div>
            </div>

        </Modal>
    );
};
