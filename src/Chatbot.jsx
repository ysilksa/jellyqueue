import { useState } from 'react';
import './Chatbot.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Chatbot = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    prompt: value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await fetch('http://127.0.0.1:5000/generate', options);
            console.log('Response status:', res.status);  // Check status code
            //const data = await response.text()
            const data = await res.json();
            console.log("Response data:", data);

            if (data.error) {
                setError(data.error);  // Set error message if there is an error
            } else {
                setResponse(data.response);  // Set the generated response from Gemini
            }

        }
        catch (err) {
            console.error(err);
            setError("An error occurred while fetching the response");
        }
    }
    const clear = () => {
        setValue("");
        setError("");
        setResponse("");
    }

    return (
        <div className="chatbot">
            <section className ="search-section">
                <div className="input-container">
                    <input value={value} placeholder='Ask me anything about your schedule :)' onChange={(e) => setValue(e.target.value)}/>

                    {!error && <button onClick={getResponse}>Send</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>
                {error && <p>{error}</p>}
                <div className="search-result">
                    <div key={"response"}>
                        <p className="answer">{response}</p>
                    </div>
                </div>
                        
            </section>

        </div>
    );
}
export default Chatbot;
