import { ContentCopy, MoreVert } from '@mui/icons-material';
import { Avatar, Grid, Hidden, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import styled from 'styled-components'


const Profile = () => {

  const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = useTheme();

  return (
    <>
    <StyledProfile>
      <StyledHeaderZone backHeader={`${siteAssetsPath}/tanoc_header.png`} theme={theme}>
        <BackHeaderDarken>
          <StyledHeaderImgParent theme={theme}>
            <StyledHeaderImg src={`${siteAssetsPath}/tanoc_header.png`} alt='ユーザーヘッダー'/>
          </StyledHeaderImgParent>
        </BackHeaderDarken>
        <StyledButtons isXsScreen={isXsScreen}>
          <Tooltip title="リンクコピー" placement='bottom' arrow={true}>
            <StyledIconButton theme={theme}>
              <ContentCopy />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="その他" placement='bottom' arrow={true}>
            <StyledIconButton theme={theme}>
              <MoreVert />
            </StyledIconButton>
          </Tooltip>
        </StyledButtons>
      </StyledHeaderZone>
    </StyledProfile>
    </>
  )
}


const StyledProfile = styled.div`
  width: 100%;
  height: 1000px;
`

const StyledHeaderZone = styled.div`
  position: relative;
  aspect-ratio: 6/1;
  width: 100%;
  background-image: url(${(props => props.backHeader)});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: ${(props) => props.theme.palette.background.pop};
`

const BackHeaderDarken = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
`

const StyledHeaderImgParent = styled.div`
  aspect-ratio: 4/1;
  height: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.palette.background.pop};
`

const StyledHeaderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const StyledButtons = styled.div`
  position: absolute;
  bottom: ${(props) => (props.isXsScreen ? 0 : "15px")};
  right: ${(props) => (props.isXsScreen ? 0 : "15px")};
  display: flex;
  gap: 15px;
  width: fit-content;
`

const StyledIconButton = styled(IconButton)`
  && {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);

    .MuiTouchRipple-child {
      background-color: transparent;
  }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
      background-color: rgba(255, 255, 255, 0.1);
  }
  }
`


export default Profile