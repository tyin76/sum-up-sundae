import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function GoogleAuthListener () {
      const navigate = useNavigate();

      
    
      useEffect(() => {
        const auth = getAuth();
    
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
    
          } else {
            navigate("/");
          }
        });
    
        // Cleanup listener on unmount
        return () => unsubscribe();
      }, []);
}

export default GoogleAuthListener