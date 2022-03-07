import { invoke } from "@tauri-apps/api";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import ProviderWrapper from "./ProviderWrapper";
import { useAsync } from "./hooks";
import { actionCreators } from "./state";

const ConfigLoader = (): ReactElement => {
  const dispatch = useDispatch();
  const { loadConfig } = bindActionCreators(actionCreators, dispatch);

  const { loading, error } = useAsync(async () => loadConfig());
  if (loading) return <>Loading config file ...</>;
  if (error) invoke("aborted_init_load");

  return <ProviderWrapper />;
};

export default ConfigLoader;
