import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ExperienceHero from "@/components/ExperienceHero";
import ExperienceInfo from "@/components/ExperienceInfo";
import JourneyRoute from "@/components/JourneyRoute";
import BookingSummaryCard from "@/components/BookingSummaryCard";
import { getExperienceBySlug } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";
import type { Touchpoint } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every fetch behind this page goes through apiClient with `cache: "no-store"`
 * (admin-managed content must reflect immediately, no rebuild/revalidate
 * window) — that's inherently incompatible with generateStaticParams'
 * build-time static generation, which is what previously produced the
 * "Page changed from static to dynamic at runtime" 500 in production. There's
 * nothing to prerender here; render fresh on every request instead.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return { title: "Experience not found" };

  return {
    title: `${experience.title} | Ayodhya Anubhav`,
    description: experience.description,
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [experience, settings] = await Promise.all([
    getExperienceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!experience) notFound();

  const touchpoints: Touchpoint[] = experience.stops.map((stop) => ({
    id: stop.order,
    name: stop.name,
    description: stop.description ?? "",
    duration: stop.duration,
    bestTime: stop.bestTime ?? "",
    fact: stop.fact ?? "",
    image: stop.image,
    gallery: stop.gallery,
  }));

  return (
    <>
      <main className="pb-2">
        <ExperienceHero experience={experience} />
        <ExperienceInfo experience={experience} />
        <JourneyRoute touchpoints={touchpoints} />
        <div className="px-4 tab:px-8 tabLg:px-10">
          <BookingSummaryCard experience={experience} className="mt-7" />
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
