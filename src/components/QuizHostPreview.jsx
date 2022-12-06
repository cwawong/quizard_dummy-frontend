import React, {useContext, useState} from 'react';
import {Button, Chip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import QuestionCreate from './QuestionCreate';
import {HostContext, socket} from '../App';

function QuizHostPreview(props) {

    const host = useContext(HostContext);


    const [uploaded, setUploaded] = useState(false);
    const [previewQuiz, setPreviewQuiz] = useState();
    const [previewQuizName, setPreviewQuizName] = useState();
    const [previewQuizQuestions, setPreviewQuizQuestions] = useState();

    const navigate = useNavigate();
    const handleUpload = event => {
        const reader = new FileReader();

        reader.onload = event => {
            const json = JSON.parse(event.target.result);
            setUploaded(true);
            setPreviewQuiz(json);
            setPreviewQuizName(json.name);
            setPreviewQuizQuestions(json.questions);
        }

        reader.readAsText(event.target.files[0]);
    }

    const handleStartHosting = event => {
        event.preventDefault();
        host.setHostInfo(state => ({...state, quiz: previewQuiz}));
        socket.emit('host-to-server', {
            message: 'create-room-request',
            quiz: previewQuiz,
        });
        navigate('/host/wait');
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
                    <h1 style={{fontFamily: 'serif',}}>Upload and preview your quiz!</h1>
                    <input type='file' accept='.json' onChange={handleUpload}/>
                    {uploaded &&
                        <React.Fragment>
                            <div className='row justify-content-center' style={{width: '100%'}}>
                                <div className='row d-flex justify-content-between' style={{width: '80%'}}>
                                    <h1 style={{width: '70%', textAlign: 'left'}}>{previewQuizName}</h1>
                                </div>
                            </div>
                            {previewQuizQuestions?.map((question, idx) => <QuestionCreate question={question} questionID={idx}/>)}
                            <Button style={{color: 'white', marginTop: '2%', height: '100px', width: '100%'}} onClick={handleStartHosting}>Start Hosting</Button>
                        </React.Fragment>
                    }
                </div>
            </div>
        </>
    );
}

export default QuizHostPreview;
