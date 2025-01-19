import React from 'react';
import { useState } from 'react';

const CustomButton = ({ onClick, children, width = 'fit-content', borderBottomRightRadius = '5em', borderBottomLeftRadius = '5em', borderTopRightRadius = '5em', borderTopLeftRadius = '5em'}) => {

  const [isHovered, setIsHovered] = useState(false);
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
    backgroundColor: isHovered ? '#C29ECF' : '#DABCDF',
    border: 'none',
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius,
    borderTopRightRadius: borderTopRightRadius,
    borderTopLeftRadius: borderTopLeftRadius,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    width: width
  };


  return (
    <button style={buttonStyle}
    onClick={onClick}
    onMouseEnter={() => setIsHovered(true)} 
    onMouseLeave={() => setIsHovered(false)}>
       
      {children}
    </button>
  );
};

export default CustomButton;