import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const agregarTarea = async (req, res) => {    
    const {proyecto} = req.body
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto) { 
        const error= new Error("El Proyecto no existe");
        return res.status(404).json({msg: error.message});
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error= new Error("No tienes los permisso para añadir tareas");
        return res.status(403).json({msg: error.message});
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log("🚀 ~ file: TareaController.js ~ line 21 ~ agregarTarea ~ error", error)
    }
};

const obtenerTarea = async (req, res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if (!tarea) {
        const error= new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }

    if (req.usuario._id.toString() !== tarea.proyecto.creador.toString()) {
        const error= new Error("Acción no válida");
        return res.status(403).json({msg: error.message});
    }

    res.json(tarea);
};

const actualizarTarea = async (req, res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if (!tarea) {
        const error= new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }
    if (req.usuario._id.toString() !== tarea.proyecto.creador.toString()) {
        const error= new Error("Acción no válida");
        return res.status(403).json({msg: error.message});
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log("🚀 ~ file: TareaController.js ~ line 63 ~ actualizarTarea ~ error", error)
    }
};

const elimnarTarea = async (req, res) => {
    const {id} = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if (!tarea) {
        const error= new Error("Tarea no encontrada");
        return res.status(404).json({msg: error.message});
    }
    if (req.usuario._id.toString() !== tarea.proyecto.creador.toString()) {
        const error= new Error("Acción no válida");
        return res.status(403).json({msg: error.message});
    }

    try {
        await tarea.deleteOne();
        res.json({msg: "Tarea Eliminada"})
    } catch (error) {
        console.log("🚀 ~ file: TareaController.js ~ line 84 ~ elimnarTarea ~ error", error);
    }
};

const cambiarEstado = async (req, res) => {};

export{
    agregarTarea, 
    obtenerTarea, 
    actualizarTarea, 
    elimnarTarea,
    cambiarEstado,
}