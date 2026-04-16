import Hero from "@/components/Hero";
import AboutSnippet from "@/components/AboutSnippet";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSnippet />
      <ProjectGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
