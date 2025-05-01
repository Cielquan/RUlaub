import { invoke } from "@tauri-apps/api";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import ProviderWrapper from "./ProviderWrapper";
import { useAsync } from "./hooks";
import { actionCreators } from "./state";

const BackendLoader = (): ReactElement => {
  const dispatch = useDispatch();
  const { getDBInitLoadState, loadConfig } = bindActionCreators(actionCreators, dispatch);

  const { loading: loadingConfig, error: configLoadError } = useAsync(async () => loadConfig());
  const { loading: loadingDBInitLoadState } = useAsync(async () => getDBInitLoadState());

  if (loadingConfig) return <>Loading config file ...</>;
  if (configLoadError) invoke("aborted_init_load");

  if (loadingDBInitLoadState) return <>Init database ...</>;

  return <ProviderWrapper />;
};

export default BackendLoader;
