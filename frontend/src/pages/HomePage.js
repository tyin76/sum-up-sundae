import React, { useState, useEffect } from 'react'
import LoginButton from '../auth/LoginButton.js';
import LogoutButton from '../auth/LogoutButton.js';
import { auth } from '../auth/firebaseConfig';

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken();
                localStorage.setItem('firebaseToken', token);
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                });
            } else {
                localStorage.removeItem('firebaseToken');
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

  return (
    <div>
        
      {!user && <LoginButton setUser={setUser} /> }
        {user && <h1>welcome {user.name}</h1> }
        

        {user && <LogoutButton setUser={setUser} />}
        
    </div>
    
  )
}

export default HomePage
