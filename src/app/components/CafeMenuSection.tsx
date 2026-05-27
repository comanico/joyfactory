import { getServerT } from "@/i18n/server";
import { isMenuReady } from "@/lib/siteReady";

export default async function CafeMenuSection() {
  const t = await getServerT();

  return (
    <section className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface">
          {t("cafe.menuTitle")}
        </h2>
      </div>

      {isMenuReady() ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest rounded-3xl p-8">
            <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined">local_cafe</span>{" "}
              {t("cafe.coffeeTitle")}
            </h3>
            <ul className="space-y-6">
              <li className="flex justify-between">
                <span>Flat White</span>
                <span className="font-medium">$5.50</span>
              </li>
              <li className="flex justify-between">
                <span>Matcha Latte</span>
                <span className="font-medium">$6.00</span>
              </li>
              <li className="flex justify-between">
                <span>Golden Turmeric Milk</span>
                <span className="font-medium">$5.75</span>
              </li>
              <li className="flex justify-between">
                <span>Strawberry Lemonade (Kids)</span>
                <span className="font-medium">$4.25</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8">
            <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined">bakery_dining</span>{" "}
              {t("cafe.pastriesTitle")}
            </h3>
            <ul className="space-y-6">
              <li className="flex justify-between">
                <span>Almond Croissant</span>
                <span className="font-medium">$4.95</span>
              </li>
              <li className="flex justify-between">
                <span>Banana Chocolate Chip Muffin</span>
                <span className="font-medium">$4.50</span>
              </li>
              <li className="flex justify-between">
                <span>Blueberry Lemon Loaf</span>
                <span className="font-medium">$5.25</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary text-on-primary rounded-3xl p-8">
            <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined">child_care</span>{" "}
              {t("cafe.kidsTitle")}
            </h3>
            <ul className="space-y-6">
              <li className="flex justify-between">
                <span>Fruit Cup + Yogurt</span>
                <span className="font-medium">$6.50</span>
              </li>
              <li className="flex justify-between">
                <span>PB&amp;J Mini Sandwich</span>
                <span className="font-medium">$5.95</span>
              </li>
              <li className="flex justify-between">
                <span>Cheese Quesadilla</span>
                <span className="font-medium">$5.75</span>
              </li>
            </ul>
            <p className="text-xs mt-8 opacity-75">{t("cafe.kidsNote")}</p>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto rounded-3xl bg-surface-container-low border border-outline-variant/20 px-8 py-14 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">
              construction
            </span>
          </div>
          <span className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-headline font-bold text-sm uppercase tracking-widest inline-block">
            {t("cafe.menuUnderConstruction.badge")}
          </span>
          <h3 className="text-2xl md:text-3xl font-headline font-extrabold text-primary">
            {t("cafe.menuUnderConstruction.title")}
          </h3>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            {t("cafe.menuUnderConstruction.body")}
          </p>
        </div>
      )}
    </section>
  );
}
