import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import SideMenuDoubleButton from "../SideMenuDoubleButton";

describe("<SideMenuDoubleButton />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <SideMenuDoubleButton
            text="text"
            firstButtonIcon={<></>}
            firstButtonOnClick={() => undefined}
            secondButtonIcon={<></>}
            secondButtonOnClick={() => undefined}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
