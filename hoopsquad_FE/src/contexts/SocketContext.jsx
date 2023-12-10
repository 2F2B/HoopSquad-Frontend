import React, { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { REACT_APP_PROXY } from "@env";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [chatRooms, setChatRooms] = useState(null);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    socketRef.current = io(REACT_APP_PROXY);

    socketRef.current.on("send", (message) => {
      const roomId = message.roomId;
      setChatList((prevChatList) => ({
        ...prevChatList,
        [roomId]: [...(prevChatList[roomId] || []), message],
      }));
    });

    socketRef.current.on("updateChatRoom", (updatedChatroom) => {
      setChatRooms((prevChatRooms) => {
        return prevChatRooms.map((room) => {
          if (room.roomId === updatedChatroom.roomId) {
            return { ...room, ...updatedChatroom };
          }
          return room;
        });
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socketRef, chatRooms, setChatRooms, chatList, setChatList }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
