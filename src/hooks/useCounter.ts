import { useCallback, useRef } from "react";

const useCounter = (
  startValue?: number
): {
  counter: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
} => {
  const counterRef = useRef(startValue ?? 0);

  const increaseCounter = useCallback((): void => {
    counterRef.current += 1;
  }, []);
  const decreaseCounter = useCallback((): void => {
    counterRef.current -= 1;
  }, []);

  const counter = counterRef.current;

  return { counter, increaseCounter, decreaseCounter };
};

export default useCounter;
