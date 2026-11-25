import { CategoryTiles } from "@/features/home/CategoryTiles";
import { InfoTiles } from "@/features/home/InfoTiles";
import { Lookbook } from "@/features/home/Lookbook";
import { ProductRow } from "@/features/home/ProductRow";
import { PromoBanner } from "@/features/home/PromoBanner";
import { Section } from "@/features/home/Section";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <CategoryTiles />

      <PromoBanner />

      <Section title="Yangi andozalar" moreTo="/patterns">
        <ProductRow kind="patterns" sort="new" limit={8} badge="Yangi" />
      </Section>

      <Section title="Yangi kiyimlar" moreTo="/clothes">
        <ProductRow kind="clothes" sort="new" limit={8} badge="Yangi" />
      </Section>

      <Section title="Kolleksiyalar">
        <Lookbook />
      </Section>

      <Section title="Foydali ma'lumot">
        <InfoTiles />
      </Section>

      <Section title="Ommabop" moreTo="/clothes?sort=popular">
        <ProductRow kind="clothes" sort="popular" limit={4} />
      </Section>
    </div>
  );
}
