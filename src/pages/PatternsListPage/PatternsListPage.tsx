import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/api/catalog";
import { Pagination } from "@/components/Pagination/Pagination";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { FilterBar } from "@/features/catalog/FilterBar";
import { useCatalogFilters } from "@/features/catalog/useCatalogFilters";
import { getErrorMessage } from "@/utils/errors";
import { formatPrice } from "@/utils/format";
import styles from "@/pages/CatalogPage.module.scss";

const PAGE_SIZE = 12;
const FIVE_MIN = 5 * 60 * 1000;

export default function PatternsListPage() {
  const { filters, update } = useCatalogFilters();

  const genders = useQuery({
    queryKey: ["catalog", "genders"],
    queryFn: catalogApi.genders,
    staleTime: FIVE_MIN,
  });
  const seasons = useQuery({
    queryKey: ["catalog", "seasons"],
    queryFn: catalogApi.seasons,
    staleTime: FIVE_MIN,
  });
  const tags = useQuery({
    queryKey: ["catalog", "tags"],
    queryFn: catalogApi.tags,
    staleTime: FIVE_MIN,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalog", "patterns", filters],
    queryFn: () =>
      catalogApi.listPatterns({
        gender_id: filters.gender ?? undefined,
        season_id: filters.season ?? undefined,
        tag: filters.tag ?? undefined,
        q: filters.q || undefined,
        sort: filters.sort,
        limit: PAGE_SIZE,
        offset: filters.page * PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
  });

  const hasNext = data ? (filters.page + 1) * PAGE_SIZE < data.total : false;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patternlar</h1>
        {data && <span className={styles.count}>{data.total} ta</span>}
      </div>

      <FilterBar
        filters={filters}
        update={update}
        genders={genders.data}
        seasons={seasons.data}
        tags={tags.data}
      />

      {error && <div className={styles.error}>{getErrorMessage(error)}</div>}
      {isLoading && <p className={styles.info}>Yuklanmoqda...</p>}
      {data && data.items.length === 0 && (
        <p className={styles.info}>Hech narsa topilmadi</p>
      )}

      <div className={styles.grid}>
        {data?.items.map((p) => (
          <ProductCard
            key={p.id}
            to={`/patterns/${p.slug}`}
            image={p.preview_image}
            title={p.name}
            brand={p.brand}
            meta={`${p.gender.name} · ${p.season.name}`}
            price={formatPrice(p.price)}
          />
        ))}
      </div>

      <Pagination
        page={filters.page}
        hasNext={hasNext}
        onChange={(page) => {
          update({ page });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
