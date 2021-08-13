import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Dispatch } from "redux";

import { defaultLanguage } from "../../i18n";
import LanguageMenuButton from "../LanguageMenuButton";
import { initialState } from "../../state";
import { LanguageAction } from "../../state/actions";
import generateMockStore from "../../testUtils";

describe("LanguageMenuButton component", () => {
  const mockStore = generateMockStore(initialState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={mockStore}>
          <LanguageMenuButton
            language={defaultLanguage}
            closeHandle={() => undefined}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            changeHandle={() => (dispatch: Dispatch<LanguageAction>) => undefined}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});