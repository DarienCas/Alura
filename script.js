// Elementos DOM
const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copia = document.querySelector(".btn-copiar");
const contenedorsubtitulo = document.querySelector(".contenedor-subtitulo");
const contenedorparrafo = document.querySelector(".contenedor-parrafo");

// Ocultar el botón de copiar inicialmente
copia.style.display = "none";

// Establecer el foco en el área de texto
textArea.focus();

// Matriz de códigos para encriptar y desencriptar
const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Función para transformar texto (encriptar o desencriptar)
function transformarTexto(texto, tipo) {
    texto = texto.toLowerCase();
    matrizCodigo.forEach(([normal, encriptado]) => {
        const [buscar, reemplazar] = tipo === 'encriptar' ? [normal, encriptado] : [encriptado, normal];
        texto = texto.replaceAll(buscar, reemplazar);
    });
    return texto;
}

// Función para manejar la transformación de texto
function manejarTransformacion(tipo) {
    const textoOriginal = textArea.value.trim(); // Quitar espacios en blanco al inicio y al final
    if (textoOriginal === "") {
        mostrarAlerta('¡Ups!', 'El campo se encuentra vacío. Escriba el texto que desea ' + (tipo === 'encriptar' ? 'encriptar' : 'desencriptar'));
        textArea.value = ""; // Limpiar el área de texto
        return; // Salir de la función
    } else if (/[^a-z ]/.test(textoOriginal)) {
        mostrarAlerta('Recuerda!!!', 'Solo se permiten letras minúsculas y sin acentos.');
        textArea.value = ""; // Limpiar el área de texto
        return; // Salir de la función
    }
    
    // Transformar el texto
    const textoTransformado = transformarTexto(textoOriginal, tipo);
    mensaje.value = textoTransformado; // Mostrar el texto transformado
    mensaje.style.backgroundImage = "none"; // Eliminar la imagen de fondo
    contenedorsubtitulo.style.display = "none"; // Ocultar subtitulo
    contenedorparrafo.style.display = "none"; // Ocultar párrafo
    textArea.value = ""; // Limpiar el área de texto
    textArea.focus(); // Enfocar el área de texto
    copia.style.display = "block"; // Mostrar el botón de copiar
}

// Función para mostrar alertas
function mostrarAlerta(titulo, texto) {
    swal.fire({
        icon: 'info',
        iconColor: '#3f5b9a',
        background: '#a7b9c0',
        title: titulo,
        confirmButtonColor: '#3f5b9a',
        text: texto
    });
}

// Funciones conectadas a los botones
function btnEncriptar() {
    manejarTransformacion('encriptar');
}

function btnDesencriptar() {
    manejarTransformacion('desencriptar');
}

// Función para copiar el texto
function copiar() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value)
        .then(() => {
            textArea.focus(); // Enfocar el área de texto
            mensaje.value = ""; // Limpiar el mensaje
            mostrarAlerta('Información', 'Texto copiado al portapapeles'); // Mostrar alerta
        })
        .catch(err => {
            console.error('Error al copiar: ', err); // Manejo de errores
        });
}

// Asignar eventos a los botones
document.querySelector(".btn-encriptar").addEventListener("click", btnEncriptar);
document.querySelector(".btn-desencriptar").addEventListener("click", btnDesencriptar);
copia.addEventListener("click", copiar);
