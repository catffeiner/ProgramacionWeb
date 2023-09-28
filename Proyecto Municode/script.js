// Obtener elementos del DOM comunes a todas las páginas
const content = document.getElementById("content");

// Datos de sitios turísticos (simulación)
let sitiosTuristicos = [];

// Función para mostrar la página de registro de sitios
function mostrarRegistroSitio() {
    content.innerHTML = ""; // Limpiar contenido existente
    const registroForm = document.createElement("form");
    registroForm.innerHTML = `
        <h2>Sitios Turísticos</h2>
        <label for="pais">País:</label>
        <select id="pais" name="pais">
            <option value="Guatemala">Guatemala</option>
            <option value="Honduras">Honduras</option>
            <option value="El Salvador">El Salvador</option>
            <!-- Agrega más países aquí -->
        </select>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <label for="horario">Horario:</label>
        <input type="text" id="horario" name="horario">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea>
        <button type="button" id="registrar-sitio">Registrar</button>
    `;
    content.appendChild(registroForm);

    const registrarSitioBtn = document.getElementById("registrar-sitio");
    registrarSitioBtn.addEventListener("click", () => {
        // Obtener valores del formulario
        const pais = document.getElementById("pais").value;
        const nombre = document.getElementById("nombre").value;
        const horario = document.getElementById("horario").value;
        const descripcion = document.getElementById("descripcion").value;

        // Validar y guardar el sitio turístico
        if (nombre && descripcion) {
            const sitio = { pais, nombre, horario, descripcion, likes: 0 };
            sitiosTuristicos.push(sitio);
            alert("Sitio turístico registrado con éxito.");
        } else {
            alert("Por favor, complete los campos obligatorios.");
        }
    });
}

// Función para mostrar los sitios turísticos en la tabla
function mostrarSitiosTuristicos() {
    var sitiosTuristicos = JSON.parse(localStorage.getItem('sitiosTuristicos')) || [];

    // Acceder al elemento HTML donde se mostrará la información
    var tablaSitios = document.getElementById('tabla-sitios');

    // Limpiar cualquier contenido anterior
    tablaSitios.innerHTML = '';

    // Crear encabezados de la tabla
    var encabezados = `
        <tr>
            <th class="country">País</th>
            <th class="name">Nombre del Lugar</th>
            <th class="actions">Acciones</th>
            <th class="likes">Likes</th>
        </tr>
    `;
    tablaSitios.innerHTML += encabezados;

    // Iterar a través de los sitios turísticos y mostrarlos en la tabla
    sitiosTuristicos.forEach(function (sitio) {
        var fila = document.createElement('tr');
        
        var paisCelda = document.createElement('td');
        paisCelda.textContent = sitio.pais;
        
        var nombreCelda = document.createElement('td');
        nombreCelda.textContent = sitio.nombre;
        
        var accionesCelda = document.createElement('td');
        accionesCelda.classList.add('actions'); // Agrega la clase "actions" para los estilos CSS
        if (sitio.likes === 0) {
            accionesCelda.innerHTML = `
                <button onclick="modificarSitio(${sitio.id})" class="btn-modificar">Modificar</button>
                <button onclick="eliminarSitio(${sitio.id})" class="btn-eliminar">Eliminar</button>
                <button onclick="verSitio(${sitio.id})" class="btn-ver">Ver</button>
            `;
        } else {
            accionesCelda.textContent = "No disponible";
        }
        
        var likesCelda = document.createElement('td');
        likesCelda.textContent = sitio.likes;

        fila.appendChild(paisCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(accionesCelda);
        fila.appendChild(likesCelda);

        tablaSitios.appendChild(fila);
    });
}

// Cargar datos desde el Local Storage al inicio (opcional)
const storedData = localStorage.getItem("sitiosTuristicos");
if (storedData) {
    sitiosTuristicos = JSON.parse(storedData);
}

// Identificar la página actual y mostrar el contenido correspondiente
const currentLocation = window.location.pathname;
if (currentLocation.endsWith("registro.html")) {
    mostrarRegistroSitio();
} else if (currentLocation.endsWith("mostrar.html")) {
    mostrarSitiosTuristicos();
}