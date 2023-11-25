import { AddToPhotosOutlined, Clear } from '@mui/icons-material';
import { Avatar, Button, IconButton, Modal, TextField, Tooltip, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import IconTrimming from './IconTrimming';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import DestructionModal from '../common/admin/destructionModal/DestructionModal';
import HeaderTrimming from './headerTrimming';


const ProfileUpdateModal = (props) => {

    const theme = useTheme();
    const fileInputRef = useRef();
    const fileInputRef2 = useRef();
    const buttonRef = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();
    const dispatch = useDispatch();
    const siteAssetsPath = process.env.REACT_APP_SITE_ASSETS;
    const [profile, setProfile] = useState({username: props.currentUser.username, desc: props.currentUser.desc});
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelper, setUsernameHelper] = useState(" ");
    const [iconModal, setIconModal] = useState(false);
    const [iconDeleteDestruct, setIconDeleteDestruct] = useState(false);
    const [headerModal, setHeaderModal] = useState(false);
    const [headerDeleteDestruct, setHeaderDeleteDestruct] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click();
        buttonRef.current.blur();
        buttonRef2.current.blur();
    };

    // 2のナンバリングはヘッダー用
    const handleUploadClick2 = () => {
        fileInputRef2.current.click();
        buttonRef3.current.blur();
    };

    const handleIconSelected = (event) => {
        const icon = event.target.files[0];
        if (icon) {
            const fileUrl = URL.createObjectURL(icon)
            props.setUploadIcon(fileUrl);
            props.setOriginalIcon(fileUrl);
            event.target.value = '';
            setIconModal(true);
        }
    };

    const handleHeaderSelected = (event) => {
        const header = event.target.files[0];
        if (header) {
            const fileUrl = URL.createObjectURL(header)
            props.setUploadHeader(fileUrl);
            props.setOriginalHeader(fileUrl);
            event.target.value = '';
            setHeaderModal(true);
        }
    };

    const handleUsernameInput = (e) => {
        setProfile({...profile, username: e.target.value});
        if (e.target.value.length === 0) {
            setUsernameError(false);
            setUsernameHelper(" ");
        } else if (e.target.value.trim() === "") {
            setUsernameError(true);
            setUsernameHelper("ユーザーネームを入力して下さい");
        } else {
            setUsernameError(false);
            setUsernameHelper(" ");
        }
    }

    
    const handleDescInput = (e) => {
        setProfile({...profile, desc: e.target.value});
    }
    
    const handleIconDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/client/user/deleteIcon/${props.currentUser._id}`);
            // トリミング済み表示用アイコン (uploadIcon)を初期化
            props.setUploadIcon(false);
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            props.setIsProfileChange(true) // プロフィール変更フラグ
            setIconDeleteDestruct(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleHeaderDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/client/user/deleteHeader/${props.currentUser._id}`);
            // トリミング済み表示用ヘッダー (uploadHeader)を初期化
            props.setUploadHeader(false);
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            props.setIsProfileChange(true) // プロフィール変更フラグ
            setHeaderDeleteDestruct(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleProfleUpdate = async () => {
        try {
            if (profile.username !== props.currentUser.username || profile.desc !== props.currentUser.desc) {
                // 内容に変更があれば名前やプロフィールを更新
                await axios.put(`http://localhost:5000/client/user/update/${props.currentUser._id}`, {username: profile.username.trim(), desc: profile.desc.trim()});
            }
            if (props.binaryIcon) {
                // アイコンに変更があれば(props.binaryIcon: 送る実データがあれば)API実行
                const formData = new FormData();
                formData.append("userIcon", props.binaryIcon);
                await axios.put(`http://localhost:5000/client/user/uploadIcon/${props.currentUser._id}`, formData);
                // アイコン更新情報を初期化
                props.setOriginalIcon();
                props.setBinaryIcon();
            }
            if (props.binaryHeader) {
                // ヘッダーに変更があれば(props.binaryHeader: 送る実データがあれば)API実行
                const formData = new FormData();
                formData.append("userHeader", props.binaryHeader);
                await axios.put(`http://localhost:5000/client/user/uploadHeader/${props.currentUser._id}`, formData);
                // アイコン更新情報を初期化
                props.setOriginalHeader();
                props.setBinaryHeader();
            }
            const newUser = await axios.get(`http://localhost:5000/client/user/getById/${props.currentUser._id}`);
            dispatch(setUser(newUser.data));
            props.setIsProfileChange(true) // プロフィール変更フラグ
            props.setOpen(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <StyledModal open={props.open} onClose={() => props.setUpdateModal(false)}>
            <StyledInner theme={theme}>
                {props.currentUser ?
                
                <>
                <StyledModalHeader theme={theme}>
                    <StyledHeaderDesc theme={theme}>プロフィール編集</StyledHeaderDesc>
                    <StyledSaveButton theme={theme} $usernameError={usernameError} profile={profile} color="text" variant="contained" onClick={handleProfleUpdate}>保存</StyledSaveButton>
                </StyledModalHeader>

                <StyledHeader backHeader={props.uploadHeader ? props.uploadHeader : props.currentUser.header ? `http://localhost:5000/uploads/userHeaders/${props.currentUser.header}` : `${siteAssetsPath}/default_header/${props.currentUser.defaultHeader}`} theme={theme}>
                    <StyledHeaderDarkness>
                        <StyledHeaderIcons>
                            <Tooltip title='ヘッダーを変更' placement='bottom'>
                                <StyledIconButton theme={theme} ref={buttonRef3} onClick={handleUploadClick2}><StyledAddToPhotosOutlined theme={theme}/></StyledIconButton>
                            </Tooltip>
                            {props.currentUser.header ? <Tooltip title='ヘッダーを削除' placement='bottom'><StyledIconButton theme={theme} onClick={() => setHeaderDeleteDestruct(true)}><StyledClear theme={theme}/></StyledIconButton></Tooltip> : null}
                        </StyledHeaderIcons>
                    </StyledHeaderDarkness>
                </StyledHeader>
                
                <StyledInputInner>
                    <StyledIconAndName>
                        <StyledIconInner>
                            <StyledIcon theme={theme}>
                                <StyledAvatar src={props.uploadIcon ? props.uploadIcon : props.currentUser.icon ? `http://localhost:5000/uploads/userIcons/${props.currentUser.icon}` : `${siteAssetsPath}/default_icons/${props.currentUser.defaultIcon}`} />
                                <StyledIconDarkness>
                                    <StyledIconDelete>
                                    <Tooltip title='アイコンを変更' placement='bottom'>
                                        <StyledIconButton onClick={handleUploadClick} theme={theme} ref={buttonRef}><StyledAddToPhotosOutlined theme={theme}/></StyledIconButton>
                                    </Tooltip>
                                    </StyledIconDelete>
                                </StyledIconDarkness>
                            </StyledIcon>
                            <StyledIconButtons>
                                <StyledChangeButton onClick={handleUploadClick} fullWidth variant="contained" theme={theme} ref={buttonRef2}>アイコンを変更</StyledChangeButton>
                                {props.currentUser.icon ? <StyledDeleteButton fullWidth variant="contained" theme={theme} onClick={() => setIconDeleteDestruct(true)}>アイコンを削除</StyledDeleteButton> : null}
                            </StyledIconButtons>
                        </StyledIconInner>
                    </StyledIconAndName>

                    <StyledUserNameAndDesc>
                        <StyledUserNameDescInner>
                            <StyledTextField variant="outlined" label="ユーザーネーム (30字以内)" fullWidth theme={theme} inputProps={{maxLength: 30}} error={usernameError} helperText={usernameHelper} value={profile.username} onChange={handleUsernameInput}/>
                            <StyledTextArea theme={theme} placeholder='プロフィール (500字以内)' maxLength={500} autoComplete='off' value={profile.desc} onChange={handleDescInput}/>
                        </StyledUserNameDescInner>
                    </StyledUserNameAndDesc>
                </StyledInputInner>
                </>
                :
                null
                }
                <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleIconSelected}/>
                <HiddenIconInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef2} onChange={handleHeaderSelected}/>
            </StyledInner>
        </StyledModal>

        <IconTrimming open={iconModal} setOpen={setIconModal} uploadIcon={props.uploadIcon} setUploadIcon={props.setUploadIcon} originalIcon={props.originalIcon} setOriginalIcon={props.setOriginalIcon} binaryIcon={props.binaryIcon} setBinaryIcon={props.setBinaryIcon}
        iconCrop={props.iconCrop} setIconCrop={props.setIconCrop} iconZoom={props.iconZoom} setIconZoom={props.setIconZoom} uploadPrevIcon={props.uploadPrevIcon} setUploadPrevIcon={props.setUploadPrevIcon} originalPrevIcon={props.originalPrevIcon}
        setOriginalPrevIcon={props.setOriginalPrevIcon} binaryPrevIcon={props.binaryPrevIcon} setBinaryPrevIcon={props.setBinaryPrevIcon}/>

        <HeaderTrimming open={headerModal} setOpen={setHeaderModal} uploadHeader={props.uploadHeader} setUploadHeader={props.setUploadHeader} originalHeader={props.originalHeader} setOriginalHeader={props.setOriginalHeader} binaryHeader={props.binaryHeader} setBinaryHeader={props.setBinaryHeader}
        headerCrop={props.headerCrop} setHeaderCrop={props.setHeaderCrop} headerZoom={props.headerZoom} setHeaderZoom={props.setHeaderZoom} uploadPrevHeader={props.uploadPrevHeader} setUploadPrevHeader={props.setUploadPrevHeader} originalPrevHeader={props.originalPrevHeader}
        setOriginalPrevHeader={props.setOriginalPrevHeader} binaryPrevHeader={props.binaryPrevHeader} setBinaryPrevHeader={props.setBinaryPrevHeader}/>

        <DestructionModal isDestructOpen={iconDeleteDestruct} setIsDestructOpen={setIconDeleteDestruct} handleInputDelete={handleIconDelete}
            header="アイコンを削除しますか？" desc="ユーザーのデフォルトアイコンが適応されます。" act="削除"/>

        <DestructionModal isDestructOpen={headerDeleteDestruct} setIsDestructOpen={setHeaderDeleteDestruct} handleInputDelete={handleHeaderDelete}
            header="ヘッダーを削除しますか？" desc="ユーザーのデフォルトヘッダーが適応されます。" act="削除"/>
        </>
    )
}


