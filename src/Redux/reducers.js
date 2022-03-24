import {
  SET_DRAG,
  PROCESS_FILE_DROP_SUCCESS,
  PROCESS_FILE_DROP_FAILED,
} from "./constants";

const initialStateDragDrop = {
  isDragging: false,
  droppedFiles: [],
  error: "",
};

export const handleDrop = (state = initialStateDragDrop, action = {}) => {
  switch (action.type) {
    case SET_DRAG:
      return Object.assign({}, state, {
        isDragging: action.payload,
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

    default:
      return state;
  }
};
