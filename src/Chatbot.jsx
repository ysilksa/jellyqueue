import { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [value, setValue] = useState(""); // Stores user input
    const [error, setError] = useState(""); // Stores error message
    const [response, setResponse] = useState(""); // Stores chatbot's response
    const [messages, setMessages] = useState([]); // Stores conversation history

    const availability = [
        {
            date: "2025-04-07",
            timeslots: [
                { start_time: "10:00 AM", end_time: "11:00 AM" },
                { start_time: "2:00 PM", end_time: "3:00 PM" },
            ]
        },
        {
            date: "2025-04-08",
            timeslots: [
                { start_time: "9:00 AM", end_time: "10:00 AM" },
                { start_time: "1:00 PM", end_time: "2:00 PM" },
            ]
        }
    ];

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
                    availability: availability,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch('http://127.0.0.1:5000/generate', options);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setMessages(prev => [
                    ...prev,
                    { text: value, isUser: true },
                    { text: data.response, isUser: false }
                ]);
                setValue(""); // ✅ Clear input field after send
                setResponse(data.response);
                setError("");
            }

        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching the response");
        }
    };

    const clear = () => {
        setValue("");
        setError("");
        setResponse("");
        setMessages([]);
    };

    return (
        <div className="chatbot">
            <section className="search-section">
                <div className="chat-history">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <input
                        value={value}
                        placeholder='Ask me anything about your schedule :)'
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                getResponse(); // ✅ Send on Enter
                            }
                        }}
                    />
                    {!error && <button onClick={getResponse}>Send</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>

                {error && <p>{error}</p>}
            </section>
        </div>
    );
};

export default Chatbot;
