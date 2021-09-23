import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

import UserButton from "../UserButton";

describe("<UserButton />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly with subComponents mocked as string", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <UserButton />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
