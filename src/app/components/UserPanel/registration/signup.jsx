import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAPIService from '../../../services/user_service';
import { toast } from 'sonner';
import { LoadingButton } from '../../../shared/helpers/helper';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";


export const SignupModal = ({ show, handleClose, handleOpenOTP, openSigninModal, formData, onFormDataUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    onFormDataUpdate(updatedFormData);
  };

  const validation = () => {
    const { email, username, password, confirmPassword } = formData;


    if (!email || !username || !password || !confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (username.length < 3 || username.length > 20) {
      toast.error('Username must be between 3 to 20 characters');
      return false;
    }
    if (!usernameRegex.test(username)) {
      toast.error('Username can only contain letters, numbers, and underscores');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (email.length > 30) {
      toast.error('Email cannot exceed 30 characters');
      return false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must include uppercase, lowercase, number and special character (6-20 chars)'
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validation()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await UserAPIService.generateOtp({ email: formData.email });
      const token = response.data.token;
      localStorage.setItem('token', token);
      handleOpenOTP();
    } catch (error) {
      toast.error(error.response.data.message || 'Error occurred while signing up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className='modal'>
      <Modal.Header closeButton className='border-0'>
        <Modal.Title className='modal_heading mx-4'>Become an Booksy member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-center'>Become a member — don’t miss out on deals, offers, discounts and bonus vouchers.</p>
        <form onSubmit={handleSubmit} className='px-3'>
          <div className="mb-3">
            <label htmlFor="username" className="col-md-12">
              Username <span className='text-danger'>*</span>
            </label>
            <input
              type="text"
              name="username"
              className="col-md-12"
              id="username"
              value={formData.username}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="col-md-12">
              Email address <span className='text-danger'>*</span>
            </label>
            <input
              type="email"
              name="email"
              className="col-md-12"
              id="email"
              value={formData.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="col-md-12">
              Create a password <span className='text-danger'>*</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="col-md-12 pe-5"
              id="password"
              value={formData.password}
              onChange={handleOnChange}
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
          <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="col-md-12">
              Confirm Password <span className='text-danger'>*</span>
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="col-md-12 pe-5"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              required
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "35px",
                cursor: "pointer"
              }}
            >
              {showConfirmPassword ? <PiEyeSlash /> : <PiEyeLight />}
            </span>
          </div>

          <LoadingButton
            type='submit'
            className='form_btn w-100 mt-2'
            isLoading={isLoading}
            onClick={handleSubmit}>
            Sign Up
          </LoadingButton>
          <p className='text-center mt-3'>Already have an account? <a href='#' onClick={openSigninModal}>Signin</a></p>
        </form>
      </Modal.Body>
    </Modal>
  );
};

