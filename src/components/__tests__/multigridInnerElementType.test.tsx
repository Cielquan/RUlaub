import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
// Import innerElementType as InnerElementType b/c TS complains
import InnerElementType from "../multigridInnerElementType";

describe("<innerElementType />", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<InnerElementType style={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
