import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatWindow = ({ receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // --- CORRECCIÓN CLAVE: Extraer userId según tu objeto de consola ---
  const { usuario } = useAuth();
  const currentUserId = usuario?._id;
  const token = usuario?.token;

  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/chat/${receiverId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.ok) setMessages(data.data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, [receiverId, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const messageText = input;
    setInput('');

    try {
      await fetch('http://localhost:8081/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId, message: messageText }),
      });
      // Opcional: podrías llamar a fetchMessages() aquí para actualización instantánea
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  if (!receiverId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 italic">
        Selecciona un contacto para chatear
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full bg-white border-l">
      {/* Header del Chat */}
      <div className="p-4 border-b flex items-center gap-3 bg-white shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
          {receiverName?.[0]?.toUpperCase()}
        </div>
        <div>
          <h2 className="font-bold text-gray-800 leading-none">{receiverName}</h2>
          <span className="text-[10px] text-green-500 font-medium">En línea</span>
        </div>
      </div>

      {/* Contenedor de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50">
        {messages.map((msg) => {
          // Extraemos el ID del sender (que viene populado del backend)
          const senderIdFromMsg = msg.sender?._id || msg.sender;
          
          // Comparamos contra el userId que sacamos del localStorage
          const isMine = String(senderIdFromMsg) === String(currentUserId);

          return (
            <div 
              key={msg._id} 
              className={`flex w-full mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                relative px-4 py-2 rounded-2xl text-sm shadow-sm transition-all
                max-w-[85%] md:max-w-[70%]
                ${isMine 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}
              `}>
                <p className="wrap-break-word leading-relaxed">{msg.message}</p>
                <p className={`text-[10px] mt-1 text-right opacity-60 ${isMine ? 'text-blue-100' : 'text-gray-400'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input de Mensajes */}
      <div className="p-4 border-t bg-white shrink-0">
        <div className="flex gap-2 max-w-5xl mx-auto items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-300 disabled:shadow-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;