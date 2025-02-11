import { Suspense } from "react";
import HistorySection from "./history-section";

export const revalidate = 86400;

export default async function Home() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year5 = today.getFullYear() - 5;
  const year10 = today.getFullYear() - 10;
  const year20 = today.getFullYear() - 20;
  const year35 = today.getFullYear() - 35;
  const year50 = today.getFullYear() - 50;
  const year100 = today.getFullYear() - 100;
  const year200 = today.getFullYear() - 200;
  const year500 = today.getFullYear() - 500;

  const years = [
    year5,
    year10,
    year20,
    year35,
    year50,
    year100,
    year200,
    year500,
  ];

  const promptBase = `Prosím, vytvoř stručné shrnutí hlavních historických událostí, které se staly dne ${day}.${month}.`;

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <article className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <header className="mb-5 border-b pb-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Historické události dne {day}.{month}.
          </h1>
          <p className="text-gray-500">
            Shrnutí klíčových událostí z let {year5}, {year10}, {year20},{" "}
            {year35}, {year50}, {year100}, {year200} a {year500}.
          </p>
        </header>
        {years.map((year) => (
          <Suspense
            key={year}
            fallback={
              <p className="text-gray-600 my-1.5">
                Načítám data pro rok {year}...
              </p>
            }
          >
            <HistorySection year={year} promptBase={promptBase} />
          </Suspense>
        ))}
        <footer className="mt-4 pt-4 border-t text-sm text-gray-500">
          <p>Původní data generována pomocí OpenAI GPT-4o-mini.</p>
        </footer>
      </article>
    </main>
  );
}
