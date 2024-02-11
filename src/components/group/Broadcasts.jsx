import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, Button, useTheme } from '@mui/material'
import { Podcasts } from '@mui/icons-material'
import BroadCastBox from './BroadCastBox'
import { StyledTextField } from '../../utils/StyledTextField'
import io from 'socket.io-client';


const Broadcasts = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState({name: "", error: false, helper: ""});
    const [roomList, setRoomList] = useState();
    const theme = useTheme();

    const handleRoomChange = (e) => {
        setRoom((prev) => ({...prev, name: e.target.value}));
        if (e.target.value.length === 0) {
            setRoom((prev) => ({...prev, error: false, helper: ""}));
        } else if (e.target.value.trim() === "") {
            setRoom((prev) => ({...prev, error: true, helper: "空白のみの入力はできません"}));
        } else {
            setRoom((prev) => ({...prev, error: false, helper: ""}));
        }
    };

    const handleRoomCheck = () => {
        let flag = false;
        if (room.name.length === 0) {
            setRoom((prev) => ({...prev, error: true, helper: "ルーム名を入力して下さい"}));
            flag = true;
        } else if (room.name.trim() === "") {
            setRoom((prev) => ({...prev, error: true, helper: "空白のみの入力はできません"}));
            flag = true;
        }
        if (flag) return;
        else handleCreateRoom();
    };

    const handleCreateRoom = () => {
        const roomName = room.name; // ステートから再取得
        socket.emit('createRoom', props.group._id, roomName, props.currentUser._id); // 新しいチャットルームの作成をサーバーに送信
    }

    useEffect(() => {
        // サーバーとの接続を確立する
        const newSocket = io('http://localhost:5001');
        setSocket(newSocket);

        // クリーンアップ関数で接続を解除する
        return () => {
            newSocket.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleEnterRequest = (roomId, userId, groupId, index) => {
        socket.emit('enterRoom', roomId, userId, groupId, index); // 配信ルームに参加するリクエスト (index: そのグループの何番目の配信に入室するか)
    }

    useEffect(() => {
        if (socket) {
            // socketが設定されていることを確認し"broadcasts" ルームに参加する (配信一覧を見る共通ルーム)
            socket.emit("groupBroadcasts", props.group._id);

            // グループの配信一覧を取得
            socket.on('groupBroadcasts', (groupBroadcasts) => {
                setRoomList(groupBroadcasts);
                setIsLoading(false);
            });

            // 部屋を作成したら一意名ルームIDを取得。これを配信ページのURLに用いる。
            // broadcast/:roomIdにアクセスすると、配信に参加可能。ただし直接アクセスするだけではSocket.IOのルームに参加できない(joinされていないため)
            socket.on('roomId', (roomId) => {
                // 配信ウィンドウを開く
                window.open(`/broadcastLiver/${roomId}`, '_blank', 'width=600, height=400');
            });

            // クリーンアップ関数でイベントリスナーを削除する
            return () => {
                socket.off('groupBroadcasts');
                socket.off('roomId');
            };
        }
    }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Box display="flex" alignItems="end" flexDirection="column" margin="0 auto" width="95%" justifyContent="center" gap="20px" padding="50px 0 20px 0">
            <StyledTextField theme={theme} value={room.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "ルーム名 (1~50字)", fontSize: "0.9rem"}}
                onChange={handleRoomChange} error={room.error} helperText={room.helper} size="small" sx={{"& input::placeholder": {fontSize: '0.8rem'}}}/>
            <Button variant="contained" sx={{display: "flex", alignItems: "center", gap: "5px", p: "10px 50px", fontSize: "1rem", fontWeight: "bold", background: theme.palette.broadcast.gradient}} onClick={handleRoomCheck}><Podcasts /> <span>配信開始</span></Button>
        </Box>
        <StyledSection theme={theme}>配信一覧</StyledSection>
        {!isLoading ?
            <StyledBloadcasts>
                {roomList.map((room, index) =>
                    <BroadCastBox key={index} index={index} room={room} handleEnterRequest={handleEnterRequest} currentUser={props.currentUser} group={props.group}/>
                )
                }
            </StyledBloadcasts>
            :
            null
        }
        </>
    )
}


const StyledBloadcasts = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
    padding: 30px 0;
`

const StyledSection = styled.div`
    width: 100%;
    padding: 5px;
    font-size: 1rem;
    color: ${(props) => props.theme.palette.text.sub};
    border-bottom: solid 0.5px ${(props) => props.theme.palette.line.tab};
`


export default Broadcasts