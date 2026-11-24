import type { FormEvent } from "react";
import type { NamedItem, Sort, Tag } from "@/types/catalog";
import type { CatalogFilters } from "./useCatalogFilters";
import styles from "./FilterBar.module.scss";

interface Props {
  filters: CatalogFilters;
  update: (patch: Partial<CatalogFilters>) => void;
  genders?: NamedItem[];
  seasons?: NamedItem[];
  tags?: Tag[];
}

interface Option {
  key: string | number;
  label: string;
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string | number | null;
  onChange: (key: string | number | null) => void;
}) {
  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <div className={styles.chips}>
        <button
          type="button"
          className={
            value === null ? `${styles.chip} ${styles.on}` : styles.chip
          }
          onClick={() => onChange(null)}
        >
          Hammasi
        </button>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className={
              value === o.key ? `${styles.chip} ${styles.on}` : styles.chip
            }
            onClick={() => onChange(o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterBar({
  filters,
  update,
  genders = [],
  seasons = [],
  tags = [],
}: Props) {
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    update({ q });
  };

  return (
    <div className={styles.bar}>
      <div className={styles.top}>
        <form className={styles.search} onSubmit={onSearch}>
          {/* key: URL o'zgarganda (masalan "Orqaga") maydon ham yangilanadi */}
          <input
            key={filters.q}
            name="q"
            defaultValue={filters.q}
            placeholder="Qidirish..."
          />
          <button type="submit">Qidirish</button>
        </form>

        <select
          className={styles.sort}
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value as Sort })}
        >
          <option value="new">Yangilari</option>
          <option value="popular">Ommabopligi bo'yicha</option>
        </select>
      </div>

      <ChipGroup
        label="Kim uchun"
        options={genders.map((g) => ({ key: g.id, label: g.name }))}
        value={filters.gender}
        onChange={(k) => update({ gender: k === null ? null : Number(k) })}
      />
      <ChipGroup
        label="Fasl"
        options={seasons.map((s) => ({ key: s.id, label: s.name }))}
        value={filters.season}
        onChange={(k) => update({ season: k === null ? null : Number(k) })}
      />
      {tags.length > 0 && (
        <ChipGroup
          label="Teg"
          options={tags.map((t) => ({ key: t.slug, label: t.name }))}
          value={filters.tag}
          onChange={(k) => update({ tag: k === null ? null : String(k) })}
        />
      )}
    </div>
  );
}
