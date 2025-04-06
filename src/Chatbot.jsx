import { useState } from 'react';
import './Chatbot.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Chatbot = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    message: value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch('http://localhost:5173/gemini', options);
            const data = await response.text()
            console.log(data);
        }
        catch (err) {
            console.error(err);
            setError("An error occurred while fetching the response");
        }
    }
    const clear = () => {
        setValue("");
        setError("");
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
                    <div key={""}>
                        <p className="answer"></p>
                    </div>
                </div>
                        
            </section>

        </div>
    );
}
export default Chatbot;
