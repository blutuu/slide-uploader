import { dropHandler } from "../Utility/handlers";
import {
  SET_DRAG,
  SET_SLIDE_DRAG,
  PROCESS_FILE_DROP_SUCCESS,
  PROCESS_FILE_DROP_FAILED,
  UPDATE_SLIDE_FILES,
  UPDATE_SAVED_FILES,
  SET_SELECTED_SLIDE,
  DELETE_SLIDE,
  SET_SLIDE_DELETED,
  UPDATE_SLIDE_POSITION,
  UPDATE_DELETED_SLIDES,
  SET_RESET,
  SET_PUBLISH_TOGGLE,
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

export const updateSlideFiles = (value) => ({
  type: UPDATE_SLIDE_FILES,
  payload: value,
});

export const updateSlidePosition = (value) => ({
  type: UPDATE_SLIDE_POSITION,
  payload: value,
});

export const updateSavedFiles = (value) => ({
  type: UPDATE_SAVED_FILES,
  payload: value,
});

export const setSelectedSlide = (value) => ({
  type: SET_SELECTED_SLIDE,
  payload: value,
});

export const deleteSlide = (value) => ({
  type: DELETE_SLIDE,
  payload: value,
});

export const updateDeletedSlides = (value) => ({
  type: UPDATE_DELETED_SLIDES,
  payload: value,
});

export const setSlideDeleted = (value) => ({
  type: SET_SLIDE_DELETED,
  payload: value,
});

export const setReset = (value) => ({
  type: SET_RESET,
  payload: value,
});

export const setPublishToggle = (value) => ({
  type: SET_PUBLISH_TOGGLE,
  payload: value,
});
