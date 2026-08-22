export type CategoryStatus = "active" | "inactive";

export interface AdminCategory {
  id: number;
  name: string;
  description: string;
  coverImage: string | null;
  experienceCount: number;
  displayOrder: number;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  displayOrder: number;
  status: CategoryStatus;
  /** New file to upload. Undefined = leave the existing cover image untouched. */
  image?: File;
}
