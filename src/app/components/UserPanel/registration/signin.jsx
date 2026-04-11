import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAPIService from '../../../services/user_service';
import { toast } from 'sonner'; 
import { LoadingButton } from '../../../shared/helpers/helper';

export const SigninModal = ({ show, handleClose, openSignupModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await UserAPIService.signInUser(formData);
      const token = response.data.token;
      const userId = response.data.user._id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      toast.success(response.data.message || 'Sign in successful');
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred while signing in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className='modal'>
      <Modal.Header closeButton className='border-0'>
        <Modal.Title className='modal_heading mx-4'>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className='px-3 py-2'>
          <p className='text-center'>
            Become a member — don’t miss out on deals, offers, discounts, and bonus vouchers.
          </p>
          <div className="mb-3">
            <label htmlFor="email" className="col-md-12">
              Email <span className='text-danger'>*</span>
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
              Password <span className='text-danger'>*</span>
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
          <div className='mb-3 text-end'>
            <a href='/request-resetpassword'>Forgot password?</a>
          </div>

          <LoadingButton 
            type='submit' 
            isLoading={isLoading} 
            onClick={handleSubmit}
            className='form_btn w-100 mt-2'
          >
            Sign in
          </LoadingButton>
          <button   
            type="button" 
            onClick={openSignupModal} 
            className='form_btn w-100 mt-2 bg-transparent text-black border border-black'
           >
            Become a member
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

