import React from "react";
import BannerSection from "./BannerSection";
import SalesSection from "./SalesSection";
import { Box, Stack } from "@mui/material";
import SubBannerSection from "./SubBannerSection";
import CategoriesSection from "./CategoriesSection";
import BrandSection from "./BrandSection";
import TopSellSection from "./TopSellSection";
import ServiceSection from "./ServiceSection";
import TopSearchSection from "./TopSearchSection";
import ProductSection from "./ProductSection";
import echo from "@/echo";

const LandingPage = () => {
  echo
    .channel("public-chat-channel")
    // Vẫn lắng nghe Event
    .listen("NewMessage", (e) => {
      console.log("Tin nhắn:", e);
    })
    // ⚠️ Lắng nghe Whisper
    .listenForWhisper("typing", (e) => {
      console.log("NGƯỜI DÙNG ĐANG GÕ PHÍM: ", e.username);
    });

  return (
    <div>
      <BannerSection />
      <Stack
        sx={{
          paddingX: "120px",
          paddingY: "20px",
          gap: "20px",
          backgroundColor: "background.neutral",
        }}
      >
        {/* <SalesSection /> */}
        <SubBannerSection />
        <CategoriesSection />
        <BrandSection />
        <TopSellSection />
        {/* <TopSearchSection /> */}
        {/* <ServiceSection /> */}
      </Stack>
      <ProductSection />
    </div>
  );
};

export default LandingPage;
