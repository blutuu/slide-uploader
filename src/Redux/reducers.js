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

const initialStateDragDrop = {
  isDragging: false,
  isSlideDragging: false,
  droppedFiles: [],
  filesAdded: 0,
  savedFiles: [],
  deletedFiles: [],
  selectedSlide: {},
  isSlideDeleted: false,
  publishToggle: false,
  error: "",
  reset: false,
};

export const slideReducer = (state = initialStateDragDrop, action = {}) => {
  switch (action.type) {
    case SET_DRAG:
      return { ...state, isDragging: action.payload };

    case SET_SLIDE_DRAG:
      return { ...state, isSlideDragging: action.payload };

    case PROCESS_FILE_DROP_SUCCESS:
      return {
        ...state,
        isDragging: false,
        droppedFiles: [...state.droppedFiles, ...action.payload],
        filesAdded: state.filesAdded + action.payload.length,
        error: "",
      };

    case PROCESS_FILE_DROP_FAILED:
      return { ...state, isDragging: false, error: action.payload.message };

    case UPDATE_SLIDE_FILES:
      return { ...state, droppedFiles: action.payload };

    case UPDATE_SLIDE_POSITION:
      return { ...state, droppedFiles: action.payload };

    case UPDATE_SAVED_FILES:
      return { ...state, savedFiles: action.payload };

    case SET_SELECTED_SLIDE:
      return { ...state, selectedSlide: action.payload };

    case DELETE_SLIDE:
      return {
        ...state,
        droppedFiles: action.payload[0],
        deletedFiles: action.payload[1],
      };

    case UPDATE_DELETED_SLIDES:
      return { ...state, deletedFiles: action.payload };

    case SET_SLIDE_DELETED:
      return { ...state, isSlideDeleted: action.payload };

    case SET_RESET:
      return { ...state, filesAdded: 0, reset: action.payload };

    case SET_PUBLISH_TOGGLE:
      return { ...state, publishToggle: !state.publishToggle };

    default:
      return state;
  }
};
