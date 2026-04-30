import React, { useState } from "react";
import { apiUrl } from "../service/api";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { type: "user", text: message };
    setChat(prev => [...prev, userMsg]);

    try {
      const res = await fetch(`${apiUrl}/customer/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      const botMsg = {
        type: "bot",
        text: data.reply || "No response"
      };

      setChat(prev => [...prev, botMsg]);

    } catch {
      setChat(prev => [...prev, {
        type: "bot",
        text: "Something went wrong"
      }]);
    }

    setMessage("");
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 999 }}>
      
      {/* Toggle Button */}
      <button
        className="btn btn-dark rounded-circle"
        style={{ width: "50px", height: "50px" }}
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className="card shadow mt-2 d-flex flex-column"
          style={{ width: "300px", height: "400px" }}
        >
          
          {/* Header */}
          <div className="card-header bg-dark text-white fw-bold text-center">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="card-body overflow-auto d-flex flex-column">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 my-1 rounded ${
                  msg.type === "user"
                    ? "bg-success text-white align-self-end"
                    : "bg-light border align-self-start"
                }`}
                style={{ maxWidth: "80%" }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="card-footer d-flex">
            <input
              className="form-control me-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-dark" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;