import { createContext } from "react";
import { auth, signOut } from '../auth/firebaseConfig';
import { useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const [uid, setUid] = useState(null);

    const [groupId, setGroupId] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUid(null);
            localStorage.removeItem('uid');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (<>
        <AuthContext.Provider value={{ user, setUser, handleLogout, uid, setUid, groupId, setGroupId }}>
            {children}
        </AuthContext.Provider>
    </>)
}

export { AuthContext, AuthProvider };