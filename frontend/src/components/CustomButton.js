import React from 'react';

const CustomButton = ({ onClick, children }) => {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '20px 36px',
    fontSize: '32px',
    fontFamily: 'Bubble',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#DABCDF',
    border: 'none',
    borderRadius: '60px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    width: 'fit-content'
  };


  return (
    <button style={buttonStyle}
    onClick={onClick}>
      
      {children}
    </button>
  );
};

export default CustomButton;