// Global imports
import { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Chart from "react-apexcharts";
import { AxiosResponse } from "axios";

// Local imports
import CountryStats from "./CountryStats";
import apiRequest from "../apiRequest";

// Type imports
import { ApexOptions, CountryData } from "../types";
import { Spin } from "antd";
import { StateContext } from "../App";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const lineChartOptions: ApexOptions = {
  chart: { type: "line" },
  title: {
    text: "",
  },
  colors: ["#103ac2", "#0ca30a", "#e3ad19", "#de2f40"],
  labels: [],
  stroke: {
    width: 2,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString(),
    },
  },
  xaxis: {
    labels: {
      formatter: (val: string) => new Date(val).toLocaleDateString(),
    },
    tickAmount: 20,
  },
  series: [],
};

const Country = () => {
  const { state, dispatch } = useContext(StateContext);

  console.log(state.country);

  const [country, setCountry] = useState<string>("");
  const [options, setOptions] = useState<ApexOptions>(lineChartOptions);
  const { params } = useRouteMatch<{ slug: string }>();

  useEffect(() => {
    dispatch({ type: "FETCH_COUNTRY_START" });

    apiRequest(apiURL + "/country/" + params.slug)
      .then((res: AxiosResponse<Array<CountryData>>) => {
        setCountry(res.data[0].Country);
        dispatch({ type: "FETCH_COUNTRY_SUCCESS", payload: res.data });
        setOptions((options) => ({
          ...options,
          labels: res.data.map((dayData) => dayData.Date),
          series: [
            {
              name: "Confirmed",
              data: res.data.map((day) => Number(day.Confirmed)),
            },
            {
              name: "Recovered",
              data: res.data.map((day) => Number(day.Recovered)),
            },
            {
              name: "Active",
              data: res.data.map((day) => Number(day.Active)),
            },
            {
              name: "Deaths",
              data: res.data.map((day) => Number(day.Deaths)),
            },
          ],
        }));
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_COUNTRY_ERROR",
          payload: error.data.response.errorMessage,
        });
      });
  }, [params.slug]);

  if (options.series.length === 0) {
    return (
      <div className="centered">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h1>{country}</h1>
      <p>You are viewing the COVID-19 statistics of {country}.</p>
      <CountryStats stats={options.series} />
      <h2>Daily Change Over Time</h2>
      <p>
        In this section, you can view the daily <i>confirmed</i>,{" "}
        <i>recovered</i>, <i>active</i>, and <i>death</i> cases since the first
        recorded case. If you hover over a specific date, you can see more
        detailed numbers for each case type.
      </p>
      <Chart options={options} series={options.series} height="500" />
    </>
  );
};

export default Country;
