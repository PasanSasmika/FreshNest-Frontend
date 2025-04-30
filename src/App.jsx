import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomerHome from "./pages/HomePages/CustomerHome"
import AboutUs from "./pages/HomePages/AboutUs"
import OurServices from "./pages/HomePages/OurService"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignUp"
import ServiceCard from "./pages/HomePages/Service"
import AdminHome from "./pages/AdminPages/AdminHome"
import { Toaster } from "react-hot-toast"
import ConfirmBook from "./pages/HomePages/ConfirmBook"

function App() {

  return (
    <>
    <BrowserRouter>
    <Toaster/>
     <Routes path="/*">
     
     <Route path='/' element={<CustomerHome/>}/>
     <Route path="/about" element={<AboutUs />} />
     <Route path="/service" element={<OurServices />} />
     <Route path="/contact" element={<OurServices />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/signup" element={<SignupPage />} />
     <Route path="/bookservice" element={<ServiceCard />} />
     <Route path="/confirmbook" element={<ConfirmBook />} />
     <Route path='/admin/*' element={<AdminHome/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
