import { AppBar, Grid, Hidden, Toolbar, useMediaQuery } from '@mui/material';
import styled from "styled-components";
import GridLeft from './gridLeft/GridLeft';
import GridCenter from './gridCenter/GridCenter';
import GridRight from './gridright/GridRight';
import { useSelector } from 'react-redux';


const TopBar = (props) => {

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isSideOpen = useSelector((state => state.floatSideBar.value));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isScrollable = useSelector((state => state.windowScrollable.value));

  return (
    <StyledAppBar color='primary' $isSideOpen={isSideOpen} $isSmallScreen={isSmallScreen} $isScrollable={isScrollable}>
      <Toolbar>
        <Grid container style={{justifyContent: "space-between"}}>

          <StyledGridLeft item xs={3} sm={3} style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}} $isXsScreen={isXsScreen}>
            <GridLeft />
          </StyledGridLeft>

          <Hidden only={["xs", "sm"]}>
            <Grid item xs={6} sm={6} md={6} style={{display: "flex", justifyContent: "center"}}>
              <GridCenter setIsImagePopper={props.setIsImagePopper}/>
            </Grid>
          </Hidden>

          <StyledGridRight item xs={3} sm={3} style={{display: "flex", justifyContent: "flex-end", gap: "5px"}} $isXsScreen={isXsScreen}>
            <GridRight />
          </StyledGridRight>

        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}


const StyledAppBar = styled(AppBar)`
  && {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
    justify-content: center;
    height: 55px;
    width: calc(100vw - 10px);
    box-shadow: none;
  }
`;

const StyledGridLeft = styled(Grid)`
  &&& {
    margin-left: ${(props) => (props.$isXsScreen ? "8px" : 0)};
  }
`

const StyledGridRight = styled(Grid)`
  &&& {
    margin-right: ${(props) => (props.$isXsScreen ? "8px" : 0)};
  }
`


export default TopBar