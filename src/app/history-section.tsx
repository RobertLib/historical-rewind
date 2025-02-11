import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

interface HistorySectionProps {
  year: number;
  promptBase: string;
}

export default async function HistorySection({
  year,
  promptBase,
}: HistorySectionProps) {
  const categories = ["politických", "kulturních", "společenských"];

  const responses = await Promise.all(
    categories.map((category) =>
      client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Jsi historický asistent, který poskytuje zajímavá shrnutí pouze ${category} událostí ve formátu HTML. Využívej jen potřebné elementy (div, p, h1-h6, b) bez wrapper značek jako <html>, <head> či <body>. Při psaní dej pozor na gramatiku a pravopis.`,
          },
          {
            role: "user",
            content: `${promptBase}${year}.`,
          },
        ],
      })
    )
  );

  const headers = [
    "Politické události",
    "Kulturní události",
    "Společenské události",
  ];

  const articles = responses.map((response, index) => ({
    header: headers[index],
    content: response.choices[0].message.content,
  }));

  return (
    <section className="relative mb-6 pl-7">
      <span className="absolute left-2 top-4 bottom-0 w-0.5 bg-gray-200"></span>
      <div className="relative flex items-center mb-3">
        <span className="absolute -left-[1.6rem] w-3 h-3 bg-blue-500 rounded-full"></span>
        <h2 className="text-2xl font-semibold text-gray-700">Rok {year}</h2>
      </div>
      {articles.map(({ header, content }) => (
        <article key={header} className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-1">{header}</h3>
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />
        </article>
      ))}
    </section>
  );
}
