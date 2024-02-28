import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box, CircularProgress, useTheme } from '@mui/material'
import { LiveTv, Pause, Replay } from '@mui/icons-material'
import BroadCastBox from './BroadCastBox'
import { StyledTextField } from '../../utils/StyledTextField'
import io from 'socket.io-client';
import { LoadingButton } from '@mui/lab'
import { useEnv } from '../../provider/EnvProvider'


const Broadcasts = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState({name: "", error: false, helper: ""});
    const [roomList, setRoomList] = useState();
    const [isLiving, setIsLiving] = useState(false); // ある配信を配信中かどうか(配信者の場合)
    const [isParticipating, setIsParticipating] = useState(false); // ある配信を視聴中かどうか
    const theme = useTheme();
    const { socketPath } = useEnv();

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
        if (!isLiving && !isParticipating) { // 配信中ならチェックバリデート処理は行わない
            let flag = false;
            if (room.name.length === 0) {
                setRoom((prev) => ({...prev, error: true, helper: "ルーム名を入力して下さい"}));
                flag = true;
            } else if (room.name.trim() === "") {
                setRoom((prev) => ({...prev, error: true, helper: "空白のみの入力はできません"}));
                flag = true;
            }
            if (flag) return;
        }
        handleCreateRoom();
    };

    const handleCreateRoom = () => {
        if (isParticipating || isLiving) {
            // 配信に参加していた場合、オブジェクトIDをキーにsocketIdを特定し、ルームを退出させる
            socket.emit(`leaveRoom`, props.currentUser._id);
            return;
        }
        const roomName = room.name; // ステートから再取得
        socket.emit('createRoom', props.group._id, roomName, props.currentUser._id, props.currentUser.username); // 新しいチャットルームの作成をサーバーに送信
    }

    useEffect(() => {
        // サーバーとの接続を確立する
        const newSocket = io(socketPath);
        setSocket(newSocket);

        // クリーンアップ関数で接続を解除する
        return () => {
            newSocket.disconnect();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleEnterRequest = (roomId, userId, groupId) => {
        socket.emit('enterRoom', roomId, userId, groupId); // 配信ルームに参加するリクエスト
    }

    useEffect(() => {
        if (socket) {
            // socketが設定されていることを確認し"broadcasts" ルームに参加する (配信一覧を見る共通ルーム)
            socket.emit("groupBroadcasts", props.group._id);

            // グループの配信一覧を取得。部屋が出来たりこのコンポーネントがマウントとされると発火
            socket.on('groupBroadcasts', (groupBroadcasts) => {
                setRoomList(groupBroadcasts);
                setIsLoading(false);
            });

            // 部屋を作成したら一意なルームIDを取得。これを配信ページのURLに用いる。
            // broadcast/:roomIdにアクセスすると、配信に参加可能。ただし直接アクセスするだけではSocket.IOのルームに参加できない(joinされていないため)
            socket.on('roomId', (roomId) => {
                // 配信ウィンドウを開く
                window.open(`/broadcastLiver/${roomId}?groupId=${props.group._id}`, '_blank', 'width=600, height=400');
            });

            // クリーンアップ関数でイベントリスナーを削除する
            return () => {
                socket.off('groupBroadcasts');
                socket.off('roomId');
            };
        }
    }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // 新しく配信ルーム群を取得する度に発火
        const handleLiveStatus = () => {
            for (const room of roomList) {
                if (room.liverId === props.currentUser._id) {
                    setIsLiving(true); // そのアカウントがグループ内の配信に参加していた場合、trueが設定される。
                    setIsParticipating(false);
                    return;
                }
            }
            for (const room of roomList) {
                for (let i = 0; i < room.users.length; i++) {
                    const userData = room.users[i];
                    if (userData.userId === props.currentUser._id) {
                        setIsParticipating(true); // そのアカウントが配信を視聴中だった場合、trueが設定される。
                        setIsLiving(false);
                        return;
                    }
                }
            }
            // 参加者でも配信者でもなかった場合
            setIsLiving(false);
            setIsParticipating(false);
        }
        if (roomList) {
            handleLiveStatus();
        }
    }, [roomList]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <Box display="flex" alignItems="end" flexDirection="column" margin="0 auto" width="95%" justifyContent="center" gap="20px" padding="50px 0 20px 0">
            <StyledTextField theme={theme} value={room.name} autoComplete='new-off' fullWidth inputProps={{maxLength: 50, placeholder: "ルーム名 (1~50字)", fontSize: "0.9rem"}}
                onChange={handleRoomChange} error={room.error} helperText={room.helper} size="small" sx={{"& input::placeholder": {fontSize: '0.8rem'}}}/>
            <LoadingButton loading={isLoading} variant="contained" sx={{p: "10px 50px", fontSize: "1rem", fontWeight: "bold", background: isLiving || isParticipating ? theme.palette.broadcast.gradientStop : theme.palette.broadcast.gradient, color: "#fff"}} startIcon={isLiving ? <Pause /> : isParticipating ? <Replay /> : <LiveTv />} onClick={handleRoomCheck}>{isLiving ? "配信停止" : isParticipating ? "ルーム退出" : "配信開始"}</LoadingButton>
        </Box>
        <StyledSection theme={theme}>配信一覧</StyledSection>
        {!isLoading ?
            <StyledBloadcasts>
                {roomList.map((room, index) =>
                    <BroadCastBox key={index} index={index} room={room} handleEnterRequest={handleEnterRequest} currentUser={props.currentUser} group={props.group} isLiving={isLiving} isParticipating={isParticipating}/>
                )
                }
            </StyledBloadcasts>
            :
            <Box display="flex" justifyContent="center" alignItems="center" height="75px">
                <CircularProgress color='secondary' />
            </Box>
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
    width: 95%;
    margin: 0 auto;
    padding: 30px 0;
`

const StyledSection = styled.div`
    width: 95%;
    padding: 5px;
    margin: 0 auto;
    font-size: 1rem;
    color: ${(props) => props.theme.palette.text.sub};
    border-bottom: solid 0.5px ${(props) => props.theme.palette.line.tab};
`


export default Broadcasts