const StyledModal = styled(Modal)`
    && {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const StyledInner = styled.div`
    width: 450px;
    max-width: 90vw;
    min-width: 40vw;
    height: 75%;
    border: solid 1px ${(props) => props.theme.palette.line.main};
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${(props) => props.theme.palette.background.modal2};
`

const StyledInputInner = styled.div`
    max-width: 2000px;
    margin: 0 auto;
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
    color: ${(props => props.theme.palette.top.secondary)};
    font-size: 1.1rem;
    font-weight: bold;
`

const StyledSaveButton = styled(Button)`
    && {
        height: 70%;
        font-weight: bold;
        pointer-events: ${(props) => props.$usernameError || props.profile.username.length === 0 ? "none" : "auto"};
        background-color: ${(props) => props.$usernameError || props.profile.username.length === 0 ? props.theme.palette.background.modalDisable : props.theme.palette.text.main};
    }
`

const StyledHeader = styled.div`
    width: 100%;
    aspect-ratio: 4/1;
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
        background-color: rgba(255, 255, 255, 0.1);
        height: 100%;
        aspect-ratio: 1/1;

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

const StyledAddToPhotosOutlined = styled(AddToPhotosOutlined)`
    color: ${(props) => props.theme.palette.text.main};
    width: 30px;
    height: 30px;
`

