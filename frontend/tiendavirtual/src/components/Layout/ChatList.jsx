import { useEffect, useState } from 'react';
import UserSearch from './UserSearch';

const ChatList = ({ onSelectChat, selectedChatId }) => {
  const [conversations, setConversations] = useState([]);
  const currentUserId = JSON.parse(localStorage.getItem('usuario'))?._id;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/chat/conversations', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('usuario'))?.token}` }
        });
        const data = await res.json();
        if (data.ok) setConversations(data.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectUser = (usuario) => {
    onSelectChat({
      receiver: { _id: usuario._id, nombre: usuario.nombre }
    });
  };

  const getOtherUserId = (conv) => {
    const senderId = conv.sender?.toString();
    const receiverId = conv.receiver?.toString();
    return senderId === currentUserId?.toString() ? receiverId : senderId;
  };

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-5 bg-white border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Mensajes</h2>
      </div>

      {/* Buscador */}
      <div className="p-3 bg-white">
        <UserSearch onSelectUser={handleSelectUser} />
      </div>

      {/* Lista de Chats */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 opacity-60">
            <p className="text-sm text-gray-500 italic">Sin conversaciones aún</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const otherId = getOtherUserId(conv);
            const otherNombre = conv.otherUser?.nombre ?? `Usuario`;
            const isActive = selectedChatId === otherId;

            return (
              <div
                key={conv._id}
                onClick={() => onSelectChat({ receiver: { _id: otherId, nombre: otherNombre } })}
                className={`
                  flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' 
                    : 'hover:bg-white border-l-4 border-transparent hover:border-gray-200'}
                `}
              >
                {/* Avatar con gradiente */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-semibold text-white shadow-md">
                    {otherNombre?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  {/* Indicador Online (opcional) */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Info del Mensaje */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className={`text-sm font-semibold truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                      {otherNombre}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium uppercase">
                       {/* Aquí podrías poner conv.updatedAt formateado */}
                       Hace poco
                    </span>
                  </div>
                  
                  <p className={`text-xs truncate ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                    {conv.lastMessage || "Enviar un mensaje..."}
                  </p>
                </div>

                {/* Badge de No Leídos */}
                {conv.unread > 0 && (
                  <div className="flex-shrink-0">
                    <span className="bg-red-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center animate-pulse">
                      {conv.unread}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;