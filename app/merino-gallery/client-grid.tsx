"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

export function MerinoClientGrid({ initialImages }: { initialImages: string[] }) {
  // We keep track of names if you decide to rename them manually
  const [productNames, setProductNames] = useState<Record<string, string>>({});

  const handleNameChange = (filename: string, newName: string) => {
    setProductNames((prev) => ({ ...prev, [filename]: newName }));
  };

  const generateDataFile = () => {
    // This generates code you can copy into data.ts later
    const code = initialImages.map((img) => {
        const customName = productNames[img] || img.replace("Page", "Design ").split("_")[0]; // Default name
        return `{ name: "${customName}", image: "/merino/${img}" },`;
    }).join("\n");
    
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard! Paste it into src/data/merino.ts");
  };

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex justify-end mb-8 sticky top-24 z-20">
        <button 
            onClick={generateDataFile}
            className="bg-black text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition"
        >
            Copy Data Code
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {initialImages.map((img, idx) => (
          <FadeIn key={img} delay={idx * 0.05}>
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* IMAGE */}
              <div className="aspect-[3/4] relative bg-gray-100">
                <img
                  src={`/merino/${img}`}
                  alt={img}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
              </div>

              {/* DETAILS INPUT */}
              <div className="p-4 bg-white">
                <p className="text-[10px] text-gray-400 mb-1 truncate">{img}</p>
                <input 
                    type="text" 
                    placeholder="Type Name (e.g. 20009 MT)"
                    className="w-full border-b border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 py-1"
                    onChange={(e) => handleNameChange(img, e.target.value)}
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}