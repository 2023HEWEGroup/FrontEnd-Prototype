import { Close } from '@mui/icons-material';
import { Button, IconButton, Modal, Tooltip, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import styled from 'styled-components';


const EstablishHeaderTrimming = (props) => {

    const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
    const ASPECT_RATIO = 5/1;
    const canvasRef = useRef(null);
    const theme = useTheme();

    const handleModalKeyCommand = (event) => {
        if (event.key === 'Escape') {
            handleModalClose();
        } else if (event.key === 'Enter') {
            handleTrimmingComplete();
        }
    }

    const handleModalClose = () => {
        // キャンセルの際に前画像があれば設定(前画像がない(prevがnull)なら何もはいらない)
        props.setPreviewHeader(props.previewPrevHeader);
        props.setPreviewHeader(props.previewPrevHeader);
        props.setBinaryHeader(props.binaryPrevHeader);
        // ズームと位置を初期化して閉じる。
        props.setHeaderCrop({x: 0, y: 0});
        props.setHeaderZoom(1);
        props.setOpen(false);
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        const image = new Image();
        image.src = props.originalHeader;
        
        image.onload = () => {
            drawImage(image, croppedAreaPixels);
        };
    };

    const onMediaLoaded = (mediaSize) => {
        setImageDimensions({ width: mediaSize.width, height: mediaSize.height });
    };

    const getCropSize = () => {
        return { width: imageDimensions.width, height: imageDimensions.width / 5 };
    };

    const drawImage = (image, croppedAreaPixels) => {
        const canvas = canvasRef.current;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d'); // canvasタグに画像を生成するためのオブジェクト(ctx)を取得します
        ctx.drawImage(
            image, //これ、親から渡された画像です
            croppedAreaPixels.x, // 左上始点x
            croppedAreaPixels.y, // 左上始点y
            croppedAreaPixels.width, // 描画する画像の横幅
            croppedAreaPixels.height, // 描画する画像の縦幅
            0, // 描画先x座標
            0, // 描画先y座標
            croppedAreaPixels.width,  // 描画する横幅
            croppedAreaPixels.height // 描画する縦幅
        );

    }

    const handleTrimmingComplete = () => {
        // canvasRef からデータURLを取得
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        // トリミングした画像を設定
        props.setPreviewHeader(dataUrl);
        // 今回の画像を履歴として保存(次トリミングキャンセルした際に前のトリミング画像を表示。なければ前画像は空)
        props.setPreviewPrevHeader(dataUrl);
        // ズームと位置を初期化して閉じる。
        props.setHeaderCrop({x: 0, y: 0});
        props.setHeaderZoom(1);
        if (props.setIsHeaderDelete) props.setIsHeaderDelete(false);
        props.setOpen(false);

        // キャンパス内の画像をバイナリアイコンとして登録
        canvas.toBlob((blob) => {
            props.setBinaryHeader(blob);
            // 履歴をバイナリ保存
            props.setBinaryPrevHeader(blob);
        })
    };

    const handleCropChange = (crop) => {
        props.setHeaderCrop(crop);
    }

    const handleZoomChange = (zoom) => {
        props.setHeaderZoom(zoom);
    }

    // 画像がステージングされた際に一度だけ発火。初期画像を仮想的なcanvasで切り抜いてバイナリ化、stateに格納。
    useEffect(() => {
        // 元画像を取得
        const image = new Image();
        image.src = props.originalHeader;

        // 擬似的なキャンバスをとコンテクストの生成
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d');

        // 画像が読み込まれると処理スタート
        image.onload = () => {

            // キャンバスのサイズを指定
            const canvasSize = Math.min(image.width, image.height);
            canvas.width = canvasSize;
            canvas.height = canvasSize;

            // 元画像の中央を切り抜いて描画
            const startX = (image.width - canvasSize) / 2;
            const startY = (image.height - canvasSize) / 2;
            ctx.drawImage(
                // 元画像
                image,
                // 切り抜く範囲
                startX,
                startY,
                canvasSize,
                canvasSize,
                // 描画先のサイズ
                0,
                0,
                canvasSize,
                canvasSize
            );

            // バイナリ保存
            canvas.toBlob((blob) => {
                props.setBinaryHeader(blob);
            })
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Modal open={props.open}>
            <StyledModalInner onKeyDown={(event) => handleModalKeyCommand(event)}>
            <Tooltip title="キャンセル (Esc)" placement='bottom'>
                <StyledIconButton onClick={handleModalClose} theme={theme}>
                    <StyledClose theme={theme}/>
                </StyledIconButton>
            </Tooltip>

            <Cropper image={props.originalHeader} crop={props.headerCrop} zoom={props.headerZoom} minZoom={1} maxZoom={4} aspect={ASPECT_RATIO} onCropChange={handleCropChange}
            onCropComplete={onCropComplete} onZoomChange={handleZoomChange} cropSize={getCropSize()}
            classes={{containerClassName: "container", cropAreaClassName: "crop-area", mediaClassName: "media"}} onMediaLoaded={onMediaLoaded}
            showGrid />

            <StyledCanvas ref={canvasRef}></StyledCanvas>

            <StyledBottomCommands theme={theme}>
                <StyledButton size='large' color='secondary' variant='contained' onClick={() => handleTrimmingComplete(props.index)}>トリミング (Enter)</StyledButton>
            </StyledBottomCommands>
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
`

const StyledIconButton = styled(IconButton)`
    && {
        z-index: 100;
        position: absolute;
        top: 4%;
        right: 2%;
        width: fit-content;
        height: fit-content;
        color: #fff;
        background-color: ${(props) => props.theme.palette.background.slideHover};
        border-radius: 50%;
    }
`

const StyledClose = styled(Close)`
    && {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
`

const StyledBottomCommands = styled.div`
    position: absolute;
    bottom: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.palette.background.slideHover};
`

const StyledButton = styled(Button)`
    && {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const StyledCanvas = styled.canvas`
    position: absolute;
    bottom: 2%;
    left: 5%;
    width: 300px;
    aspect-ratio: 4/1;
    max-width: 20vw;
`


export default EstablishHeaderTrimming