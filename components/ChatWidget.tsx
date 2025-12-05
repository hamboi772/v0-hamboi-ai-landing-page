"use client";

import React, { useState, useRef, FormEvent } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", text: "Hi — try typing a message and press Send." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function sendMessage(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      text: trimmed,
    };

    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "API error");
      }

      const data = await res.json();
      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: data.reply ?? "No reply",
      };

      setMessages((m) => [...m, assistantMessage]);
    } catch (err: any) {
      setMessages((m) => [
        ...m,
        { id: String(Date.now() + 2), role: "assistant", text: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col h-[480px]">
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-white dark:bg-gray-900 rounded-lg border">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-lg max-w-[85%] ${
              m.role === "user"
                ? "ml-auto bg-blue-50 dark:bg-blue-900/40 text-right"
                : "mr-auto bg-gray-100 dark:bg-gray-800 text-left"
            }`}
          >
            <div className="text-sm">{m.text}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="mt-3 flex items-center gap-2"
        aria-label="Send message"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-800"
          placeholder="Type a message..."
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
