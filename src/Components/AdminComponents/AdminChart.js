import React from "react";
import { useGlobalContext } from "../Context";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./CSS/AdminNav.css";
import { useMediaQuery } from "@material-ui/core";
const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
const COLORS = ["green", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      stroke="none"
      alignmentBaseline="middle"
      className="recharts-text recharts-pie-label-text"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function AdminChart() {
  const { chartdata } = useGlobalContext();

  const formatXAxis = (tickItem) => {
    let q = new Date(tickItem);
    let a = q.toDateString();
    let b = a.split("")[4] + a.split("")[5] + a.split("")[6];
    return b;
  };
  const smalldevice = useMediaQuery("(max-width:600px)");

  return (
    <div className="chart_container_body">
      <div className="chart_container">
        <div className="chart">
          <h1 className="title_text">Booking Chart</h1>
          <ResponsiveContainer
            width={smalldevice ? "95%" : "90%"}
            height={smalldevice ? 200 : 400}
          >
            <AreaChart
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              data={chartdata.month_full_details.sort((a, b) => {
                return a.month_no - b.month_no;
              })}
            >
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid opacity={0.8} vertical={false} />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="monthly_details"
                tickFormatter={formatXAxis}
              />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area
                dataKey="count"
                fill="url(#color)"
                activeDot={{
                  stroke: "#white",
                  strokeWidth: 4,
                  r: 8,
                  fill: "#ff5f4a",
                }}
                dot={{
                  stroke: "#44c0ff",
                  strokeWidth: 4,
                  r: 2,
                  fill: "blue",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h1 className="title_text">Users Rating</h1>
          <div style={{ placeSelf: "center" }}>
            <ResponsiveContainer
              width={smalldevice ? 300 : 300}
              height={smalldevice ? 300 : 300}
            >
              <PieChart>
                <Pie
                  data={chartdata.rating}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="r"
                >
                  {chartdata.rating.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart" style={{ padding: "0 0 0 20px" }}>
            <div className="pie_down">
              <div style={{ display: "flex" }}>
                <div className="five square"></div>
                <p style={{ paddingLeft: "5px" }}>5 Star</p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="four square"></div>
                <p style={{ paddingLeft: "5px" }}>4 Star</p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="three square"></div>
                <p style={{ paddingLeft: "5px" }}>3 Star</p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="two square"></div>
                <p style={{ paddingLeft: "5px" }}>2 Star</p>
              </div>
              <div style={{ display: "flex" }}>
                <div className="ones square"></div>
                <p style={{ paddingLeft: "5px" }}>1 Star</p>
              </div>
            </div>
          </div>
        </div>

        {/* <ResponsiveContainer width="80%" height={400}>
        <AreaChart data={year}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="red" stopOpacity={0.4} />
              <stop offset="75%" stopColor="black" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid opacity={0.1} vertical={false} />

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="c"
            stroke="#2451B7"
            fill="url(#color)"
            activeDot={{
              stroke: "#white",
              strokeWidth: 6,
              r: 8,
              fill: "#ff5f4a",
            }}
            dot={{ stroke: "#44c0ff", strokeWidth: 4, r: 2, fill: "blue" }}
          />
        </AreaChart>
      </ResponsiveContainer> */}
      </div>
    </div>
  );
}

// function CustomTooltip({ active, payload, label }) {
//   if (active) {
//     return (
//       <div className="tooltip">
//         <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
//         <p>${payload[0].value.toFixed(2)} CAD</p>
//       </div>
//     );
//   }
//   return null;
// }
export default AdminChart;
