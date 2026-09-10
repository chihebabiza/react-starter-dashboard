import { useQuery } from "@tanstack/react-query";

import { countriesApi } from "@/features/countries/api/countries.api";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: countriesApi.getAll,
  });
}