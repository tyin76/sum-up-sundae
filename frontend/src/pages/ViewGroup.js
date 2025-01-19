import React, { useEffect } from 'react'
import Header from '../components/Header'

function ViewGroup() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFF5F4';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);


  return (
    <>
        
    
    
    </>
  )
}

export default ViewGroup
