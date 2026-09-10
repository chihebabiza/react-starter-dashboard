import type { Country } from "@/features/countries/types/country.types";

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  country: Country;
};

export type AuthorCreate = {
  firstName: string;
  lastName: string;
  countryId: number;
};

export type AuthorUpdate = {
  firstName: string;
  lastName: string;
  countryId: number;
};
