import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";

import { State } from "./state";

const generateMockStore = (state: Partial<State>): MockStoreEnhanced<Partial<State>> => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore(state) as MockStoreEnhanced<Partial<State>>;
  store.clearActions();
  return store;
};

export default generateMockStore;
