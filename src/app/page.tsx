"use client";

import Container from "@/components/container";
import Archive from "@/containers/archive";
import { useState } from "react";

export default function Home() {
  const [shouldReset, setShouldReset] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);

  const handleSave = () => {
    setShouldSave(true);
    setTimeout(() => setShouldSave(false), 100);
    alert("저장되었습니다!");
  };

  const handleReset = () => {
    setShouldReset(true);
    setTimeout(() => setShouldReset(false), 100);
  };

  const placeNames: string[] = [
    "📚 종합자료실 📚",
    "🧸 청소년자료실 🧸",
    "📰 연속간행물 📰",
    "🖥️ PC 🖥️",
  ];

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
    <Container currentPage="home">
      <div className="m-2 font-[family-name:var(--font-noto-sans)]">
        <h1 className="text-5xl font-bold mt-10 mb-12 text-center">
          야간 통계일지
        </h1>
        <div className="grid grid-cols-1 gap-8 mb-8">
          {placeNames.map((item) => (
            <Archive
              key={item}
              place={item}
              onReset={shouldReset}
              onSave={shouldSave}
            />
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg btn-reset text-xl"
          >
            초기화
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg btn-save text-xl"
          >
            저장하기
          </button>
        </div>
      </div>
    </Container>
  );
}
