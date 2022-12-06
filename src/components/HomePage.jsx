import React, {useContext, useEffect, useState} from 'react';
import {Button, Chip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {HostContext, socket} from "../App";


function HomePage(props) {
    const navigate = useNavigate();

    const host = useContext(HostContext);

    useEffect(() => {
        host.setHostInfo(state => ({
            roomCode: null,
            players: []
        }));
    })


    return (
        <div className="container" style={{color: "#FFFFFF", justifyContent: "center", textAlign: "center", paddingTop: "20vh"}}>
            <h1 style={{fontFamily: "serif",}}>Welcome to Quizard!</h1>
            <div className="row ">
                <Button variant="text" style={{height: "100px", color: "#FFFFFF"}} onClick={(event) => navigate('/create')}>Create</Button>
                <Button variant="text" style={{height: "100px", color: "#FFFFFF"}} onClick={(event) => navigate('/join')}>Join </Button>
                <Button variant="text" style={{height: "100px", color: "#FFFFFF"}} onClick={(event) => navigate('/host/preview')}>Host</Button>
            </div>
        </div>
    );

}

export default HomePage;
