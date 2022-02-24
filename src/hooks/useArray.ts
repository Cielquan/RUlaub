import React, { useState } from "react";

const useArray = <T>(
  defaultValue: T[]
): {
  array: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  push: (element: T) => void;
  filter(callback: () => void): void;
  update(index: number, newElement: T): void;
  remove(index: number): void;
  clear(): void;
} => {
  const [array, setArray] = useState(defaultValue);

  const push = (element: T): void => {
    setArray((a) => [...a, element]);
  };

  const filter = (callback: () => void): void => {
    setArray((a) => a.filter(callback));
  };

  const update = (index: number, newElement: T): void => {
    setArray((a) => [...a.slice(0, index), newElement, ...a.slice(index + 1, a.length - 1)]);
  };

  const remove = (index: number): void => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)]);
  };

  const clear = (): void => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};

export default useArray;
