import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/sections/HeroSection";
import { AudiencesSection } from "@/components/sections/AudiencesSection";
import { FeaturesGridSection } from "@/components/sections/FeaturesGridSection";
import { InteractiveShowcaseSection } from "@/components/sections/InteractiveShowcaseSection";
import { ProfessionalsSection } from "@/components/sections/ProfessionalsSection";
import { CommunityStorySection } from "@/components/sections/CommunityStorySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { DownloadCtaSection } from "@/components/sections/DownloadCtaSection";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. One Community. Every Kind of Pet Lover. (Audiences) */}
      <AudiencesSection />

      {/* 3. The Main Waneesi Features (12 Core Features) */}
      <FeaturesGridSection />

      {/* 4. Interactive Mobile App Experience Showcase */}
      <InteractiveShowcaseSection />

      {/* 5. Grow Your Pet Business with Waneesi (Professionals & Partners) */}
      <ProfessionalsSection />

      {/* 6. More Than an App. A Community Built Around Love (Brand Story) */}
      <CommunityStorySection />

      {/* 7. Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 8. Official Launch & Download Notice */}
      <DownloadCtaSection />
    </div>
  );
}
