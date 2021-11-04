import { Dispatch } from "redux";

import { VacationTypesDataActionType } from "../action-types";
import {
  VacationTypesDataAddAction,
  VacationTypesDataLoadAction,
  VacationTypesDataUpdateAction,
} from "../actions";
import { logError } from "../../backendAPI";
import { add, load } from "../../backendAPI/vacationTypesData";
// eslint-disable-next-line max-len
import { VacationTypesDataSchema as VacationTypesData } from "../../backendAPI/types/vacationTypesData.schema";
import {
  NewVacationTypeData,
  VacationTypeDataPayload,
} from "../utils/vacationTypesData";

export const addVacationTypesDataAction = (
  payload: VacationTypesData
): VacationTypesDataAddAction => ({
  type: VacationTypesDataActionType.ADD,
  payload,
});

export const addVacationTypesData =
  (payload: NewVacationTypeData[]) =>
  async (dispatch: Dispatch<VacationTypesDataAddAction>): Promise<void> => {
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
): VacationTypesDataLoadAction => ({
  type: VacationTypesDataActionType.LOAD,
  payload,
});

export const loadVacationTypesData =
  () =>
  async (dispatch: Dispatch<VacationTypesDataLoadAction>): Promise<void> => {
    try {
      const data = await load();

      dispatch(loadVacationTypesDataAction(data));
    } catch (error) {
      // TODO:#i# add snackbar
      logError(error as Error);
    }
  };

export const updateVacationTypesDataAction = (
  payload: VacationTypeDataPayload[]
): VacationTypesDataUpdateAction => ({
  type: VacationTypesDataActionType.UPDATE,
  payload,
});

export const updateVacationTypesData =
  (payload: VacationTypeDataPayload[]) =>
  (dispatch: Dispatch<VacationTypesDataUpdateAction>): void => {
    dispatch(updateVacationTypesDataAction(payload));
  };
