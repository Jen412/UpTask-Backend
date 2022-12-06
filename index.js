import  express  from "express";
import dotenv from "dotenv";
import cors from "cors"
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectosRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import {Server} from "socket.io"

const app= express();
app.use(express.json())

dotenv.config()

conectarDB()

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        console.log(origin)
        if (whitelist.includes(origin)) {
            //puede consultarla
            callback(null, true);
        }
        else{
            //No esta permitido
            callback(new Error("Error de Cors"));
        }
    }
}
app.use(cors(corsOptions))
//Routing 

//usuarios
app.use("/api/usuarios", usuarioRoutes);
//Proyectoas
app.use("/api/proyectos", proyectosRoutes);
//tareas
app.use("/api/tareas", tareaRoutes);

const port = process.env.PORT || 4000;
const servidor = app.listen(port, () => {
    //console.log(`servidor corriendo en el puerto ${port}`);
});

//Socket.io
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors:{
        origin: process.env.FRONTEND_URL,
    },
});

io.on("connection", (socket)=>{
    //Definicion de eventos de socket io
})