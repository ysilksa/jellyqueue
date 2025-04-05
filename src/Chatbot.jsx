import React, { useState } from 'react';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message }), // ✅ match backend key
      });

      const data = await res.json();

      if (res.ok) {
        // Assuming response = client.models.generate_content(...) returns a dict with .text
        // But in your Python you returned: jsonify({'response': response}), 
        // So you may need to adjust how you parse it.
        setReply(data.response?.text || JSON.stringify(data.response));
      } else {
        setReply(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setReply('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h2>Gemini ChatBot</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={sendMessage}>Send</button>
      <p>Bot: {reply}</p>
    </div>
  );
}

export default Chatbot;
