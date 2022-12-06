import React, {useEffect, useState} from 'react';
import {Avatar, Divider, TextField} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function QuestionCreate(props) {
    return (
        <div className="row justify-content-center" style={{marginTop: "2%"}}>
            <div style={{ width: "80%",border: "1px solid grey", borderRadius: "25px", fontFamily: "serif"}}>
                <h5>Question {props?.questionID + 1}:</h5>
                <h1 style={{textAlign: "left"}}>{props.question?.question}</h1>
                <Divider style={{marginTop: "2%"}} sx={{ bgcolor: "#FFFFFF"}}/>
                {['Correct Answer', 'Dummy Answer 1', 'Dummy Answer 2', 'Dummy Answer 3'].map((key, idx) =>
                    <div className="row d-flex">
                        {key === 'Correct Answer' && <DoneIcon style={{width: "10%", color: "green",}}/>}
                        {key !== 'Correct Answer' && <CloseIcon style={{width: "10%", color: "red",}}/>}
                        <span style={{
                            textAlign: "left",
                            marginTop: "2%",
                            marginLeft: "2%",
                            width: "80%"
                        }}> {key === 'Correct Answer'? props.question?.correctAnswer: props.question?.decoyAnswers[idx - 1]}</span>
                        <Divider style={{marginTop: "2%"}} sx={{bgcolor: "#FFFFFF"}}/>
                    </div>)}
            </div>
        </div>
    );
}

export default QuestionCreate;
