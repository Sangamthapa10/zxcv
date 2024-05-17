import React from "react";
import { useGlobalContext } from "../Context";
import {
  Bar,
  BarChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./CSS/StatComponents.css";
import { useMediaQuery } from "@material-ui/core";

function StayBar() {
  const barColors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#556B2F",
    "#6495ED",
    "#8B008B",
    "#BC8F8F",
  ];

  const { chartdata } = useGlobalContext();

  let date = new Date();
  let currentmonth = date.getMonth();

  const formatXAxis = (tickItem) => {
    let q = new Date(2018, tickItem - 1, 1);
    let a = q.toDateString();
    let b = a.split("")[4] + a.split("")[5] + a.split("")[6];
    return b;
  };
  const formatXAxi = (tickItem) => {
    let a = tickItem > 6 ? "GTE 6" : tickItem;
    return a + "day";
  };
  const formatYAxi = (tickItem) => {
    let a = tickItem > 6 ? "GTE 6" : tickItem;
    return a + "day";
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          style={{
            background: "#fff",
            padding: "20px",
            border: "1px solid black",
          }}
        >
          <p>
            Total Stays : {payload[0].payload.d > 7 ? 7 : payload[0].payload.d}
          </p>
        </div>
      );
    }
    return null;
  };
  const smalldevice = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <div className="chart">
        <div className="chart_header">
          This Month Earning
          {chartdata.month_full_details
            .filter((swine) => swine.month_no === currentmonth + 1)
            .map((mapped, i) => {
              return <h1 key={i + 1}>NPR {mapped.total_price}</h1>;
            })}
        </div>

        <div className="mearn_chart">
          <h3 className="title_text">Monthly Earning chart</h3>
          <ResponsiveContainer
            width={smalldevice ? "95%" : "90%"}
            height={smalldevice ? 200 : 400}
          >
            <AreaChart data={chartdata.month_full_details}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                axisLine={false}
                tickLine={false}
                dataKey="month_no"
                tickFormatter={formatXAxis}
              />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="total_price"
                stroke="#2451B7"
                fill="url(#color)"
                activeDot={{
                  stroke: "#white",
                  strokeWidth: 4,
                  r: 8,
                  fill: "#ff5f4a",
                }}
                dot={{ stroke: "#44c0ff", strokeWidth: 4, r: 2, fill: "blue" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ marginTop: "2vh" }} className="chart">
        <h1 className="title_text">Guest day stayed</h1>
        <ResponsiveContainer
          width={smalldevice ? "95%" : "90%"}
          height={smalldevice ? 200 : 400}
        >
          <BarChart data={chartdata.stay}>
            <CartesianGrid opacity={0.6} vertical={false} stroke="#222222" />
            <XAxis dataKey="d" tickFormatter={formatXAxi} />
            <YAxis
              dataKey="d"
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={40}
              tickYFormatter={formatYAxi}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar barSize={30} dataKey="day" fill="#8884d8">
              {chartdata.stay.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StayBar;
