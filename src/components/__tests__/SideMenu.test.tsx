import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { CombinedState } from "redux";
import { MockStoreEnhanced } from "redux-mock-store";

import SideMenu from "../SideMenu";
import { initialState, State } from "../../state";
import generateMockStore from "../../testUtils";
import { closeSideMenuAction } from "../../state/action-creators";

jest.mock("../SideMenuButton", () => () => "SideMenuButton");
jest.mock("../SideMenuSectionButton", () => () => "SideMenuSectionButton");

describe("<SideMenu />", () => {
  let testState: State;
  let mockStore: MockStoreEnhanced<Partial<CombinedState<State>>>;

  beforeEach(() => {
    testState = JSON.parse(JSON.stringify(initialState));
    mockStore = generateMockStore(testState);
  });

  it("renders not by default", () => {
    expect(mockStore.getState().sideMenu).toBe(false);
    render(
      <Provider store={mockStore}>
        <SideMenu />
      </Provider>
    );
    expect(screen.queryByTestId("side-menu")).not.toBeInTheDocument();
  });

  it("renders correctly when open", () => {
    testState.sideMenu = true;
    const alteredMockStore = generateMockStore(testState);
    expect(alteredMockStore.getState().sideMenu).toBe(true);
    render(
      <Provider store={mockStore}>
        <SideMenu />
      </Provider>
    );
    expect(screen.getByTestId("side-menu")).toMatchSnapshot();
  });

  it("closes when button is clicked", () => {
    testState.sideMenu = true;
    const alteredMockStore = generateMockStore(testState);
    const onClickMock = jest.fn();

    expect(alteredMockStore.getState().sideMenu).toBe(true);
    render(
      <Provider store={alteredMockStore}>
        <SideMenu onClick={onClickMock} />
      </Provider>
    );
    expect(screen.getByTestId("side-menu")).toBeVisible();

    userEvent.click(screen.getByTestId("side-menu-btn"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
    const expectedActions = [closeSideMenuAction()];
    expect(alteredMockStore.getActions()).toEqual(expectedActions);
  });
});
