import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Chip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {color, HostContext, socket} from "../App";

function QuizHostWait(props) {
    const navigate = useNavigate();
    const host = useContext(HostContext);

    const handleQuizStart = event => {
        socket.emit('host-to-server', {message: 'preview-question-request', roomCode: host.hostInfo?.roomCode});
        navigate('/host/game-panel')
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
                    <div className="row" style={{backgroundColor: "#333333", boxShadow: "10px 10px #aaaaaa", height: "200px",alignItems: "center"}}>
                        <h1>QUIZ CODE:<span style={{backgroundColor: "black", fontFamily: "Lucida Console, Courier, monospace",marginLeft: "2%", borderRadius: "5px" }}>{host.hostInfo?.roomCode}</span></h1>
                    </div>
                    <div className="row d-flex" style={{justifyContent: "center", margin: '5%'}}>
                        <h1>Quiz Name: {host.hostInfo?.quizName}</h1>
                        <h1>Number of participants: {host.hostInfo?.players.length}</h1>
                    </div>
                    <div className="row d-flex" style={{justifyContent: "center"}}>
                        <div className="row justify-content-center" style={{alignItems: "center"}}>
                            <Button style={{color: "white", fontSize: "20px", width: "20%", height: "auto", marginTop: "5%"}} onClick={handleQuizStart}>Start Test</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizHostWait;
