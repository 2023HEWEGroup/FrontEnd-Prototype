import { Avatar, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
const ChartBox = (props) => {
  const theme = useTheme();

  return (
    <SChartBox>
      <SBoxInfo>
        <STitle>
          <div style={{ width: "30px", height: "30px", flexShrink: 0 }}>
            <Avatar
              sx={{ bgcolor: props.color, width: "100%", height: "100%" }}
            >
              {props.icon}
            </Avatar>
          </div>
          <SSpan>{props.title}</SSpan>
        </STitle>
        <SNum>{props.number}</SNum>
        <Link
          to="/home"
          style={{
            color: props.color,
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          すべて見る
        </Link>
      </SBoxInfo>
      <SChartInfo>
        <SChart>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.opacity,
                  border: "none",
                }}
                labelStyle={{ display: "none" }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </SChart>
        <SDesc>
          <SPercentage
            style={{ color: props.percentage > 0 ? "limegreen" : "tomato" }}
          >
            {props.percentage}%
          </SPercentage>
          <SDuration>過去7日</SDuration>
        </SDesc>
      </SChartInfo>
    </SChartBox>
  );
};

const SChartBox = styled.div`
  display: flex;
  height: 100%;
`;

const SBoxInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SChartInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SNum = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SSpan = styled.span``;

const SChart = styled.div`
  width: 100%;
  height: 100%;
`;

const SDesc = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const SPercentage = styled.span`
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SDuration = styled.span`
  font-size: 14px;
`;

export default ChartBox;
