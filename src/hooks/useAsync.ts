import { DependencyList, useCallback, useEffect, useState } from "react";

const useAsync = <T>(
  callback: () => Promise<T>,
  dependencies: DependencyList = []
): {
  loading: boolean;
  error: T | undefined;
  value: T | undefined;
} => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<T | undefined>();
  const [value, setValue] = useState<T | undefined>();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
};

export default useAsync;
