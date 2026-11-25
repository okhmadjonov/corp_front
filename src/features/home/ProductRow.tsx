import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/api/catalog";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton/ProductGridSkeleton";
import { StateMessage } from "@/components/StateMessage/StateMessage";
import { FavoriteButton } from "@/features/favorites/FavoriteButton";
import type { Sort } from "@/types/catalog";
import { getErrorMessage } from "@/utils/errors";
import { formatPrice } from "@/utils/format";
import styles from "./ProductRow.module.scss";

interface Props {
  kind: "clothes" | "patterns";
  sort: Sort;
  limit: number;
  badge?: string;
}

/** Bosh sahifadagi mahsulotlar gridi (yangi / ommabop) */
export function ProductRow({ kind, sort, limit, badge }: Props) {
  const params = { sort, limit, offset: 0 };

  const clothes = useQuery({
    queryKey: ["catalog", "clothes", "home", sort, limit],
    queryFn: () => catalogApi.listClothes(params),
    enabled: kind === "clothes",
  });
  const patterns = useQuery({
    queryKey: ["catalog", "patterns", "home", sort, limit],
    queryFn: () => catalogApi.listPatterns(params),
    enabled: kind === "patterns",
  });

  const q = kind === "clothes" ? clothes : patterns;

  if (q.isLoading) {
    return <ProductGridSkeleton className={styles.grid} count={limit} />;
  }

  if (q.error) {
    return (
      <StateMessage
        title="Yuklab bo'lmadi"
        text={getErrorMessage(q.error)}
        actionLabel="Qayta urinish"
        onAction={() => q.refetch()}
      />
    );
  }

  const empty =
    kind === "clothes"
      ? !clothes.data?.items.length
      : !patterns.data?.items.length;

  if (empty) {
    return <p className={styles.empty}>Hozircha bu yerda hech narsa yo'q.</p>;
  }

  return (
    <div className={styles.grid}>
      {kind === "clothes"
        ? clothes.data!.items.map((c) => (
            <ProductCard
              key={c.id}
              to={`/clothes/${c.slug}`}
              image={c.main_thumb ?? c.main_image}
              title={c.name}
              brand={c.brand}
              meta={`${c.gender.name} · ${c.season.name}`}
              price={c.min_price ? formatPrice(c.min_price) : undefined}
              badge={badge}
              action={<FavoriteButton kind="clothes" id={c.id} />}
            />
          ))
        : patterns.data!.items.map((p) => (
            <ProductCard
              key={p.id}
              to={`/patterns/${p.slug}`}
              image={p.preview_thumb ?? p.preview_image}
              title={p.name}
              brand={p.brand}
              meta={`${p.gender.name} · ${p.season.name}`}
              price={formatPrice(p.price)}
              badge={badge}
              action={<FavoriteButton kind="patterns" id={p.id} />}
            />
          ))}
    </div>
  );
}
