import { useState, useEffect, useCallback, useRef } from "react";

interface UseCounterProps {
  place: string;
  onReset?: boolean;
  onSave?: boolean;
}

export const useCounter = ({ place, onReset, onSave }: UseCounterProps) => {
  const [count, setCount] = useState(0);
  const isInitialized = useRef(false);
  const countRef = useRef(count);

  // 저장소 키 생성 함수
  const getStorageKeys = useCallback(
    () => ({
      current: `current_count_${place}`,
      saved: `visitor_count_${place}`,
    }),
    [place]
  );

  // 초기 데이터 로드
  useEffect(() => {
    if (isInitialized.current) return;

    const { current, saved } = getStorageKeys();
    const currentCount = sessionStorage.getItem(current);

    if (currentCount !== null) {
      setCount(parseInt(currentCount));
    } else {
      const savedData = localStorage.getItem(saved);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          const savedCount =
            parsedData.count !== undefined
              ? parsedData.count
              : parseInt(savedData);
          setCount(savedCount);
          sessionStorage.setItem(current, savedCount.toString());
        } catch (e) {
          console.error("Error parsing saved data:", e);
        }
      }
    }

    isInitialized.current = true;
  }, [place, getStorageKeys]);

  // 초기화 처리 (onReset이 true일 때만)
  useEffect(() => {
    if (!onReset || !isInitialized.current) return;

    setCount(0);
    const { current } = getStorageKeys();
    sessionStorage.setItem(current, "0");
  }, [onReset, getStorageKeys]);

  // count ref 업데이트
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  // 저장 처리 (onSave가 true일 때만)
  useEffect(() => {
    if (!onSave || !isInitialized.current) return;

    const saveData = {
      count: countRef.current,
      timestamp: new Date().toISOString(),
    };
    const { current, saved } = getStorageKeys();

    localStorage.setItem(saved, JSON.stringify(saveData));
    sessionStorage.setItem(current, countRef.current.toString());
  }, [onSave, getStorageKeys]);

  const decreaseCount = useCallback(() => {
    setCount((prevCount) => {
      const newCount = Math.max(0, prevCount - 1);
      const { current } = getStorageKeys();
      sessionStorage.setItem(current, newCount.toString());
      return newCount;
    });
  }, [getStorageKeys]);

  const increaseCount = useCallback(() => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const { current } = getStorageKeys();
      sessionStorage.setItem(current, newCount.toString());
      return newCount;
    });
  }, [getStorageKeys]);

  return {
    count,
    decreaseCount,
    increaseCount,
  };
};
