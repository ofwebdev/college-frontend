import { useState } from "react";
import MainLayout from "./Layout/MainLayout";
import Banner from "./components/Banner";
import WithSpeechBubbles from "./components/Testimonial";
import Gallery from "./components/Gallery";
import ResearchPaper from "./components/ResearchPaper";
import NewsLetter from "./components/NewsLetter";
import CollegeCards from "./components/CollegeCards";

function App() {
  return (
    <MainLayout>
      <Banner />
      <CollegeCards />
      <Gallery />
      <ResearchPaper />
      <WithSpeechBubbles />
      <NewsLetter />
    </MainLayout>
  );
}

export default App;
