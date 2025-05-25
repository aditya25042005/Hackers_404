import React, { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  from: string;
  text: string;
  time?: string;
  _id?: string;
}
  const defaultQuestions = [
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

  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("");

  const email = "dfdd@example.com";


  useEffect(() => {
  axios
    .post("http://localhost:8000/history/loadhistory", {
      email: email,
    })
    .then((res) => {
      console.log("API Response:", res.data);

      const history = res.data.history;

      if (Array.isArray(history) && history.length > 0) {
        const validHistory = history.filter(
          (msg) => msg && msg.text && msg.from
        );

        if (validHistory.length > 0) {
          console.log("Valid history being set");
          setMessages(validHistory);
        } else {
          console.log("History exists but contains no valid messages");
          setMessages(defaultQuestions);
        }
      } else {
        console.log("No history array or empty");
        setMessages(defaultQuestions);
      }
    })
    .catch((err) => {
      console.error("Error loading history:", err);
      setMessages(defaultQuestions);
    });
}, []);


  const handleSend= async()=>{
    if(!newMessage.trim()) return;
    const userMsg:Message = {from: "user", text: newMessage}
    setMessages((prev) => [...prev, userMsg]);
    try{
      await axios.post("http://localhost:8000/history/sendhistory",{
        email:email,
        message:newMessage,
      });
    }catch(err){
      console.error("Failed to send message to server:", err);
    }
    setNewMessage("");
  }

//   const handleSend = () => {
//   if (!newMessage.trim()) return;

//   const userMsg: Message = { from: "user", text: newMessage };
//   setMessages((prev) => [...prev, userMsg]);

//   // Send to backend
//   axios.post("http://localhost:8000/history/sendhistory", {
//     email: "user@example.com",
//     message: newMessage,
//     questions: [
//       { interests: "Programming, AI" },
//       { strengths: "Problem solving, Communication" },
//       { education: "Bachelor of Science in Computer Science" },
//       { preferences: "remote" }
//     ]
//   }).then((res) => {
//     console.log("✅ Message sent:", res.data);
//   }).catch((err) => {
//     console.error("❌ Error sending:", err.response?.data || err.message);
//   });

//   setNewMessage("");
// };



  return (
    <div>
      <div className="border rounded-lg overflow-hidden m-4 shadow-lg">
        <div className="sticky top-0 z-50  border-b  border-gray-300 bg-white py-5 px-8 text-left text-sm  text-gray-800">
          <h4 className=" inline-block py-1 text-left font-sans font-semibold normal-case">Career Guidance Bot</h4>
        </div>

        <div className="flex-grow px-8 pt-8 text-left text-gray-700">
          {messages.map((msg, idx) =>
  msg && msg.text && msg.from ? (
    <div
      key={idx}
      className={`relative mb-6 text-left flex ${
        msg.from === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`inline-block rounded-md py-3 px-4 text-sm ${
          msg.from === "user"
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {msg.text}
      </div>
    </div>
  ) : null
)}

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
  )
}

export default BotChat
