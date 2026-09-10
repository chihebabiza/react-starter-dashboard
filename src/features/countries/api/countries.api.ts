import { apiClient } from "@/lib/api-client";
import type { Country } from "../types/country.types";

export const countriesApi = {
  getAll: () => apiClient<Country[]>("/Country"),
};