import { combineReducers } from "redux";
import produce from "immer";
import { ADD_FIELD, EDIT_FIELD } from "./actions";
import { iField } from "./App";

function fieldReducer(state: iField[] = [], action: any) {
  return produce(state, draft => {
    switch (action.type) {
      case "START":
        return [...action.fields];
      case "RESET":
        return [];
      case ADD_FIELD:
        return [...state, action.field];
      case "DELETE_FIELD":
        return state.filter((field: iField) => field.id !== action.fieldId);
      case EDIT_FIELD:
        const index = draft.findIndex(({ id }) => id === action.field.id);
        console.log("index", index, action.field);
        draft[index] = action.field;
        break;
      default:
        return state;
    }
  });
}

function itemReducer(state: any[] = [], action: any) {
  switch (action.type) {
    case "START":
      return [...state, ...action.items];
    case "RESET":
      return [];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  fields: fieldReducer,
  items: itemReducer
});

export default rootReducer;
