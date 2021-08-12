import React from "react";
import renderer from "react-test-renderer";

// Import innerElementType as InnerElementType b/c TS complains
import InnerElementType from "../multigridInnerElementType";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("innerElementType component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<InnerElementType style={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
