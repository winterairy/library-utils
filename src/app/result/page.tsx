"use client";

import Container from "@/components/container";
import { useEffect, useState } from "react";

interface SavedData {
  count: number;
  timestamp: string;
}

interface SavedCounts {
  [key: string]: SavedData;
}

export default function Result() {
  const [savedData, setSavedData] = useState<SavedCounts>({});
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const placeNames = [
      "📚 종합자료실 📚",
      "🧸 청소년자료실 🧸",
      "📰 연속간행물 📰",
      "🖥️ PC 🖥️",
    ];

    const data: SavedCounts = {};
    let foundData = false;

    placeNames.forEach((place) => {
      const saved = localStorage.getItem(`visitor_count_${place}`);
      if (saved) {
        data[place] = JSON.parse(saved);
        foundData = true;
      }
    });

    setSavedData(data);
    setHasData(foundData);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <Container currentPage="result">
      <div className="m-2 font-[family-name:var(--font-noto-sans)]">
        <h1 className="text-5xl font-bold mt-3 mb-10 text-center">통계 결과</h1>
        <div className="max-w-2xl mx-auto">
          {hasData ? (
            Object.entries(savedData).map(([place, data]) => (
              <div key={place} className="mb-3 p-3 border rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">{place}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">인원</p>
                    <p className="text-2xl font-bold">{data.count}명</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">저장 시간</p>
                    <p className="text-lg">{formatDate(data.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-xl mb-2">저장된 통계 데이터가 없습니다.</p>
              <p>통계 입력 페이지에서 데이터를 저장해주세요.</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
