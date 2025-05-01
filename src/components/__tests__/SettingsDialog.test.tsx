import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { CombinedState } from "redux";
import { MockStoreEnhanced } from "redux-mock-store";

import i18n from "../../i18n";
import { State, initialState } from "../../state";
import { closeSettingsDialogAction, updateConfigAction } from "../../state/action-creators";
import generateMockStore from "../../testUtils";
import SettingsDialog from "../SettingsDialog";

describe("<SettingsDialog />", () => {
  let testState: State;
  let mockStore: MockStoreEnhanced<Partial<CombinedState<State>>>;

  beforeEach(() => {
    testState = JSON.parse(JSON.stringify(initialState));
    mockStore = generateMockStore(testState);
  });

  it("renders invisible by default", () => {
    expect(mockStore.getState().aboutPage).toBe(false);
    render(
      <Provider store={mockStore}>
        <I18nProvider i18n={i18n}>
          <SettingsDialog />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("settings-dialog")).toMatchSnapshot();
    expect(screen.getByTestId("settings-dialog")).not.toBeVisible();
  });

  it("renders correctly when open", () => {
    testState.settingsDialog = true;
    const alteredMockStore = generateMockStore(testState);
    expect(alteredMockStore.getState().settingsDialog).toBe(true);
    render(
      <Provider store={mockStore}>
        <I18nProvider i18n={i18n}>
          <SettingsDialog />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("settings-dialog")).toMatchSnapshot();
    expect(screen.getByTestId("settings-dialog")).toBeVisible();
  });

  it("closes when button is clicked", () => {
    testState.settingsDialog = true;
    const alteredMockStore = generateMockStore(testState);
    const onClickMock = jest.fn();

    expect(alteredMockStore.getState().settingsDialog).toBe(true);
    render(
      <Provider store={alteredMockStore}>
        <I18nProvider i18n={i18n}>
          <SettingsDialog onClick={onClickMock} />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("settings-dialog")).toBeVisible();

    userEvent.click(screen.getByTestId("settings-dialog-btn"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
    const expectedActions = [
      closeSettingsDialogAction(),
      updateConfigAction({ user: { name: undefined } }),
    ];
    expect(alteredMockStore.getActions()).toEqual(expectedActions);
  });
});
