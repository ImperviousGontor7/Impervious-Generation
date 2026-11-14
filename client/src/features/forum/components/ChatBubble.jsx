function ChatBubble({ message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-marigold text-sm font-bold text-black">
        {message.avatar}
      </div>

      <div
        className={`flex max-w-[92%] flex-col sm:max-w-[85%] md:max-w-[75%] xl:max-w-[70%] ${
          isMe ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <div className="mb-1 flex items-center gap-2 text-[11px] sm:text-xs text-white/50">
          <span className="font-medium text-white/80">{message.name}</span>
          <span>{message.time}</span>
        </div>

        <div
          className={`
            rounded-2xl px-4 py-3 text-[clamp(0.88rem,1vw,1rem)] leading-relaxed
            ${isMe ? "rounded-br-md bg-marigold text-black" : "rounded-bl-md bg-white/8 text-white"}
          `}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;