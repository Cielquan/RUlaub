import { useState } from "react";

type toggleValueFn = (v: boolean) => void;

const useToggle = (defaultValue: boolean): [boolean, toggleValueFn] => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (newValue: boolean): void => {
    setValue((currentValue) =>
      typeof newValue === "boolean" ? newValue : !currentValue
    );
  };

  return [value, toggleValue];
};

export default useToggle;
