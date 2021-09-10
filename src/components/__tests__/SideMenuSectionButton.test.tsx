import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import SideMenuButton from "../SideMenuButton";
import SideMenuSectionButton from "../SideMenuSectionButton";

jest.mock("../SideMenuButton", () => ({ __esModule: true, default: jest.fn() }));

describe("<SideMenuSectionButton />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();

    (SideMenuButton as unknown as jest.Mock).mockImplementation(
      jest.requireActual("../SideMenuButton").default
    );
  });

  it("renders correctly with no mocks", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuSectionButton text="text" listKey="key" sectionItemList={[]} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with subComponents mocked as string", () => {
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
    // NOTE: `userEvent.click` changes snapshot, change not shown in browser in real app
    fireEvent.click(screen.getByRole("button"));
    expect(asFragment()).toMatchSnapshot();
  });
});
