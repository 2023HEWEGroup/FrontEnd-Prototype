import { AccountCircle, AdsClick, AttachMoney, CurrencyExchange, FolderShared, Inventory2 } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import PieChartBox from '../../components/adminTop/pieChartBox/PieChartBox';
import ChartBox from '../../components/adminTop/chartBox/ChartBox';
import TopBox from '../../components/adminTop/topBox/TopBox';


const AdminTop = () => {

    const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isMiddleScreen = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const chartDataUser = {
        color: "blue",
        icon: <AccountCircle />,
        title: "ユーザー数",
        number: 99999,
        dataKey: "users",
        percentage: 55,
        chartData: [
            {name: "日", users: 35},
            {name: "月", users: 29},
            {name: "火", users: 30},
            {name: "水", users: 15},
            {name: "木", users: 21},
            {name: "金", users: 11},
            {name: "土", users: 55},
        ]
    }
    const chartDataProduct = {
        color: "red",
        icon: <Inventory2 />,
        title: "商品数",
        number: 2746999999,
        dataKey: "products",
        percentage: -78,
        chartData: [
            {name: "日", products: 35},
            {name: "月", products: 29},
            {name: "火", products: 30},
            {name: "水", products: 15},
            {name: "木", products: 21},
            {name: "金", products: 11},
            {name: "土", products: 55},
        ]
    }
    const chartDataGroup = {
        color: "yellow",
        icon: <FolderShared />,
        title: "グループ数",
        number: 50,
        dataKey: "groups",
        percentage: 27,
        chartData: [
            {name: "日", groups: 35},
            {name: "月", groups: 29},
            {name: "火", groups: 30},
            {name: "水", groups: 15},
            {name: "木", groups: 21},
            {name: "金", groups: 11},
            {name: "土", groups: 55},
        ]
    }
    const chartDataTrade = {
        color: "green",
        icon: <CurrencyExchange />,
        title: "取引数",
        number: 500,
        dataKey: "trades",
        percentage: 90,
        chartData: [
            {name: "日", trades: 35},
            {name: "月", trades: 29},
            {name: "火", trades: 30},
            {name: "水", trades: 15},
            {name: "木", trades: 21},
            {name: "金", trades: 11},
            {name: "土", trades: 55},
        ]
    }
    const chartDataAdvertisement = {
        color: "purple",
        icon: <AdsClick />,
        title: "広告数",
        number: 780,
        dataKey: "ads",
        percentage: -10,
        chartData: [
            {name: "日", ads: 35},
            {name: "月", ads: 29},
            {name: "火", ads: 30},
            {name: "水", ads: 15},
            {name: "木", ads: 21},
            {name: "金", ads: 11},
            {name: "土", ads: 55},
        ]
    }
    const chartDataBenefit = {
        color: "pink",
        icon: <AttachMoney />,
        title: "収益",
        number: 0,
        dataKey: "benefits",
        percentage: 90000000000000000,
        chartData: [
            {name: "日", benefits: 35},
            {name: "月", benefits: 29},
            {name: "火", benefits: 30},
            {name: "水", benefits: 15},
            {name: "木", benefits: 21},
            {name: "金", benefits: 11},
            {name: "土", benefits: 55},
        ]
    }

    return (
        <StyledAdminTop $isLargeScreen={isLargeScreen} $isMiddleScreen={isMiddleScreen} $isSmallScreen={isSmallScreen}>
            <StyledBox1 theme={theme}>
                <TopBox />
            </StyledBox1>
            <StyledBox2 theme={theme}>
                <ChartBox {...chartDataUser}/>
            </StyledBox2>
            <StyledBox3 theme={theme}>
                <ChartBox {...chartDataProduct}/>
            </StyledBox3>
            <StyledBox4 theme={theme}>
                <PieChartBox />
            </StyledBox4>
            <StyledBox5 theme={theme}>
                <ChartBox {...chartDataTrade}/>
            </StyledBox5>
            <StyledBox6 theme={theme}>
                <ChartBox {...chartDataGroup}/>
            </StyledBox6>
            <StyledBox7 theme={theme} $isSmallScreen={isSmallScreen}>
                <ChartBox {...chartDataAdvertisement}/>
            </StyledBox7>
            <StyledBox8 theme={theme} $isSmallScreen={isSmallScreen}>
                <ChartBox {...chartDataBenefit}/>
            </StyledBox8>
        </StyledAdminTop>
    )
}


const StyledAdminTop = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: ${(props) => (props.$isSmallScreen ? "repeat(1, calc(100% - 20px))" : (props.$isMiddleScreen ? "repeat(2, calc(50% - 20px))" : (props.$isLargeScreen ? "repeat(3, calc(33% - 20px))" : "repeat(4, calc(25% - 20px))")))};
    grid-auto-rows: minmax(180px, auto);
    max-width: 3000px;
    margin: 0 auto;
`

const StyledBox1 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    grid-column: span 1;
    grid-row: span 3;
`

const StyledBox2 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledBox3 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledBox4 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
    grid-column: span 1;
    grid-row: span 3
`

const StyledBox5 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledBox6 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledBox7 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`

const StyledBox8 = styled.div`
    padding: 20px;
    color: ${(props) => props.theme.palette.text.main};
    border-radius: 10px;
    border: solid 1px ${(props) => props.theme.palette.line.disable};
`


export default AdminTop