import {
    ADD_CATEGORY,
    ADD_MEAL_TYPE
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case ADD_CATEGORY:
      return { ...state, error: '', allCategories: action.payload };
    case ADD_MEAL_TYPE:
      return { ...state, allTypes:action.payload };
  }
  return state;
}
