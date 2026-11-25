import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/api/catalog";

export type GenderKey = "women" | "men" | "kids";

// backend seed.py dagi nomlar
const GENDER_NAMES: Record<GenderKey, string> = {
  women: "Ayollar",
  men: "Erkaklar",
  kids: "Bolalar",
};

/** Jins bo'yicha filtrlangan kiyimlar sahifasiga havola. Jins topilmasa — umumiy ro'yxat. */
export function useGenderLink() {
  const { data } = useQuery({
    queryKey: ["catalog", "genders"],
    queryFn: catalogApi.genders,
    staleTime: 5 * 60 * 1000,
  });

  return (key: GenderKey, base = "/clothes") => {
    const gender = data?.find((g) => g.name === GENDER_NAMES[key]);
    return gender ? `${base}?gender=${gender.id}` : base;
  };
}
