import HeroSection from "@/components/sections/Hero";
import SectionWrapper from "@/components/SectionWrapper";

export default async function Home() {
  return (
    <div>
      <SectionWrapper>
        <HeroSection />
      </SectionWrapper>{" "}
    </div>
  );
}
