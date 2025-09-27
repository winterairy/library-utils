"use client";

import { useEffect, useState } from "react";

interface SavedData {
  count: number;
  timestamp: string;
}

interface SavedCounts {
  [key: string]: SavedData;
}

interface ResultDataProps {
  children: (data: {
    savedData: SavedCounts;
    hasData: boolean;
    formatDate: (dateString: string) => string;
  }) => React.ReactNode;
}

export default function ResultData({ children }: ResultDataProps) {
  const [savedData, setSavedData] = useState<SavedCounts>({});
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const placeNames = [
      "🧸 청소년자료실 🧸",
      "📰 연속간행물 📰",
      "📚 종합자료실 📚",
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

  return <>{children({ savedData, hasData, formatDate })}</>;
}
