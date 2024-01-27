import { AddBox, Close } from '@mui/icons-material';
import { Paper, Popper, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const ImageSearchPopper = (props) => {

    const theme = useTheme();
    const fileInputRef = useRef();
    const popperRef = useRef();
    const stadingRef = useRef();
    const [isDragging, setIsDragging] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        // commonLayout内で「商品画像がドラッグされた場合にのみPopperが表示される」ので、商品画像がドロップされるのを前提とする。
        const draggedImageUrl = event.dataTransfer.getData('avatarImage');
        if (!draggedImageUrl) return;
    
        // 画像の URL からファイルの形式を取得
        const imageExtension = draggedImageUrl.split('.').pop().toLowerCase();
        const allowedFormats = ['png', 'jpeg', 'jpg'];
    
        // 一応形式を調べておこう。
        if (allowedFormats.includes(imageExtension)) {
            console.log("許可された形式");
        } else {
            console.log("許可されていない形式");
        }
    };
    
    const handleFileSelected = (event) => {
        const file = event.target.files[0];
        if (file) {
            event.target.value = '';
        }
    };

    useEffect(() => {
        const handlePopperClose = (event) => {
            if (props.open && !popperRef.current.contains(event.target)) {
                props.setIsImagePopper(false);
            }
        }
        let clickTimeout;
        if (props.open) {
            // タイマーを使用してクリックイベントを遅延させる(Popper展開時に上の関数で閉じてしまわないため)
            clickTimeout = setTimeout(() => {
                document.addEventListener('click', handlePopperClose);
            }, 100);
        }
        return () => {
            clearTimeout(clickTimeout);
            document.removeEventListener('click', handlePopperClose);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // ドロップ成功時 (eventはドロップ先の要素)
        const handleDrop = (event) => {
            if (props.open && !stadingRef.current.contains(event.target)) {
                // 画面においてドロップが成功しても指定の場所にドロップされていなければ閉じる
                props.setIsImagePopper(false);
                console.log(1)
            }
        };
        // ドラッグ終了時 (eventはドラッグしていた要素それ自身)
        const handleDragEnd = (event) => {
            // ドロップ失敗時
            if (event.dataTransfer.dropEffect === "none") {
                props.setIsImagePopper(false);
            }
        }
        window.addEventListener('drop', handleDrop);
        window.addEventListener('dragend', handleDragEnd);
        return () => {
            window.removeEventListener('drop', handleDrop);
            window.removeEventListener('dragend', handleDragEnd);
        };
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <StyledPopper open={props.open} anchorEl={props.imagePopperRef.current} placement='bottom' ref={popperRef}>
            <StyledProfilePopperPaper theme={theme}>
                <StyledPopperHeader theme={theme}>
                    商品を画像で検索
                    <StyledClose theme={theme} onClick={() => props.setIsImagePopper(false)} />
                </StyledPopperHeader>
                <StyledLetsUpload $isDragging={isDragging} theme={theme} onDrop={handleDrop} onClick={handleUploadClick} onDragOver={handleDragOver} onDragLeave={handleDragLeave} ref={stadingRef}>
                    <StyledAddBox theme={theme} />
                    <div style={{textAlign: "center"}}>
                        {isDragging ? "検索する商品画像をここにドロップ" : "クリックまたはドラッグで検索する商品画像を追加"}
                    </div>
                </StyledLetsUpload>
            </StyledProfilePopperPaper>
            <HiddenInput type="file" accept="image/png, image/jpg, image/jpeg" ref={fileInputRef} onChange={handleFileSelected}/>
        </StyledPopper>
        </>
    )
}


const StyledPopper = styled(Popper)`
    && {
        z-index: 200;
    }
`

const StyledProfilePopperPaper = styled(Paper)`
    && {
        width: 700px;
        max-width: 50vw;
        overflow-x: hidden;
        overflow-y: scroll;
        border-radius: 15px;
        padding: 0 15px 15px 15px;
        background-color: ${(props) => props.theme.palette.background.profilePop};

        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const StyledPopperHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    color: ${(props) => props.theme.palette.text.sub};
`

const StyledClose = styled(Close)`
    && {
        position: absolute;
        right: 5px;
        cursor: pointer;
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const StyledLetsUpload = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 250px;
    max-height: 50vh;
    cursor: pointer;
    overflow: hidden;
    word-break: break-all;
    border-radius: 15px;
    border: dashed 1px ${(props) => props.theme.palette.line.main};
    color: ${(props) => props.theme.palette.text.sub};
    background-color: ${(props) => (props.$isDragging ? props.theme.palette.background.imageUploadHover : props.theme.palette.background.imageUpload)};
    transition: background-color 0.1s;

    &:hover {
        background-color: ${(props) => props.theme.palette.background.imageUploadHover};
    }
`

const StyledAddBox = styled(AddBox)`
    && {
        width: 50px;
        height: 50px;
        color: ${(props) => props.theme.palette.text.sub};
    }
`

const HiddenInput = styled.input`
    display: none;
`


export default ImageSearchPopper