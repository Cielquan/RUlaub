import { fireEvent, render } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";

import NewHolidayButton from "../NewHolidayButton";
import Languages from "../../i18n";
import { initialState } from "../../state";
import generateMockStore from "../../testUtils";

describe("NewHolidayButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<NewHolidayButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders tooltip", async () => {
    const { findByText, getByTestId } = render(<NewHolidayButton />);
    expect(mockStore.getState().language).toEqual(Languages.english);
    fireEvent.mouseOver(getByTestId("new-holiday-fab"));
    expect(await findByText("Add new Holiday")).toBeInTheDocument();
  });
});
