// assets/categories/{men,women,kids} dagi rasmlar — Vite build paytida URL'ga aylantiradi.
// Papkaga istalgan formatdagi rasm tashlash kifoya, kodni o'zgartirish shart emas.
type ImageMap = Record<string, string>;

const toList = (map: ImageMap) =>
  Object.keys(map)
    .sort()
    .map((key) => map[key]);

export const menImages = toList(
  import.meta.glob("../../assets/categories/men/*.{avif,webp,jpg,jpeg,png}", {
    eager: true,
    import: "default",
  }) as ImageMap,
);

export const womenImages = toList(
  import.meta.glob("../../assets/categories/women/*.{avif,webp,jpg,jpeg,png}", {
    eager: true,
    import: "default",
  }) as ImageMap,
);

export const kidsImages = toList(
  import.meta.glob("../../assets/categories/kids/*.{avif,webp,jpg,jpeg,png}", {
    eager: true,
    import: "default",
  }) as ImageMap,
);

/** Ro'yxatdan i-rasm; rasm kam bo'lsa boshidan aylanadi, bo'sh bo'lsa undefined */
export const pick = (list: string[], i: number): string | undefined =>
  list.length ? list[i % list.length] : undefined;
