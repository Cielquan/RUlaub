import { Collapse, List } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { ReactElement, useState } from "react";

import SideMenuButton, {
  ButtonText,
  ButtonListKey,
  ButtonOnClick,
  ButtonIcon,
  ButtonSxStyle,
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
}

const SideMenuSectionButton = ({
  text,
  listKey,
  icon,
  sxStyle,
  sectionItemList,
}: Props): ReactElement => {
  const [sideMenuSectionState, setSideMenuSectionState] = useState<boolean>(false);
  const closeSideMenuDatabase = (): void => setSideMenuSectionState(false);
  const openSideMenuDatabase = (): void => setSideMenuSectionState(true);

  return (
    <>
      <SideMenuButton
        text={text}
        listKey={listKey}
        onClick={sideMenuSectionState ? closeSideMenuDatabase : openSideMenuDatabase}
        icon={icon}
        sxStyle={sxStyle}
        foldIcon={sideMenuSectionState ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={sideMenuSectionState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sectionItemList.map((item) => (
            <SideMenuButton
              text={item[0]}
              key={`${item[1]}-outer`}
              listKey={item[1]}
              onClick={item[2]}
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
};

export default SideMenuSectionButton;
