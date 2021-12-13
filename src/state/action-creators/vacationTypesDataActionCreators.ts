import { Dispatch } from "redux";

import { VacationTypesDataActionType } from "../action-types";
import { VacationTypesDataAction } from "../actions";
import { logError } from "../../backendAPI";
import { add, load, update } from "../../backendAPI/vacationTypesData";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import {
  NewVacationTypeData,
  VacationTypeDataPayload,
} from "../../backendAPI/types/helperTypes";

export const addVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.ADD,
  payload,
});

export const addVacationTypesData =
  (payload: NewVacationTypeData[]) =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    try {
      const data = await add(payload);

      dispatch(addVacationTypesDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const loadVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.LOAD,
  payload,
});

export const loadVacationTypesData =
  () =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    try {
      const data = await load();

      dispatch(loadVacationTypesDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updateVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAction => ({
  type: VacationTypesDataActionType.UPDATE,
  payload,
});

export const updateVacationTypesData =
  (payload: VacationTypeDataPayload[]) =>
  async (dispatch: Dispatch<VacationTypesDataAction>): Promise<void> => {
    try {
      const data = await update(payload);

      dispatch(updateVacationTypesDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };
