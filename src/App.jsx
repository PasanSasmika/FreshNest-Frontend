import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomerHome from "./pages/HomePages/CustomerHome"
import AboutUs from "./pages/HomePages/AboutUs"
import OurServices from "./pages/HomePages/OurService"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignUp"

function App() {

  return (
    <>
    <BrowserRouter>
     <Routes path="/*">
     
     <Route path='/' element={<CustomerHome/>}/>
     <Route path="/about" element={<AboutUs />} />
     <Route path="/service" element={<OurServices />} />
     <Route path="/contact" element={<OurServices />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/signup" element={<SignupPage />} />

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
