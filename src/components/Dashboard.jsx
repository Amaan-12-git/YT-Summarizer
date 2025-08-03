import React from "react";
import Navbar from "./Navbar";
import { IoSend } from "react-icons/io5";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen h-[91vh]">
        <div className="bg-[#121212] w-full h-full flex justify-center items-center">
          <div className="lg:w-[60%] sm:w-[80%] w-[90%] h-full flex flex-col justify-between items-center">
            <div className="w-full flex-1 p-4 overflow-y-auto flex flex-col gap-5">
              <div className="w-full flex justify-end">
                <div className="user rounded-3xl bg-[#2f2f2f] max-w-[65%] h-fit p-4">
                  Lorem ipsum dolor sit amet, conllorem300 sectetur adipiscing
                  elit.
                </div>
              </div>
              <div className="w-full flex justify-start">
                <div className="ai rounded-3xl bg-[#2f2f2f] text-white w-[90%] h-fit p-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  expedita aspernatur repellendus voluptate excepturi placeat
                  eaque eum aut labore voluptates porro alias quod, sed
                  voluptatem non, nam eligendi quis doloremque iusto, fugiat
                  vitae temporibus provident? Neque atque itaque voluptatibus,
                  iste veritatis cum ullam fugiat, accusantium at delectus
                  maxime vero veniam.
                </div>
              </div>
            </div>

            <div className="w-full h-[19%] flex justify-center items-center">
              <div className="w-[90%] h-[80%] bg-[#252525] rounded-3xl flex gap-2 items-end">
                <textarea
                  placeholder="Ask..."
                  name="text"
                  id="text"
                  className="w-[94%] h-full bg-[#252525] text-lg p-3 rounded-3xl focus:outline-none placeholder:text-gray-400 text-white resize-none"
                ></textarea>
                <button className="mb-3 text-white">
                  <IoSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
