import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminSignin.css';
import AdminAPIService from '../../../services/admin_service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LoadingButton } from '../../../shared/helpers/helper';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export const AdminSignin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await AdminAPIService.signInAdmin(formData);
            const token = response.data.token;
            if (token) {
                localStorage.setItem('admintoken', token);
                toast.success(response.data.message || 'Sign in successful');
                navigate('/admin-portal');
            }
        } catch (error) {
            toast.error(error.response.data.message || 'Error occurred while signing in');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className='container-fluid d-flex align-items-center vh-100 admin_bg'>
            <div className="col-md-4 border px-5 py-4 mx-auto border-light admin_formdiv">
                <form onSubmit={handleSubmit}>
                    <p className='text-center text-white'>Admin — Manage books, orders, and user settings securely</p>
                    <div className="mb-3">
                        <label htmlFor="email" className="col-md-12 text-white">
                            Email <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="col-md-12"
                            onChange={handleOnChange}
                            value={formData.email}
                            id="email"
                            required
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="col-md-12 text-white">
                            Password <span className='text-danger'>*</span>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleOnChange}
                            value={formData.password}
                            className="col-md-12"
                            id="password"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "35px",
                                cursor: "pointer"
                            }}
                        >
                            {showPassword ? <PiEyeSlash /> : <PiEyeLight />}
                        </span>
                    </div>

                    <LoadingButton
                        isLoading={isLoading}
                        type='submit'
                        className='form_btn w-100 mt-2'>
                        Sign in
                    </LoadingButton>

                    <p className='text-center text-white mt-3'>For any queries, please contact us at xyz@booky.com</p>

                </form>
            </div>
        </div>
    );
};

