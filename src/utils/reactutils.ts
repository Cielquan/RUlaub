/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";

// Empty array is need to run hook only on mount
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fn: () => void): void => useEffect(fn, []);
