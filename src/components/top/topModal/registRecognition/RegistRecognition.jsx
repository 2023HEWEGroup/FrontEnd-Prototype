import { Visibility, VisibilityOff } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import images from 'react-payment-inputs/images';
import { useTheme } from '@mui/material';


const RegistRecognition = (props) => {

    const theme = useTheme();

    function formatPhoneNumber(phoneNumber) {
        const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        return formattedNumber;
    }

    return (
        <>
        <StyledRecognition>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>ユーザーネーム</StyledRecognitionName>
            <StyledRecognitionContent>{props.registUserName.trim()}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>ユーザーID</StyledRecognitionName>
            <StyledRecognitionContent>{props.registUserId}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>パスワード</StyledRecognitionName>
            <StyledRecognitionContent>{props.recognitionPasswordVisible ? props.registPassword : "*".repeat(props.registPassword.length)}{props.recognitionPasswordVisible ? <StyledVisibility onClick={props.handleRecognitionPasswordVisible}/> : <StyledVisibilityOff onClick={props.handleRecognitionPasswordVisible}/>}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>メールアドレス</StyledRecognitionName>
            <StyledRecognitionContent>{props.registMailAddress}</StyledRecognitionContent>
            </StyledRecognitionItem>
        </StyledRecognition>
        <StyledRecognition>
            <StyledRecognitionItem  theme={theme}>
            <StyledRecognitionName>お名前</StyledRecognitionName>
            <StyledRecognitionContent>{props.upperName} {props.lowerName}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem  theme={theme}>
            <StyledRecognitionName>お名前 (フリガナ)</StyledRecognitionName>
            <StyledRecognitionContent>{props.upperNameKana} {props.lowerNameKana}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>郵便番号</StyledRecognitionName>
            <StyledRecognitionContent>{props.formatPostalCode(props.postalCode)}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>住所</StyledRecognitionName>
            <StyledRecognitionContent>{props.prefecture}{props.city}{props.town}{props.houseNumber}</StyledRecognitionContent>
            </StyledRecognitionItem>
            <StyledRecognitionItem theme={theme}>
            <StyledRecognitionName>電話番号</StyledRecognitionName>
            <StyledRecognitionContent>{formatPhoneNumber(props.phoneNumber)}</StyledRecognitionContent>
            </StyledRecognitionItem>
        </StyledRecognition>
        <StyledRecognition>
            {props.cardChecked ?
                <>
                <StyledRecognitionItem theme={theme}>
                <StyledRecognitionName><StyledRecognitionCardImg {...props.getCardImageProps({ images })} /></StyledRecognitionName>
                <StyledRecognitionContent>{props.meta.cardType ? props.meta.cardType.displayName : "クレジットカードが選択されていません"}</StyledRecognitionContent>
                </StyledRecognitionItem>
                <StyledRecognitionItem theme={theme}>
                <StyledRecognitionName>カード番号</StyledRecognitionName>
                <StyledRecognitionContent>{props.creditCard.number}</StyledRecognitionContent>
                </StyledRecognitionItem>
                <StyledRecognitionItem theme={theme}>
                <StyledRecognitionName>有効期限</StyledRecognitionName>
                <StyledRecognitionContent>{props.creditCard.expiry}</StyledRecognitionContent>
                </StyledRecognitionItem>
                <StyledRecognitionItem theme={theme}>
                <StyledRecognitionName>CVC</StyledRecognitionName>
                <StyledRecognitionContent>{props.recognitionCVCVisible ? props.creditCard.cvc : "*".repeat(props.creditCard.cvc.length)} {props.recognitionCVCVisible ? <StyledVisibility onClick={props.handleRecognitionCVCVisible}/> : <StyledVisibilityOff onClick={props.handleRecognitionCVCVisible}/>}</StyledRecognitionContent>
                </StyledRecognitionItem>
                </>
                :
                <>
                <StyledRecognitionItem theme={theme}>
                    <StyledRecognitionName style={{width: "100%"}}>クレジットカードの登録なし</StyledRecognitionName>
                </StyledRecognitionItem>
                </>
            }
        </StyledRecognition>
        </>
    )
}


const StyledVisibility = styled(Visibility)`
    && {
        color: #777;
        cursor: pointer;
    }
`

const StyledVisibilityOff = styled(VisibilityOff)`
    && {
        color: #777;
        cursor: pointer;
    }
`

const StyledRecognitionCardImg = styled.svg`
    width: 50%;
    max-width: 100px;
    height: fit-content;
`

const StyledRecognition = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: solid 0.5px #333;
    border-radius: 5px;
    background-color: #000;
    margin-bottom: 30px;
`

const StyledRecognitionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 50px;
    padding: 5px;
    color: ${(props) => props.theme.palette.text.main2};
`

const StyledRecognitionName = styled.div`
    display: flex;
    align-items: center;
    width: 30%;
    word-wrap: break-word;
`

const StyledRecognitionContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    word-break: break-all;
    overflow: hidden;
`


export default RegistRecognition