import { FaPaperPlane } from "react-icons/fa";

function ChatInput({ input, setInput, onSend }) {
  return (
    <form
      onSubmit={onSend}
      className="border-t border-white/10 bg-[#090909]/95 p-3 backdrop-blur-xl sm:p-4"
    >
      <div className="flex items-end gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="
            h-12 min-w-0 flex-1
            rounded-full border border-white/10
            bg-white/5 px-4
            text-[clamp(0.9rem,1vw,1rem)] text-white
            outline-none
            placeholder:text-white/35
            focus:border-marigold/35 focus:ring-2 focus:ring-[#E3A419]/20
          "
        />

        <button
          type="submit"
          className="
            flex h-12 w-12 shrink-0 items-center justify-center
            rounded-full bg-marigold
            text-black
            transition-all duration-200
            hover:-translate-y-0.5 hover:brightness-105
            active:translate-y-0
          "
          aria-label="Send message"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;