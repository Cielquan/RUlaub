import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import SideMenuButton from "../SideMenuButton";
import SideMenuSectionButton from "../SideMenuSectionButton";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

jest.mock("../SideMenuButton", () => ({ __esModule: true, default: jest.fn() }));

describe("SideMenuSectionButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();

    (SideMenuButton as unknown as jest.Mock).mockImplementation(
      jest.requireActual("../SideMenuButton").default
    );
  });

  it("renders correctly (unmocked)", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuSectionButton text="text" listKey="key" sectionItemList={[]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with string-mocked subComponents", () => {
    (SideMenuButton as unknown as jest.Mock).mockImplementation(() => "SideMenuButton");
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuSectionButton text="text" listKey="key" sectionItemList={[]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly folded and unfolded", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <SideMenuSectionButton
          text="text-mocked"
          listKey="key-mocked"
          sectionItemList={[["btn-txt", "lst-key", () => undefined]]}
        />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    fireEvent.click(screen.getByText("text-mocked"));
    expect(asFragment()).toMatchSnapshot();
  });
});