import Message from '../models/message.js';

// Genera un roomId único y consistente entre dos usuarios
const getRoomId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// Enviar mensaje
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.usuario._id; // viene del middleware de auth

    const roomId = getRoomId(senderId, receiverId);

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      roomId,
      message,
    });

    return res.status(201).json({ ok: true, data: newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: 'Error al enviar mensaje.' });
  }
};

// Obtener historial de una conversación
export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.usuario._id;

    const roomId = getRoomId(senderId, receiverId);

    const messages = await Message.find({ roomId })
      .sort({ createdAt: 1 }) // orden cronológico
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    // Marcar como leídos los mensajes recibidos
    await Message.updateMany(
      { roomId, receiver: senderId, read: false },
      { read: true }
    );

    return res.status(200).json({ ok: true, data: messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: 'Error al obtener mensajes.' });
  }
};

// Obtener lista de conversaciones del usuario
export const getConversations = async (req, res) => {
  try {
    const userId = req.usuario._id;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id:         '$roomId',
          lastMessage: { $first: '$message' },
          lastDate:    { $first: '$createdAt' },
          sender:      { $first: '$sender' },
          receiver:    { $first: '$receiver' },
          unread: {
            $sum: {
              $cond: [{ $and: [{ $eq: ['$receiver', userId] }, { $eq: ['$read', false] }] }, 1, 0]
            }
          }
        }
      },
      // ← Populate del otro usuario
      {
        $lookup: {
          from:         'users',
          localField:   'sender',
          foreignField: '_id',
          as:           'senderData'
        }
      },
      {
        $lookup: {
          from:         'users',
          localField:   'receiver',
          foreignField: '_id',
          as:           'receiverData'
        }
      },
      {
        $addFields: {
          otherUser: {
            $cond: {
              if:   { $eq: ['$sender', userId] },
              then: { $arrayElemAt: ['$receiverData', 0] },
              else: { $arrayElemAt: ['$senderData', 0] }
            }
          }
        }
      },
      {
        $project: {
          lastMessage: 1, lastDate: 1, sender: 1, receiver: 1, unread: 1,
          'otherUser._id':    1,
          'otherUser.nombre': 1,
          'otherUser.correo': 1,
        }
      },
      { $sort: { lastDate: -1 } }
    ]);

    return res.status(200).json({ ok: true, data: conversations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, message: 'Error al obtener conversaciones.' });
  }
};