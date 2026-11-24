import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { catalogApi } from "@/api/catalog";
import { ImageGallery } from "@/components/ImageGallery/ImageGallery";
import { getErrorMessage } from "@/utils/errors";
import { formatPrice } from "@/utils/format";
import { FavoriteButton } from "@/features/favorites/FavoriteButton";
import styles from "@/pages/DetailPage.module.scss";

export default function PatternDetailPage() {
  const { slug = "" } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalog", "pattern-detail", slug],
    queryFn: () => catalogApi.patternDetail(slug),
    staleTime: 60_000,
  });

  if (isLoading) return <p className={styles.notFound}>Yuklanmoqda...</p>;
  if (error || !data) {
    const notFound = isAxiosError(error) && error.response?.status === 404;
    return (
      <p className={styles.notFound}>
        {notFound ? "Pattern topilmadi" : getErrorMessage(error)}
      </p>
    );
  }

  const images = data.files.filter((f) => f.file_type === "image");

  return (
    <div className={styles.page}>
      <Link to="/patterns" className={styles.back}>
        ← Patternlarga qaytish
      </Link>

      <div className={styles.layout}>
        <ImageGallery images={images} alt={data.name} />

        <div className={styles.info}>
          {data.brand && <div className={styles.brand}>{data.brand}</div>}
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{data.name}</h1>
            <FavoriteButton kind="patterns" id={data.id} />
          </div>{" "}
          <div className={styles.meta}>
            {data.gender.name} · {data.season.name}
          </div>
          <div className={styles.price}>{formatPrice(data.price)}</div>
          {data.description && (
            <p className={styles.description}>{data.description}</p>
          )}
          <dl className={styles.specs}>
            {data.material && (
              <>
                <dt>Material</dt>
                <dd>{data.material}</dd>
              </>
            )}
            <dt>Ko'rishlar</dt>
            <dd>{data.views_count}</dd>
          </dl>
          {data.tags.length > 0 && (
            <div className={styles.tags}>
              {data.tags.map((t) => (
                <Link
                  key={t.id}
                  to={`/patterns?tag=${t.slug}`}
                  className={styles.tag}
                >
                  #{t.name}
                </Link>
              ))}
            </div>
          )}
          {data.clothes.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>
                Shu pattern bilan tikiladigan kiyimlar
              </h2>
              <div className={styles.relatedList}>
                {data.clothes.map((c) => (
                  <Link
                    key={c.id}
                    to={`/clothes/${c.slug}`}
                    className={styles.relatedLink}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
