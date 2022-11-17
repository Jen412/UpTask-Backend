import express from "express";
const router  = express.Router();
import {registrar,
        autenticar, 
        confirmar, 
        olvidePassword,
        comprobarToken,
        nuevoPassword,
        perfil
} from "../controllers/UsuarioController.js"

import checkAuth from "../middleware/checkAuth.js";

//Autentificacion, Registro y Confirmacion de Usuarios
router.post("/", registrar); //Registra un nuevo usuario 
router.post("/login", autenticar); //autenticar al usuario 
router.get("/confirmar/:token", confirmar); //Permite confirmar al usuario
router.post("/olvide-password", olvidePassword); //Nos brinda un nuevo token para cuando se pierda la password
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword); // lee un token para validarlo y Valida y guarda un nuevo password

router.get("/perfil", checkAuth, perfil);

export default router;