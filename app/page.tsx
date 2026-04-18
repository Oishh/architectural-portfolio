import Hero from "@/components/Hero";
import CurrentlySection from "@/components/CurrentlySection";
import AboutSnippet from "@/components/AboutSnippet";
import ToolsSection from "@/components/ToolsSection";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <CurrentlySection />
        <AboutSnippet />
        <ToolsSection />
        <ProjectGrid />
        <CTASection />
        <Footer />
      </main>
    </PageTransition>
  );
}
