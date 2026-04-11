import React, { useState } from 'react';
import UserAPIService from '../../../../../../services/user_service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '../../../../../../shared/helpers/helper';

export const Step1 = ({ productId, size }) => {
    const [formData, setFormData] = useState({
        email: "",
        mobileno: "",
        address: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validattion = () => {
        if (!formData.email || !formData.mobileno || !formData.address) {
            toast.error("Please fill in all required fields");
            return false;
        } 
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Email address is invalid");
            return false;
        }
        if (!/^\d{10}$/.test(formData.mobileno) || formData.mobileno.length !== 10) {
            toast.error("Mobile number must be 10 digits");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!validattion()) {
            setIsLoading(false);
            return;
        }
        const { mobileno, address } = formData; 

        try {
            if (productId) {
                // If productId exists, proceed with buyNow API call
                await UserAPIService.buyNow({ productId, size, address, mobileno, userId });
                toast.success("Order placed successfully");
            } else {
                // If product does not exist, place order via placeCartOrder API
                await UserAPIService.placeCartOrder({ address, mobileno, userId });
                toast.success("Cart order placed successfully");
            }
            reset();
            navigate("/");
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Invalid token. Please login again.");
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setFormData({
            email: "",
            mobileno: "",
            address: ""
        });
    };

    return (
        <div>
            <h4>Personal Information</h4>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="col-md-12">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="col-md-12"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mobileno" className="col-md-12">Mobile Number</label>
                    <input
                        type="tel"
                        name="mobileno"
                        id="mobileno"
                        className="col-md-12"
                        value={formData.mobileno}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="col-md-12">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        className="col-md-12"
                        style={{ height: '40px' }}
                        value={formData.address}
                        onChange={handleChange}
                        required 
                    ></textarea>
                </div>

                <LoadingButton 
                type="submit" 
                isLoading={isLoading}
                className="form_btn w-100">
                    Place Order
                </LoadingButton>
            </form>
        </div>
    );
};
