import { React, useEffect } from "react";
import "./ResponsePage.css";

const ResponsePage = (props) => {
	// const sendResponseMessage = props.getResponseMessageCallbackFunc
    const responseMessage = props.responseMessage
    
    return (
		<div>
            <h3>{responseMessage}</h3>
		</div>
	)
}

export default ResponsePage;