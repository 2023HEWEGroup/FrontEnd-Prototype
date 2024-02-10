import React, { useRef, useState } from 'react'
import { StyledTextField } from '../../utils/StyledTextField'
import { Avatar, Box, Button, Chip, IconButton, InputAdornment, Tooltip, useTheme } from '@mui/material'
import styled from 'styled-components';
import { AddToPhotosOutlined, Clear } from '@mui/icons-material';
import EstablishHeaderTrimming from './EstablishHeaderTrimming';
import EstablishIconTrimming from './EstablishIconTrimming';


const EstablishInput = (props) => {

    const [headerModal, setHeaderModal] = useState(false);
    const [iconModal, setIconModal] = useState(false);
    const theme = useTheme();
    const buttonRef = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();
    const fileInputRef = useRef();
    const fileInputRef2 = useRef();

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
    }

    const handleUploadIconDelete = async () => {
        props.setPreviewIcon();
        props.setBinaryIcon();
        props.setOriginalIcon();
        props.setPreviewPrevIcon();
        props.setBinaryPrevIcon();
        props.setOriginalPrevIcon();
    }

    return (
        <>
        <div>
            <StyledHeader backHeader={props.previewHeader ? props.previewHeader : null} theme={theme}>
                <StyledHeaderDarkness>
                    <StyledHeaderIcons>
                        <Tooltip title='ヘッダーを変更' placement='bottom'>
                            <StyledIconButton theme={theme} ref={buttonRef} onClick={handleUploadClick}><StyledAddToPhotosOutlined theme={theme}/></StyledIconButton>
                        </Tooltip>
                        {props.previewHeader ? <Tooltip title='ヘッダーを削除' placement='bottom'><StyledIconButton theme={theme} onClick={handleUploadHeaderDelete}><StyledClear theme={theme}/></StyledIconButton></Tooltip> : null}
                    </StyledHeaderIcons>
                </StyledHeaderDarkness>
            </StyledHeader>
        </div>

        <div>
        <Box display="flex" alignItems="center" width="90%" padding="30px 0" gap="25px" margin="0 auto">
            <StyledAvatarZone>
            <Avatar variant='square' sx={{width: "100%", height: "100%"}} src={props.previewIcon}/>
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
                    {props.previewIcon ? <StyledDeleteButton fullWidth variant="contained" theme={theme} onClick={handleUploadIconDelete}>アイコンを削除</StyledDeleteButton> : null}
                </StyledIconButtons>
            </Box>
        </Box>
        </div>
        <Box display="flex" flexDirection="column" gap="75px" marginTop="25px">

            <div>
                <StyledSubTitle theme={theme}>
                    <StyledRequired theme={theme}>必須</StyledRequired>
                    <div>① グループ名</div>
                </StyledSubTitle>
                <StyledTextField theme={theme} value={props.group.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "グループ名 (1~50字)"}}
                        onChange={props.handleNameChange} error={props.groupError.name} helperText={props.groupHelper.name}/>
                <StyledInputLength theme={theme}>{`${props.group.name.length}/50`}</StyledInputLength>
            </div>

            <div>
                <StyledSubTitle theme={theme}>
                    <StyledAny theme={theme}>任意</StyledAny>
                    <div>② サブタイトル</div>
                </StyledSubTitle>
                <StyledTextField theme={theme} value={props.group.subTitle} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "サブタイトル (0~50字)"}}
                        onChange={props.handleSubTitleChange}/>
                <StyledInputLength theme={theme}>{`${props.group.subTitle.length}/50`}</StyledInputLength>
            </div>

            <div>
                <StyledSubTitle theme={theme}>
                    <StyledRequired theme={theme}>必須</StyledRequired>
                    <div>③ グループ説明</div>
                </StyledSubTitle>
                <StyledTextArea theme={theme} value={props.group.desc} placeholder='グループ説明 (5~500字)' maxLength={500} autoComplete='off'
                    onChange={props.handleDescChange} error={props.groupError.desc}>
                </StyledTextArea>
                <StyledErrorAndLength>
                    <StyledErrorMessage theme={theme}>{props.groupHelper.desc}</StyledErrorMessage>
                    <StyledInputLength theme={theme}>{`${props.group.desc.length}/500`}</StyledInputLength>
                </StyledErrorAndLength>
            </div>

            <div>
            <StyledSubTitle theme={theme}>
                <StyledAny theme={theme}>任意</StyledAny>
                <div>④ タグを追加</div>
            </StyledSubTitle>
            {props.group.tags.length < 10 ?
            <>
            <StyledTextField theme={theme} value={props.tag} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "タグ (1~50字)"}}
                onChange={props.handleTagInput} onKeyDown={handleEnterKey}
                InputProps={props.tag.length > 0 ? {endAdornment: (<InputAdornment position="end" onClick={props.handleTagAdd}>{<Button color='secondary'>追加 (Enter)</Button>}</InputAdornment>)} : null}/>
            <StyledInputLength theme={theme}>{`${props.tag.length}/50`}</StyledInputLength>
            </> :
            <StyledStopTag theme={theme}>追加できるタグ数は10個までです</StyledStopTag>
            }
            <StyledTagZone>
                {props.group.tags.map((tag, index) => 
                    <StyledTagChip key={index} color="secondary" label={tag} variant='outlined' clickable onDelete={() => props.handleTagDelete(index)}></StyledTagChip>
                )}
                <StyledInputLength theme={theme}>{`タグ ${props.group.tags.length}/10`}</StyledInputLength>
            </StyledTagZone>
            </div>

            <Button variant='outlined' size='large' color='secondary' fullWidth sx={{p: 1}} onClick={props.handleCheck}>確認</Button>
        </Box>

        <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg, image/webp" ref={fileInputRef} onChange={handleHeaderSelected}/>
        <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg, image/webp" ref={fileInputRef2} onChange={handleHeaderSelected2}/>

        {headerModal && <EstablishHeaderTrimming previewHeader={props.previewHeader} setPreviewHeader={props.setPreviewHeader} originalHeader={props.originalHeader} setOriginalHeader={props.setOriginalHeader}
        binaryHeader={props.binaryHeader} setBinaryHeader={props.setBinaryHeader} setOpen={setHeaderModal} open={headerModal}
        headerCrop={props.headerCrop} setHeaderCrop={props.setHeaderCrop} headerZoom={props.headerZoom} setHeaderZoom={props.setHeaderZoom}
        riginalPrevHeader={props.originalPrevHeader} setOriginalPrevHeader={props.setOriginalPrevHeader} previewPrevHeader={props.previewPrevHeader} setPreviewPrevHeader={props.setPreviewPrevHeader}
        binaryPrevHeader={props.binaryPrevHeader} setBinaryPrevHeader={props.setBinaryPrevHeader}/>}

        {iconModal && <EstablishIconTrimming previewIcon={props.previewIcon} setPreviewIcon={props.setPreviewIcon} originalIcon={props.originalIcon} setOriginalIcon={props.setOriginalIcon}
        binaryIcon={props.binaryIcon} setBinaryIcon={props.setBinaryIcon} setOpen={setIconModal} open={iconModal}
        iconCrop={props.iconCrop} setIconCrop={props.setIconCrop} iconZoom={props.iconZoom} setIconZoom={props.setIconZoom}
        riginalPrevIcon={props.originalPrevIcon} setOriginalPrevIcon={props.setOriginalPrevIcon} previewPrevIcon={props.previewPrevIcon} setPreviewPrevIcon={props.setPreviewPrevIcon}
        binaryPrevIcon={props.binaryPrevIcon} setBinaryPrevIcon={props.setBinaryPrevIcon}/>}
        </>
    )
}


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
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: fit-content;
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

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 20px 15px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: transparent;
    outline: solid 1px ${(props) => props.error ? props.theme.palette.text.error : props.theme.palette.line.main};
    border-radius: 5px;
    border: none;
    resize: none;
    font-size: 100%;
    font-weight: normal;
    font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;

    &:focus-within {
        outline: solid 2px ${(props) => props.theme.palette.secondary.main};
    }
`

const StyledErrorMessage = styled.div`
    color: ${(props) => props.theme.palette.text.error};
    font-size: 0.9rem;
    width: 80%;
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


export default EstablishInput