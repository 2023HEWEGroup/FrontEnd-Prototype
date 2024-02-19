import { Avatar, Grid, Hidden, Tooltip, useTheme } from '@mui/material'
import React, { useState } from 'react'
import EstablishPreview from '../components/establish/EstablishPreview'
import EstablishInput from '../components/establish/EstablishInput'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FolderShared } from '@mui/icons-material'
import ErrorSnack from '../components/common/errorSnack/ErrorSnack'
import EstablishModal from '../components/establish/EstablishModal'
import axios from 'axios'
import IsProgress from '../components/common/isProgress/IsProgress'
import EstablishNyan from '../components/establish/EstablishNyan'
import { useEnv } from '../provider/EnvProvider'


const Establish = (props) => {

    const [group, setGroup] = useState({name: "", subTitle: "", desc: "", tags: []});
    const [modalOpen, setModalOpen] = useState(false);
    const [isErrorSnack, setIsErrorSnack] = useState(false);
    const [snackWarning, setSnackWarning] = useState("");
    const [nyan, setNyan] = useState(false);
    const [newGroup, setNewGroup] = useState({});
    const [isProgress, setIsProgress] = useState(false);

    const [previewHeader, setPreviewHeader] = useState(""); // トリミング結果
    const [originalHeader, setOriginalHeader] = useState(""); // オリジナルデータ(トリミング開始時に使用)
    const [binaryHeader, setBinaryHeader] = useState(""); // バイナリデータ(送信に使用)
    // これらはそれぞれの履歴。トリミング中にキャンセルが発生した場合、これらの履歴があれば適用する。
    const [previewPrevHeader, setPreviewPrevHeader] = useState();
    const [originalPrevHeader, setOriginalPrevHeader] = useState();
    const [binaryPrevHeader, setBinaryPrevHeader] = useState();
    const [headerCrop, setHeaderCrop] = useState({x: 0, y: 0});
    const [headerZoom, setHeaderZoom] = useState(1);

    const [previewIcon, setPreviewIcon] = useState(""); // トリミング結果
    const [originalIcon, setOriginalIcon] = useState(""); // オリジナルデータ(トリミング開始時に使用)
    const [binaryIcon, setBinaryIcon] = useState(""); // バイナリデータ(送信に使用)
    // これらはそれぞれの履歴。トリミング中にキャンセルが発生した場合、これらの履歴があれば適用する。
    const [previewPrevIcon, setPreviewPrevIcon] = useState();
    const [originalPrevIcon, setOriginalPrevIcon] = useState();
    const [binaryPrevIcon, setBinaryPrevIcon] = useState();
    const [iconCrop, setIconCrop] = useState({x: 0, y: 0});
    const [iconZoom, setIconZoom] = useState(1);

    const [groupError, setGroupError] = useState({name: false, desc: false});
    const [tag, setTag] = useState("");
    const [groupHelper, setGroupHelper] = useState({name: false, desc: false});
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();
    const { siteAssetsPath, backendAccessPath } = useEnv();

    const handleNameChange = (e) => {
        setGroup((prev) => ({...prev, name: e.target.value}));
        setGroupError((prev) => ({...prev, name: false}));
        setGroupHelper((prev) => ({...prev, name: ""}));
        if (e.target.value.length === 0) {
            setGroupError((prev) => ({...prev, name: false}));
            setGroupHelper((prev) => ({...prev, name: ""}));
        } else if (e.target.value.trim() === "") {
            setGroupError((prev) => ({...prev, name: true}));
            setGroupHelper((prev) => ({...prev, name: "空白のみの入力はできません"}));
        }
    };

    const handleSubTitleChange = (e) => {
        setGroup((prev) => ({...prev, subTitle: e.target.value}));
    };

    const handleDescChange = (e) => {
        setGroup((prev) => ({...prev, desc: e.target.value}));
        setGroupError((prev) => ({...prev, desc: false}));
        setGroupHelper((prev) => ({...prev, desc: ""}));
        if (e.target.value.length === 0) {
            setGroupError((prev) => ({...prev, desc: false}));
            setGroupHelper((prev) => ({...prev, desc: ""}));
        } else if (e.target.value.length < 5) {
            setGroupError((prev) => ({...prev, desc: true}));
            setGroupHelper((prev) => ({...prev, desc: "グループ説明は最低で5文字必要です"}));
        } else if (e.target.value.trim() === "") {
            setGroupError((prev) => ({...prev, desc: true}));
            setGroupHelper((prev) => ({...prev, desc: "空白のみの入力はできません"}));
        }
    };

    const handleTagAdd = () => {
        const newTag = tag;
        setGroup((prev) => ({...prev, tags: [...prev.tags, newTag]}));
        setTag("");
    };
    
    const handleTagDelete = (index) => {
        const updatedTags = group.tags.filter((tag, i) => i !== index);
        setGroup((prev) => ({...prev, tags: updatedTags}));
    };
    
    const handleTagInput = (event) => {
        const tagWithoutSpaces = event.target.value.replace(/\s/g, "");
        setTag(tagWithoutSpaces);
    }

    const handleCheck = () => {
        let flag = true;
        if (group.name.length === 0) {
            setGroupError((prev) => ({...prev, name: true}));
            setGroupHelper((prev) => ({...prev, name: "グループ名を入力して下さい"}));
            flag = false;
        } else if (group.name.trim() === "") {
            setGroupError((prev) => ({...prev, name: true}));
            setGroupHelper((prev) => ({...prev, name: "空白のみの入力はできません"}));
            flag = false;
        }
        if (group.desc.length === 0) {
            setGroupError((prev) => ({...prev, desc: true}));
            setGroupHelper((prev) => ({...prev, desc: "グループ説明を入力して下さい"}));
            flag = false;
        } else if (group.desc.length < 5) {
            setGroupError((prev) => ({...prev, desc: true}));
            setGroupHelper((prev) => ({...prev, desc: "グループ説明は最低で5文字必要です"}));
            flag = false;
        } else if (group.desc.trim() === "") {
            setGroupError((prev) => ({...prev, desc: true}));
            setGroupHelper((prev) => ({...prev, desc: "空白のみの入力はできません"}));
            flag = false;
        }
        if (!flag) {
            setSnackWarning("入力内容が誤っています。");
            setIsErrorSnack(true);
            return;
        } else {
            setModalOpen(true);
        }
    }

    const establish = async () => {
        try {
            setIsProgress(true);
            let headerName = "";
            let iconName = "";
            if (binaryHeader) {
                const headerFormData = new FormData();
                headerFormData.append("groupHeader", binaryHeader);
                const headerResponse = await axios.post(`${backendAccessPath}/client/group/headerUpload`, headerFormData);
                headerName = headerResponse.data;
            }
            if (binaryIcon) {
                const iconFormData = new FormData();
                iconFormData.append("groupIcon", binaryIcon);
                const iconResponse = await axios.post(`${backendAccessPath}/client/group/iconUpload`, iconFormData);
                iconName = iconResponse.data;
            }
            const establishData = {
                _id: props.currentUser._id,
                name: group.name,
                subTitle: group.subTitle,
                desc: group.desc,
                tags: group.tags,
                owner: props.currentUser._id,
                header: headerName,
                icon: iconName,
            }
            const response = await axios.post(`${backendAccessPath}/client/group/establish`, establishData);
            setNewGroup(response.data);
            setIsProgress(false);
            setNyan(true);
        } catch (err) {
            setIsProgress(false);
            if (err.response) {
                console.log(err);
            } else if (err.request) {
                setSnackWarning("サーバーとの通信がタイムアウトしました。");
            } else {
                console.log(err);
            }
            setIsErrorSnack(true);
        }
    }

    return (
        <>
        {!nyan ?
        <>
        <StyledCommand>
            <Link to="/groups" style={{borderRadius: "50%"}}>
                <Tooltip title="グループ一覧に戻る" placement='right' arrow>
                    <StyledAvatar sx={{width:"50px", height: "50px"}} variant='circular'>
                        <FolderShared sx={{width: "50%", height: "50%"}}/>
                    </StyledAvatar>
                </Tooltip>
            </Link>
        </StyledCommand>

        <StyledTitle theme={theme}>
        <StyledLmapLogo src={`${siteAssetsPath}/${theme.palette.siteLogo}`} alt='UNGRAロゴ' />
        <div>グループを作成する</div>
        </StyledTitle>

        <Grid container width="1450px" maxWidth="90vw" margin="0 auto 100px auto">
            <Hidden only={["xs", "sm"]}>
                <Grid item xs={0} sm={0} md={6} lg={6} xl={6} padding="0 50px">
                    <EstablishPreview group={group} isExpanded={isExpanded} setIsExpanded={setIsExpanded} previewHeader={previewHeader} previewIcon={previewIcon}/>
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} padding="0 50px">
                <EstablishInput group={group} setGroup={setGroup} groupError={groupError} groupHelper={groupHelper}
                handleNameChange={handleNameChange} handleSubTitleChange={handleSubTitleChange} handleDescChange={handleDescChange}
                handleTagAdd={handleTagAdd} handleTagDelete={handleTagDelete} handleTagInput={handleTagInput} tag={tag} handleCheck={handleCheck}

                previewHeader={previewHeader} setPreviewHeader={setPreviewHeader} originalHeader={originalHeader} setOriginalHeader={setOriginalHeader}
                binaryHeader={binaryHeader} setBinaryHeader={setBinaryHeader}
                headerCrop={headerCrop} setHeaderCrop={setHeaderCrop} headerZoom={headerZoom} setHeaderZoom={setHeaderZoom}
                originalPrevHeader={originalPrevHeader} setOriginalPrevHeader={setOriginalPrevHeader} previewPrevHeader={previewPrevHeader} setPreviewPrevHeader={setPreviewPrevHeader}
                binaryPrevHeader={binaryPrevHeader} setBinaryPrevHeader={setBinaryPrevHeader}

                previewIcon={previewIcon} setPreviewIcon={setPreviewIcon} originalIcon={originalIcon} setOriginalIcon={setOriginalIcon}
                binaryIcon={binaryIcon} setBinaryIcon={setBinaryIcon}
                iconCrop={iconCrop} setIconCrop={setIconCrop} iconZoom={iconZoom} setIconZoom={setIconZoom}
                originalPrevIcon={originalPrevIcon} setOriginalPrevIcon={setOriginalPrevIcon} previewPrevIcon={previewPrevIcon} setPreviewPrevIcon={setPreviewPrevIcon}
                binaryPrevIcon={binaryPrevIcon} setBinaryPrevIcon={setBinaryPrevIcon}/>

                {modalOpen && <EstablishModal open={modalOpen} setOpen={setModalOpen} group={group} isExpanded={isExpanded} setIsExpanded={setIsExpanded}
                previewHeader={previewHeader} previewIcon={previewIcon} binaryHeader={binaryHeader} binaryIcon={binaryIcon} setNyan={setNyan} establish={establish}/>}

                <IsProgress isProgress={isProgress} style={{zIndex: 9000}}/>

                <ErrorSnack open={isErrorSnack} onClose={() => setIsErrorSnack(false)} warning={snackWarning}/>
            </Grid>
        </Grid>
        </>
        :
        <EstablishNyan group={newGroup} currentUser={props.currentUser} nyan={nyan} setNyan={setNyan}/>
        }
        </>
    )
}


const StyledCommand = styled.div`
    position: fixed;
    top: 0;
    z-index: 100;
    padding: 15px;
`

const StyledAvatar = styled(Avatar)`
    cursor: pointer;
    pointer-events: auto;
    &:hover {
        opacity: 0.8;
    }
`

const StyledLmapLogo = styled.img`
    width: 180px;
`;

const StyledTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: 150px;
    color: ${(props) => props.theme.palette.text.main};
    font-size: 1.5rem;
    font-weight: bold;
`


export default Establish