import React, { useEffect } from "react";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/ChatSlice";
import { generateRandomName, generateRandomString } from "../utils/helper";
const LiveChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomString(20),
        }),
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="border border-gray-400 rounded-lg">
      <div className="h-[30px] border border-b-4 my-2 mx-2 rounded-full border-gray-500 shadow-md">
        <h2 className="text-center text-gray-600">Live Chat 🔴</h2>
      </div>
      <div className=" flex w-full h-[370px] overflow-y-scroll flex-col-reverse">
        <div className="ml-2">
          {messages.length > 0 &&
            messages.map((m, i) => {
              return <Message name={m.name} message={m.message} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
