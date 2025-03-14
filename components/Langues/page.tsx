import React from "react";

const languages = [
  "javascript", "python", "ruby", "go", "typescript", "php",
  "swift", "kotlin", "rust", "scala", "perl", "elixir", "dart", "r",
  "cplusplus", "mysql"
];

const Langues = () => {
  const iconImages = languages.map(slug => ({
    src: `https://cdn.simpleicons.org/${slug}`,
    label: slug.toUpperCase() === "MYSQL" ? "SQL" : slug.toUpperCase() === "CPLUSPLUS" ? "C++" : slug.charAt(0).toUpperCase() + slug.slice(1),
  }));

  return (
    <div className="relative p-6 rounded-xl shadow-lg bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-36 h-36 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 ">
        <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-green-700 via-green-600 to-blue-700 bg-clip-text text-transparent">
          Langages Maîtrisés
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-8">
          {iconImages.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={item.src}
                alt={item.label}
                className="w-14 h-14 hover:scale-110 transition-transform"
              />
              <span className="mt-2 text-sm font-medium text-gray-900">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Langues;
