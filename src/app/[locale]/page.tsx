import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-500">
      <div>
        {t("title")}
        {t("description")}
      </div>
    </main>
  );
}
