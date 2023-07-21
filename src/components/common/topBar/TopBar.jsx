import { AppBar, Grid, Hidden, Toolbar } from '@mui/material';
import styled from "styled-components";
import GridLeft from './gridLeft/GridLeft';
import GridCenter from './gridCenter/GridCenter';
import GridRight from './gridright/GridRight';


const TopBar = (props) => {

  return (
    <StyledAppBar color='primary'>
      <Toolbar>
        <Grid container style={{justifyContent: "space-between"}}>

          <StyledGrid item xs={3} sm={3}>
            <GridLeft />
          </StyledGrid>

          <Hidden only={["xs", "sm"]}>
            <StyledGrid item xs={6}>
              <GridCenter />
            </StyledGrid>
          </Hidden>

          <StyledGrid item xs={3} sm={3}>
            <GridRight page={props.page}/>
          </StyledGrid>

        </Grid>
      </Toolbar>
    </StyledAppBar>
  )
}


const StyledAppBar = styled(AppBar)`
  && {
    z-index: 50;
    justify-content: center;
    height: 55px;
    box-shadow: none;
  }
`;

const StyledGrid = styled(Grid)`
  && {
    display: flex;
    justify-content: center;

    &:nth-child(1) {
      justify-content: flex-start;
    }

    &:nth-child(2) {
      justify-content: center;
    }

    &:nth-child(3) {
      justify-content: flex-end;
      gap: 5px;
    }
  }
`


export default TopBar