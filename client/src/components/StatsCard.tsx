import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Statistic } from "antd";

interface IStatsCardProps {
  name: string;
  data: Array<number>;
  calcChange: (
    data: Array<number> | undefined
  ) => { changeDirection: boolean; percentage: number } | undefined;
}

const todaysChange = (today: number, yesterday: number) => {
  const lastChange = today - yesterday;

  return (
    <p
      style={{
        fontSize: 13,
        color: "#bbb",
        paddingTop: 10,
        margin: 0,
      }}
    >
      {lastChange.toLocaleString()} today
    </p>
  );
};

function StatsCard(props: IStatsCardProps) {
  const change = props.calcChange(props.data);

  return (
    <Col span={6}>
      <Card bordered={false}>
        <Statistic
          formatter={(value) => {
            return (
              <>
                {change?.changeDirection ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )}
                {Number(value).toFixed(2)}%
                {todaysChange(props.data.slice(-1)[0], props.data.slice(-2)[0])}
              </>
            );
          }}
          title={props.name}
          value={change?.percentage}
          precision={2}
          valueStyle={{
            color: change?.changeDirection
              ? props.name === "Recovered"
                ? "#3f8600"
                : "#cf1322"
              : props.name === "Recovered"
              ? "#cf1322"
              : "#3f8600",
          }}
        />
      </Card>
    </Col>
  );
}

export default StatsCard;
