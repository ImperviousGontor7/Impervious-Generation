import { useEffect, useRef, useState } from "react";

import ForumHeader from "../components/ForumHeader";
import FAQItem from "../components/FaqItems";
import ContactCard from "../components/ContactCard";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

import { faqItems, initialMessages } from "../data/forum_data.js";

function Forum() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const formatTime = () => {
    const now = new Date();

    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) return;

    const newMessage = {
      id: Date.now(),
      text: trimmed,
      sender: "me",
      name: "You",
      time: formatTime(),
      avatar: "Y",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="relative z-10 text-white">
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 relative z-10">
        {/* CONTAINER */}

        <div
          className="
          mx-auto

          w-full
          max-w-[2200px]

          px-4
          sm:px-5
          md:px-6
          lg:px-7
          xl:px-8
          2xl:px-10

          py-5
        "
        >
          <ForumHeader />

          <div
            className="
            mt-8

            grid
            grid-cols-1

            gap-5
            md:gap-6
            xl:gap-7

            md:grid-cols-[280px_minmax(0,1fr)]
            xl:grid-cols-[320px_minmax(0,1fr)]
            2xl:grid-cols-[340px_minmax(0,1fr)]
            min-[1920px]:grid-cols-[380px_minmax(0,1fr)]

            items-start
          "
          >
            {/* FAQ */}

            <aside
              className="
              order-2

              md:order-1

              min-w-0

              md:sticky
              md:top-24
              md:self-start
            "
            >
              <div
                className="
                flex
                flex-col

                overflow-hidden

                rounded-3xl
                lg:rounded-4xl

                border
                border-white/10

                bg-white/5

                backdrop-blur-xl

                shadow-2xl
                shadow-black/20

                h-[70vw]
md:h-[calc(100vh-200px)]
lg:h-[calc(100vh-200px)]
xl:h-[calc(100vh-200px)]
2xl:h-[calc(100vh-200px)]
                min-[1920px]:h-224
              "
              >
                <div
                  className="
                  p-4
                  sm:p-5
                  md:p-6
                  lg:p-7
                  xl:p-8
                "
                >
                  <h2
                    className="
                    text-xl
                    sm:text-2xl
                    xl:text-3xl

                    font-semibold
                  "
                  >
                    FAQ
                  </h2>

                  <p
                    className="
                    mt-2

                    text-sm
                    sm:text-base

                    leading-relaxed

                    text-white/65
                  "
                  >
                    Temukan jawaban umum mengenai forum, aturan, serta cara
                    berinteraksi dengan baik.
                  </p>
                </div>

                {/* SCROLL FAQ */}

                <div
                  className="
                  flex-1

                  overflow-y-auto

                  px-4
                  sm:px-5
                  md:px-6
                  lg:px-7
                  xl:px-8

                  pb-6

                  space-y-4

                  scrollbar-thin
                  scrollbar-thumb-[#E3A419]/40
                  scrollbar-track-transparent
                "
                >
                  {faqItems.map((item, index) => (
                    <FAQItem
                      key={item.question}
                      index={index + 1}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}

                  <ContactCard />
                </div>
              </div>
            </aside>

            {/* CHAT */}

            <section
              className="
              order-1

              md:order-2

              min-w-0
            "
            >
              <div
                className="
                flex
                flex-col

                overflow-hidden

                rounded-3xl
                lg:rounded-4xl

                border
                border-white/10

                bg-white/5

                backdrop-blur-xl

                shadow-2xl
                shadow-black/20

                h-[100vw]

md:h-[calc(100vh-200px)]
lg:h-[calc(100vh-200px)]
xl:h-[calc(100vh-200px)]
2xl:h-[calc(100vh-200px)]
                min-[1920px]:h-224
              "
              >
                {/* CHAT AREA */}

                <div
                  className="
                  flex-1

                  overflow-y-auto

                  p-4
                  sm:p-5
                  md:p-6
                  lg:p-7
                  xl:p-8
                "
                >
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <ChatBubble key={msg.id} message={msg} />
                    ))}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* CHAT INPUT */}

                <div
                  className="
                  border-t
                  border-white/10

                  bg-black/10

                  backdrop-blur-md
                "
                >
                  <ChatInput
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;
