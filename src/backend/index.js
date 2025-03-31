const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = require('./connection');

//consultas selec por id y tablas completas
app.get("/api/consultaIdPersonajes/:id", async (request, response) => {
    try {
        const resultado = await db.query("select * from personajes where id = $1", [request.params.id]);
        response.json(resultado.rows);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Error al consultar el personaje" });
    }
});

app.get("/api/consultaIdActores/:id", async (request, response) => {
    try {
        const resultado = await db.query("select * from actores where id = $1", [request.params.id]);
        response.json(resultado.rows);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Error al consultar el actor" });
    }
});

app.get("/api/selectTablas/:tabla", async (request, response) => {
    try {
        const { tabla } = request.params;
        const resultado = await db.query(`SELECT * FROM ${tabla}`);
        console.log(resultado.rows);
        response.json(resultado.rows); 
    } catch (error) {
        console.log(error);
    }
});

//funciones update, delete, insert 


app.post("/api/insertarPersonajes", async (request, response) => {
    try {
        const { Nombre, Rol, Pelicula, Descripcion } = request.body;
        const query = `insert into personajes (nombre, rol, pelicula, descripcion)
            values ($1, $2, $3, $4) `;

        await db.query(query, [Nombre, Rol, Pelicula, Descripcion]);

        response.json({ mensaje: "Personaje insertado correctamente" }); 
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/insertarActores", async (request, response) => {
    try {
        const { nombre, edad, nacionalidad, premios } = request.body;
        const query = `insert into actores (nombre, edad, nacionalidad, premios)
            values ($1, $2, $3, $4) `;

        await db.query(query, [nombre, edad, nacionalidad, premios]);

        response.json({ mensaje: "Actor insertado correctamente" }); 
    } catch (error) {
        console.log(error);
    }
});

app.put("/api/actualizarPersonajes", async (request, response) => {
    try {
        const { id, nombre, rol, pelicula, descripcion } = request.body;

        const query = `update personajes set nombre = $1, rol = $2, pelicula = $3, descripcion = $4 WHERE id = $5`;

        await db.query(query, [nombre, rol, pelicula, descripcion,id]);

        response.json({ mensaje: "Personaje actualizado correctamente" });
    } catch (error) {
        console.log(error);
    }
});

app.put("/api/actualizarActores", async (request, response) => {
    try {
        const { id, nombre, edad, nacionalidad, premios } = request.body;

        const query = `update actores set nombre = $1, edad = $2, nacionalidad = $3, premios = $4 where id = $5`;

        await db.query(query, [nombre, edad, nacionalidad, premios, id]);

        response.json({ mensaje: "Actor actualizado correctamente" });
    } catch (error) {
        console.log(error);
    }
});

app.delete("/api/eliminarPersonaje/:id", async (request, response) => {
    try {
        const resultado = await db.query("delete from personajes where id = $1" ,[request.params.id]  );
       
        response.json({ mensaje: "Personaje eliminado correctamente" });

    } catch (error) {

        console.log(error);
        
    }
});

app.delete("/api/eliminarActores/:id", async (request, response) => {
    try {
        const resultado = await db.query("delete from actores where id = $1" ,[request.params.id]  );
       
        response.json({ mensaje: "Actor eliminado correctamente" });

    } catch (error) {

        console.log(error);
        
    }
});
//funciones realizadas en clase

app.get("/api/prueba/",(request,response)=>{
    console.log("ya charcha esto de los apis");
    response.send("respuesta");
})

app.get("/api/saludo/",(request,response)=>{
    
    response.json({mensaje:"hola mundo"});
})

app.get("/api/dato/:id",(request,response)=>{
    console.log(request.params.id);
    response.json();
})

app.get("/api/info/:nombre", (request, response) => {
    const nombre = request.params.nombre; 
    response.json({ mensaje: "Hola " + nombre }); 
});

app.post("/api/post",(req, res) =>{
console.log(req.body);
const nombre = req.body.nombre; 
const apellido = req.body.apellido;
const edad = req.body.edad;  
res.json({mensaje: "Hola " + nombre + " " + apellido + ", tu edad es: " + edad});

});

app.listen(3000, (err) => {
    if (err) {
        console.error("Error al iniciar el servidor:", err);
    } else {
        console.log("Servidor escuchando en el puerto 3000");
    }
});
