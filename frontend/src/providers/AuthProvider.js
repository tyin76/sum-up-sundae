import { createContext } from "react"
import {
  auth,
  signOut,
  signInWithPopup,
  provider,
} from "../auth/firebaseConfig"
import { useState } from "react"
import { createUser } from "../api/api"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const [uid, setUid] = useState(null)

  const [groupId, setGroupId] = useState(null)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUid(null)
      localStorage.removeItem("uid")
    } catch (error) {
      console.error("Logout failed:", error.message)
    }
  }

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // get Firebase ID token
      const token = await user.getIdToken()
      localStorage.setItem("firebaseToken", token)

      setUser({
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
      })
      console.log("photo URL", user.photoURL)
      console.log("name:", user.displayName)
      console.log("email: ", user.email)

      const data = await createUser(user.displayName, user.email, user.photoURL)
      console.log(data)
      const { _id, groups } = data
      setUid(_id)
      setGroupId(groups)

      console.log("Group id: ", groupId)
      localStorage.setItem("uid", _id)
      localStorage.setItem("groups", groups)
    } catch (error) {
      console.error("Login failed:", error.message)
    }
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          handleLogout,
          uid,
          setUid,
          groupId,
          setGroupId,
          handleLogin,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthContext, AuthProvider }
