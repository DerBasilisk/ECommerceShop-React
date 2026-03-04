import { Router } from 'express';
import { sendMessage, getMessages, getConversations } from '../controllers/chatController.js';
import { verificarToken } from '../middlewares/auth.middleware.js'; // ← named import

const router = Router();

router.use(verificarToken); // ← nombre correcto

router.post('/',                 sendMessage);
router.get('/conversations',     getConversations);
router.get('/:receiverId',       getMessages);

export default router;