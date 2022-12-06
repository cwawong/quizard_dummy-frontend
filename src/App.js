import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {BrowserRouter, Link, Route, Routes, useNavigate} from 'react-router-dom';
import Root from './components/Root';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createTheme, hslToRgb, ThemeProvider} from '@mui/material';
import QuizCreate from './components/QuizCreate';
import QuizHostPreview from './components/QuizHostPreview';
import QuizHostWait from './components/QuizHostWait';
import {createContext, useEffect, useState} from 'react';
import QuizJoin from './components/QuizJoin';
import {blue, deepPurple, indigo, pink, purple, red, yellow} from '@mui/material/colors';
import QuizHostGamePanel from "./components/QuizHostGamePanel";

export const HostContext = createContext();

export const PlayerContext = createContext();

export const color = [red[500], blue[500], yellow[500], pink[500], purple[500], indigo[500], deepPurple[500]];

export const socket = io.connect('http://localhost:3001');

function App() {

    const [hostInfo, setHostInfo] = useState({
        roomCode: null,
        players: []
    })

    const [playerInfo, setPlayerInfo] = useState({
        joinSuccess: false,
        state: 'wait'
    });

    useEffect(() => {
        socket.on('server-to-host', res => {
            if (res.message === 'create-room-request') {
                setHostInfo(state => ({
                    ...state,
                    roomCode: res.roomCode,
                    quizName: res.quizName,
                }));
            }
            if (res.message === 'join-room-notification') {
                setHostInfo(state => ({...state, players: res.players}));
            }
            if (res.message === 'preview-question-response') {
                if (!res.success){
                    alert(res.failureReason);
                    return;
                }
                setHostInfo(state => ({
                    ...state,
                    currentQuestion: res.question,
                    currentOptions: res.options,
                    currentAnswer: res.answer,
                    questionID: res.questionID,
                    state: 'preview'
                }))

            }
            if (res.message === 'open-question-response'){
                console.log(hostInfo)
                if (!res.success){
                    alert(res.failureReason);
                    return;
                }

                setHostInfo(state => ({
                    ...state,
                    players: res.players,
                    state: 'open'
                }))
            }
            if (res.message === 'answer-question-notification') {
                setHostInfo(state => ({
                    ...state,
                    players: res.players,
                }))
            }
            if (res.message === 'close-question-response') {
                setHostInfo(state => ({
                    ...state,
                    players: res.players,
                    currentQuestionAnalysis: res.questionAnalysis,
                    quizAnalysis: res.quizAnalysis,
                    finish: res.finish,
                    state: 'close',
                }))
            }
        })
        socket.on('server-to-client', res => {
            if (res.message === 'join-room-response'){
                if (!res.success){
                    alert('The room code is invalid.');
                    return;
                }
                setPlayerInfo(state => ({
                    ...state,
                    joinSuccess: true,
                    roomCode: res.roomCode,
                    quizName: res.quizName,
                    info: res.player,
                }));
            }
            if (res.message === 'open-question-notification'){
                console.log(res);
                setPlayerInfo(state => ({
                    ...state,
                    currentQuestion: res.question,
                    currentOptions: res.options,
                    state: 'open',
                }))
            }
            if (res.message === 'answer-question-response'){
                // if (!res.success){
                //     alert(res.failureReason);
                // }
            }
            if (res.message === 'close-question-notification') {

                alert(res.answer);
            }
        })
    }, [socket])

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div style={{backgroundColor: '#1A1A1A', height: '100vh',}}>
            <ThemeProvider theme={theme}>
                <HostContext.Provider value={{hostInfo: hostInfo, setHostInfo: setHostInfo}}>
                    <PlayerContext.Provider value={{playerInfo: playerInfo, setPlayerInfo: setPlayerInfo}}>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/'
                                       element={<Root/>}/>
                                <Route path='/home'
                                       element={<HomePage/>}/>
                                <Route path='/create'
                                       element={<QuizCreate/>}/>
                                <Route path='/host/preview'
                                       element={<QuizHostPreview/>}/>
                                <Route path='/host/wait'
                                       element={<QuizHostWait/>}/>
                                <Route path='/host/game-panel'
                                       element={<QuizHostGamePanel/>}/>
                                <Route path='/join'
                                       element={<QuizJoin/>}/>
                            </Routes>
                        </BrowserRouter>
                    </PlayerContext.Provider>
                </HostContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
