# COVID-19 Tracker App

This application consumes the covid19api.com's API for tracking the worldwide COVID-19 statistics.

## Overview

In the homepage, user can click the "Fetch Data" button to retrieve the most recent statistics for each country. The data table can be sorted by confirmed, recovered, and death case numbers. User can also search countries by name.

User can click any country's name and view more detailed data for the specific country.

In the single country view, user can easily see the recent confirmed, recovered, active, and death case numbers in the table and the recent changes in those numbers. In the chart that comes right after the initial data table, user can view the day-by-day data for the country since first recorded case.

## Installation

1. Download this repository

```
git clone https://github.com/sametweb/fe-assignment.git
```

2. Install packages for back-end application. In the main project directory:

```
cd server
npm install
```

3. Start back-end application

```
npm start
```

4. Install packages for front-end application. In the main project directory:

```
cd client
npm install
```

5. Start front-end application

```
npm start
```

## Front-end Application

Visualizes the data received from the back-end application.

### Frameworks and Libraries

TypeScript, React, React Router, Apex Charts, Ant Design

### Future Improvements

User might want to compare two countries' statistics. In the company detail component, a dropdown list of other countries can be added which fetches the newly selected country's data and adds on top of the current country's table as a line chart with different colors.

Currently the API returns daily total case numbers for each country. This data can be re-worked and daily changes in case numbers can be re-produced from the existing data. Each day's case numbers can be subtracted from the previous day's numbers and be represented in either a line chart or a candlestick chart for more accureate trend analysis. The trend can be read from the curves of the line chart; however, the change in daily numbers would give a better representation of the overall trend.

## Back-end Application

A simple server that connects to covid19api.com and returns the requested data based on requested endpoints.

### Frameworks and Libraries

Node.js, Express.js, node-fetch

### Future Improvements

Currently, the back-end application makes a new request to covid19api.com every time user visits an endpoint. We know the remote server updates the data on a daily basis. Our API can cache the data until it's time for new data in the remote server. That way, our application would perform better and use less resources.

### Endpoints

| Method | URL            | Response                                                                                                                                                       |
| ------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /summary       | Returns global statistics for both total numbers and individual country numbers. See `SummaryResponseType                                                      |
| GET    | /country/:slug | Returns more detailed statistics for the specific country. `slug` comes from the country names that are received in the `/summary` endpoint. See `CountryData` |

#### Summary Response Type

```typescript
interface SummaryResponseType {
  Message: string;
  Global: GlobalData;
  Countries: Array<CountriesData>;
  Date: string;
}

interface GlobalData {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
}

interface CountriesData {
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
```

#### Country Response Type

```typescript
interface CountryData {
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
```
