import { DependencyList, useEffect } from "react";

import { useMountEffect, useTimeout } from ".";

const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: DependencyList
): void => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useMountEffect(clear);
};

export default useDebounce;
