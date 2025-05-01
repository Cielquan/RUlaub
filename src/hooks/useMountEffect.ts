import { useEffect } from "react";

// Empty array is need to run hook only on mount
// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (callback: () => void): void => useEffect(callback, []);

export default useMountEffect;
