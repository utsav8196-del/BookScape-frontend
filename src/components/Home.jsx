import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import Hero from "./Home/Hero";
import AboutSection from "./Home/AboutSection";
import Categories from "./Home/Categories";
import Offer from "./Home/Offer";
import SignatureLoc from "./Home/SignatureLoc";
import WhyChoose from "./Home/WhyChoose";
import GuestSay from "./Home/GuestSay";
import Moment from "./Home/Moment";
import Subscribe from "./Home/Subscribe";
import NewPhotoCard from "./Home/NewPhotoCard";


function Home() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = React.useState(false);
  return (
    <div className="bg-black text-gray-900 font-serif">
      <Navbar />
      <Hero/>
      <AboutSection/>
      <NewPhotoCard/>
      <Categories/>
      <Offer/>
      <SignatureLoc/>
      <WhyChoose/>
      <GuestSay/>
      <Moment/>
      <Subscribe/>
    <Footer />
    </div>
  );
}

export default Home;