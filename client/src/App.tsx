// Global imports
import { createContext, useReducer } from "react";
import { Route } from "react-router-dom";
import Axios from "axios";
import { Button, Spin } from "antd";

// Local imports
import reducer from "./context/reducer";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Header from "./components/Header";

// Type imports
import { ActionType, StateType } from "./types";
import { Dispatch } from "react";

const __initialState = {
  summary: {
    data: {
      Message: "",
      Global: {
        NewConfirmed: 0,
        TotalConfirmed: 0,
        NewDeaths: 0,
        TotalDeaths: 0,
        NewRecovered: 0,
        TotalRecovered: 0,
      },
      Countries: [
        {
          Country: "",
          CountryCode: "",
          Slug: "",
          NewConfirmed: 0,
          TotalConfirmed: 0,
          NewDeaths: 0,
          TotalDeaths: 0,
          NewRecovered: 0,
          TotalRecovered: 0,
          Date: "",
          Premium: {},
        },
      ],
      Date: "",
    },
    loading: false,
    error: "",
  },
  country: {
    data: [],
    loading: false,
    error: "",
  },
};

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const StateContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: __initialState,
  dispatch: () => ({}),
});

function App() {
  const [state, dispatch] = useReducer(reducer, __initialState);

  const fetchSummaryData = async () => {
    dispatch({ type: "FETCH_SUMMARY_START" });

    try {
      const summaryResponse = await Axios.get(apiURL + "/summary");
      dispatch({
        type: "FETCH_SUMMARY_SUCCESS",
        payload: summaryResponse.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_SUMMARY_ERROR",
        payload: error.response.data.errorMessage,
      });
    }
  };

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div style={{ height: "100%", width: 900, margin: "0 auto" }}>
        <Route path="/" component={Header} />
        <Route path="/" exact>
          {state.summary.data.Date ? (
            <Countries />
          ) : (
            <div className="centered">
              {state.summary.loading ? (
                <Spin size="large" />
              ) : (
                <Button
                  type="primary"
                  block
                  onClick={fetchSummaryData}
                  disabled={state.summary.loading}
                >
                  Fetch Data
                </Button>
              )}
            </div>
          )}
        </Route>
        <Route path="/country/:slug" component={Country} />
      </div>
    </StateContext.Provider>
  );
}

export default App;
