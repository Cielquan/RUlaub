import { DependencyList } from "react";

import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const useFetch = (
  url: RequestInfo,
  options: RequestInit = {},
  dependencies: DependencyList = []
): ReturnType<typeof useAsync> =>
  useAsync(
    () =>
      fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      }),
    dependencies
  );

export default useFetch;
