// Type imports
import { ActionType, StateType } from "../types";

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "FETCH_SUMMARY_START":
      return {
        ...state,
        summary: { ...state.summary, loading: true, error: "" },
      };
    case "FETCH_SUMMARY_SUCCESS":
      return {
        ...state,
        summary: { ...state.summary, data: action.payload, loading: false },
      };
    case "FETCH_SUMMARY_ERROR":
      return {
        ...state,
        summary: {
          ...state.summary,
          loading: false,
          error: action.payload,
        },
      };
    case "FETCH_COUNTRY_START":
      return {
        ...state,
        country: { ...state.country, loading: true, error: "" },
      };
    case "FETCH_COUNTRY_SUCCESS":
      return {
        ...state,
        country: { ...state.country, data: action.payload, loading: false },
      };
    case "FETCH_COUNTRY_ERROR":
      return {
        ...state,
        country: {
          ...state.country,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
export default reducer;
