import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function Root(props) {
    const navigate = useNavigate();
    useEffect(() => navigate("/home"),[])
    return (
        <React.Fragment></React.Fragment>
    );
}

export default Root;
