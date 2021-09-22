import { Collapse, List } from "@mui/material";
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../state";

import SideMenuButton, {
  ButtonIcon,
  ButtonListKey,
  ButtonOnClick,
  ButtonSxStyle,
  ButtonText,
} from "./SideMenuButton";

export type SectionItemList = Array<
  [ButtonText, ButtonListKey, ButtonOnClick, ButtonIcon?, ButtonSxStyle?]
>;

interface Props {
  text: string;
  listKey: string;
  icon?: ReactElement;
  sxStyle?: ButtonSxStyle;
  sectionItemList: SectionItemList;
  onClick?: () => void | null;
}

const SideMenuSectionButton = ({
  text,
  listKey,
  icon,
  sxStyle,
  sectionItemList,
  onClick,
}: Props): ReactElement => {
  const [sideMenuSectionState, setSideMenuSectionState] = useState<boolean>(false);
  const closeSideMenuDatabase = (): void => setSideMenuSectionState(false);
  const openSideMenuDatabase = (): void => setSideMenuSectionState(true);

  const dispatch = useDispatch();
  const { closeSideMenu } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <SideMenuButton
        text={text}
        listKey={listKey}
        onClick={sideMenuSectionState ? closeSideMenuDatabase : openSideMenuDatabase}
        icon={icon}
        sxStyle={sxStyle}
        foldIcon={sideMenuSectionState ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      />
      <Collapse in={sideMenuSectionState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sectionItemList.map((item) => (
            <SideMenuButton
              text={item[0]}
              key={`${item[1]}-outer`}
              listKey={item[1]}
              onClick={() => {
                if (typeof onClick === "function") onClick();
                closeSideMenu();
                item[2]();
              }}
              icon={item[3]}
              sxStyle={item[4] !== undefined ? item[4] : { paddingLeft: 4 }}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
SideMenuSectionButton.defaultProps = {
  icon: <></>,
  sxStyle: {},
  onClick: () => undefined,
};

export default SideMenuSectionButton;
