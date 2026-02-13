import express from 'express';
import cors from 'cors';
import "./db/db.js";
import ProductosRouter from "./routes/productos.js";
import UserRouter from "./routes/user.js";
import LoginRouter from "./routes/login.js";
import PerfilRouter from "./routes/perfil.js";
import RecuperarPassword from "./routes/recuperar.js"
import PedidosRouter from "./routes/pedido.js"
import adminRoutes from "./routes/admin.js"

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido al curso de node express');
});

app.use("/api/productos", ProductosRouter);
app.use("/api/user", UserRouter);
app.use("/api/login", LoginRouter); 
app.use("/api/perfil", PerfilRouter);
app.use("/api/Recuperar", RecuperarPassword);
app.use("/api/pedidos", PedidosRouter);
app.use("/api/admin", adminRoutes);

app.listen(8081, () => console.log('Servidor corriendo en http://localhost:8081'));