const StyledClear = styled(Clear)`
    color: ${(props) => props.theme.palette.text.main};
    width: 30px;
    height: 30px;
`

const StyledIconAndName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    height: fit-content;
`

const StyledIconInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    width: 85%;
`

const StyledIcon = styled.div`
    position: relative;
    width: 25%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${(props) => props.theme.palette.background.productBack};
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


const StyledAvatar = styled(Avatar)`
    && {
        width: 100%;
        height: 100%;
    }
`

const StyledIconButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 65%;
    height: 100%;
    padding-left: 50px;
`

const StyledChangeButton = styled(Button)`
    && {
        color: ${(props) => props.theme.palette.secondary.main};
    }
`

const StyledDeleteButton = styled(Button)`
    && {
        color: ${(props) => props.theme.palette.text.main};
    }
`

const StyledTextField = styled(TextField)(({ theme }) => ({

    '& .MuiInputBase-input': {
        color: theme.palette.text.main, // 入力文字の色
        backgroundColor: "#000",
        borderRadius: "5px"
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: '#777', // 通常時のボーダー色(アウトライン)
        },
        '&:hover:not(.Mui-disabled) fieldset': {
        borderColor: '#777', // 非フォーカス時のホバー時のボーダー色(アウトライン)
        },
        '&.Mui-focused:hover fieldset': {
        borderColor: theme.palette.secondary.main, // フォーカス時にホバーしたときのボーダー色(アウトライン)
        },
        '&:focus-within fieldset': {
        borderColor: theme.palette.secondary.main, // フォーカス時のボーダー色(アウトライン)
        },
    },
    '& .MuiInputLabel-root': {
        color: '#777', // ラベルの通常時の色
        '&.Mui-focused': {
        color: theme.palette.secondary.main, // フォーカス時のラベルの色
        },
    },
}));

const StyledUserNameAndDesc = styled.div`
    width: 100%;
    height: fit-content;
    margin-top: 30px;
    margin-bottom: 30px;
`

const StyledUserNameDescInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    width: 85%;
    margin: 0 auto;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 20px 15px;
    color: ${(props) => props.theme.palette.text.main};
    background-color: #000;
    outline: solid 1px ${(props) => props.theme.palette.line.main};
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

const HiddenIconInput = styled.input`
    display: none;
`


export default ProfileUpdateModal