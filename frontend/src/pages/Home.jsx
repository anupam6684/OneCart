import React from "react";
import Hero from "../components/Hero";
import LetestCollection from "../components/LetestCollection";
import BestSellers from "../components/BestSellers";
import OurPolicy from "../components/OurPolicy";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SubscribeBox from "../components/SubscribeBox";

export default function Home() {
  return (
    <>
      <Hero />
      <LetestCollection />
      <BestSellers />
      <OurPolicy />
      <SubscribeBox />
    </>
  );
}
