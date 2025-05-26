import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import '../static/Botchat.css'

interface Message {
  from: string;
  text: string;
  time?: string;
  _id?: string;
}

const defaultQuestions = [
  { from: "bot", text: "<h2>Please answer All questions individually</h2>" },
  { from: "bot", text: "What subjects or activities do you enjoy the most?" },
  { from: "bot", text: "What are your top 3 strengths or skills?" },
  { from: "bot", text: "What is your highest level of education?" },
  {
    from: "bot",
    text:
      "Do you have any preferences for your future job? (e.g., remote work, good salary, creative role)",
  },
];




const BotChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const email = useUser().user?.email;
  const [initialResponses, setInitialResponses] = useState<string[]>([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};
useEffect(() => {
  scrollToBottom();
}, [messages]);



  // 🔁 Load history from backend
  const fetchHistory = async () => {
    try {
      const res = await axios.post("https://hackers-404-5.onrender.com/history/loadhistory", {
        email,
      }, {
    withCredentials: true,  // <--- Add this here
  });

      const history = res.data.history;

      if (Array.isArray(history) && history.length > 0) {
        const validHistory = history.filter(
          (msg) => msg && msg.text && msg.from
        );

        if (validHistory.length > 0) {
          setMessages(validHistory);
        } else {
          setMessages(defaultQuestions);
          setIsNewUser(true);
        }
      } else {
        setMessages(defaultQuestions);
        setIsNewUser(true);
      }
    } catch (err) {
      console.error("Error loading history:", err);
      setMessages(defaultQuestions);
      setIsNewUser(true);
    }
  };

  // Load chat when component mounts or email changes
  useEffect(() => {
    if (email) fetchHistory();
  }, [email]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMsg: Message = { from: "user", text: newMessage };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const updatedResponses = [...initialResponses, newMessage];
    setInitialResponses(updatedResponses);

    const sendPayload: {
      email: string | undefined;
      message: string;
      questions?: { [key: string]: string }[];
      user_new?: boolean;
    } = {
      email,
      message: newMessage,
      user_new: isNewUser,
    };

    if (isNewUser && updatedResponses.length === 4) {
      sendPayload.questions = [
        { interests: updatedResponses[0] },
        { strengths: updatedResponses[1] },
        { education: updatedResponses[2] },
        { preferences: updatedResponses[3] },
      ];
    }

    if (isNewUser && updatedResponses.length < 4) {
      setNewMessage("");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
  "https://hackers-404-5.onrender.com/history/sendhistory",
  sendPayload, // Don't wrap it again
  {
    withCredentials: true // This ensures your cookie is sent
  }
);

      console.log(" Bot response received:", response.data);

      //  Instead of manually setting message, refetch all from backend
      await fetchHistory();

      if (isNewUser && updatedResponses.length === 4) {
        setIsNewUser(false);
        setInitialResponses([]);
      }
    } catch (err) {
      console.error(" Failed to send message or receive reply:", err);
      const botMsg: Message = {
        from: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }

    setNewMessage("");
    setLoading(false);
  };

  return (
    <div>
      <div className="border rounded-lg overflow-hidden m-4 shadow-lg">
        <div className="sticky top-0 z-50 border-b border-gray-300 bg-white py-5 px-8 text-left text-sm text-gray-800">
          <h4 className="inline-block py-1 text-left font-sans font-semibold normal-case">
            Career Guidance Bot
          </h4>
        </div>

        <div className="flex-grow px-8 pt-8 text-left text-gray-700">
          {messages.map((msg, idx) =>
            msg && msg.text && msg.from ? (
              <div
                key={idx}
                className={`relative mb-6 text-left flex ${msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div id="chatbor-response"
                  className={` inline-block rounded-md py-3 px-4 text-sm ${msg.from === "user"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-800 prose prose-sm sm:prose lg:prose-lg"
                    }`}
                >
                  {/* {msg.text} */}
                  {msg.from === "bot" ? (
                    <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text
                  )}

                </div>
                <>{console.log(messages)}</>
              </div>
            ) : null
          )}
          {loading && (
            <div className="mb-4 text-left">
              <div className="inline-block rounded-md py-2 px-4 bg-gray-100 text-gray-600 text-sm animate-pulse">
                Bot is typing...
              </div>
            </div>
          )}
            <div ref={messagesEndRef} />

          <div className="mt-4 flex items-start border-t border-gray-300 sm:p-8 py-4 text-left text-gray-700">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Your Message"
              className="mr-4 overflow-hidden w-full flex-1 resize-none rounded-md bg-white text-sm py-2 font-normal text-gray-600 opacity-70 shadow-none outline-none focus:text-gray-600 focus:opacity-100"
              rows={1}
            ></textarea>
            <button
              onClick={handleSend}
              className="inline-flex h-10 px-6 items-center justify-center rounded-md bg-blue-700 text-sm font-medium text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotChat;
