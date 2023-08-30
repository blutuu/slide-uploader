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
} from "./constants";

const initialStateDragDrop = {
  isDragging: false,
  isSlideDragging: false,
  droppedFiles: [],
  savedFiles: [],
  selectedSlide: {},
  isSlideDeleted: false,
  error: "",
};

export const slideReducer = (state = initialStateDragDrop, action = {}) => {
  switch (action.type) {
    case SET_DRAG:
      return Object.assign({}, state, {
        isDragging: action.payload,
      });

    case SET_SLIDE_DRAG:
      return Object.assign({}, state, {
        isSlideDragging: action.payload,
      });

    case PROCESS_FILE_DROP_SUCCESS:
      return Object.assign({}, state, {
        isDragging: false,
        droppedFiles: [...state.droppedFiles, ...action.payload],
        error: "",
      });

    case PROCESS_FILE_DROP_FAILED:
      return Object.assign({}, state, {
        isDragging: false,
        error: action.payload.message,
      });

    case UPDATE_SLIDE_FILES:
      return Object.assign({}, state, {
        droppedFiles: action.payload,
      });

    case UPDATE_SAVED_FILES:
      return Object.assign({}, state, {
        savedFiles: action.payload,
      });

    case SET_SELECTED_SLIDE:
      return Object.assign({}, state, {
        selectedSlide: action.payload,
      });

    case DELETE_SLIDE:
      return Object.assign({}, state, { droppedFiles: action.payload });

    case SET_SLIDE_DELETED:
      return Object.assign({}, state, { isSlideDeleted: action.payload });

    default:
      return state;
  }
};
