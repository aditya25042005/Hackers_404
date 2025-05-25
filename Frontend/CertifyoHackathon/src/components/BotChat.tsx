import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

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

const email = useUser().user?.email;

  const [initialResponses, setInitialResponses] = useState<string[]>([]);
  const [isNewUser, setIsNewUser] = useState(false);


  useEffect(() => {
    axios
      .post("http://localhost:8000/history/loadhistory", {
        email: email,
      })
      .then((res) => {
        console.log("API Response:", res.data);

        const history = res.data.history;

        if (Array.isArray(history) && history.length > 0) 
          {
          const validHistory = history.filter(
            (msg) => msg && msg.text && msg.from
          );

          if (validHistory.length > 0) {
            console.log("Valid history being set");
            setMessages(validHistory);
          } else {
            console.log("History exists but contains no valid messages");
            setMessages(defaultQuestions);
            setIsNewUser(true);
          }
        } else {
          console.log("No history array or empty");
          setMessages(defaultQuestions);
          setIsNewUser(true);
        }
      })
      .catch((err) => {
        console.error("Error loading history:", err);
        setMessages(defaultQuestions);
        setIsNewUser(true);
      });
  }, []);

  const handleSend = async () => {
  if (!newMessage.trim()) return;

  const userMsg: Message = { from: "user", text: newMessage };
  setMessages((prev) => [...prev, userMsg]);

  // Declare once
  const sendPayload: {
    email: string | undefined;
    message: string;
    questions?: { [key: string]: string }[];
  } = {
    email,
    message: newMessage,
  };

  const updatedResponses = [...initialResponses];

  // Track first 4 responses if new user
  if (isNewUser && updatedResponses.length < 4) {
    updatedResponses.push(newMessage);
    setInitialResponses(updatedResponses);

    if (updatedResponses.length === 4) {
      // Add 'questions' field to the existing object
      sendPayload.questions = [
        { interests: updatedResponses[0] },
        { strengths: updatedResponses[1] },
        { education: updatedResponses[2] },
        { preferences: updatedResponses[3] },
      ];
    }
  }

  try {
    const response = await axios.post("http://localhost:8000/history/sendhistory", sendPayload);

    if (response.data && response.data.reply) {
      const botMsg: Message = { from: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    }
  } catch (err) {
    console.error("Failed to send message or receive reply:", err);
  }

  setNewMessage("");
};




  // const handleSend = async () => {
  //   if (!newMessage.trim()) return;
  //   const userMsg: Message = { from: "user", text: newMessage }
  //   setMessages((prev) => [...prev, userMsg]);
  //   try {
  //     await axios.post("http://localhost:8000/history/sendhistory", {
  //       email: email,
  //       message: newMessage,
  //     });
  //   } catch (err) {
  //     console.error("Failed to send message to server:", err);
  //   }
  //   setNewMessage("");
  // }

//   const handleSend = async () => {
//   if (!newMessage.trim()) return;

//   const userMsg: Message = { from: "user", text: newMessage };
//   setMessages((prev) => [...prev, userMsg]);


//   if (isNewUser && initialResponses.length < 4) {
//     const updatedResponses = [...initialResponses, newMessage];
//     setInitialResponses(updatedResponses);


//     if (updatedResponses.length === 4) {
//       const structuredQuestions = [
//         { interests: updatedResponses[0] },
//         { strengths: updatedResponses[1] },
//         { education: updatedResponses[2] },
//         { preferences: updatedResponses[3] },
//       ];

//       try {
//         await axios.post("http://localhost:8000/history/sendhistory", {
//           email,
//           message: newMessage,
//           questions: structuredQuestions,
//         });
//         console.log(" Sent 4 structured answers");
//       } catch (err) {
//         console.error("Failed to send structured answers:", err);
//       }
//     } else {
//       // Less than 4 responses: still send message without questions array
//       try {
//         await axios.post("http://localhost:8000/history/sendhistory", {
//           email,
//           message: newMessage,
//         });
//       } catch (err) {
//         console.error("Failed to send partial message:", err);
//       }
//     }
//   } else {
//     // Old user or past initial 4 messages
//     try {
//       await axios.post("http://localhost:8000/history/sendhistory", {
//         email,
//         message: newMessage,
//       });
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   }

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
                className={`relative mb-6 text-left flex ${msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`inline-block rounded-md py-3 px-4 text-sm ${msg.from === "user"
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
