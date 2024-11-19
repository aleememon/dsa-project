import React from "react";
import Navbar from "./components/Navbar";
import bgImage from "./images/bg-image.jpg";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import DialogBox from "./components/DialogBox";

const App = () => {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="h-screen bg-cover bg-center"
      >
        <Navbar />
        <HeroSection />
      </div>
      <About />
    </div>
  );
};

export default App;
