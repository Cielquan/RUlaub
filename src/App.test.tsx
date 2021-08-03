import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import Languages from "./i18n";

import App from "./App";

const mockStore = configureMockStore([thunk]);

describe("Base App", () => {
  let store;
  let component: RenderResult;

  beforeEach(() => {
    store = mockStore({
      dbData: { users: [] },
      infoPage: false,
      language: Languages.english,
      localConfig: { settings: { yearToShow: 2021 } },
      sideMenu: false,
      sideMenuDatabase: false,
      theme: "dark",
    });

    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("renders root element", async () => {
    const { findByTestId } = component;

    const element = await findByTestId("rulaub-root");

    expect(element).toBeInTheDocument();
  });

  it("renders main element", async () => {
    const { findByTestId } = component;

    const element = await findByTestId("rulaub-main");

    expect(element).toBeInTheDocument();
  });
});
