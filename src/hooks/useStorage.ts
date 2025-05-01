import { useCallback, useEffect, useState } from "react";

type setValueFn<T> = (v: T) => void;
type removeValueFn = () => void;

/**
 * use the given Storage
 */
const useStorage = <T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): [T | undefined, setValueFn<T>, removeValueFn] => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    }
    return defaultValue;
  });

  useEffect((): void => {
    if (value === undefined) {
      storageObject.removeItem(key);
      return;
    }
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};

/**
 * React hook to use the local storage.
 * @param key the key to query the storage.
 * @param defaultValue the default and intitial value stored under the key
 * @returns an array with:
 * - the variable storing the value
 * - a function to set a new value
 * - a function to remove the key from the storage
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T | undefined, setValueFn<T>, removeValueFn] =>
  useStorage(key, defaultValue, window.localStorage);

export const useSessionStorage = <T>(
  key: string,
  defaultValue: T
): [T | undefined, setValueFn<T>, removeValueFn] =>
  useStorage(key, defaultValue, window.sessionStorage);
