// Global imports
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Space, Table } from "antd";

// Local imports
import { StateContext } from "../App";

// Type imports
import { CountriesData } from "../types";
import { ColumnsType } from "antd/lib/table";
import { SearchOutlined } from "@ant-design/icons";

const Countries = () => {
  const [search, setSearch] = useState<string>("");
  const { state } = useContext(StateContext);

  const columns: ColumnsType<CountriesData> = [
    {
      title: "Country",
      dataIndex: "Country",
      render: (value, record) => {
        return <Link to={`/country/${record.Slug}`}>{value}</Link>;
      },
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search countries"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button type="primary" size="small" onClick={() => setSearch("")}>
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Confirmed",
      dataIndex: "TotalConfirmed",
      render: (num: number, record: CountriesData) => (
        <>
          {num.toLocaleString()}
          <br />
          <span style={{ color: "#ccc", fontSize: "90%" }}>
            {record.NewConfirmed.toLocaleString()} today
          </span>
        </>
      ),
      align: "right",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.TotalConfirmed - b.TotalConfirmed,
      width: 180,
    },
    {
      title: "Recovered",
      dataIndex: "TotalRecovered",
      render: (num: number, record: CountriesData) => (
        <>
          {num.toLocaleString()}
          <br />
          <span style={{ color: "#ccc", fontSize: "90%" }}>
            {record.NewConfirmed.toLocaleString()} today
          </span>
        </>
      ),
      align: "right",
      sorter: (a, b) => a.TotalRecovered - b.TotalRecovered,
      width: 180,
    },
    {
      title: "Deaths",
      dataIndex: "TotalDeaths",
      render: (num: number, record: CountriesData) => (
        <>
          {num.toLocaleString()}
          <br />
          <span style={{ color: "#ccc", fontSize: "90%" }}>
            {record.NewDeaths.toLocaleString()} today
          </span>
        </>
      ),
      align: "right",
      sorter: (a, b) => a.TotalDeaths - b.TotalDeaths,
      width: 180,
    },
  ];

  return (
    <>
      <h1>COVID-19 Statistics by Country</h1>
      <p>
        This table shows each country's the most recent day's and total{" "}
        <i>confirmed</i>, <i>recovered</i>, and <i>death</i> case numbers. You
        may sort the list by each case type and search countries. By clicking
        each country's name, you may view more detailed data for each country.
      </p>
      <Table
        columns={columns}
        dataSource={state.summary.data.Countries.filter(({ Country }) =>
          Country.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="CountryCode"
      />
    </>
  );
};

export default Countries;
