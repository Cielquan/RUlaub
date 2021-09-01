import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import App from "../App";
import { initialState } from "../state";
import generateMockStore from "../testUtils";

jest.mock("../components/Calendar", () => () => "Calendar");
jest.mock("../components/InfoPage", () => () => "InfoPage");
jest.mock("../components/Navbar", () => () => "Navbar");
jest.mock("../components/NewHolidayButton", () => () => "NewHolidayButton");
jest.mock("../components/SideMenu", () => () => "SideMenu");

describe("<App />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
