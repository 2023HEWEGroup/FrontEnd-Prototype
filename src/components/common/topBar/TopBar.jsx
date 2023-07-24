import { AppBar, Grid, Hidden, Toolbar, useMediaQuery } from '@mui/material';
import styled from "styled-components";
import GridLeft from './gridLeft/GridLeft';
import GridCenter from './gridCenter/GridCenter';
import GridRight from './gridright/GridRight';


const TopBar = (props) => {

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <StyledAppBar color='primary'>
      <Toolbar>
        <Grid container style={{justifyContent: "space-between"}}>

          <StyledGridLeft item xs={3} sm={3} style={{display: "flex", justifyContent: "flex-start"}} $isXsScreen={isXsScreen}>
            <GridLeft />
          </StyledGridLeft>

          <Hidden only={["xs", "sm"]}>
            <Grid item xs={6} sm={6} md={6} style={{display: "flex", justifyContent: "center"}}>
              <GridCenter />
            </Grid>
          </Hidden>

          <StyledGridRight item xs={3} sm={3} style={{display: "flex", justifyContent: "flex-end", gap: "5px"}} $isXsScreen={isXsScreen}>
            <GridRight page={props.page}/>
          </StyledGridRight>

        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}


const StyledAppBar = styled(AppBar)`
  && {
    z-index: 150;
    justify-content: center;
    height: 55px;
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