import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";

const obtenerProyectos = async (req, res) =>{
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    res.json(proyectos);
}

const nuevoProyecto = async (req, res) =>{
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;
    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log("🚀 ~ file: ProyectoController.js ~ line 13 ~ nuevoProyecto ~ error", error)
    }
}

const obtenerProyecto = async (req, res) =>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({msg: error.message});
    }
    if (req.usuario._id.toString() !== proyecto.creador.toString()) {
        const error = new Error("Acción no Válida");
        return res.status(404).json({msg: error.message})
    }

    res.json(proyecto);
}

const editarProyecto = async (req, res) =>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({msg: error.message});
    }
    if (req.usuario._id.toString() !== proyecto.creador.toString()) {
        const error = new Error("Acción no Válida");
        return res.status(404).json({msg: error.message})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log("🚀 ~ file: ProyectoController.js ~ line 53 ~ editarProyecto ~ error", error);   
    }
}

const eliminarProyecto = async (req, res) =>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({msg: error.message});
    }
    if (req.usuario._id.toString() !== proyecto.creador.toString()) {
        const error = new Error("Acción no Válida");
        return res.status(404).json({msg: error.message})
    }

    try {
        await proyecto.deleteOne();
        res.json({msg: "Proyecto Eliminado"});
    } catch (error) {
        console.log("🚀 ~ file: ProyectoController.js ~ line 73 ~ eliminarProyecto ~ error", error);
    }
}

const agregarColaborador = async (req, res) =>{

}

const eliminarColaborador = async (req, res) =>{

}



export {
    obtenerProyectos, 
    nuevoProyecto,
    obtenerProyecto, 
    editarProyecto, 
    eliminarProyecto, 
    agregarColaborador, 
    eliminarColaborador,
}