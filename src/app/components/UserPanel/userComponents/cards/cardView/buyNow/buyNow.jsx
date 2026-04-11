import './buyNow.css';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Step1 } from '../../../shoppingBag/order/step1/step1';
import { Step2 } from '../../../shoppingBag/order/step2/step2';
import UserAPIService from '../../../../../../services/user_service';

export const BuyNowModal = ({ isOpen, setIsOpen, productId, size }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [productDetails, setProductDetails] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const steps = [
        { name: 'User Details', component: <Step1 productId={productId} size={size} /> },
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
        const fetchProductDetails = async () => {
            if (!productId) return; 

            try {
                const response = await UserAPIService.getProducts({ productId });
                console.log("Product Details", response.data.product);
                setProductDetails(response.data.product[0]); 
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

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

                    {productDetails ? (
                        <div className='bg-white p-3 mt-2 rounded d-flex'>
                            <div className='col-md-4'>
                                <img src={productDetails.card_pic} alt={productDetails.productName} className='w-50 rounded' />
                            </div>
                            <div className='col-md-8'>
                                <div>
                                    <h6>{productDetails.productName} - {size}</h6>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>Quantity: 1</div>
                                    <div>Price: RS. {productDetails.price}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading product details...</div>
                    )}

                    <div className='bg-white p-3 mt-2 rounded'>
                        <div className='col-md-12'>
                            <div className='d-flex justify-content-between'>
                                <div>Subtotal</div>
                                <div>RS. {productDetails ? productDetails.price.toFixed(2) : '0.00'}</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div>Shipping</div>
                                <div>Free</div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <h5>Total</h5>
                                <h6>RS. {productDetails ? productDetails.price.toFixed(2) : '0.00'}</h6>
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

                        <div className="step-content">
                            {steps[currentStep - 1].component}
                        </div>

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
