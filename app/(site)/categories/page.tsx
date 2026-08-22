import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getPublicCategories } from "@/services/categoryService";
import { getExperiences } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Browse by Category | Ayodhya Anubhav",
  description:
    "Fifteen ways into Ayodhya, sorted by what draws you in — spiritual darshans, heritage walks, the Sarayu, craft studios and food trails.",
};

export default async function CategoriesPage() {
  const [categories, experiences, settings] = await Promise.all([
    getPublicCategories(),
    getExperiences(),
    getSiteSettings(),
  ]);

  const cards = categories.map((category) => {
    const matches = experiences.filter((exp) => exp.category === category.name);
    return {
      ...category,
      count: matches.length,
      image: category.coverImage ?? matches[0]?.image ?? null,
    };
  });

  return (
    <>
      <Header />
      <main className="px-4 pb-4">
        <PageHeader page="categories" />

        <ul className="space-y-3.5">
          {cards.map(({ id, name, description, count, image }, index) => (
            <Reveal as="li" key={id} delay={Math.min(index * 70, 210)}>
              <CategoryCard
                name={name}
                description={description}
                count={count}
                image={image}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </ul>
      </main>
      <Footer settings={settings} />
    </>
  );
}
