import { Avatar, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled from 'styled-components'


const ChartBox = (props) => {

    const theme = useTheme();

    return (
        <StyledChartBox>
            <StyledBoxInfo>
                <StyledTitle>
                    <div style={{width: "30px", height: "30px", flexShrink: 0}}>
                        <Avatar sx={{ bgcolor: props.color, width: "100%", height: "100%" }}>{props.icon}</Avatar>
                    </div>
                    <StyledSpan>{props.title}</StyledSpan>
                </StyledTitle>
                <StyledNum>{props.number}</StyledNum>
                <Link to="/home" style={{color: props.color, textDecoration: "none", fontSize: "14px"}}>すべて見る</Link>
            </StyledBoxInfo>
            <StyledChartInfo>
                <StyledChart>
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData}>
                            <Tooltip 
                            contentStyle={{
                                backgroundColor: theme.palette.background.opacity,
                                border: "none"
                            }}
                            labelStyle={{display: "none"}}
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
                </StyledChart>
                <StyledDesc>
                    <StyledPercentage style={{color: props.percentage > 0 ? "limegreen" : "tomato"}}>{props.percentage}%</StyledPercentage>
                    <StyledDuration>過去7日</StyledDuration>
                </StyledDesc>
            </StyledChartInfo>
        </StyledChartBox>
    )
}


const StyledChartBox = styled.div`
    display: flex;
    height: 100%;
`

const StyledBoxInfo = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const StyledChartInfo = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const StyledTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const StyledNum = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledSpan = styled.span`

`

const StyledChart = styled.div`
    width: 100%;
    height: 100%;
`

const StyledDesc = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`

const StyledPercentage = styled.span`
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const StyledDuration = styled.span`
    font-size: 14px;
`


export default ChartBox