import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderer from "react-test-renderer";

import { initialState } from "../../state";
import generateMockStore from "../../testUtils";
import NewHolidayButton from "../NewHolidayButton";

describe("<NewHolidayButton />", () => {
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
    userEvent.hover(screen.getByRole("button"));
    expect(await screen.findByText("Add new Holiday")).toBeInTheDocument();
  });
});
