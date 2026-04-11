// LoadingButton.js
import React from 'react';
import PropTypes from 'prop-types';
import './helper.css';
import Swal from 'sweetalert2';
import { Spinner } from 'react-bootstrap';
import Select from 'react-select';

export const DeleteConfirmationAlert = ({ text, onConfirm }) => {
    Swal.fire({
      title: 'Are you sure?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#333333',
      cancelButtonColor: '',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) onConfirm(); // Execute onConfirm if confirmed
      } else {
        if (onCancel) onCancel(); // Execute onCancel if canceled
      }
    });
  };

  export const AddConfirmationAlert = (message) => {
    Swal.fire({
        title: 'Success!',
        text: message || 'Product added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#333333',
      });
  };


export const LoadingButton = ({ isLoading, onClick, children, disabled, className }) => {
    return (
        <button
            onClick={isLoading ? null : onClick}
            disabled={isLoading || disabled}
            className={`loading-button ${className}`}
        >
            {isLoading ? (
                <span className="loader"></span> // Loader element
            ) : (
                children
            )}
        </button>
    );
};

LoadingButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

LoadingButton.defaultProps = {
    disabled: false,
    className: '',
};

export const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

// Size options
export const sizeOptions = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
];

// Custom styles for the select dropdown
export const customStyles = {
  control: (provided) => ({
      ...provided,
      border: '1px solid #333333',
      borderRadius: '0',
  }),
  multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#e9ecef',
      borderRadius: '0.25rem',
  }),
  multiValueLabel: (provided) => ({
      ...provided,
      color: '#495057',
      padding: '6px 20px',
      fontSize: '1rem',
  }),
  multiValueRemove: (provided) => ({
      ...provided,
      color: '#dc3545',
      ':hover': {
          color: '#721c24',
      },
  }),
};

// Custom Select component
export const CustomMultiSelect = ({ value, onChange, options = sizeOptions, placeholder = '' }) => {
  return (
      <Select
          isMulti
          options={options}
          value={value}
          onChange={onChange}
          styles={customStyles}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder={placeholder}
          required
      />
  );
};


