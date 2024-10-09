import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton, Avatar, Button } from "@mui/material";
import { Message, Close, Send } from "@mui/icons-material";
import axios from "axios";
import logo1 from "../resources/logo1.png";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setMessages([
        { text: "Hi, I'm AI from MHP Porsche! How can I help?", isBot: true },
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setOptions(null);

      try {
        const response = await axios.post("http://localhost:5000/chat", {
          question: input,
        });

        const botResponse = response.data.Answer;
        
        if (Array.isArray(botResponse)) {
          setOptions(botResponse);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Please select one of the following options:", isBot: true },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, isBot: true },
          ]);
        }
      } catch (error) {
        console.error("Error fetching response from backend:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, something went wrong.", isBot: true },
        ]);
      }

      setInput("");
    }
  };

  const handleOptionSelect = (option) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: option, isBot: false },
      { text: `You selected: ${option}. How can I assist you further?`, isBot: true },
    ]);
    setOptions(null);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {isOpen ? (
        <Box
          sx={{
            width: 380,
            height: 450,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "#7091E6",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton sx={{ visibility: "hidden" }}>
              <Close />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              AI Assistant
            </Typography>
            <IconButton onClick={toggleChat} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: msg.isBot ? "flex-start" : "flex-end",
                  alignItems: "flex-start",
                }}
              >
                {msg.isBot && (
                  <Avatar sx={{ mr: 1, bgcolor: "#1976d2" }}>
                    <img
                      src={logo1}
                      alt="AI"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Avatar>
                )}
                <Typography
                  sx={{
                    bgcolor: msg.isBot ? "#e3f2fd" : "#e8f5e9",
                    color: "text.primary",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "70%",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            ))}
            {options && (
              <Box sx={{ mt: 2 }}>
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleOptionSelect(option)}
                    sx={{ mr: 1, mb: 1 }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              bgcolor: "#f5f5f5",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              sx={{
                mr: 1,
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  "& fieldset": {
                    borderColor: "#1976d2",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1565c0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0d47a1",
                  },
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              sx={{
                bgcolor: "#3D52A0",
                color: "white",
                "&:hover": { bgcolor: "#1565c0" },
                width: 40,
                height: 40,
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <IconButton
          onClick={toggleChat}
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            "&:hover": { bgcolor: "#1565c0" },
            width: 56,
            height: 56,
          }}
        >
          <Message />
        </IconButton>
      )}
    </Box>
  );
};

export default ChatBot;