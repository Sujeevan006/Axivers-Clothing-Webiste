export interface Category {
  id: string;
  name: string;                  // e.g. "Flagship Outerwear"
  slug: string;                  // e.g. "flagship"
  description?: string;
  active: boolean;
  sortOrder: number;
  image?: string;
}
