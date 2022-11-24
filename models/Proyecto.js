import mongose from "mongoose";

const proyectosSchema = mongose.Schema({
        nombre: {
            type: String,
            trim: true, 
            required: true,
        },
        descripcion:{
            type: String,
            trim: true, 
            required: true,
        },
        fechaEntrega: {
            type: Date, 
            default: Date.now(),
        },
        cliente:{
            type: String,
            trim: true, 
            required: true,
        },
        creador:{
            type: mongose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        tareas: [
            {
                type: mongose.Schema.Types.ObjectId,
                ref: "Tarea"
            }
        ],
        colaboradores: [
            {
                type: mongose.Schema.Types.ObjectId,
                ref: 'Usuario',
            },
        ],
    } , 
    {
        timestamps:true,
    }
);

const Proyecto = mongose.model("Proyecto", proyectosSchema);
export default Proyecto;