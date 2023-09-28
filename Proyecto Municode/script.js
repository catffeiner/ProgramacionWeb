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

// Función para mostrar la página de sitios turísticos
function mostrarSitiosTuristicos() {
    content.innerHTML = ""; // Limpiar contenido existente
    const listaSitios = document.createElement("div");
    listaSitios.innerHTML = "<h2>Lista de Sitios Turísticos</h2>";

    // Ordenar sitios turísticos por país
    sitiosTuristicos.sort((a, b) => a.pais.localeCompare(b.pais));

    // Crear una tabla para mostrar los sitios
    const tabla = document.createElement("table");
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>País</th>
                <th>Nombre</th>
                <th>Horario</th>
                <th>Likes</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // Llenar la tabla con los datos de los sitios turísticos
    const tbody = tabla.querySelector("tbody");
    sitiosTuristicos.forEach((sitio, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${sitio.pais}</td>
            <td>${sitio.nombre}</td>
            <td>${sitio.horario}</td>
            <td>${sitio.descripcion}</td>
            <td>${sitio.likes}</td>
            <td><button id="like-btn-${index}">Like</button></td>
        `;

        // Manejar clic en el botón "Like"
        const likeBtn = row.querySelector(`#like-btn-${index}`);
        likeBtn.addEventListener("click", () => {
            // Incrementar el contador de likes
            sitio.likes++;
            likeBtn.textContent = `Like (${sitio.likes})`;

            // Guardar la información actualizada en el Local Storage
            localStorage.setItem("sitiosTuristicos", JSON.stringify(sitiosTuristicos));
        });

        tbody.appendChild(row);
    });

    listaSitios.appendChild(tabla);
    content.appendChild(listaSitios);
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