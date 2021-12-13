import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { useAsync } from "./hooks";
import { actionCreators } from "./state";

import ProviderWrapper from "./ProviderWrapper";

const ConfigLoader = (): ReactElement => {
  const dispatch = useDispatch();
  const { loadConfig } = bindActionCreators(actionCreators, dispatch);

  const { loading } = useAsync(async () => loadConfig());
  if (loading) return <>Loading</>;

  return <ProviderWrapper />;
};

export default ConfigLoader;
