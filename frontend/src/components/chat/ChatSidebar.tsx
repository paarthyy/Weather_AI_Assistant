import { Plus, MessageSquare } from "lucide-react";

interface ChatSession {
  _id: string;
  title: string;
}

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSession: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  sessions,
  currentSession,
  onSelect,
  onNewChat,
}: ChatSidebarProps) {
  return (
    <div className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Header */}

      <div className="border-b border-slate-800 p-4">

        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white hover:bg-cyan-700"
        >
          <Plus size={18} />
          New Chat
        </button>

      </div>

      {/* Sessions */}

      <div className="flex-1 overflow-y-auto p-3">

        {sessions.map((session) => (

          <button
            key={session._id}
            onClick={() => onSelect(session._id)}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition

            ${
              currentSession === session._id

                ? "bg-cyan-700 text-white"

                : "bg-slate-900 text-slate-300 hover:bg-slate-800"

            }`}
          >

            <MessageSquare size={18} />

            <span className="truncate">

              {session.title}

            </span>

          </button>

        ))}

      </div>

    </div>
  );
}