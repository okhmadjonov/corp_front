import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { favoritesApi, type FavoriteKind } from "@/api/favorites";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { FavoriteButton } from "@/features/favorites/FavoriteButton";
import { getErrorMessage } from "@/utils/errors";
import { formatPrice } from "@/utils/format";
import catalog from "@/pages/CatalogPage.module.scss";
import styles from "./FavoritesPage.module.scss";

export default function FavoritesPage() {
  const [tab, setTab] = useState<FavoriteKind>("clothes");

  const clothes = useQuery({
    queryKey: ["favorites", "clothes"],
    queryFn: favoritesApi.clothes,
    enabled: tab === "clothes",
  });
  const patterns = useQuery({
    queryKey: ["favorites", "patterns"],
    queryFn: favoritesApi.patterns,
    enabled: tab === "patterns",
  });

  const current = tab === "clothes" ? clothes : patterns;
  const empty =
    !current.isLoading && !current.error && current.data?.length === 0;

  return (
    <div className={catalog.page}>
      <h1 className={catalog.title}>Sevimlilar</h1>

      <div className={styles.tabs}>
        <button
          type="button"
          className={
            tab === "clothes" ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setTab("clothes")}
        >
          Kiyimlar
        </button>
        <button
          type="button"
          className={
            tab === "patterns" ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => setTab("patterns")}
        >
          Patternlar
        </button>
      </div>

      {current.error && (
        <div className={catalog.error}>{getErrorMessage(current.error)}</div>
      )}
      {current.isLoading && <p className={catalog.info}>Yuklanmoqda...</p>}
      {empty && (
        <p className={catalog.info}>
          Hali hech narsa qo'shilmagan.{" "}
          <Link to={tab === "clothes" ? "/clothes" : "/patterns"}>
            Ko'rib chiqish
          </Link>
        </p>
      )}

      <div className={catalog.grid}>
        {tab === "clothes" &&
          clothes.data?.map((c) => (
            <ProductCard
              key={c.id}
              to={`/clothes/${c.slug}`}
              image={c.main_thumb ?? c.main_image}
              title={c.name}
              brand={c.brand}
              meta={`${c.gender.name} · ${c.season.name}`}
              price={
                c.min_price ? formatPrice(c.min_price) : "Narx ko'rsatilmagan"
              }
              action={<FavoriteButton kind="clothes" id={c.id} />}
            />
          ))}

        {tab === "patterns" &&
          patterns.data?.map((p) => (
            <ProductCard
              key={p.id}
              to={`/patterns/${p.slug}`}
              image={p.preview_thumb ?? p.preview_image}
              title={p.name}
              brand={p.brand}
              meta={`${p.gender.name} · ${p.season.name}`}
              price={formatPrice(p.price)}
              action={<FavoriteButton kind="patterns" id={p.id} />}
            />
          ))}
      </div>
    </div>
  );
}
