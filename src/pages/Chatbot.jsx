import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoSend, IoChatbubblesOutline, IoPerson, IoEllipsisHorizontal, IoAlertCircleOutline } from "react-icons/io5";

const BASE_URL = "https://nt-backend-y8h1.onrender.com";

function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👾 Hello! How can I assist you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null);

  // Function to auto-scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message
  const handleChat = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/chat`, { message: message.trim() });
      const botResponse = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setError("⚠️ Failed to get a response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Enter key for message sending
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat(e);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-3xl p-6 bg-black border-2 border-red-600 rounded-lg shadow-lg cyber-glow">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-red-500 glow-text text-center flex items-center justify-center mb-6">
          <IoChatbubblesOutline className="mr-2 text-5xl" />
          AI Chatbot Assistant
        </h1>

        {/* Chat Display Box */}
        <div className="h-96 overflow-y-auto p-4 border border-red-500 rounded-md bg-black chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-3 rounded-lg text-white my-2 max-w-xs ${
                  msg.sender === "user" ? "bg-red-600" : "bg-gray-800 border-l-4 border-red-500"
                }`}
              >
                {msg.sender === "user" ? <IoPerson className="inline-block mr-1" /> : <IoChatbubblesOutline className="inline-block mr-1" />}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatContainerRef}></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-900 border border-red-700 rounded-md flex items-center">
            <IoAlertCircleOutline className="text-red-400 mr-2" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Input & Send Button */}
        <form onSubmit={handleChat} className="mt-4 flex space-x-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full h-12 p-3 bg-black border border-red-600 text-white rounded-md focus:ring-2 focus:ring-red-500 glow-input resize-none"
            onKeyDown={handleKeyPress}
          />

          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="p-4  border-red-600 bg-red-700 hover:bg-red-900 cyber-glow text-white font-bold rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed glow-button"
          >
            {loading ? (
              <>
                <IoEllipsisHorizontal className="animate-pulse mr-2" />
                Processing...
              </>
            ) : (
              <>
                <IoSend className="mr-2 cyber-glow " />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatbotPage;
