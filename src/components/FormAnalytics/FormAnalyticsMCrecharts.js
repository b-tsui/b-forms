import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

/*
format of question data coming in through props
question: {
  id
  question
  questionType
  options
  answers {
    id
    answer
  }
}
*/
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function FormAnalyticsMCrecharts({ question }) {
  const [state, setState] = useState({
    checked: false,
  });
  let answerCounts = {}; //creates answer count for each option
  let data = [];
  let data1 = [];
  question.answers.forEach((answer) => {
    answerCounts[answer.answer] = (answerCounts[answer.answer] || 0) + 1;
  });
  for (let [option, count] of Object.entries(answerCounts)) {
    data.push({ name: option, count: count });
    data1.push({ name: option, value: count });
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <div className="form-analytics-text-title">{question.question}</div>
      <div>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Bar Chart</Grid>
            <Grid item>
              <Switch
                checked={state.checked}
                onChange={handleChange}
                name="checked"
                color="primary"
              />
            </Grid>
            <Grid item>Pie Chart</Grid>
          </Grid>
        </Typography>
      </div>
      {data.length === 0 && "no responses yet"}
      {data.length > 0 && !state.checked && (
        <div className="analytics-graph">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {data.length > 0 && state.checked && (
        <div className="analytics-graph">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data1}
                // cx={300}
                // cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                // outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
