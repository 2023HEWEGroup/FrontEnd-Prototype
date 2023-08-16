import { useTheme } from '@mui/material';
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled from 'styled-components';


const PieChartBox = () => {

    const theme = useTheme();

    const data = [
        { name: 'キムチ', value: 400, color: "blue"},
        { name: 'カクテキ', value: 300, color: "red"},
        { name: '美味しいキムチ777', value: 300, color: "yellow"},
        { name: 'Group D', value: 200, color: "green"},
        { name: 'Group A', value: 4000, color: "blue"},
        { name: 'Group B', value: 300, color: "red"},
        { name: 'Group C', value: 1300, color: "yellow"},
        { name: 'Group E', value: 200, color: "green"},
        { name: 'うおおおおおおおおお', value: 400, color: "blue"},
        { name: 'CODING KURU*C', value: 2000, color: "red"},
        { name: '美味しいキムチ33777', value: 300, color: "yellow"},
        { name: 'うおおおおおお', value: 400, color: "blue"},
        { name: 'CODING KURU*C2', value: 2000, color: "red"},
        { name: '美味しいキムチ4444', value: 300, color: "yellow"},
    ];

    return (
        <StyledPieChartBox>
            <StyledTitle>商品内訳</StyledTitle>
            <StyledChart>
                <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                <Tooltip 
                contentStyle={{backgroundColor: "white", borderRadius: "5px"}}
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
            </StyledChart>

            <StyledOptions theme={theme}>
                {data.map(item =>
                    <StyledOption key={item.name}>
                        <StyledOptionName>
                            <StyledDot style={{backgroundColor: item.color}}></StyledDot>
                            <StyledSpanName>{item.name}</StyledSpanName>
                        </StyledOptionName>
                        <span>{item.value}</span>
                    </StyledOption>
                )}
            </StyledOptions>
        </StyledPieChartBox>
    )
}


const StyledPieChartBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const StyledTitle = styled.div`
    width: 200px;
    font-weight: bold;
    font-size: 1.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledChart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const StyledOptions = styled.div`
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
            background-color: ${(props) => props.theme.palette.background.scrollBar};
        }
    }
`

const StyledOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: calc(33% - 10px);
    margin-bottom: 20px;
`

const StyledOptionName = styled.div`
    display: flex;
    gap: 10px;
    align-items: start;
`

const StyledSpanName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

const StyledDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius 50%;
    flex-shrink: 0;
`


export default PieChartBox