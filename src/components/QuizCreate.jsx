import React, {useContext, useState} from 'react';
import {Button, Divider, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import QuestionCreate from "./QuestionCreate";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {Form, useNavigate} from "react-router-dom";


function QuizCreate(props) {
    const [quizName, setQuizName] = useState();
    const [draftMode, setDraftMode] = useState(true);
    const [draftOptions, setDraftOptions] = useState({
            question: "",
            correctAnswer: "",
            decoyAnswers: ['', '', '']
        });
    const [questionList, setQuestionList] = useState([]);

    const navigate = useNavigate();

    const handleCreateQuestion = event => {
        event.preventDefault();
        setDraftMode(false);
        questionList.push(draftOptions);
        setQuestionList(questionList);
        setDraftOptions({
            question: "",
            correctAnswer: "",
            decoyAnswers: ['', '', '']
        });
    }

    const handleCreateQuiz = event => {
        if (questionList.length === 0){
            alert("At least 1 question should be created.");
            return;
        }

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify({
                name: quizName,
                questions: questionList,
            })
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `quizard-${quizName}.json`;
        link.click();
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
                    <h1 style={{fontFamily: "serif",}}>Create a new quiz!</h1>

                    <TextField required label="Quiz Name" onChange={(event) => setQuizName(event.target.value)}
                               style={{width: "80%", marginTop: "2%"}}/>

                    <div className="row justify-content-center" style={{width: "100%"}}>
                        <div className="row d-flex"
                             style={{justifyContent: "space-between", paddingTop: "2%", width: "80%"}}>
                            <div className="col-6">
                                <h1 style={{width: "30%", fontFamily: "serif", textAlign: "left"}}>Questions:</h1>
                            </div>
                            <div className="col-6  d-flex" style={{justifyContent: "flex-end"}}>
                                <Button variant="outlined" style={{width: "20%", marginRight: "2%"}}
                                        onClick={(event => setDraftMode(false))}>
                                    <strong>Discard</strong>
                                </Button>
                                <Button variant="contained" style={{width: "20%", marginRight: "2%"}}
                                        onClick={(event => setDraftMode(true))}>
                                    <strong>Draft</strong>
                                </Button>
                            </div>
                        </div>
                    </div>
                    {<p>{draftOptions["answer"]}</p>}
                    {
                        draftMode &&
                        <div className="row justify-content-center" style={{width: "100%"}}>
                            <div className="row d-flex"
                                 style={{justifyContent: "space-between", paddingTop: "2%", width: "80%"}}>
                                <form onSubmit={handleCreateQuestion}>
                                    <TextField label="Question" style={{width: "100%"}} onChange={(event) => {
                                        setDraftOptions(state => ({...state, question: event.target.value}));
                                    }}/>
                                    <Divider style={{margin: "2%"}} sx={{bgcolor: "#FFFFFF"}}/>
                                    {['Correct Answer', 'Dummy Answer 1', 'Dummy Answer 2', 'Dummy Answer 3'].map((key, idx) =>
                                        <div className="row" style={{alignItems: "center", marginTop: "2%",}}>
                                            <TextField required label={key}
                                                       style={{width: "80%",}}
                                                       onChange={(event) => {
                                                           if(key === 'Correct Answer'){
                                                               setDraftOptions(state => ({...state, correctAnswer: event.target.value}))
                                                           }
                                                           else{
                                                                let temp = draftOptions.decoyAnswers;
                                                                temp[idx - 1] = event.target.value;
                                                                setDraftOptions(state => ({...state, decoyAnswers: temp}))
                                                           }
                                                       }}/>
                                            {key === 'Correct Answer' && <DoneIcon style={{width: "10%", color: "green",}}/>}
                                            {key !== 'Correct Answer' && <CloseIcon style={{width: "10%", color: "red",}}/>}
                                        </div>
                                    )}
                                    <Button type="submit" variant="contained"
                                            style={{
                                                marginTop: "2%",
                                                marginBottom: "2%"
                                            }}><strong>Create</strong></Button>
                                </form>
                            </div>
                        </div>

                    }
                    {questionList.map((question, idx) => <QuestionCreate question={question} questionID={idx}/>)}
                    <Button onClick={handleCreateQuiz}
                            style={{color: "white", marginTop: "2%", height: "100px", width: "100%"}}>create
                        quiz</Button>
                </div>
            </div>
        </>
    );
}

export default QuizCreate;
