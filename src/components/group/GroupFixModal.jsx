import { Avatar, Box, Button, Chip, IconButton, InputAdornment, Modal, Tooltip, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from 'styled-components';
import EstablishHeaderTrimming from '../establish/EstablishHeaderTrimming';
import EstablishIconTrimming from '../establish/EstablishIconTrimming';
import { AddToPhotosOutlined, Clear } from '@mui/icons-material';
import { StyledTextField } from '../../utils/StyledTextField';
import { useEnv } from '../../provider/EnvProvider';


const GroupFixModal = (props) => {

    const [headerModal, setHeaderModal] = useState(false);
    const [iconModal, setIconModal] = useState(false);
    const { siteAssetsPath, backendAccessPath } = useEnv();
    const buttonRef = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();
    const fileInputRef = useRef();
    const fileInputRef2 = useRef();
    const theme = useTheme();

    const handleEnterKey = (event) => {
        if (event.key === 'Enter' && props.tag.length > 0) {
            event.preventDefault();
            props.handleTagAdd();
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
        buttonRef.current.blur();
    };

    const handleUploadClick2 = () => {
        fileInputRef2.current.click();
        buttonRef2.current.blur();
        buttonRef3.current.blur();
    };


    const handleHeaderSelected = (event) => {
        const header = event.target.files[0];
        if (header) {
            const fileUrl = URL.createObjectURL(header)
            props.setPreviewHeader(fileUrl);
            props.setOriginalHeader(fileUrl);
            event.target.value = '';
            setHeaderModal(true);
        }
    };

    const handleHeaderSelected2 = (event) => {
        const icon = event.target.files[0];
        if (icon) {
            const fileUrl = URL.createObjectURL(icon)
            props.setPreviewIcon(fileUrl);
            props.setOriginalIcon(fileUrl);
            event.target.value = '';
            setIconModal(true);
        }
    };


    const handleUploadHeaderDelete = async () => {
        props.setPreviewHeader();
        props.setBinaryHeader();
        props.setOriginalHeader();
        props.setPreviewPrevHeader();
        props.setBinaryPrevHeader();
        props.setOriginalPrevHeader();
        props.setIsHeaderDelete(true);
    }

    const handleUploadIconDelete = async () => {
        props.setPreviewIcon();
        props.setBinaryIcon();
        props.setOriginalIcon();
        props.setPreviewPrevIcon();
        props.setBinaryPrevIcon();
        props.setOriginalPrevIcon();
        props.setIsIconDelete(true);
    }
    
    return (
        <>
        <Modal open={props.open} onClose={() => props.setOpen(false)} slotProps={{backdrop: {sx: {backgroundColor: theme.palette.background.modalShadow}}}}>
            <StyledModalInner theme={theme}>

                <Box display="flex" width="100%" flexDirection="column">
                    <StyledModalHeader theme={theme}>
                        <StyledHeaderDesc theme={theme}>グループ編集</StyledHeaderDesc>
                        <StyledSaveButton theme={theme} color="text" variant="contained" onClick={props.handleCheck}>保存</StyledSaveButton>
                    </StyledModalHeader>

                    <StyledHeader backHeader={props.isHeaderDelete ? null : props.previewHeader ? props.previewHeader : props.group.header ? `${backendAccessPath}/uploads/groupHeaders/${props.group.header}` : null} theme={theme}>
                        <StyledHeaderDarkness>
                            <StyledHeaderIcons>
                                <Tooltip title='ヘッダーを変更' placement='bottom'>
                                    <StyledIconButton theme={theme} ref={buttonRef} onClick={handleUploadClick}><StyledAddToPhotosOutlined theme={theme}/></StyledIconButton>
                                </Tooltip>
                                {(props.group.header && !props.isHeaderDelete) || props.previewHeader ? <Tooltip title='ヘッダーを削除' placement='bottom'><StyledIconButton theme={theme} onClick={handleUploadHeaderDelete}><StyledClear theme={theme}/></StyledIconButton></Tooltip> : null}
                            </StyledHeaderIcons>
                        </StyledHeaderDarkness>
                    </StyledHeader>

                    <div>
                    <Box display="flex" alignItems="center" width="90%" padding="30px 0" gap="25px" margin="0 auto">
                        <StyledAvatarZone>
                        <Avatar variant='square' sx={{width: "100%", height: "100%"}} src={props.isIconDelete ? `${siteAssetsPath}/default_group_icons/${props.group.defaultIcon}` : props.previewIcon ? props.previewIcon : props.group.icon ? `${backendAccessPath}/uploads/groupIcons/${props.group.icon}` : `${siteAssetsPath}/default_group_icons/${props.group.defaultIcon}`}/>
                        <StyledIconDarkness>
                            <StyledIconDelete>
                            <Tooltip title='アイコンを変更' placement='bottom'>
                                <StyledIconButton onClick={handleUploadClick2} theme={theme} ref={buttonRef2}><StyledAddToPhotosOutlined theme={theme}/></StyledIconButton>
                            </Tooltip>
                            </StyledIconDelete>
                        </StyledIconDarkness>
                        </StyledAvatarZone>
                        <Box display="flex" flexDirection="column" gap="10px" width="80%">
                            <StyledIconButtons>
                                <StyledChangeButton onClick={handleUploadClick2} fullWidth variant="outlined" theme={theme} ref={buttonRef3} color='secondary'>アイコンを変更</StyledChangeButton>
                                {(props.group.icon && !props.isIconDelete) || props.previewIcon ? <StyledDeleteButton fullWidth variant="contained" theme={theme} onClick={handleUploadIconDelete}>アイコンを削除</StyledDeleteButton> : null}
                            </StyledIconButtons>
                        </Box>
                    </Box>
                    </div>
                    <Box display="flex" width="90%" flexDirection="column" gap="40px" margin="25px auto">

                        <div style={{width: "100%"}}>
                            <StyledSubTitle theme={theme}>
                                <StyledRequired theme={theme}>必須</StyledRequired>
                                <div>① グループ名</div>
                            </StyledSubTitle>
                            <StyledTextField theme={theme} value={props.fixInfo.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "グループ名 (1~50字)"}}
                                    onChange={props.handleNameChange} error={props.groupError.name} helperText={props.groupHelper.name}/>
                            <StyledInputLength theme={theme}>{`${props.fixInfo.name.length}/50`}</StyledInputLength>
                        </div>

                        <div>
                            <StyledSubTitle theme={theme}>
                                <StyledAny theme={theme}>任意</StyledAny>
                                <div>② サブタイトル</div>
                            </StyledSubTitle>
                            <StyledTextField theme={theme} value={props.fixInfo.subTitle} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "サブタイトル (0~50字)"}}
                                    onChange={props.handleSubTitleChange}/>
                            <StyledInputLength theme={theme}>{`${props.fixInfo.subTitle.length}/50`}</StyledInputLength>
                        </div>

                        <div>
                            <StyledSubTitle theme={theme}>
                                <StyledRequired theme={theme}>必須</StyledRequired>
                                <div>③ グループ説明</div>
                            </StyledSubTitle>
                            <StyledTextField multiline rows={5} theme={theme} value={props.fixInfo.desc} autoComplete='new-off' fullWidth inputProps={{maxLength: 500, placeholder: "グループ説明 (5~500字)"}}
                                    onChange={props.handleDescChange} error={props.groupError.desc}/>
                            <StyledErrorAndLength>
                                <StyledErrorMessage theme={theme}>{props.groupHelper.desc}</StyledErrorMessage>
                                <StyledInputLength theme={theme}>{`${props.fixInfo.desc.length}/500`}</StyledInputLength>
                            </StyledErrorAndLength>
                        </div>

                        <div>
                        <StyledSubTitle theme={theme}>
                            <StyledAny theme={theme}>任意</StyledAny>
                            <div>④ タグを追加</div>
                        </StyledSubTitle>
                        {props.fixInfo.tags.length < 10 ?
                        <>
                        <StyledTextField theme={theme} value={props.tag} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "タグ (1~50字)"}}
                            onChange={props.handleTagInput} onKeyDown={handleEnterKey}
                            InputProps={props.tag.length > 0 ? {endAdornment: (<InputAdornment position="end" onClick={props.handleTagAdd}>{<Button color='secondary'>追加 (Enter)</Button>}</InputAdornment>)} : null}/>
                        <StyledInputLength theme={theme}>{`${props.tag.length}/50`}</StyledInputLength>
                        </> :
                        <StyledStopTag theme={theme}>追加できるタグ数は10個までです</StyledStopTag>
                        }
                        <StyledTagZone>
                            {props.fixInfo.tags.map((tag, index) => 
                                <StyledTagChip key={index} color="secondary" label={tag} variant='outlined' clickable onDelete={() => props.handleTagDelete(index)}></StyledTagChip>
                            )}
                            <StyledInputLength theme={theme}>{`タグ ${props.fixInfo.tags.length}/10`}</StyledInputLength>
                        </StyledTagZone>
                        </div>
                    </Box>

                    <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg, image/webp" ref={fileInputRef} onChange={handleHeaderSelected}/>
                    <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg, image/webp" ref={fileInputRef2} onChange={handleHeaderSelected2}/>

                    {headerModal && <EstablishHeaderTrimming previewHeader={props.previewHeader} setPreviewHeader={props.setPreviewHeader} originalHeader={props.originalHeader} setOriginalHeader={props.setOriginalHeader}
                    binaryHeader={props.binaryHeader} setBinaryHeader={props.setBinaryHeader} setOpen={setHeaderModal} open={headerModal}
                    headerCrop={props.headerCrop} setHeaderCrop={props.setHeaderCrop} headerZoom={props.headerZoom} setHeaderZoom={props.setHeaderZoom}
                    riginalPrevHeader={props.originalPrevHeader} setOriginalPrevHeader={props.setOriginalPrevHeader} previewPrevHeader={props.previewPrevHeader} setPreviewPrevHeader={props.setPreviewPrevHeader}
                    binaryPrevHeader={props.binaryPrevHeader} setBinaryPrevHeader={props.setBinaryPrevHeader} setIsHeaderDelete={props.setIsHeaderDelete}/>}

                    {iconModal && <EstablishIconTrimming previewIcon={props.previewIcon} setPreviewIcon={props.setPreviewIcon} originalIcon={props.originalIcon} setOriginalIcon={props.setOriginalIcon}
                    binaryIcon={props.binaryIcon} setBinaryIcon={props.setBinaryIcon} setOpen={setIconModal} open={iconModal}
                    iconCrop={props.iconCrop} setIconCrop={props.setIconCrop} iconZoom={props.iconZoom} setIconZoom={props.setIconZoom}
                    riginalPrevIcon={props.originalPrevIcon} setOriginalPrevIcon={props.setOriginalPrevIcon} previewPrevIcon={props.previewPrevIcon} setPreviewPrevIcon={props.setPreviewPrevIcon}
                    binaryPrevIcon={props.binaryPrevIcon} setBinaryPrevIcon={props.setBinaryPrevIcon} setIsIconDelete={props.setIsIconDelete}/>}
                </Box>

            </StyledModalInner>
        </Modal>
        </>
    )
}


const StyledModalInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 90vw;
    min-width: 35vw;
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 15px;
    border: solid 1px #444;
    background-color: ${(props) => props.theme.palette.background.modal};
`

const StyledModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: ${(props => props.theme.palette.background.modalHeader)};
    padding: 0 20px;
`

const StyledHeaderDesc = styled.div`
    color: ${(props => props.theme.palette.text.main)};
    font-size: 1.1rem;
    font-weight: bold;
`

const StyledSaveButton = styled(Button)`
    && {
        height: 70%;
        font-weight: bold;
        color: ${(props) => props.theme.palette.text.main3};
        background-color: ${(props) => props.theme.palette.text.main2};
    }
`

const StyledHeader = styled.div`
    width: 100%;
    aspect-ratio: 5/1;
    overflow: hidden;
    background-image: url(${(props => props.backHeader)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.palette.background.productBack};
`

const StyledHeaderDarkness = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`

const StyledHeaderIcons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-width: 50%;
`

const StyledIconButton = styled(IconButton)`
    && {
        background-color: ${(props) => props.theme.palette.background.slideHover};
        height: 100%;
        aspect-ratio: 1/1;
    }

`

const StyledAddToPhotosOutlined = styled(AddToPhotosOutlined)`
    color: ${(props) => props.theme.palette.text.main2};
    width: 30px;
    height: 30px;
`

