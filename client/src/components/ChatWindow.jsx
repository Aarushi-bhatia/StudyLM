import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function ChatWindow() {
  const { chatId } = useParams(); // This will be 'undefined' for a new chat (on '/')
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(chatId);

  useEffect(() => {
    // If there's a chatId in the URL, fetch its messages
    if (chatId) {
      const fetchMessages = async () => {
        const response = await fetch(`/api/chats/${chatId}`);
        const data = await response.json();
        setMessages(data);
        setCurrentChatId(chatId);
      };
      fetchMessages();
    } else {
      // It's a new chat, so clear messages
      setMessages([]);
      setCurrentChatId(null);
    }
  }, [chatId]); // Re-run this effect when the URL (chatId) changes

  const handleSend = async (newMessageContent) => {
    // Your logic to send a message
    // This will call your POST /api/messages endpoint
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: currentChatId, // This will be null if it's a new chat
        content: newMessageContent
      })
    });
    
    const newMessages = await response.json(); // Assume backend returns new messages
    
    // ... update state, etc.
    // If it was a new chat, the backend should return the new chatId
    // and you should probably use navigate() from react-router to update
    // the URL to /chat/newChatId
  };

  // ... rest of your JSX to render messages and the input box
  return (
    <div>
      {/* ... map over 'messages' and display them ... */}
      {/* ... your input form that calls handleSend ... */}
    </div>
  );
}

