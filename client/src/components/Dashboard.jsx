import React from "react";
import Navbar from "./Navbar";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);
  useEffect(() => {
    fetch("http://localhost:3000/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check response:", data);
        setLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:3000/dashboard/chats", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        await setMessages(data.chats || []);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setMessages([]);
      }
    };

    fetchChats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    try {
      const res = await fetch("http://localhost:3000/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
        credentials: "include",
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setInput("");
    }
  };

  const deleteChats = async () => {
    try {
      const res = await fetch("http://localhost:3000/dashboard/chats", {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        console.log("Chats deleted successfully");
      } else {
        console.error("Failed to delete chats");
      }
    } catch (err) {
      console.error("Error deleting chats:", err);
    }
  };

  return (
    <>
      <div className={`${modalOpen ? "blur-sm" : ""} transition duration-300`}>
        <Navbar />
      </div>
      <div className="w-screen h-[91vh] ">
        {messages.length === 0 && (
          <div className="w-full absolute h-[75%] flex justify-center items-center">
            <div className="text-gray-300 text-2xl">
              {loggedIn
                ? "Start chatting with the AI!"
                : "Please sign in to start chatting."}
            </div>
          </div>
        )}
        <div className="bg-[#121212] w-full h-full flex justify-center">
          <div className="lg:w-[60%] sm:w-[80%] w-[83%] h-full flex flex-col justify-between items-center">
            <div
              ref={chatRef}
              style={{ scrollBehavior: "smooth" }}
              className="w-full flex-1 p-4 overflow-y-auto flex flex-col gap-5 custom-scroll"
            >
              {messages.map((msg, index) =>
                msg.role === "user" ? (
                  <div key={index} className="w-full flex justify-end">
                    <div className="user rounded-3xl bg-[#2f2f2f] max-w-[65%] h-fit p-4">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="w-full flex justify-start">
                    <div className="ai rounded-3xl bg-[#2f2f2f] text-white w-[90%] h-fit p-4">
                      {msg.text}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="w-full h-[19%] flex justify-center items-center">
              <form
                className="w-[90%] h-[80%] bg-[#252525] rounded-3xl flex gap-2 items-end"
                onSubmit={handleSubmit}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!loggedIn}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Ask..."
                  name="text"
                  id="text"
                  className={
                    loggedIn
                      ? "w-[94%] h-full bg-[#252525] text-lg p-3 rounded-3xl focus:outline-none placeholder:text-gray-400 text-white resize-none"
                      : "w-[94%] h-full bg-[#252525] text-lg p-3 rounded-3xl focus:outline-none placeholder:text-gray-400 text-white resize-none cursor-not-allowed"
                  }
                ></textarea>
                <button
                  type="submit"
                  className="mb-3 text-white cursor-pointer"
                >
                  <IoSend size={20} className="" />
                </button>
              </form>
            </div>
          </div>
          {loggedIn && (
            <div
              onClick={() => setModalOpen(true)}
              className="group fixed top-20 lg:right-28 md:right-10 sm:right-2 right-0 bg-[#2f2f2f] p-3 rounded-full cursor-pointer"
            >
              <MdDelete className="text-white md:size-7 size-5" />
            </div>
          )}
        </div>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="bg-[#2f2f2f] text-white rounded-xl w-[80%] sm:w-[60%] md:w-[30%] p-6">
              <div className="mb-4 text-center text-lg">Delete all chats?</div>
              <div className="flex justify-around">
                <button
                  onClick={() => setModalOpen(false)}
                  className="py-2 px-4 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteChats();
                    setMessages([]);
                    setModalOpen(false);
                  }}
                  className="py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
