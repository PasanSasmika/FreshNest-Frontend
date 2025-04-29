import { BrowserRouter, Route, Routes } from "react-router-dom"
import CustomerHome from "./pages/HomePages/CustomerHome"
import AboutUs from "./pages/HomePages/AboutUs"
import OurServices from "./pages/HomePages/OurService"

function App() {

  return (
    <>
    <BrowserRouter>
     <Routes path="/*">
     
     <Route path='/' element={<CustomerHome/>}/>
     <Route path="/about" element={<AboutUs />} />
     <Route path="/service" element={<OurServices />} />
     <Route path="/contact" element={<OurServices />} />

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
