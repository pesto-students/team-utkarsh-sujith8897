import { Features } from "./Features";
import { Header } from "./Header";
import { Hero } from "./Hero";

export const LandingPage = () => {
  return (
    <div className="px-4 md:px-16 lg:px-20">
      <div className="space-y-6 md:space-y-16">
        <Header />
        <Hero />
        <Features />
      </div>
    </div>
  );
};
