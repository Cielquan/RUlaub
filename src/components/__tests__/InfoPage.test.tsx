import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { CombinedState } from "redux";
import { MockStoreEnhanced } from "redux-mock-store";

import InfoPage from "../InfoPage";
import { initialState, State } from "../../state";
import generateMockStore from "../../testUtils";
import { closeInfoPageAction } from "../../state/action-creators";

describe("<InfoPage />", () => {
  let testState: State;
  let mockStore: MockStoreEnhanced<Partial<CombinedState<State>>>;

  beforeEach(() => {
    testState = JSON.parse(JSON.stringify(initialState));
    mockStore = generateMockStore(testState);
  });

  it("renders invisible by default", () => {
    expect(mockStore.getState().infoPage).toBe(false);
    render(
      <Provider store={mockStore}>
        <I18nProvider i18n={i18n}>
          <InfoPage />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("info-page")).toMatchSnapshot();
    expect(screen.getByTestId("info-page")).not.toBeVisible();
  });

  it("renders correctly when open", () => {
    testState.infoPage = true;
    const alteredMockStore = generateMockStore(testState);
    expect(alteredMockStore.getState().infoPage).toBe(true);
    render(
      <Provider store={mockStore}>
        <I18nProvider i18n={i18n}>
          <InfoPage />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("info-page")).toMatchSnapshot();
    expect(screen.getByTestId("info-page")).toBeVisible();
  });

  it("closes when button is clicked", () => {
    testState.infoPage = true;
    const alteredMockStore = generateMockStore(testState);
    const onClickMock = jest.fn();

    expect(alteredMockStore.getState().infoPage).toBe(true);
    render(
      <Provider store={alteredMockStore}>
        <I18nProvider i18n={i18n}>
          <InfoPage onClick={onClickMock} />
        </I18nProvider>
      </Provider>
    );
    expect(screen.getByTestId("info-page")).toBeVisible();

    userEvent.click(screen.getByTestId("info-page-btn"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
    const expectedActions = [closeInfoPageAction()];
    expect(alteredMockStore.getActions()).toEqual(expectedActions);
  });
});
