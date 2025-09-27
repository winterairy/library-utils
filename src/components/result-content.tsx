"use client";

import ResultData from "@/components/result-data";

export default function ResultContent() {
  return (
    <ResultData>
      {({ savedData, hasData, formatDate }) => (
        <>
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
        </>
      )}
    </ResultData>
  );
}
