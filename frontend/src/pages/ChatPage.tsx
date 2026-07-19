import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Paperclip, Send, Sparkles, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { postChat } from '../api/chatService';
import type { ChatMessage } from '../types';

const starterPrompts = [
  "What's today's weather in Delhi?",
  'Compare Delhi and Jaipur',
  'Show IMD forecast',
  'Find nearest weather station',
];

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Hello! I can help analyze live weather, compare stations, and interpret IMD forecasts. Ask me anything about the weather operating system.',
    timestamp: 'Now',
    toolSteps: ['Thinking...', 'Reading IMD Dataset...', 'Generating Response...'],
  },
];

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    setActiveTool('Thinking...');

    try {
      const response = await postChat({ message: userMessage.content });
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.reply || 'I am ready to assist.',
        timestamp: 'Now',
        toolSteps: ['Thinking...', 'Running LangGraph...', 'Reading IMD Dataset...', 'Generating Response...'],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setActiveTool('Generating Response...');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'The backend is unavailable. Please ensure the FastAPI server is running and try again.',
        timestamp: 'Now',
        toolSteps: ['Thinking...', 'Backend offline...', 'Retrying connection...'],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
      setActiveTool(null);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-[32px] border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-4 sm:px-6">
        <div>
          <p className="text-sm text-slate-400">AI Conversation</p>
          <h2 className="text-xl font-semibold text-white">WeatherOps Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-slate-700 bg-slate-950/70 p-2 text-slate-300">
            <Sparkles size={16} />
          </button>
          <button className="rounded-full border border-slate-700 bg-slate-950/70 p-2 text-slate-300">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[24px] border p-4 ${message.role === 'assistant' ? 'border-cyan-500/20 bg-slate-950/70' : 'border-slate-800 bg-slate-800/60'}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium text-slate-300">{message.role === 'assistant' ? 'WeatherOps AI' : 'You'}</div>
                <div className="flex gap-2">
                  <button onClick={() => copyMessage(message.content)} className="rounded-full p-1 text-slate-400 hover:text-white">
                    <Copy size={15} />
                  </button>
                </div>
              </div>
              <div className="prose prose-invert max-w-none text-sm leading-7 text-slate-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
              {message.toolSteps?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.toolSteps.map((step) => (
                    <span key={step} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-400">
                      {step}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}

          {error ? (
            <div className="rounded-[24px] border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">{error}</div>
          ) : null}

          {isTyping ? (
            <div className="rounded-[24px] border border-cyan-500/20 bg-slate-950/70 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <Sparkles size={16} />
                <span className="text-sm">Thinking...</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-400">{activeTool || 'Generating Response...'}</span>
              </div>
            </div>
          ) : null}

          <div className="rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-300 hover:border-cyan-400/40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="border-t border-slate-800/80 bg-slate-950/80 p-4 sm:p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          <div className="flex items-center gap-2 rounded-[24px] border border-slate-700 bg-slate-900/80 p-2">
            <button className="rounded-full p-2 text-slate-400">
              <Paperclip size={18} />
            </button>
            <textarea
              rows={2}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend();
                }
              }}
              className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-200 outline-none"
              placeholder="Ask about live weather, stations, forecasting, and analytics..."
            />
            <button onClick={() => void handleSend()} className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-3 text-white">
              <Send size={18} />
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-400">
            <span>Press Enter to send • Shift + Enter for a new line</span>
            <div className="flex gap-2">
              <button className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2">Stop</button>
              <button className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2">Regenerate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
