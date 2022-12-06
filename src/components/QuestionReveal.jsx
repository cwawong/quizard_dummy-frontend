import React from 'react';
import {Divider} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

function QuestionReveal(props) {
    return (
        <div className="row justify-content-center" style={{marginTop: "2%"}}>
            <div style={{ width: "80%",border: "1px solid grey", borderRadius: "25px", fontFamily: "serif"}}>
                <h5>Question {props?.questionID + 1}:</h5>
                <h1 style={{textAlign: "left"}}>{props?.question}</h1>
                <Divider style={{marginTop: "2%"}} sx={{ bgcolor: "#FFFFFF"}}/>
                {['A', 'B', 'C', 'D'].map((key, idx) =>
                    <div className="row d-flex">
                        <span style={{
                            textAlign: "left",
                            marginTop: "2%",
                            marginLeft: "2%",
                            width: "80%",
                            color: idx === props.answer ? 'green': idx === props?.selected ? 'red': 'white',
                        }}> {props?.options?.at(idx)}</span>
                        <Divider style={{marginTop: "2%"}} sx={{bgcolor: "#FFFFFF"}}/>
                    </div>)}
            </div>
        </div>
    );
}

export default QuestionReveal;
