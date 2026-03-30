"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader } from "lucide-react";

const SYSTEM_PROMPT = `You are PrimeHealth Assistant, a helpful and friendly virtual health assistant for PrimeHealth — a Nigerian healthcare platform. 

You can help users with:
- General health questions and medical information
- Tracking and understanding their appointments (they may have upcoming appointments with Dr. Adebayo (Cardiologist, April 10 2026), Dr. Johnson (Pediatrician, April 22 2026) and completed appointments with Dr. Chukwu (Dermatologist, March 28 2026) and Dr. Ibrahim (Neurologist, March 15 2026))
- Explaining how to use PrimeHealth features
- General wellness tips and advice
- Answering questions about medications and pharmacy

Important rules:
- Always be warm, professional and concise
- Never diagnose conditions or prescribe medications
- Always recommend consulting a real doctor for serious medical concerns
- Keep responses short and easy to read — use bullet points when listing multiple items
- You are not a replacement for professional medical advice
- If asked about something outside health/medical topics, politely redirect to health topics`;

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi! I'm your PrimeHealth Assistant 👋 I can help you with health questions, appointment tracking, and more. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input.trim() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 1000,
                    system: SYSTEM_PROMPT,
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await response.json();
            const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";

            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickPrompts = [
        "What are my upcoming appointments?",
        "Give me a health tip",
        "How do I book an appointment?",
        "What medications should I avoid mixing?",
    ];

    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-[9999] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #10b981)",
                        boxShadow: "0 8px 32px rgba(59,130,246,0.5), 0 0 0 3px rgba(77,255,166,0.3)",
                    }}
                >
                    <Bot size={22} className="text-white" />
                </button>
            )}

            {/* Chat Panel */}
            {open && (
                <div
                    className="fixed bottom-6 right-6 z-[9999] w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    style={{
                        height: "520px",
                        background: "#0f172a",
                        border: "1px solid rgba(77,255,166,0.2)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(77,255,166,0.1)",
                    }}
                >

                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 shrink-0"
                        style={{ background: "linear-gradient(135deg, #1e3a5f, #0d2818)" }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                                <Bot size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold" style={{ color: "#4dffa6" }}>PrimeHealth Assistant</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <p className="text-xs text-slate-400">Online</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-slate-400 hover:text-white transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>

                                {/* Avatar */}
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600" : ""}`}
                                    style={msg.role === "assistant" ? { background: "linear-gradient(135deg, #3b82f6, #10b981)" } : {}}
                                >
                                    {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-sm"
                                        : "text-slate-200 rounded-tl-sm"
                                        }`}
                                    style={msg.role === "assistant" ? {
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    } : {}}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {loading && (
                            <div className="flex items-start gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}>
                                    <Bot size={14} className="text-white" />
                                </div>
                                <div className="px-3 py-2 rounded-2xl rounded-tl-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                    <Loader size={16} className="text-slate-400 animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Prompts */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                            {quickPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-300 hover:bg-white/10 transition"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-4 py-3 shrink-0 border-t border-white/10">
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything health related..."
                                rows={1}
                                className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm resize-none focus:outline-none"
                                style={{ maxHeight: "80px" }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim() || loading}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition shrink-0 disabled:opacity-40"
                                style={{ background: "linear-gradient(135deg, #3b82f6, #10b981)" }}
                            >
                                <Send size={14} className="text-white" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-600 text-center mt-2">
                            Not a substitute for professional medical advice
                        </p>
                    </div>

                </div>
            )}
        </>
    );
}