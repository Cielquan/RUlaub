import { Collapse, List } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { ReactElement, useState } from "react";

import useStyles from "../styles";

import SideMenuButton, {
  ButtonText,
  ButtonListKey,
  ButtonOnClick,
  ButtonIcon,
  ButtonClassName,
} from "./SideMenuButton";

export type SectionItemList = Array<
  [ButtonText, ButtonListKey, ButtonOnClick, ButtonIcon?, ButtonClassName?]
>;

interface Props {
  text: string;
  listKey: string;
  icon?: ReactElement;
  className?: string;
  sectionItemList: SectionItemList;
}

const SideMenuSectionButton = ({
  text,
  listKey,
  icon,
  className,
  sectionItemList,
}: Props): ReactElement => {
  const classes = useStyles();

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
        className={className}
        foldIcon={sideMenuSectionState ? <ExpandLess /> : <ExpandMore />}
      />
      <Collapse in={sideMenuSectionState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sectionItemList.map((item) => (
            <SideMenuButton
              text={item[0]}
              listKey={item[1]}
              onClick={item[2]}
              icon={item[3]}
              className={item[4] !== undefined ? item[4] : classes.sideMenuNestedButton}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
SideMenuSectionButton.defaultProps = {
  icon: <></>,
  className: "",
};

export default SideMenuSectionButton;
