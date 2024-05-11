import { useState } from "react";

const categories = [
  "Front-End",
  "Backend",
  "Mobile",
  "Dev Ops",
  "Bando de Dados",
  "Cloud",
  "Segurança",
  "IA",
  "Outros",
];

export function Menu() {
  const [category, setCategory] = useState<string>("");

  function handleCategory(category: string) {
    setCategory(category);
  }
  console.log(category);
  return (
    <div className="mr-5 flex flex-col gap-5">
      <div className="bg-black-secundary w-72 rounded-lg px-4 py-6 flex flex-col items-start gap-2">
        {categories.map((category, index) => {
          return (
            <button key={index} onClick={() => handleCategory(category)} className="border-l-4 pl-4 rounded h-9"  >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
