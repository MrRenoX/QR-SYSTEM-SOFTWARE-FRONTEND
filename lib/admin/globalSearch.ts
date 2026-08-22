import { canAccessModule } from "./permissions";
import { getExperiences } from "@/services/admin/experienceService";
import { getCategories } from "@/services/admin/categoryService";
import { getBookings } from "@/services/admin/bookingService";
import { getQueries } from "@/services/admin/queryService";
import { getContacts } from "@/services/admin/contactService";
import { getAdminUsers } from "@/services/admin/adminUserService";
import { getFAQs } from "@/services/admin/faqService";
import type { AdminRole } from "@/types/admin/auth";

export interface SearchResultItem {
  id: string;
  label: string;
  sublabel?: string;
}

export interface SearchResultGroup {
  key: string;
  label: string;
  href: string;
  items: SearchResultItem[];
}

const MAX_PER_GROUP = 5;

async function searchExperiences(query: string): Promise<SearchResultGroup | null> {
  const items = await getExperiences();
  const matches = items
    .filter((item) => item.title.toLowerCase().includes(query) || item.experienceCode.toLowerCase().includes(query))
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "experiences",
    label: "Experiences",
    href: "/dashboard/super-admin/experiences",
    items: matches.map((item) => ({ id: String(item.id), label: item.title, sublabel: item.experienceCode })),
  };
}

async function searchCategories(query: string): Promise<SearchResultGroup | null> {
  const items = await getCategories();
  const matches = items.filter((item) => item.name.toLowerCase().includes(query)).slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "categories",
    label: "Categories",
    href: "/dashboard/super-admin/categories",
    items: matches.map((item) => ({ id: String(item.id), label: item.name })),
  };
}

async function searchBookings(query: string): Promise<SearchResultGroup | null> {
  const items = await getBookings();
  const matches = items
    .filter(
      (item) =>
        item.guestName.toLowerCase().includes(query) ||
        item.bookingRef.toLowerCase().includes(query) ||
        item.mobile.toLowerCase().includes(query),
    )
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "bookings",
    label: "Bookings",
    href: "/dashboard/super-admin/bookings",
    items: matches.map((item) => ({ id: String(item.id), label: item.guestName, sublabel: item.bookingRef })),
  };
}

async function searchQueries(query: string): Promise<SearchResultGroup | null> {
  const items = await getQueries();
  const matches = items
    .filter((item) => item.guestName.toLowerCase().includes(query) || item.question.toLowerCase().includes(query))
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "queries",
    label: "Queries",
    href: "/dashboard/super-admin/queries",
    items: matches.map((item) => ({ id: String(item.id), label: item.guestName, sublabel: item.question })),
  };
}

async function searchContacts(query: string): Promise<SearchResultGroup | null> {
  const items = await getContacts();
  const matches = items
    .filter((item) => item.name.toLowerCase().includes(query) || item.subject.toLowerCase().includes(query))
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "contacts",
    label: "Contacts",
    href: "/dashboard/super-admin/contacts",
    items: matches.map((item) => ({ id: String(item.id), label: item.name, sublabel: item.subject })),
  };
}

async function searchFAQs(query: string): Promise<SearchResultGroup | null> {
  const items = await getFAQs();
  const matches = items
    .filter((item) => item.question.toLowerCase().includes(query) || item.category.toLowerCase().includes(query))
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "faqs",
    label: "FAQs",
    href: "/dashboard/super-admin/faqs",
    items: matches.map((item) => ({ id: String(item.id), label: item.question, sublabel: item.category })),
  };
}

async function searchAdminUsers(query: string): Promise<SearchResultGroup | null> {
  const items = await getAdminUsers();
  const matches = items
    .filter((item) => item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query))
    .slice(0, MAX_PER_GROUP);
  if (matches.length === 0) return null;
  return {
    key: "admin-users",
    label: "Admin Users",
    href: "/dashboard/super-admin/admin-users",
    items: matches.map((item) => ({ id: String(item.id), label: item.name, sublabel: item.email })),
  };
}

/** Searches every module the given role can access — see lib/admin/permissions.ts. */
export async function searchAdmin(query: string, role: AdminRole): Promise<SearchResultGroup[]> {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const canContent = canAccessModule(role, "content");
  const canBookings = canAccessModule(role, "bookings");
  const canComms = canAccessModule(role, "communications");
  const canSystem = canAccessModule(role, "system");

  const [experiences, categories, faqs, bookings, queries, contacts, adminUsers] = await Promise.all([
    canContent ? searchExperiences(q) : Promise.resolve(null),
    canContent ? searchCategories(q) : Promise.resolve(null),
    canContent ? searchFAQs(q) : Promise.resolve(null),
    canBookings ? searchBookings(q) : Promise.resolve(null),
    canComms ? searchQueries(q) : Promise.resolve(null),
    canComms ? searchContacts(q) : Promise.resolve(null),
    canSystem ? searchAdminUsers(q) : Promise.resolve(null),
  ]);

  return [experiences, categories, faqs, bookings, queries, contacts, adminUsers].filter(
    (group): group is SearchResultGroup => group !== null,
  );
}
