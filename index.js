
// Importa las dependencias necesarias
const express = require('express'); // Importa el framework Express para crear y gestionar el servidor web
const colors = require('colors'); // Importa la librería colors para imprimir mensajes en consola con colores
const app = express(); // Crea una instancia de la aplicación Express
const path = require('path'); // Importa el módulo path para gestionar rutas de archivos en el servidor

// Configura el middleware para manejar solicitudes JSON y formularios URL codificados
// app.set('view engine', 'ejs'); // Esta línea está comentada, pero si la descomentas, usará EJS como motor de plantillas
app.use(express.json()); // Middleware para analizar los cuerpos de las solicitudes que contienen datos en formato JSON
app.use(express.urlencoded({ extended: false })); // Middleware para analizar los cuerpos de las solicitudes de formularios codificados como URL

// Configuración de vistas
app.set('view engine', 'ejs'); // Establece 'ejs' como motor de plantillas para renderizar vistas dinámicas
app.set('views', path.join(__dirname, 'views')); // Define el directorio 'views' para almacenar los archivos de plantillas

// Middleware para servir archivos estáticos (imágenes, hojas de estilo CSS, scripts JS)
app.use(express.static(path.join(__dirname, 'public'))); // Sirve los archivos estáticos desde la carpeta 'public'

// Definición de rutas para las diferentes páginas

// Ruta raíz (/) que redirige automáticamente a la página '/Inicio'
app.get('/', (req, res) => res.redirect('/Inicio'));

// Ruta para la página de inicio (login) que renderiza la vista 'Inicio.ejs'
app.get('/Inicio', (req, res) => {
    console.log("Accediendo a la página de login".red); // Imprime un mensaje en consola con texto rojo
    res.render('Inicio'); // Renderiza la vista 'Inicio.ejs' para mostrar la página de login
});

// Ruta para la página de datos personales, renderiza la vista 'Datos.ejs'
app.get('/Datos', (req, res) => {
    console.log("Accediendo a la página de registro".blue); // Imprime un mensaje en consola con texto azul
    res.render('Datos'); // Renderiza la vista 'Datos.ejs' que probablemente tiene un formulario de datos personales
});

// Nota importante: Tienes un error aquí, ya que defines la misma ruta '/Datos' dos veces, lo cual sobrescribe la primera.

// Ruta para la página de bienvenida, muestra un saludo con el nombre del usuario
app.get('/Bienvenido', (req, res) => {
    const userName = "Usuario"; // Se define una variable con el nombre del usuario, que se puede modificar dinámicamente
    console.log("Accediendo a la página de bienvenida".cyan); // Imprime un mensaje en consola con texto cian
    res.render('Bienvenido', { userName }); // Renderiza la vista 'Bienvenido.ejs' y pasa el 'userName' como variable a la vista
});

// Configura el puerto en el que el servidor escuchará las solicitudes HTTP
const puerto = 3030; // Define el puerto 3030 donde el servidor estará escuchando las peticiones
console.log(`Servidor corriendo en el puerto ${puerto}`.green); // Imprime en consola que el servidor está corriendo, con el número de puerto en verde
app.listen(puerto); // Hace que la aplicación Express escuche en el puerto 3030




