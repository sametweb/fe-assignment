// Global imports
import { Col, Row } from "antd";

// Type imports
import { ApexOptions } from "../types";
import StatsCard from "./StatsCard";

interface ICountryStatsProps {
  stats: ApexOptions["series"];
}

const calcChange = (data: Array<number> | undefined) => {
  if (data === undefined) {
    return;
  }
  const lastDayChange = data.slice(-1)[0] - data.slice(-2)[0];
  const dayBeforeChange = data.slice(-2)[0] - data.slice(-3)[0];
  const change = lastDayChange - dayBeforeChange;
  const result: { changeDirection: boolean; percentage: number } = {
    changeDirection: true,
    percentage: 0,
  };

  result.changeDirection = change > 0 ? true : false; // true for increase, false for decrease
  result.percentage = (Math.abs(change) / data.slice(-1)[0]) * 100;
  return result;
};

function CountryStats(props: ICountryStatsProps) {
  return (
    <div style={{ background: "#f1f1f2", padding: 16, marginBottom: 20 }}>
      <Row gutter={16}>
        <Col span={24}>
          <h2>Last Day's Change</h2>
          <p>
            In this section, you can see the the last day's change compared to
            the day before. The percentages are color-coded based on the
            sentiment of the data type. Increase in <i>confirmed</i>,{" "}
            <i>active</i>, and <i>death</i> cases are represented by red color,
            while increase in <i>recovered</i> cases is by green, and vice
            versa.
          </p>
        </Col>
        {props.stats.map((stats) => (
          <StatsCard
            key={stats.name}
            data={stats.data}
            name={stats.name}
            calcChange={calcChange}
          />
        ))}
      </Row>
    </div>
  );
}

export default CountryStats;
