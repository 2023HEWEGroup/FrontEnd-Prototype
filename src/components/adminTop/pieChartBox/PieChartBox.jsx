import { useTheme } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";

const PieChartBox = () => {
  const theme = useTheme();

  const data = [
    { name: "キムチ", value: 400, color: "blue" },
    { name: "カクテキ", value: 300, color: "red" },
    { name: "美味しいキムチ777", value: 300, color: "yellow" },
    { name: "Group D", value: 200, color: "green" },
    { name: "Group A", value: 4000, color: "blue" },
    { name: "Group B", value: 300, color: "red" },
    { name: "Group C", value: 1300, color: "yellow" },
    { name: "Group E", value: 200, color: "green" },
    { name: "うおおおおおおおおお", value: 400, color: "blue" },
    { name: "CODING KURU*C", value: 2000, color: "red" },
    { name: "美味しいキムチ33777", value: 300, color: "yellow" },
    { name: "うおおおおおお", value: 400, color: "blue" },
    { name: "CODING KURU*C2", value: 2000, color: "red" },
    { name: "美味しいキムチ4444", value: 300, color: "yellow" },
  ];

  return (
    <SPieChartBox>
      <STitle>商品内訳</STitle>
      <SChart>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </SChart>

      <SOptions theme={theme}>
        {data.map((item) => (
          <SOption key={item.name}>
            <SOptionName>
              <SDot style={{ backgroundColor: item.color }}></SDot>
              <SSpanName>{item.name}</SSpanName>
            </SOptionName>
            <span>{item.value}</span>
          </SOption>
        ))}
      </SOptions>
    </SPieChartBox>
  );
};

const SPieChartBox = S.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const STitle = S.div`
    width: 200px;
    font-weight: bold;
    font-size: 1.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const SChart = S.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const SOptions = S.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 14px;

    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    &:hover {
        &::-webkit-scrollbar-thumb {
            background-color: ${(props) =>
              props.theme.palette.background.scrollBar};
        }
    }
`;

const SOption = S.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: calc(33% - 10px);
    margin-bottom: 20px;
`;

const SOptionName = S.div`
    display: flex;
    gap: 10px;
    align-items: start;
`;

const SSpanName = S.span`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const SDot = S.div`
    width: 10px;
    height: 10px;
    border-radius 50%;
    flex-shrink: 0;
`;

export default PieChartBox;
