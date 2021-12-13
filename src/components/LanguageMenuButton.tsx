import { MenuItem } from "@mui/material";
import React, { forwardRef, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";

import { LanguageData } from "../backendAPI/types/configFile.schema";
import { State } from "../state";
import { ConfigAction } from "../state/actions";

interface Props {
  language: LanguageData;
  closeHandle(): void;
  changeHandle(): (dispatch: Dispatch<ConfigAction>) => void;
}

const LanguageMenuButton = forwardRef(
  (
    { language, closeHandle, changeHandle }: Props,
    ref: React.Ref<HTMLLIElement>
  ): ReactElement => {
    const locale = useSelector(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (state: State) => state.config!.settings.language.locale
    );

    const active = locale === language.locale;

    return (
      <MenuItem
        ref={ref}
        selected={active}
        onClick={active ? closeHandle : changeHandle}
      >
        {language.name}
      </MenuItem>
    );
  }
);

export default LanguageMenuButton;
