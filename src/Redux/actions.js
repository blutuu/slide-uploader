import { dropHandler } from "../Utility/handlers";
import {
  SET_DRAG,
  SET_SLIDE_DRAG,
  PROCESS_FILE_DROP_SUCCESS,
  PROCESS_FILE_DROP_FAILED,
} from "./constants";

export const setDrag = (value) => ({
  type: SET_DRAG,
  payload: value,
});

export const setSlideDrag = (value) => ({
  type: SET_SLIDE_DRAG,
  payload: value,
});

export const processDrop = (event, dispatch) =>
  dropHandler(event)
    .then((data) =>
      dispatch({
        type: PROCESS_FILE_DROP_SUCCESS,
        payload: data,
      })
    )
    .catch((error) =>
      dispatch({
        type: PROCESS_FILE_DROP_FAILED,
        payload: error,
      })
    );
