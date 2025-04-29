import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Home from "./Home";
import OurServices from "./OurService";
import AboutUs from "./AboutUs";
import Footer from "../../components/Footer";
import ServiceCard from "./Service";



function CustomerHome() {
  
  return (
    <>
   
       <div className="w-full h-screen bg-primary">
       <div>
         <Routes>
           <Route
             path="/"
             element={
               <main>
                 <NavBar/>
                 <Home/>
                 <OurServices/>
                 <AboutUs/>
                 <Footer/>
               </main>
             }
           />
         </Routes>
       </div>
     </div>

   
    </>
  );
}

export default CustomerHome;
