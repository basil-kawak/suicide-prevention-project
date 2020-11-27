import React from "react";
import "./index.css";
import { Header } from "./sections/Header";
import WeCare from "./sections/WeCare";
import Stories from "./sections/Stories";
import Assessment from "./sections/Assessment";
import "./index.css";
import RelatedCards from "./sections/RelatedCards";
import LiveChat from "../../containers/liveChat/LiveChat";
import Footer from "../common/Footer";
import { Survivor } from "./sections/Survivor";

export const Home = () => {
  return (
    <div>
      <LiveChat />
      <Header />
      <WeCare />
      <Stories />
      <Survivor />
      <RelatedCards />
      <Assessment />
      <Footer />
    </div>
  );
};
