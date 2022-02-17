import { invoke } from "@tauri-apps/api";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { useAsync } from "./hooks";
import { actionCreators } from "./state";

import ProviderWrapper from "./ProviderWrapper";

const ConfigLoader = (): ReactElement => {
  const dispatch = useDispatch();
  const { loadConfig } = bindActionCreators(actionCreators, dispatch);

  const { loading, error } = useAsync(async () => loadConfig());
  if (loading) return <>Loading</>;
  if (error) invoke("aborted_init_load");

  return <ProviderWrapper />;
};

export default ConfigLoader;
