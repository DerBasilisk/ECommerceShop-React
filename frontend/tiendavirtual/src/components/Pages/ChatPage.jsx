import { useState } from 'react';
import ChatList from '../Layout/ChatList';
import ChatWindow from '../Layout/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const currentUserId = localStorage.getItem('userId'); // o de tu contexto de auth

  return (
    <div className="flex h-[calc(100vh-64px)] border rounded-xl overflow-hidden shadow-lg">
      <ChatList onSelectChat={setSelectedChat} />
      {selectedChat ? (
        <ChatWindow
          receiverId={selectedChat.receiver?._id}
          currentUserId={currentUserId}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Selecciona una conversación
        </div>
      )}
    </div>
  );
};

export default ChatPage;