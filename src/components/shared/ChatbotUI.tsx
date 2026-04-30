"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Button from "../ui/Button";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatbotUI() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! 👋 I'm your AI assistant. How can I help you today?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const sendPrompt = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isAiTyping) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setPrompt("");
    setIsAiTyping(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmed,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data: string = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            typeof data === "string" ? data : "Sorry, I couldn't process that.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 ${
          isOpen
            ? "scale-0 opacity-0 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
        aria-label="Open AI Chat"
      >
        <FaRobot className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white dark:border-gray-900"></span>
        </span>
      </Button>

      {/* Chatbot Modal / Popover */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-87.5 sm:w-100 h-137.5 max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500 origin-bottom-right transform ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-600 to-indigo-600 rounded-t-2xl text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <FaRobot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">
                AI Assistant
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Online • Always here to help
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="p-2 cursor-pointer text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            aria-label="Close Chat"
          >
            <IoClose className="w-6 h-6" />
          </Button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((msg, idx) =>
            msg.role === "ai" ? (
              // AI Message
              <div key={idx} className="flex items-end gap-2 max-w-[85%]">
                <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                  <FaRobot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm text-sm text-gray-700 dark:text-gray-200">
                  {msg.content}
                </div>
              </div>
            ) : (
              // User Message
              <div
                key={idx}
                className="flex items-end gap-2 max-w-[85%] ml-auto flex-row-reverse"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm font-semibold text-xs">
                  ME
                </div>
                <div className="p-3 bg-blue-600 rounded-2xl rounded-br-sm shadow-sm text-sm text-white">
                  {msg.content}
                </div>
              </div>
            ),
          )}

          {/* AI Typing Indicator */}
          {isAiTyping && (
            <div className="flex items-end gap-2 max-w-[85%]">
              <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-sm">
                <FaRobot className="w-4 h-4" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-1">
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Footer / Input */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isAiTyping}
              className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <Button
              onClick={sendPrompt}
              disabled={!prompt.trim() || isAiTyping}
              className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <FaPaperPlane className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
              Powered by AI • Responses may be inaccurate
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
