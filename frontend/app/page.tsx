'use client';


import Footer from "@/components/Footer";
import ProfileUser from "@/components/Profile";
import Service from "./ServiceS/components/Service";
import TopCard from "@/components/home/Card/TopCard";
import TrendingCard from "@/components/home/Card/TrendingCard";
import PopularCard from "@/components/home/Card/PopularCard";
import WeekendCard from "@/components/home/Card/WeekendCard";
import TraditionalCard from "@/components/home/Card/TraditionalCard";

export default function Home() {
  return (
   <div>
    <ProfileUser />
    <TopCard />
    <TrendingCard />
    <PopularCard />
    <WeekendCard />
    <TraditionalCard />
    <Service />
    <Footer />
   </div>
  );
}
