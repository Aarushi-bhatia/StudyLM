import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react'; // Assuming you use lucide for icons

export function ChatWindow() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_IP}/api/chats/${chatId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setMessages(data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatId) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]); // Optimistic update
    const tempInput = input;
    setInput("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_IP}/api/chats/${chatId}/messages`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ role: "user", content: tempInput })
        }
      );
      
      if (response.ok) {
        // Here you would typically trigger the AI response call
        console.log("Message saved successfully");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StudyLM..."
            className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full py-3 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-800 dark:text-neutral-200"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}