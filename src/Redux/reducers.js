import {
  SET_DRAG,
  SET_SLIDE_DRAG,
  PROCESS_FILE_DROP_SUCCESS,
  PROCESS_FILE_DROP_FAILED,
  UPDATE_SLIDE_FILES,
} from "./constants";

const initialStateDragDrop = {
  isDragging: false,
  isSlideDragging: false,
  droppedFiles: [],
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
      });

    case PROCESS_FILE_DROP_FAILED:
      return Object.assign({}, state, {
        isDragging: false,
        error: action.payload,
      });

    case UPDATE_SLIDE_FILES:
      return Object.assign({}, state, {
        droppedFiles: action.payload,
      });

    default:
      return state;
  }
};
