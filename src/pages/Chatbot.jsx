import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { db } from "../firebase"; // Assume you've set up Firebase config
import { collection, doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import {
  IoSend,
  IoChatbubblesOutline,
  IoPersonCircleOutline,
  IoAlertCircleOutline,
  IoCodeWorkingOutline,
  IoTimeOutline
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://localhost:5000/";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatId, setChatId] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      let id = localStorage.getItem("chatId");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("chatId", id);
        await setDoc(doc(db, "chats", id), {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          messages: []
        });
      }
      setChatId(id);
      loadPreviousMessages(id);
    };
    initializeChat();
  }, []);

  const loadPreviousMessages = async (id) => {
    try {
      const docRef = doc(db, "chats", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingMessages = docSnap.data().messages;
        setMessages(existingMessages.length > 0 ? existingMessages : [
          { sender: "bot", text: "👾 Hello! How can I assist you today?", timestamp: new Date() }
        ]);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const saveMessageToFirestore = async (newMessage) => {
    try {
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: [...messages, newMessage],
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { 
      sender: "user", 
      text: message.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    saveMessageToFirestore(userMessage);
    setMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/chat`, { message: message.trim() });
      const botResponse = { 
        sender: "bot", 
        text: response.data.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      saveMessageToFirestore(botResponse);
    } catch (err) {
      setError("⚠️ Failed to get response. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 p-6 flex items-center space-x-4 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-300 to-purple-400" />
          <IoChatbubblesOutline className="text-3xl text-white animate-pulse" />
          <div>
            <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
            <p className="text-xs text-purple-200">Conversation ID: {chatId}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-80 md:h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-blue-50">
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
                  className={`max-w-xs md:max-w-md p-4 rounded-2xl relative ${
                    msg.sender === "user" 
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      : "bg-white text-gray-800 shadow-lg"
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
                  <p className="text-sm mb-2">{msg.text}</p>
                  <div className="flex items-center space-x-1 text-xs opacity-75">
                    <IoTimeOutline className="text-xs" />
                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 p-3 bg-white rounded-2xl shadow-md"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-sm text-gray-600">Assistant is typing...</span>
            </motion.div>
          )}
          
          <div ref={chatContainerRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gradient-to-t from-white via-white to-blue-50 border-t border-gray-200">
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
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none transition-all"
              rows="1"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !message.trim()}
              className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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

export default Chatbot;