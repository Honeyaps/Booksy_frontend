import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import UserAPIService from '../../../services/user_service';
import { toast } from 'sonner';
import { LoadingButton } from '../../../shared/helpers/helper';

export const OTPModal = ({ show, handleClose, formData }) => {
  const [otpValues, setOtpValues] = useState(Array(4).fill(""));
  const [isLoading, setIsLoading] = useState(false); 
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    if (e.target.value && index < otpValues.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const otp = parseInt(otpValues.join(""));

    try {
      const { email, username, password } = formData;
      const response = await UserAPIService.signUpUser({ 
        email,
        username,
        password,
        otp
       });
      const token = response.data.token;
      const userId = response.data.user._id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      toast.success( response.data.message ||'Signup successful');
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message || 'Error occurred while signing up');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='border-0'>
        <Modal.Title className='modal_heading'>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Alert variant="success" className='text-center mb-3 py-2 px-3 text-center'>
            We have sent a Verification code to your email - {formData.email}.
          </Alert>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex justify-content-center">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="mx-2 py-2 px-3 text-center"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)} 
                  style={{ width: '50px', textAlign: 'center' }}
                />
              ))}
            </div>

            <LoadingButton 
            type="submit"
            isLoading={isLoading} 
            onClick={handleSubmit} 
            className="form_btn w-100 mt-2">
              Submit
            </LoadingButton>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
