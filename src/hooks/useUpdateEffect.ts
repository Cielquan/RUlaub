import { DependencyList, useEffect, useRef } from "react";

const useUpdateEffect = (callback: () => void, dependencies: DependencyList): void => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useUpdateEffect;
