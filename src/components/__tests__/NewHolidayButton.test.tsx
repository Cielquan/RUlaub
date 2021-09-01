import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    render(<NewHolidayButton />);
    expect(mockStore.getState().language).toEqual(Languages.english);
    userEvent.hover(screen.getByTestId("new-holiday-fab"));
    expect(await screen.findByText("Add new Holiday")).toBeInTheDocument();
  });
});
