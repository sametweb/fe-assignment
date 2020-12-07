export interface GlobalData {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

export interface CountriesData {
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
  Premium: {};
}

export interface CountryData {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

export interface SummaryResponseType {
  Message: string;
  Global: GlobalData;
  Countries: Array<CountriesData>;
  Date: string;
}

export interface StateType {
  summary: {
    data: SummaryResponseType;
    loading: boolean;
    error: string;
  };
  country: {
    data: Array<CountryData>;
    loading: boolean;
    error: string;
  };
}

export type Actions =
  | "FETCH_SUMMARY_START"
  | "FETCH_SUMMARY_SUCCESS"
  | "FETCH_SUMMARY_ERROR"
  | "FETCH_COUNTRY_START"
  | "FETCH_COUNTRY_SUCCESS"
  | "FETCH_COUNTRY_ERROR";

export interface ActionType {
  type: Actions;
  payload?: any;
}

// https://github.com/apexcharts/apexcharts.js/issues/24#issuecomment-412056289
export interface ApexOptions {
  yaxis: {};
  xaxis: {};
  chart: {
    width?: string | number;
    height?: string | number;
    type: string;
    foreColor?: string;
  };
  title: {
    text: string;
  };
  plotOptions?: {
    radialBar?: {
      offsetY?: number;
      startAngle?: number;
      endAngle?: number;
      hollow?: {
        margin: number;
        size: string;
        background: string;
        image: string | undefined;
      };
      track?: {
        show: boolean;
      };
      dataLabels?: {
        showOn?: string;
        name?: {
          show: boolean;
        };
        value?: {
          show: boolean;
        };
      };
    };
    circle?: {
      track?: {
        show: boolean;
      };
      dataLabels: {
        showOn?: string;
        name?: {
          show: boolean;
        };
        value?: {
          show: boolean;
        };
      };
    };
    pie?: {
      size?: undefined;
      donut?: {
        size?: string;
        background?: string;
      };
      customScale?: number;
      offsetX?: number;
      offsetY?: number;
      dataLabels?: {
        offset?: number;
      };
    };
  };
  colors?: string[];
  series: Array<{ name: string; data: Array<number> }>;
  labels?: string[];
  stroke?: {
    show?: boolean;
    curve?:
      | "smooth"
      | "straight"
      | "stepline"
      | Array<"smooth" | "straight" | "stepline">;
    lineCap?: "butt" | "square" | "round";
    colors?: Array<string>;
    width?: number | Array<number>;
    dashArray?: number | Array<number>;
  };
  legend?: {
    show?: boolean;
    floating?: boolean;
    fontSize?: string;
    position?: string;
    verticalAlign?: string;
    textAnchor?: string;
    labels?: {
      useSeriesColors: boolean;
    };
    markers?: {
      size: number;
    };
    formatter?: Function;
    itemMargin?: {
      vertical: number;
    };
    containerMargin?: {
      left: number;
      top: number;
    };
  };
}
