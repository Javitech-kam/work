const express = require('express');
const colors = require('colors')
const app = express();
const mysql = require('mysql2');
// Configuración de la conexión a la base de datos
var conexioncita = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'javier',
    database: 'jefe'
});

conexioncita.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
    console.log('Conectado a la base de datos'.green);
});
// ejs
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas


app.get('/', function (req, res) {
    res.render("Inicio");
});
app.get('/Bienvenido', function (req, res) {
    res.render("Bienvenido" ,{usuario});
});
app.get('/Datos', function (req, res) {
    res.render("Datos",{datosUsuario, fecha});
});
let datosUsuario
let fecha
// validar usuario y contraseña


app.post('/', function (req, res) {
    const datos = req.body;
    console.log(datos);

    let nombre = datos.nombre;
    let cedula = datos.contraseña;
    let validar = `SELECT * FROM usuarios WHERE nombre1 = '${nombre}' AND identificacion = '${cedula}'`;

    conexioncita.query(validar, function (error, results, fields) {
        if (error) {
            console.error('Error al validar usuario:', error);
            res.status(500).send('Error al iniciar sesión');
            return;
        }

        if (results.length === 1) {
            console.log("Bienvenido".blue);
            datosUsuario = results[0];
            res.render('Bienvenido', { usuario: datosUsuario });
        } else {
            console.log("Contraseña incorrecta".red);
            res.redirect("/");
        }
    });
});

console.log(datosUsuario)

// Configura el puerto en el que el servidor escuchará las solicitudes HTTP
const puerto = 3030; // Define el puerto 3030 donde el servidor estará escuchando las peticiones
console.log(`Servidor corriendo en el puerto ${puerto}`.green); // Imprime en consola que el servidor está corriendo, con el número de puerto en verde
app.listen(puerto); // Hace que la aplicación Express escuche en el puerto 3030




