import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAPIService from '../../../services/user_service';
import { toast } from 'sonner';
import { LoadingButton } from '../../../shared/helpers/helper';


export const SignupModal = ({ show, handleClose, handleOpenOTP, openSigninModal, formData, onFormDataUpdate }) => {
  const [isLoading, setIsLoading] = useState(false); 

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
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
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
          <div className="mb-3">
            <label htmlFor="password" className="col-md-12">
              Create a password <span className='text-danger'>*</span>
            </label>
            <input
              type="password"
              name="password"
              className="col-md-12"
              id="password"
              value={formData.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="col-md-12">
              Confirm Password <span className='text-danger'>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="col-md-12"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              required
            />
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

