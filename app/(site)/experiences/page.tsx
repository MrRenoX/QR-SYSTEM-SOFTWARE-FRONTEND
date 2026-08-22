import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceList from "@/components/ExperienceList";
import PageHeader from "@/components/PageHeader";
import { getCategories, getExperiences } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "The Experience Menu | Ayodhya Anubhav",
  description:
    "Every curated Ayodhya experience — spiritual darshans, heritage walks, the Sarayu, craft studios and food trails.",
};

interface ExperiencesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ExperiencesPage({
  searchParams,
}: ExperiencesPageProps) {
  const [experiences, categories, params, settings] = await Promise.all([
    getExperiences(),
    getCategories(),
    searchParams,
    getSiteSettings(),
  ]);

  const initialCategory = categories.find(
    (category) => category === params.category,
  );

  return (
    <>
      <Header />
      <main className="px-4 pb-4">
        <PageHeader page="experiences" />

        <ExperienceList
          experiences={experiences}
          categories={categories}
          initialCategory={initialCategory}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
