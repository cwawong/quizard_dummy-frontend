import React, {useContext, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {HostContext, socket} from '../App';
import QuestionCreate from './QuestionCreate';
import QuestionReveal from "./QuestionReveal";

function QuizHostGamePanel(props) {
    const navigate = useNavigate();
    const host = useContext(HostContext);

    useEffect(() => {
        if (host.hostInfo?.state === 'wait'){
            navigate('/home');
        }
    }, [])


    const handleOpenQuestion = event => {
        socket.emit('host-to-server', {
            message: 'open-question-request',
            roomCode: host.hostInfo?.roomCode
        })
    }

    const handleCloseQuestion = event => {
        socket.emit('host-to-server', {
            message: 'close-question-request',
            roomCode: host.hostInfo?.roomCode
        })
    }
    const handlePreviewQuestion = event => {
        if(host.hostInfo?.finish === true){
            navigate('/home');
            return;
        }
        socket.emit('host-to-server', {message: 'preview-question-request', roomCode: host.hostInfo?.roomCode});
    }

    return (
        <>
            <Button onClick={() => navigate('/home')}
                    style={{color: 'white', height: '100px', width: '100%'}}>Home</Button>
            <div style={{backgroundColor: '#1A1A1A'}}>
                <div className='container d-block' style={{
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#1A1A1A',
                    height: '100%',
                }}>
                    <h1 style={{fontFamily: 'sans-serif'}}>State: {host.hostInfo?.state}</h1>
                    <QuestionReveal questionID={host.hostInfo?.questionID} question={host.hostInfo?.currentQuestion} options={host.hostInfo?.currentOptions} answer={host.hostInfo?.currentAnswer}/>
                    {host.hostInfo?.state === 'preview' &&
                        <Button variant='outlined' style={{margin: '5%'}} onClick={handleOpenQuestion}>Publish Question</Button>}
                    {host.hostInfo?.state === 'open' &&
                        <>

                            <div>
                                {JSON.stringify(host.hostInfo?.players, null, 4)}
                            </div>
                            <Button variant='outlined' style={{margin: '5%'}} onClick={handleCloseQuestion}>Reveal Answer</Button>
                        </>}
                    {host.hostInfo?.state === 'close' &&
                        <>

                            <div>Question analysis: {JSON.stringify(host.hostInfo?.currentQuestionAnalysis, null, 4)}</div>
                            <div>Quiz analysis: {JSON.stringify(host.hostInfo?.quizAnalysis)}</div>
                            <Button variant='outlined' style={{margin: '5%'}} onClick={handlePreviewQuestion}>{host.hostInfo?.finish ? 'Bye': 'Preview next question'}</Button>
                        </>}
                </div>
            </div>
        </>
    );
}

export default QuizHostGamePanel;
