import { DependencyList, useEffect, useRef } from "react";

import { useTimeout } from ".";

const useMountDelayOrUpdateEffect = (
  callback: () => void,
  delay: number,
  dependencies: DependencyList
): void => {
  const firstRenderRef = useRef(true);
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      reset();
      return;
    }
    clear();
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useMountDelayOrUpdateEffect;