const StyledClear = styled(Clear)`
    color: ${(props) => props.theme.palette.text.main2};
    width: 30px;
    height: 30px;
`

const StyledAvatarZone = styled.div`
    position: relative;
    aspect-ratio: 1/1;
    width: 20%;
    overflow: hidden;
`

const StyledIconDarkness = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`

const StyledIconDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
`

const StyledIconButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding-left: 50px;
`

const StyledChangeButton = styled(Button)`
    && {
        &:hover {
            background-color: transparent;
        }
    }
`

const StyledDeleteButton = styled(Button)`
    && {
        color: ${(props) => props.theme.palette.text.main};
    }
`

const StyledSubTitle = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-bottom: 10px;
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.1rem;
    font-weight: bold;
`

const StyledRequired = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px 10px;
    border-radius: 5px;
    color: ${(props) => props.theme.palette.text.verifyBar};
    background-color: ${(props) => props.theme.palette.secondary.main};
    font-size: 1rem;
`

const StyledAny = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5px 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.palette.secondary.exhibitAny};
    color: ${(props) => props.theme.palette.text.main2};
    font-size: 1rem;
`

const StyledErrorMessage = styled.div`
    color: ${(props) => props.theme.palette.text.error};
    font-size: 0.9rem;
    width: 100%;
    height: 0.9rem;
`

const StyledInputLength = styled.div`
    width: 100%;
    text-align: right;
    color: ${(props) => props.theme.palette.text.sub};
`

const StyledErrorAndLength = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledTagZone = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`

const StyledTagChip = styled(Chip)`
    && {
        font-size: 1rem;
        height: 35px;
        padding: 10px;
    }
`

const StyledStopTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    color: ${(props) => props.theme.palette.text.sub};
`

const HiddenIconInput = styled.input`
    display: none;
`


export default GroupFixModal