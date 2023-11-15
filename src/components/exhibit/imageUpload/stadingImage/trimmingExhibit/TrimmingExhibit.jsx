import { Close } from '@mui/icons-material';
import { Button, IconButton, Modal, Tooltip, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import styled from 'styled-components';


const TrimmingExhibit = (props) => {

    const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
    const ASPECT_RATIO = 1/1;
    const canvasRef = useRef(null);
    const theme = useTheme();

    const handleModalKeyCommand = (event, index) => {
        if (event.key === 'Escape') {
            props.setTrimmingModal(false);
        } else if (event.key === 'Enter') {
            handleTrimmingComplete(index);
        }
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        const image = new Image();
        image.src = props.originalImages[props.index];
        
        image.onload = () => {
            drawImage(image, croppedAreaPixels);
        };
    };

    const onMediaLoaded = (mediaSize) => {
        setImageDimensions({ width: mediaSize.width, height: mediaSize.height });
    };

    const getCropSize = () => {
        // 画像の縦幅横幅の内小さい方をcropSizeに設定することで、最大のズーム領域を設定可能
        const minSize = Math.min(imageDimensions.width, imageDimensions.height);
        return { width: minSize, height: minSize };
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

    const handleTrimmingComplete = (index) => {
        // 新しい配列を作成
        const newUploadImages = [...props.uploadImages];
        // canvasRef からデータURLを取得
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL();
        // 配列要素を更新
        newUploadImages[index] = dataUrl;
        // 更新した配列を設定
        props.setUploadImages(newUploadImages);
        props.setTrimmingModal(false);

        // originalImagesを使っているのはトリミング確定後にステージング画像のAvatarを切り取られた表示にするため。
        // 以下三つの画像ステートの役割。

        // originalImages: 元の画像をステージングコンポーネントが削除されるまで保持します。削除する際は該当インデックスのデータが消えます。
        // 画像をどれだけトリミングしても、オリジナル画像からトリミングを再開するので安心。もし再びトリミングするときにトリミング後の画像からはじめたら、トリミングの度に画像が縮んでいくので。
        // オリジナル画像をブラウザが解釈可能な一時URLとして持っている。

        // uploadImages: 画像がステージングされた際に一時URLとして保存されるのはオリジナル画像と同じだが、こいつはトリミングする度にcanvasのトリミング後の内容をdataUrlとして更新する。
        // つまり何もしなければそのままだが、トリミングすれば常にその状態を持つ。

        // roductImages: 実施にサーバーに送信されるのはこちらのステート。uploadImages(トリミング後の画像DataUrl)を送信すれば良くね？と思うだろうが、そもそもそいつはcanvas.toDataUrlメソッドで更新されるため、
        // バックエンドのmulterが解釈できる形ではない。toDataUrlが表示に適しているのに対し、こちらのcanvas.toBlobはバイナリデータを送信する。
        // multerも解釈可能だし比較的軽量だし、そもそもtoDataUrlはmulter君読めませんでした。「長すぎるわ！」とかでエラー吐いてた。

        // キャンパス内の画像をバイナリ商品画像として登録
        canvas.toBlob((blob) => {
            const newProductImages = [...props.productImages];
            newProductImages[index] = blob;
            props.setProductImages(newProductImages);
        })
    };

    const handleCropChange = (crop) => {
        const newCrops = [...props.crops];
        newCrops[props.index] = crop;
        props.setCrops(newCrops);
    }

    const handleZoomChange = (zoom) => {
        const newZooms = [...props.zooms];
        newZooms[props.index] = zoom;
        props.setZooms(newZooms);
    }

    // 画像がステージングされた際に一度だけ発火。初期画像を仮想的なcanvasで切り抜いてバイナリ化、stateに格納。
    useEffect(() => {
        // 元画像を取得
        const image = new Image();
        image.src = props.originalImages[props.index];

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
            console.log(startX, startY)
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
                const newProductImages = [...props.productImages];
                newProductImages[props.index] = blob;
                props.setProductImages(newProductImages);
            })
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Modal open={props.trimmingModal}>
            <StyledModalInner onKeyDown={(event) => handleModalKeyCommand(event, props.index)}>
            <Tooltip title="キャンセル (Esc)" placement='bottom'>
                <StyledIconButton onClick={() => props.setTrimmingModal(false)} theme={theme}>
                    <StyledClose theme={theme}/>
                </StyledIconButton>
            </Tooltip>

            <Cropper image={props.originalImages[props.index]} crop={props.crops[props.index]} zoom={props.zooms[props.index]} minZoom={1} maxZoom={4} aspect={ASPECT_RATIO} onCropChange={handleCropChange}
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
    width: 150px;
    aspect-ratio: 1/1;
    max-width: 20vw;
`


export default TrimmingExhibit