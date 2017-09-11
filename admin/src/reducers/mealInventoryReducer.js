import {
  FETCH_CATEGORIES,
  FETCH_MEAL_TYPES,
  FETCH_NUTRITION,
  FETCH_INGREDIENTS,
  ADD_NEW_MEAL,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, error: '', allCategories: action.payload };
    case FETCH_MEAL_TYPES:
      return { ...state, allMealTypes:action.payload };
    case FETCH_NUTRITION:
        return { ...state, error:'', allNutritions:action.payload };
    case FETCH_INGREDIENTS:
        return { ...state, error:'', allIngredients:action.payload };
    case ADD_NEW_MEAL:
      return { ...state, error:'', meal:action.payload };
    case FETCH_OFFERS:
      return { ...state, products:action.payload };
  }
  return state;
}
