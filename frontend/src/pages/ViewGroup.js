import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

function ViewGroup() {
    const [groupUsers, setGroupUser] = useState([]);

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
