import { useState, useEffect } from 'react';
import './Chatbot.css';
import availabilityData from './assets/testing1.json'; // Importing the JSON file

const Chatbot = () => {
    const [value, setValue] = useState(""); // User input
    const [error, setError] = useState(""); // Error message
    const [messages, setMessages] = useState([]); // Message history
    const [loading, setLoading] = useState(false); // Loading state
    const [availability, setAvailability] = useState([]); // Store availability data

    // Log and set availability data properly
    useEffect(() => {
        console.log("Imported availability data:", availabilityData); // Verify if data is correctly imported
        setAvailability(availabilityData.availability); // Set availability from the imported JSON
    }, []);

    // Function to format the availability data and return only the first available time
    const formatAvailability = (availability) => {
        for (let item of availability) {
            if (item.timeslots.length > 0) {
                const firstTimeslot = item.timeslots[0];
                return `${item.date}: ${firstTimeslot.start_time} - ${firstTimeslot.end_time}`;
            }
        }
        // Return just the message without extra text if no slots are available
        return "No available time slots found.";
    };

    // Detect if the user's input is related to scheduling a meeting
    const isSchedulingRequest = (input) => {
        const schedulingKeywords = ["meeting", "schedule", "availability", "book", "appointment"];
        return schedulingKeywords.some(keyword => input.toLowerCase().includes(keyword));
    };

    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question");
            return;
        }

        setLoading(true);
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    prompt: value,
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
                let finalResponse = data.response;

                // If the input is related to scheduling, return availability
                if (isSchedulingRequest(value)) {
                    finalResponse = `Here is an available time for your meeting:\n${formatAvailability(availability)}`;
                }

                setMessages(prev => [
                    ...prev,
                    { text: value, isUser: true },
                    { text: finalResponse, isUser: false }
                ]);

                setValue(""); // Clear input field
                setError(""); // Clear any previous errors
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while fetching the response");
        } finally {
            setLoading(false);
        }
    };

    const clear = () => {
        setValue("");
        setError("");
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
                    {loading && <p className="bot-message">⏳ Thinking...</p>}
                </div>

                <div className="input-container">
                    <input
                        value={value}
                        placeholder='Ask me anything about your schedule :)'
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') getResponse();
                        }}
                        disabled={loading}
                    />
                    {!error && <button onClick={getResponse} disabled={loading}>Send</button>}
                    {error && <button onClick={clear}>Clear</button>}
                </div>

                {error && <p>{error}</p>}
            </section>
        </div>
    );
};

export default Chatbot;

// import { useState } from 'react';
// import './Chatbot.css';

// const Chatbot = () => {
//     const [value, setValue] = useState(""); // Stores user input
//     const [error, setError] = useState(""); // Stores error message
//     const [response, setResponse] = useState(""); // Stores chatbot's response
//     const [messages, setMessages] = useState([]); // Stores conversation history

//     const availability = [
//         {
//             date: "2025-04-07",
//             timeslots: [
//                 { start_time: "10:00 AM", end_time: "11:00 AM" },
//                 { start_time: "2:00 PM", end_time: "3:00 PM" },
//             ]
//         },
//         {
//             date: "2025-04-08",
//             timeslots: [
//                 { start_time: "9:00 AM", end_time: "10:00 AM" },
//                 { start_time: "1:00 PM", end_time: "2:00 PM" },
//             ]
//         }
//     ];

//     const getResponse = async () => {
//         if (!value) {
//             setError("Please enter a question");
//             return;
//         }

//         try {
//             const options = {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     prompt: value,
//                     availability: availability,
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             };

//             const res = await fetch('http://127.0.0.1:5000/generate', options);
//             const data = await res.json();

//             if (data.error) {
//                 setError(data.error);
//             } else {
//                 setMessages(prev => [
//                     ...prev,
//                     { text: value, isUser: true },
//                     { text: data.response, isUser: false }
//                 ]);
//                 setValue(""); // ✅ Clear input field after send
//                 setResponse(data.response);
//                 setError("");
//             }

//         } catch (err) {
//             console.error(err);
//             setError("An error occurred while fetching the response");
//         }
//     };

//     const clear = () => {
//         setValue("");
//         setError("");
//         setResponse("");
//         setMessages([]);
//     };

//     return (
//         <div className="chatbot">
//             <section className="search-section">
//                 <div className="chat-history">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
//                             <p>{message.text}</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="input-container">
//                     <input
//                         value={value}
//                         placeholder='Ask me anything about your schedule :)'
//                         onChange={(e) => setValue(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                                 getResponse(); 
//                             }
//                         }}
//                     />
//                     {!error && <button onClick={getResponse}>Send</button>}
//                     {error && <button onClick={clear}>Clear</button>}
//                 </div>

//                 {error && <p>{error}</p>}
//             </section>
//         </div>
//     );
// };

// export default Chatbot;
