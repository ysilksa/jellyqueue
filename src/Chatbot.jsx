import { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [value, setValue] = useState(""); // Stores user input
    const [error, setError] = useState(""); // Stores error message
    const [response, setResponse] = useState(""); // Stores chatbot's response

    // Example availability data (you can modify or fetch this dynamically)
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

    // Function to fetch response from backend
    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question");
            return;
        }

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    prompt: value, // User's input prompt
                    availability: availability, // Availability data
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // Fetch response from backend
            const res = await fetch('http://127.0.0.1:5000/generate', options);
            console.log('Response status:', res.status);  // Check status code

            const data = await res.json();
            console.log("Response data:", data);

            if (data.error) {
                setError(data.error); // Set error message if there is an error
            } else {
                setResponse(data.response); // Set the generated response from backend
            }

        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching the response");
        }
    };

    // Clear the inputs and errors
    const clear = () => {
        setValue("");
        setError("");
        setResponse("");
    };

    return (
        <div className="chatbot">
            <section className="search-section">
                <div className="input-container">
                    <input 
                        value={value} 
                        placeholder='Ask me anything about your schedule :)' 
                        onChange={(e) => setValue(e.target.value)} 
                    />
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
};

export default Chatbot;
