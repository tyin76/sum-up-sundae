import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import CreateJoin from "./pages/CreateJoin.js"
import Header from "./components/Header.js"
import "./App.css"
import HomePage from "./pages/HomePage.js"
import ViewGroup from "./pages/ViewGroup.js"
import UserSumUp from "./pages/UserSumUp.js"
import { AuthProvider } from "./providers/AuthProvider.js"
import GoogleAuthListener from "./providers/GoogleAuthListener.js"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GoogleAuthListener />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/createJoin"
            element={<Header children={<CreateJoin />} />}
          />
          <Route
            path="/viewGroup"
            element={<Header height="10vh" children={<ViewGroup />} />}
          >
            {" "}
          </Route>
          <Route
            path="/userSumUp/:playbackId"
            element={<Header height="10vh" children={<UserSumUp />} />}
          >
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
