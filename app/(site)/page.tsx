import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ExperienceList from "@/components/ExperienceList";
import TrustSection from "@/components/TrustSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { getCategories, getExperiences } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";

export default async function HomePage() {
  const [experiences, categories, settings] = await Promise.all([
    getExperiences(),
    getCategories(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero settings={settings} />
        <IntroSection />

        <section aria-labelledby="curated" className="mt-6 px-4">
          <ExperienceList
            experiences={experiences}
            categories={categories}
            limit={6}
            showViewAll
            heading
          />
        </section>

        <TrustSection />
        <div id="how-it-works">
          <HowItWorks />
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
