import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  IoSend,
  IoChatbubblesOutline,
  IoPersonCircleOutline,
  IoAlertCircleOutline,
  IoCodeWorkingOutline
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://localhost:5000/";

function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👾 Hello! How can I assist you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 flex items-center space-x-4">
          <IoChatbubblesOutline className="text-3xl text-white animate-pulse" />
          <h1 className="text-2xl font-bold text-white">AI Chat Assistant</h1>
        </div>

        {/* Chat Container */}
        <div className="h-80 md:h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 shadow-md"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {msg.sender === "user" ? (
                      <IoPersonCircleOutline className="text-xl" />
                    ) : (
                      <IoCodeWorkingOutline className="text-xl text-purple-600" />
                    )}
                    <span className="text-sm font-medium">
                      {msg.sender === "user" ? "You" : "Assistant"}
                    </span>
                  </div>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatContainerRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-100 rounded-lg flex items-center text-red-600 text-sm"
            >
              <IoAlertCircleOutline className="mr-2 animate-bounce" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleChat} className="flex flex-col md:flex-row gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              rows="1"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !message.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <span className="animate-spin">🌀</span>
                </div>
              ) : (
                <>
                  <IoSend className="text-lg" />
                  <span className="hidden md:inline">Send</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatbotPage;