import React, {useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {PlayerContext, socket} from "../App";
import {Watch} from "react-loader-spinner";

function QuizJoin(props) {

    const player = useContext(PlayerContext);

    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState();
    const [preferredName, setPreferredName]  = useState();

    const handleJoinRoomRequest = event => {
        event.preventDefault();
        socket.emit('client-to-server', {
            message: 'join-room-request',
            preferredName: preferredName,
            roomCode: roomCode,
        });
    }

    const handleAnswerRequest = event => {
        event.preventDefault();
        socket.emit('client-to-server', {
            message: 'answer-question-request',
            playerAnswer: parseInt(event.target.value),
            roomCode: player.playerInfo?.roomCode,
        })
    }

    return (
        <>
            <Button onClick={() => navigate("/home")}
                    style={{color: "white", height: "100px", width: "100%"}}>Home</Button>
            <div style={{backgroundColor: "#1A1A1A"}}>
                <div className="container d-block" style={{
                    color: "#FFFFFF",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: "#1A1A1A",
                    height: "100%",
                }}>
                    {!player.playerInfo?.joinSuccess && player.playerInfo?.state === 'wait' &&
                        <form onSubmit={handleJoinRoomRequest}>
                            <div className="row d-flex"
                                 style={{justifyContent: "space-around", alignItems: "center"}}>
                                <TextField required label="Quiz Code" style={{width: "45%"}}
                                           onChange={(event) => setRoomCode(event.target.value)}/>
                                <TextField required label="Name" style={{width: "45%"}}
                                           onChange={(event) => setPreferredName(event.target.value)}/>
                            </div>
                            <div className="row d-flex"
                                 style={{justifyContent: "center", alignItems: "center"}}>
                                <Button type="submit"
                                        style={{width: "50%", height: "100px", color: "white"}}>Join</Button>
                            </div>
                        </form>}
                    {player.playerInfo?.joinSuccess && player.playerInfo?.state === 'wait' &&
                        <React.Fragment>
                            <div className="row justify-content-center d-flex" style={{
                                backgroundColor: "#333333",
                                boxShadow: "10px 10px #aaaaaa",
                                height: "auto",
                                alignItems: "center"
                            }}>
                            <h1>Room: {player.playerInfo?.roomCode}</h1>
                                <h1>Quiz Name: {player.playerInfo?.quizName}</h1>
                            <h1>Waiting host to start</h1>
                        </div>
                        <div className="row justify-content-center" style={{marginTop: "5%"}}>
                            <Watch
                                height="200"
                                width="200"
                                radius="48"
                                color="#4fa94d"
                                ariaLabel="watch-loading"
                                wrapperStyle={{justifyContent: "center"}}
                                visible={true}
                            />
                        </div>
                        </React.Fragment>
                    }
                    {player.playerInfo?.state === 'open' &&
                        <>
                            <h1>{player.playerInfo?.currentQuestion}</h1>
                        {player.playerInfo?.currentOptions?.map((option, idx) => <Button value={idx} style={{width: '20%'}} onClick={handleAnswerRequest}>{option}</Button>)}
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default QuizJoin;
