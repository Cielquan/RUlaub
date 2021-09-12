import { useEffect } from "react";

// Empty array is need to run hook only on mount
// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (fn: () => void): void => useEffect(fn, []);

export default useMountEffect;
